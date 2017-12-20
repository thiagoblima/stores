/**
 * @author     : <thiagolimasp@live.com> Thiago Lima
 * @module     : App { server }
 * @description: scheduler's model object.
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScheduleSchema = new Schema({

  schedule_time: Date,
  user: String,
  recycler: String,
  status: String,
  pickup_id: Number,
  cancel_state: String,
  cancel_note: String,
  updated_at: Date,
  created_at: Date

});

// on every save, add the date
ScheduleSchema.pre('save', (next) => {

  let currentDate = new Date();
  
  this.updated_at = currentDate;


  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


let Schedule = mongoose.model('Schedule', ScheduleSchema);


module.exports = Schedule;
