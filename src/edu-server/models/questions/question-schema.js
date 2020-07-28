const mongoose = require('mongoose');

const Questions = mongoose.Schema({
  usrename:{type:String,require:true},
  title:{type:String,require:true},
  content:{type:String,require:true},
  answers : [],
});

module.exports = mongoose.model('questions', Questions);