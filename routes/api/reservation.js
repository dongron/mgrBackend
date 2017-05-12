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
	if(!req.body.name || !req.body.geo) {
		res.send("ERROR, name and geo are minimal data!");
		return;
	}
	
	var placeToSave = {
        clientEmail: req.body.clientEmail ||"none",
        ownerEmail: req.body.ownerEmail ||"none",
        time: req.body.time || new Date(),
        long: req.body.long || 1
	};	
	var newPlace = new Place(placeToSave);
	newPlace.save();
	res.send("OK");
});

module.exports = router;
