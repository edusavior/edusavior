'use strict';
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const user = mongoose.Schema({
  username:{ type: String, required: true },
  password: { type: String, required: true },
  email : { type: String, required: true },
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
