'use strict';

const express = require('express');
const multer = require('multer');
const router = express.Router();
const proofController = require('../controllers/proofController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/tasks/:taskId/proof', upload.single('file'), proofController.submitProof);
router.post('/tasks/:taskId/proof/:proofId/verify', proofController.verifyProof);

module.exports = router;

