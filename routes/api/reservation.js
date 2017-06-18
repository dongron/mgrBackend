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
    console.log('--reservation post request body', req.body);
	if(!req.body.clientEmail || !req.body.time || !req.body.placeName) {
	    console.log('reservation not added', req.body);
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
	console.log('adding reservation(unconverted obj)', reservationToSave);
	var newReservation = new Reservation(reservationToSave);
	newReservation.save();
	res.send("OK");
});

router.delete('/remove', function (req, res) {
    console.log('--reservation delete b/h', req.body, req.headers);
    if((!req.body && !req.body.id) && (!req.headers && !req.headers.id)) {
        res.send("ERROR, needed places id or place name & owner email");
        return;
    }
    let id = (req.body && req.body.id) || req.headers.id;
    console.log('--removing id', id);
    Reservation.remove({'_id': id}).then(
        (response) => res.send(response),
        (err) => console.error(err)
    );

});

module.exports = router;
