'use strict';

/**
 * schema for courses
 * @module courses
 */

/**
  * @property {String} course_name -required
  * @property {String} subject - required
  * @property {String} instructor - required
  * @property {String} description -required
  * @property {String} literature_time - required
  * @property {Schema} quiz - required
  */

const mongoose = require('mongoose');

const comment_schema = new mongoose.Schema({
  content: {
    type: String,
    require: 'Content is Required',
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: 'Post is Required Field',
  },
});
 
module.exports = mongoose.model('Comment', comment_schema);