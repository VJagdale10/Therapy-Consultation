var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo');

const { db } = require('./booking')

// mongoose.connect('mongodb+srv://loginregister:loginregister123@cluster0.cp2c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, (err) => {
//     if (!err) {
//         console.log('MongoDB Connection Succeeded.');
//     } else {
//         console.log('Error in DB connection : ' + err);
//     }
// });

// var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

router.use(session({
    secret: 'story book',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://<loginregister+ loginregister123>@cluster0.cp2c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' })
}));

router.get('/index', function(req, res, next) {
    res.render('path/to/ejs/views/index');
});

router.set('view engine', 'ejs');
router.set('views', path.join(__dirname, './public/views'));
router.use(express.static(path.join(__dirname + '/views/css')));


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


var index = require('./public/routes/index');
router.use('/', index);

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


module.exports = { router }

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function() {
//     console.log(`Connected at server ${PORT}`)
// });