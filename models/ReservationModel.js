var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema  = Schema({
    clientEmail: {type: String, required: true},
    ownerEmail: {type: String, required: true},
    time: {type: Date},
    long: {type: Number}    //hours 
});

module.exports = mongoose.model('Reservation', ReservationSchema, 'reservations');