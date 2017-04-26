var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('./login/login', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({'email': email}).then(
        user => {
            if(!user) {                
                res.send("Not valid email! Reload page");
            } else {
                if(user.email == email && user.password == password) {
                    
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
    res.render('index', { title: 'Express' });
});

module.exports = router;
