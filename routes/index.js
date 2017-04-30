var express = require('express');
var router = express.Router();
const User = require("../models/UserModel");
const Place = require("../models/PlaceModel");


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
//     var places = [
//         {
//             name: "nameTest",
//             street: "streetTest",
//             streetNr: "testNr99",
//             localNr: "localNrTest00"
//         },
//         {
//             name: "2nameTest",
//             street: "2streetTest",
//             streetNr: "2testNr99",
//             localNr: "2localNrTest00"
//         }
// ];
    Place.find({}).then(
        places => {
            res.render('./places/placesHome', { userCity: 'Express', places: places });
        },
        err => {
            console.error(err);
        }
    );
    
    // res.render('./places/placesHome', { userCity: 'Express', places: places });
});

module.exports = router;
