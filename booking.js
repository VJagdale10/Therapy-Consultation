var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var ejs = require('ejs');
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo');
const app = express()

var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './public/views'));
app.use(express.static(path.join(__dirname + '/views/css')));

const serverRoutes = require('./server')
const paymentRoutes = require('./payment')
const loginroutes = require('./public/routes/index')

app.use(serverRoutes)
app.use(paymentRoutes)
app.use(loginroutes)
app.use(session({
    secret: 'story book',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://<loginregister+ loginregister123>@cluster0.cp2c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' })
}));

mongoose.connect('mongodb+srv://user123:userpass123@cluster0.cp2c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
    } else {
        console.log('Error in DB connection : ' + err);
    }
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))



app.post("/appointment", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var appointment_date = req.body.appointment_date;
    var morning_desired = req.body.morning_desired;
    var evening_desired = req.body.evening_desired;
    var confirm_by = req.body.confirm_by;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "appointment_date": appointment_date,
        "morning_desired": morning_desired,
        "evening_desired": evening_desired,
        "confirm_by": confirm_by

    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('TY_Booking.html')

})
// const app1 = require('express')();
app.get('/public/index.html', (req, res) => {
    res.redirect('/public/views/index.ejs');
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('TY_Booking.html');
}).listen(3000);

const port = process.env.PORT || 4000;
app.listen(port, () => { // do not add localhost here if you are deploying it
    console.log("Connected at server " + port);
});

// module.exports = { db }