'use strict';

const answerSchema = require('./answer-schema.js');
const mongoCourses = require('../../../auth/models/mongo.js');

class Answers extends mongoCourses {
  constructor() {
    super(answerSchema);
  }
}

module.exports = new Answers(answerSchema);
