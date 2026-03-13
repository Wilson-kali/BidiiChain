'use strict';

const { User, Task, Proof } = require('../models');
const blockchainService = require('../services/blockchainService');

exports.connectWallet = async (req, res, next) => {
  try {
    const { walletAddress, name, email } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ message: 'walletAddress is required' });
    }

    const normalizedAddress = walletAddress.toLowerCase();

    let user = await User.findByPk(normalizedAddress);
    if (!user) {
      user = await User.create({
        walletAddress: normalizedAddress,
        name,
        email
      });
    } else {
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      await user.save();
    }

    const badges = await blockchainService.getUserBadges(normalizedAddress);

    return res.json({
      user,
      badges
    });
  } catch (err) {
    next(err);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({ message: 'walletAddress is required' });
    }

    const normalizedAddress = walletAddress.toLowerCase();

    const user = await User.findByPk(normalizedAddress, {
      include: [
        {
          model: Proof,
          as: 'proofs',
          include: [
            {
              model: Task,
              as: 'task'
            }
          ]
        },
        {
          model: Task,
          as: 'tasks'
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const completedTasks = user.proofs
      .filter((p) => p.verified)
      .map((p) => p.task);

    const badges = await blockchainService.getUserBadges(normalizedAddress);

    return res.json({
      user,
      completedTasks,
      badges
    });
  } catch (err) {
    next(err);
  }
};

