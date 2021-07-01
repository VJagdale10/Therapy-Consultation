const { Schema, model} = require('mongoose')

const paymentSchema = new Schema({
  cno: Number,
  cname: String,
  date: String,
  cvv: Number
})

const Payment = model('Payment', paymentSchema)

module.exports = Payment
