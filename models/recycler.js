// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let recyclerSchema = new Schema({
  recycler_code: String,
  recycler_name: { type: String, required: true, unique: true },
  recycler_image: String,
  recycler_phone: Number,
  recycler_dob: String,
  recycler_address: String,
  created_at: Date,
  updated_at: Date
});



// on every save, add the date
recyclerSchema.pre('save', (next) => {
  // get the current date
  let currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // add the recycler code
  this.recycler_code = 'BOM06-' + Math.floor((Math.random() * 999) + 99);

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


// the schema is useless so far
// we need to create a model using it
let Recycler = mongoose.model('Recycler', recyclerSchema);

// make this available to our users in our Node applications
module.exports = Recycler;