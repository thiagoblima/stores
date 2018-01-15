/**
 * @author     : <thiagolimasp@live.com> Thiago Lima
 * @module     : App { server }
 * @description: donation's model object.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DonationSchema = new Schema({

  organization_name: String,
  description: String,
  image: String,
  goal: Number,
  current_status: Number,
  updated_at: Date,
  created_at: Date

});


DonationSchema.pre('save', (next) => {
  // get the current date
  let currentDate = new Date();

  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// the schema is useless so far
// we need to create a model using it
let Donation_list = mongoose.model('Donation_list', DonationSchema);

// make this available to our users in our Node applications
module.exports = Donation_list;
