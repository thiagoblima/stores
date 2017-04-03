// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let PickupSchema = new Schema({

  schedule_id: Number,
  total_points: Number,
  details_id: Number,
  updated_at: Date,
  created_at: Date

});


// on every save, add the date
PickupSchema.pre('save', (next) => {
  // get the current date
  let currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// the schema is useless so far
// we need to create a model using it
let Pickup = mongoose.model('Pickup', PickupSchema);

// make this available to our users in our Node applications
module.exports = Pickup;