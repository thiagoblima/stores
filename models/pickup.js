/**
 * @author     : <thiagolimasp@live.com> Thiago Lima
 * @module     : App { server }
 * @description: pickup's model object.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PickupSchema = new Schema({

  schedule_id: Number,
  total_points: Number,
  details_id: Number,
  updated_at: Date,
  created_at: Date

});


PickupSchema.pre('save', (next) => {

  let currentDate = new Date();
  

  this.updated_at = currentDate;


  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


let Pickup = mongoose.model('Pickup', PickupSchema);

module.exports = Pickup;