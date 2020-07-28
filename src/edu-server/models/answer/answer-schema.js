const mongoose = require('mongoose');

const Answers = mongoose.Schema({
  username:{type:String,require:true},
  content:{type:String,require:true},

});

module.exports = mongoose.model('answers', Answers);