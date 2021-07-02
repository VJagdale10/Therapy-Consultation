var express = require('express');
var env = require('dotenv').config()

var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// router.get('/register', function(req, res, next) {
//     res.render(__dirname + '/public/views/index.ejs');
// });

// var index = require('./public/routes/index');
// router.use('/', index);

// catch 404 and forward to error handler
// router.use(function(req, res, next) {
//     var err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler
// define as the last app.use callback
router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


module.exports = router
