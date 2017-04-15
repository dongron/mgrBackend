var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// express.use(bodyParser.json()); // support json encoded bodies
// express.use(bodyParser.urlencoded({ extended: true })); 
var places = require('../../data/places.js');


router.get('/', function(req, res, next) {
	console.log(places);
  	res.send(places);
});

router.post('/', function(req, res, next) {
	places.push(req.body);
	console.log(places);
	res.send('ok');
});

router.delete('/', function(req, res, next) {
	let objToDel = req.body;

	places.splice(tab.indexOf(objToDel),1);
	res.send('ok');
});

module.exports = router;
