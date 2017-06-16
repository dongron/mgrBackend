var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Place = require("../../models/PlaceModel");

var places = require('../../data/places.js');
const querystring = require('querystring');



router.get('/', function(req, res, next) {
  	res.send({places: "ping places status: ok"});
});

router.get('/all', function(req, res, next) {
	Place.find({}).then(
        list => {
            if(list.length == 0) {
                res.send('no places');
            } else {
                var placeMap = {};
                list.forEach(function(place) {
                    placeMap[place._id] = place;
                });
                res.send(placeMap);
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
		name: req.body.name ||"none",
		street: req.body.street || "none",
		streetNr: req.body.streetNr,
		localNr: req.body.localNr,
		city: req.body.city,
		geo: req.body.geo || "none",
		ownerEmail: req.body.ownerEmail
	};
	var newPlace = new Place(placeToSave);
	newPlace.save();
	res.send("OK");
});

router.get('/byId/:id', function(req, res, next) {
    let id = req.params.id;

    Place.findOne({'_id': id}).then(
        place => {
            if(!place) {
                res.send("place not found");
            } else {
                res.send(place);
            }
        },
        err => {
            console.error(err);
        }
    );
});

router.get('/byName/:name', function(req, res, next) {
    let name = req.params.name;
	console.log(name);

    Place.findOne({'name': name}).then(
        place => {
            if(!place) {
                res.send("place not found");
            } else {
                res.send(place);
            }
        },
        err => {
            console.error(err);
        }
    );
});

router.get('/query', function(req, res, next) {
    let city = req.query.city;

    Place.findOne({'city': city}).then(
        place => {
            if(!place) {
                res.send("place not found");
            } else {
                res.send(place);
            }
        },
        err => {
            console.error(err);
        }
    );
});

module.exports = router;
