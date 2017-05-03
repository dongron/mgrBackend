module.exports = function(router, userData){
        
    const User = require("../models/UserModel");
    
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
}