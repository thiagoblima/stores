/**
 * @author: Thiago Lima
 * @description: Stores Case User Model
 * @module: User Model { User }
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