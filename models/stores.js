const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let storesSchema = new Schema({
  store_code: String,
  store_name: { type: String, required: true, unique: true },
  store_image: String,
  store_phone: Number,
  store_country: String,
  store_city: String,
  store_type: String,
  store_address: String,
  created_at: Date,
  updated_at: Date
});




storesSchema.pre('save', function(next) {

  let currentDate = new Date();
  
  this.updated_at = currentDate;

  this.store_code = 'BOM06-' + Math.floor((Math.random() * 999) + 99);

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});


let Stores = mongoose.model('Stores', storesSchema);

module.exports = Stores;