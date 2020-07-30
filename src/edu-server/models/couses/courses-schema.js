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

const courses = mongoose.Schema({
  course_name:{type:String,require:true},
  subject:{type:String,require:true},
  instructor:{type:String,require:true},
  description : {type:String,require:true},
  url :{type:String,require:true},
  img_url: {type:String,require:true},
  literature_time : {type:String,require:true},
  room_id : {type:String,require:true},
  quiz : [],
});

module.exports = mongoose.model('courses', courses);