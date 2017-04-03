// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let OTPschema = new Schema({
  otp: Number,
  otp_number: Number,
  created_at: Date
});


// on every save, add the date
OTPschema.pre('save', (next) => {
  // get the current date
  let currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// the schema is useless so far
// we need to create a model using it
let otpDB = mongoose.model('otpDB', OTPschema);

// make this available to our users in our Node applications
module.exports = otpDB;