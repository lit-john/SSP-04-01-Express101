// The debug package allows us to print debug messages when
// the DEBUG environment variable is set to Express:*
// On Windows we would set this with
//  set DEBUG=Express101:*
//
// On Mac it's
//  DEBUG=Express101:*
var debug = require('debug')('Express101:server');
// Require the various modules that we need
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

// Create an Express app
var app = express();

// Set the various express app properties
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Map url requests of the format '/something' to routes e.g. '/home', '/index', etc
app.use('/', routes);

// Map url requests of the format '/users/something' to users e.g. '/users/john', '/users/mary', '/users/1868', etc
app.use('/users', users);


// If the url request does not match one of the above formats then this app can't support it
// so return a 'Not found' (aka 404) message.
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;

  // pass the request on to the next 'middleware'
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  debug('In developer mode');
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
