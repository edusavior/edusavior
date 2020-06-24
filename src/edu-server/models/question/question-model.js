'use strict';

const questionsSchema = require('./question-schema.js');
const mongoCourses = require('../../../auth/models/mongo.js');

class Questions extends mongoCourses {
  constructor() {
    super(questionsSchema);
  }
}

module.exports = new Questions(questionsSchema);
