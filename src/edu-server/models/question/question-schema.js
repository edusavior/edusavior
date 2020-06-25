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



const post_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Title is Required',
    },
    content: {
      type: String,
      required: 'Content is Required',
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: 'Comment is Required',
      },
    ],
  },
  
);
  
module.exports = mongoose.model('Post', post_schema);
  
