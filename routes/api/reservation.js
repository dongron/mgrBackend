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
		res.send("ERROR, clientEmail, ownerEmail and reservation data needed!");
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

router.put('/update', function (req, res) {
    if(!req.body.clientEmail || !req.body.time || !req.body.placeName) {
        console.log('reservation not added', req.body);
        res.send("ERROR, clientEmail, ownerEmail and reservation data needed!");
        return;
    }

    const objectChanges = {
        $set: {
            clientEmail: req.body.clientEmail,
            time: req.body.time,
            long: req.body.long ? req.body.long : long
        },
        $inc: { __v: 1 }
    };

    Reservation.update({ _id: req.body._id }, objectChanges, { multi: true }).then(
        (doc) => {
                console.log('updated', doc);
                res.send("OK");
            },
            (err) => {
                console.error(err);
                res.send(err);
            });

// alternate, not sure if it worked
    // Reservation.findOne({ _id: req.body._id }).then(
    //     (doc) => {
    //         console.log('found', doc);
    //         doc.clientEmail = req.body.clientEmail? req.body.clientEmail : doc.clientEmail;
    //         doc.ownerEmail = doc.ownerEmail;
    //         doc.placeName = doc.placeName;
    //         doc.time = req.body.time? req.body.time : doc.time;
    //         doc.long = req.body.long? req.body.long : doc.long;
    //         if(doc.clientEmail != req.body.clientEmail || doc.time != req.body.time ||  doc.long != req.body.long) {
    //             console.log('+++ CHANGES +++');
    //             doc.__v = doc.__v++;
    //         }
    //         console.log('changed',doc);
    //         doc.save();
    //         res.send("OK");
    //     },
    //     (err) => {
    //         console.error(err);
    //         res.send(err);
    //     });


});

router.put('/updateFake', function(req, res) {
    console.log('--reservation post request body', req.body);
    if(!req.body.clientEmail || !req.body.time || !req.body.placeName) {
        console.log('reservation not added', req.body);
        res.send("ERROR, clientEmail, ownerEmail and reservation data needed!");
        return;
    }

    let id = (req.body && req.body.id) || req.headers.id;
    console.log('--removing id', id);
    Reservation.remove({'_id': id}).then(
        (response) => {
        var reservationToSave = {
            _id: req.body._id,
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
    },
        (err) => console.error(err)
    );
});

module.exports = router;
