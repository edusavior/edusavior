'use strict';

/**
 * schema for quizzes
 * @module quizzes
 */

/**
  * @property {String} name -required
  * @property {String} display_name - required
  * @property {String} description - required
  */

const mongoose = require('mongoose');

const quizzes = mongoose.Schema({
  username:{ type:String,require:true },
  question:{ type:String,require:true },
});

module.exports = mongoose.model('quizzes', quizzes);