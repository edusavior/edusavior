'use strict';
/**
 * User schema
 * @module userSchema
 */
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
/**
 * Users schema
 * @property {string} username 
 * @property {string} passwoord
 * @property {string} email
 * @property {string} role
 * @property {array} courses
 * @property {array} questions
 * 
 */
const user = mongoose.Schema({
  username:{ type: String, required: true },
  password: { type: String, required: true },
  email : { type: String, required: true },
  profile_img : { type: String, required: true },
  role : {
    type : String,
    default : 'student',
    enum : ['student', 'instructor'],
  },
  courses:[],
  questions : [],
});

user.pre('save', async function () {
  this.password = await bcryptjs.hash(this.password, 5);
});


module.exports = mongoose.model('users', user);
