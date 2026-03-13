'use strict';

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.post('/tasks/:taskId/join', taskController.joinTask);
router.get('/tasks/:taskId', taskController.getTaskById);
router.get('/leaderboard', taskController.getLeaderboard);

module.exports = router;

