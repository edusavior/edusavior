'use strict';
const mongoose = require('mongoose');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
 
},{toObject:{virtuals:true},toJSON:{virtuals:true}});


module.exports = mongoose.model('users', users);