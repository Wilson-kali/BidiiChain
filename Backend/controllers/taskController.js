'use strict';

const { Task, Proof, User, TaskVolunteer, Sequelize } = require('../models');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: Proof,
          as: 'proofs'
        },
        {
          model: User,
          as: 'volunteers',
          attributes: ['walletAddress']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const enriched = tasks.map((task) => {
      const volunteersCount = task.volunteers ? task.volunteers.length : 0;
      const verifiedProofs = task.proofs
        ? task.proofs.filter((p) => p.verified).length
        : 0;

      return {
        ...task.toJSON(),
        volunteersCount,
        verifiedProofs,
        isFull: volunteersCount >= task.requiredVolunteers
      };
    });

    res.json(enriched);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, reward, requiredVolunteers } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'title and description are required' });
    }

    const task = await Task.create({
      title,
      description,
      reward: reward || 0,
      requiredVolunteers: requiredVolunteers || 1
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.joinTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ message: 'walletAddress is required' });
    }

    const task = await Task.findByPk(taskId, {
      include: [{ model: User, as: 'volunteers', attributes: ['walletAddress'] }]
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const normalizedAddress = walletAddress.toLowerCase();
    const user = await User.findByPk(normalizedAddress);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Connect wallet first.' });
    }

    const alreadyJoined =
      task.volunteers &&
      task.volunteers.some((v) => v.walletAddress === normalizedAddress);
    if (alreadyJoined) {
      return res.status(200).json({ message: 'Already joined', task });
    }

    const volunteersCount = task.volunteers ? task.volunteers.length : 0;
    if (volunteersCount >= task.requiredVolunteers) {
      return res.status(400).json({ message: 'Task is already full' });
    }

    await TaskVolunteer.create({
      taskId: task.id,
      userId: normalizedAddress
    });

    const updatedTask = await Task.findByPk(taskId, {
      include: [{ model: User, as: 'volunteers', attributes: ['walletAddress'] }]
    });

    res.json({ message: 'Joined task', task: updatedTask });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId, {
      include: [
        {
          model: Proof,
          as: 'proofs',
          include: [{ model: User, as: 'user', attributes: ['walletAddress', 'name'] }]
        },
        {
          model: User,
          as: 'volunteers',
          attributes: ['walletAddress', 'name']
        }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.getLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;

    const topUsers = await User.findAll({
      order: [['impactPoints', 'DESC']],
      limit,
      attributes: ['walletAddress', 'name', 'impactPoints', 'createdAt']
    });

    res.json(topUsers);
  } catch (err) {
    next(err);
  }
};

