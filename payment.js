var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const Payment = require('./public/models/payment')
 

const router = express.Router()

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

router.post("/payment", (req, res) => {
    var cno = req.body.cno;
    var cname = req.body.cname;
    var date = req.body.date;
    var cvv = req.body.cvv

    var data = {
        "cno": cno,
        "cnane": cname,
        "date": date,
        "cvv": cvv
    }

    var payment = new Payment(data)

    payment.save((err, doc) => {
        if(err){
            console.log(err)
        }
        console.log("success", doc)
    })

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('TY_Payment.html')

})


module.exports = { router }
// app.get("/", (req, res) => {
//     res.set({
//         "Allow-access-Allow-Origin": '*'
//     })
//     return res.redirect('TY_Payment.html');
// }).listen(3000);