var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {type: String, required: true},
    username: {type: String},
    password: {type: String, required: true},
    name: {type: String},
    surname: {type: String},
    city: {type: String},
    owner: {type: Boolean}
});

// UserSchema.statics.getUsers = function(callback) {
//     console.log('fun get users: ok');
//     this.find({}, function(err, users){
//         if(err) return callback(err);
//         console.log(users);
//         callback(null, users);
//     };
//     
//     // this.find({}, function(err, users) {
//     //     if (!err){ 
//     //         console.log(users);
//     //         process.exit();
//     //     } else {throw err;}
//     // });
// };

// UserSchema.statics.createTestUser = function(callback) {
//     var silence = new Kitten({ name: 'Silence' });
//     console.log(silence.name); // 'Silence'
// };

module.exports = mongoose.model('User', UserSchema, 'users');

// var User = mongoose.model('User', UserSchema, 'users');
// 
// module.exports = {
//   User: User
// }
