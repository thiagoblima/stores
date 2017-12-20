/**
 * @author     : <thiagolimasp@live.com> Thiago Lima
 * @module     : App { server }
 * @description: optdb's model object.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OTPschema = new Schema({
  otp: Number,
  otp_number: Number,
  created_at: Date
});

OTPschema.pre('save', (next) => {

  let currentDate = new Date();

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

let otpDB = mongoose.model('otpDB', OTPschema);

module.exports = otpDB;