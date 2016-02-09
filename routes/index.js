var debug = require('debug')('Express101:server');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Console logging: received request for /");
  debug("Debug logging: received request for /");
  res.render('index', { title: 'Express' });
});

/*
 * Pass a query string like this /hello?yourName=Tom
 */
router.get('/hello', function(req, res, next) {
  res.render('hello', {name: req.query.yourName, age: req.query.yourAge});
});

// If we get a GET request for /name
router.get('/name', function(req, res, next) {
  res.render('name');
});

// If we get a POST request for /name
router.post('/name', function(req, res, next) {
  // SELECT password from DB where username='req.body.yourName'

  if (req.body.yourPassword == "password") {
    res.render('name', {yourName: req.body.yourName, pwd: req.body.yourPassword});
  }
  else {
      res.redirect('/hello?yourName=Tom');
  }
});

module.exports = router;
