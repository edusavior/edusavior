'use strict';

const appointmentSchema = require('./appointment-schema');
const mongoQuestion = require('../../auth/models/mongo.js');

class Courses extends mongoQuestion {
  constructor() {
    super(appointmentSchema);
  }
}

module.exports = new Courses(appointmentSchema);
