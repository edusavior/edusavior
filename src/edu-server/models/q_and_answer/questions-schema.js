'use strict';

/**
 * schema for questions
 * @module questions
 */

/**
  * @property {String} name -required
  * @property {String} display_name - required
  * @property {String} description - required
  */

const mongoose = require('mongoose');

const questions = mongoose.Schema({
    //   name:{type:String,require:true},
    //   display_name:{type:String,require:true},
    //   description:{type:String,require:true},
});

module.exports = mongoose.model('questions', questions);