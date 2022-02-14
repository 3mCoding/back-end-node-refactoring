var express = require('express');
var router = express.Router();

//mysql 연결
const mysqlConnObj = require('../config/mysql');
const mysqlConn = mysqlConnObj.init();
mysqlConnObj.open(mysqlConn);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
