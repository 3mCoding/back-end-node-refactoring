const express = require('express');
const router = express.Router();
const stageCtrl = require('./stages.ctrl');

router.get('/', stageCtrl.getQuest);
router.get('/list', stageCtrl.getQuests);
router.put('/solve', stageCtrl.solveQuestion);

module.exports = router;