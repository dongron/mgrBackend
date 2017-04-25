var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require("../../models/UserModel");

router.get('/', function(req, res, next) {
  	res.send({users: "ping users status: ok"});
});

router.get('/all', function(req, res, next) {
	User.find({}).then(
        list => {
            if(list.length == 0) {
                res.send('no users'); 
            } else {
                var userMap = {};
                list.forEach(function(user) {
                    userMap[user._id] = user;
                });
                res.send(userMap);  
            }
        },
        err => console.error(err)
    )
});

router.post('/add', function(req, res) {
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
	console.log(email);
    
    User.findOne({'email': email}).then(
        user => {
            if(!user) {                
                res.send("user not found");
            } else {
                res.send(user);
            }
        },
        err => {
            console.error(err);
        }
    );
 //  	res.send("user not found");
});

module.exports = router;
