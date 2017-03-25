/**
 * @author: Thiago Lima
 * @description: This the Mongoose Todo model.
 * @module: App - Adding Seed Data
 */



const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    username: String,
    lastname: String,
    photo: String,
    isAdmin: Boolean,
    hasAttachment: Boolean
});

let User = mongoose.model('Users', userSchema);

module.exports = User;