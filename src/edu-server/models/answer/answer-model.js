'use strict';

const answerSchema = require('./answer-schema');
const mongoAnswer = require('../../../auth/models/mongo.js');

class Courses extends mongoAnswer {
  constructor() {
    super(answerSchema);
  }
}

module.exports = new Courses(answerSchema);
