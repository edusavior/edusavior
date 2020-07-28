'use strict';

const questionSchema = require('./question-schema');
const mongoQuestion = require('../../../auth/models/mongo.js');

class Courses extends mongoQuestion {
  constructor() {
    super(questionSchema);
  }
}

module.exports = new Courses(questionSchema);
