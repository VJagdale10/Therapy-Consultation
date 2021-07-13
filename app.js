var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo');


const app = express()

const router = express.Router()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.json())
//app.use(express.static('public'))
//app.use(bodyParser.urlencoded({
//  extended: true
//}))

// mongoose.connect('mongodb+srv://user123:userpass123@cluster0.cp2c5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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

// db.on('error', () => console.log("Error in Connecting to Database"));
// db.once('open', () => console.log("Connected to Database"))

app.post("/contact", (req, res) => {
    var name2 = req.body.name2;
    var email2 = req.body.email2;
    var message = req.body.message;

    var data = {
        "name2": name2,
        "email2": email2,
        "message": message
    }

    db.collection('contact').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('/public/index.html')

})

// app.get("/", (req, res) => {
//     res.set({
//         "Allow-access-Allow-Origin": '*'
//     })
//     return res.redirect('/public/index.html');
// })

module.exports = router