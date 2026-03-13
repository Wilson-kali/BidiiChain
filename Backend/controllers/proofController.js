'use strict';

const { Proof, Task, User } = require('../models');
const ipfsService = require('../services/ipfsService');
const blockchainService = require('../services/blockchainService');

exports.submitProof = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { walletAddress } = req.body;
    const file = req.file;

    if (!walletAddress) {
      return res.status(400).json({ message: 'walletAddress is required' });
    }

    if (!file) {
      return res.status(400).json({ message: 'Proof file is required' });
    }

    const normalizedAddress = walletAddress.toLowerCase();

    const [task, user] = await Promise.all([
      Task.findByPk(taskId),
      User.findByPk(normalizedAddress)
    ]);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found. Connect wallet first.' });
    }

    const ipfsHash = await ipfsService.uploadFile(file);

    const proof = await Proof.create({
      taskId: task.id,
      userId: normalizedAddress,
      ipfsHash,
      verified: false
    });

    res.status(201).json({ message: 'Proof submitted', proof });
  } catch (err) {
    next(err);
  }
};

exports.verifyProof = async (req, res, next) => {
  try {
    const { taskId, proofId } = req.params;
    const { approve = true } = req.body;

    const proof = await Proof.findOne({
      where: { id: proofId, taskId },
      include: [
        { model: Task, as: 'task' },
        { model: User, as: 'user' }
      ]
    });

    if (!proof) {
      return res.status(404).json({ message: 'Proof not found' });
    }

    if (!approve) {
      proof.verified = false;
      await proof.save();
      return res.json({ message: 'Proof marked as not verified', proof });
    }

    if (!proof.verified) {
      proof.verified = true;
      await proof.save();

      const reward = proof.task.reward || 0;
      proof.user.impactPoints += reward;
      await proof.user.save();

      // Mint reward tokens on blockchain
      const blockchainResult = await blockchainService.mintRewardToken({
        walletAddress: proof.user.walletAddress,
        taskId: proof.task.id,
        proofId: proof.id,
        amount: reward
      });

      return res.json({ 
        message: 'Proof verified and reward minted', 
        proof,
        blockchain: blockchainResult
      });
    }

    res.json({ message: 'Proof already verified', proof });
  } catch (err) {
    next(err);
  }
};

