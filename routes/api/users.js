var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require("../../models/UserModel");
//User.find, User.updat itd możliwe

router.get('/', function(req, res, next) {
  	res.send({users: "ping users status: ok"});
});

router.get('/unused', function(req, res, next) {
	User.getUsers(function(err, users) {
		if (err) { 
			return next(err); 
		}	  
		console.log(users);
		res.send(users);
	});
});

router.get('/all', function(req, res, next) {
	User.getUsers(function(err, users) {
		if (err) { 
			return next(err); 
		}
		console.log(users);
		res.send(users);
	});
});

router.post('/addUser', function(req, res) {
	if(!req.body.email || !req.body.password) {
		res.send("ERROR, email and password are minimal data!");
		return;
	}
	
	var userToSave = {
		email: req.body.email ||"none@o.o",
		name: req.body.mail,
		username: req.body.username || "none",
		surname: req.body.surname, 
		city: req.body.city,
		password: req.body.password || "none"
	};	
	var newUser = new User(userToSave);
	newUser.save();
	res.send("OK");
});

router.get('/:email', function(req, res, next) {
    let email = req.params.email;
	console.log(places);
  	res.send(user);
});

module.exports = router;
