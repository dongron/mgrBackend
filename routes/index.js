var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const User = require("../models/UserModel");
const Place = require("../models/PlaceModel");

var userData = {};

router.get('/', function(req, res, next) {
    let validText;
    if(req.query.valid) {
        validText = 'Invalid email or password';
    }
    res.render('./login/login', { title: '', validText: validText});
});

router.post('/login', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password; 
    
    User.findOne({'email': email}).then(
        user => {
            if(!user) {
                res.redirect('/?valid=notValid');
            } else {
                if(user.email == email && user.password == password) {
                    console.log("VALID AND PASS");
                    userData = user;
                    res.redirect('/home');                    
                } else {                    
                    res.send("Not valid email or password! Reload page");
                }
            }
        },
        err => {
            console.error(err);
        }
    );
});

/* GET home page. */
router.get('/home', function(req, res, next) {
    userData.city = userData.city || '';
    Place.find({"city": userData.city}).then(
        places => {
            let userPlaces = [];
            for (var i = 0; i < places.length; i++) {
                if(places[i].ownerEmail == userData.email) {
                    userPlaces.push(places[i]);
                }
            }
            res.render('./places/placesHome', { userCity: userData.city, places: places, userPlaces: userPlaces });
        },
        err => {
            console.error(err);
        }
    );
    
    // res.render('./places/placesHome', { userCity: 'Express', places: places });
});

router.post('/details', function (req, res, next) {
    console.log("DETAILS name ", req.body.name);
    
})

router.post('/contactClient/', function(req, res, next) {
    var email = req.body.email || 'dongron@wp.pl';
    var subject = req.body.subject || 'Test subject';
    var emailContent = req.body.emailContent || "Content testowy";
    let host = 'localhost';//"places-back-end.herokuapp.com";
    var transporter = nodemailer.createTransport({
        host: host,
        port: 8080
    });
    transporter.sendMail({
        from: 'PlacesService <ps@' + host + '>',
        to: email,
        subject: subject,
        text: emailContent
    }, function(err, info) {
        if(err) {
            console.log(err);
            // res.send(err);
        }
        res.send('contact_success');
        console.log(email + ' '+subject+' '+emailContent+'!!! \n');
    });
});


module.exports = router;
