var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var path = require('path');
var session = require('express-session');
var MongoStore = require('connect-mongo');

const Contact = require("./public/models/contact")
const router = express.Router()

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

router.post("/contact", (req, res) => {
    var name = req.body.name2;
    var email = req.body.email2;
    var message = req.body.message;

    var data = {
        "name": name,
        "email": email,
        "message": message
    }

    const contact = new Contact(data)

    contact.save((err, doc) => {
        if(err){
            console.log(err)
        }
        console.log(doc)
    })
    return res.redirect('/index.html')
})

// app.get("/", (req, res) => {
//     res.set({
//         "Allow-access-Allow-Origin": '*'
//     })
//     return res.redirect('/public/index.html');
// })

module.exports = router