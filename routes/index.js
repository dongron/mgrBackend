var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('./login/login', { title: 'Express' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
