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
    res.redirect('/details');
    
})

router.get('/details', function (req, res, next) {
    
})

// router.post('/contactClient/', function(req, res, next) {
//     var email = req.body.email || 'dongron@wp.pl';
//     var subject = req.body.subject || 'Test subject';
//     var emailContent = req.body.emailContent || "Content testowy";
//     let host = 'localhost';//"places-back-end.herokuapp.com";
//     var transporter = nodemailer.createTransport({
//         host: host
//     });
//     transporter.sendMail({
//         from: 'PlacesService <ps@' + host + '>',
//         to: email,
//         subject: subject,
//         text: emailContent
//     }, function(err, info) {
//         if(err) {
//             console.log(err);
//         }
//         res.send('contact_success');
//         console.log(email + ' '+subject+' '+emailContent+'!!! \n');
//     });
// });

router.get('/contact', function(req, res, next) {
    res.render('./contact/contactForm', { title: 'Contact', page: 'contact' })
});

router.get('/details', function(req, res, next) {
    res.redirect('/contact');
});

router.post('/contact', function (req, res) {
    
  var emailOptions, SMTPTransport;
  SMTPTransport = nodemailer.createTransport({
    host: 't.pl',
    port: 465,
    secure: true,
    auth: {
      user: "notification@t.pl",
      pass: "crazyHardPass2" 
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  let name = req.body.name || 'Places website notification';
  let email = req.body.email || 'places-system.com';
  emailOptions = {
      from: name + ' <' + email + '>',
      to: 'dominikgronkiewicz@gmail.com',
      subject: req.body.subject || 'Website contact form',
      text: req.body.message + " \n\n Mail send by: " + name
  };
  SMTPTransport.sendMail(emailOptions, function (err, response) {
      if (err) {
          console.error(err);
          res.render('./contact/contactForm', { title: 'Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' });
      }
      else {
          console.log('email send');
          res.render('./contact/contactForm', { title: 'Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
  });
});


module.exports = router;
