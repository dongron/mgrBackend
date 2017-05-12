var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Reservation = require("../../models/ReservationModel");
const querystring = require('querystring');



router.get('/', function(req, res, next) {
  	res.send({places: "ping places status: ok"});
});

router.get('/all', function(req, res, next) {
	Reservation.find({}).then(
        list => {
            if(list.length == 0) {
                res.send('no reservations'); 
            } else {
                var reservationMap = {};
                list.forEach(function(reservation) {
                    reservationMap[reservation._id] = reservation;
                });
                res.send(reservationMap);  
            }
        },
        err => console.error(err)
    )
});

router.post('/add', function(req, res) {
	if(!req.body.clientEmail || !req.body.ownerEmail || !req.body.time) {
		res.send("ERROR, clientEmail, ownerEmail and reservation date needed!");
		return;
	}
	
	var reservationToSave = {
        clientEmail: req.body.clientEmail ||"none",
        ownerEmail: req.body.ownerEmail ||"none",
        placeName: req.body.placeName ||"none",
        time: new Date(req.body.time) || new Date(),
        long: req.body.long || 1
	};	
	var newReservation = new Reservation(reservationToSave);
	newReservation.save();
	res.send("OK");
});

module.exports = router;