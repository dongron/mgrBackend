var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = Schema({
    name: {type: String, required: true},
    street: {type: String},
    streetNr: {type: Number},
    localNr: {type: Number},
    city: {type: String},
    geo: {type: String, required: true},
});

module.exports = mongoose.model('Place', PlaceSchema, 'places');
