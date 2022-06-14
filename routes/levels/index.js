const express = require('express');
const router = express.Router();
const levelCtrl = require('./levels.ctrl');

router.get('/', levelCtrl.getQuest);
router.get('/list/:email', levelCtrl.getQuests);
router.put('/solve', levelCtrl.solveQuestion);
router.get('/suggestion', levelCtrl.suggestQuestion);

module.exports = router;