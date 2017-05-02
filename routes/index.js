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

router.post('/contactClient', function(req, res, next) {
    let host = "places-back-end.herokuapp.com";
    var transporter = nodemailer.createTransport({
        host: host,
        port: 25
    });
    transporter.sendMail({
        from: 'Places Service <ps@' + host + '>',
        to: req.body.email || 'dongron@wp.pl',
        subject: req.body.subject || 'Test subject',
        text: req.body.emailContent || "Content testowy"
    }, function(err, info) {
        if(err) {
            console.log(err);
            res.render(err);
        }
        res.render('contact_success');
    });
});


module.exports = router;
