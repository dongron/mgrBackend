var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require ('express-session');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var placesAPI = require('./routes/api/places');
var usersAPI = require('./routes/api/users');
var reservationAPI = require('./routes/api/reservation');

var keys = require('./data/temporary-keys');

var app = express();

// app.listen(3000);
mongoose.connect("mongodb://user:user123@ds131900.mlab.com:31900/reservation");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongoose connection: ok");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: { maxAge: 2628000000 },
    store: new (require('express-sessions'))({
        storage: 'mongodb',
        instance: mongoose,
        host: "mongodb://user:user123@ds131900.mlab.com:31900/reservation",
        // port: 31900, // optional 
        // db: 'reservation', // optional 
        // collection: 'sessions', // optional 
        // expire: 86400 // optional 
    })
}));

app.use('/', index);
app.use('/users', users);
app.use('/api/places', placesAPI);
app.use('/api/users', usersAPI);
app.use('/api/reservations', reservationAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
