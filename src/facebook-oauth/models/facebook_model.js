'use strict';

const mongoose = require('mongoose');

const Facebook_Schema = mongoose.Schema({
  name: String,
  facebookID: String,
  accessToken: String,
}, {collection: 'users'});

const facebook_model = mongoose.model('users', Facebook_Schema);
module.exports = facebook_model;