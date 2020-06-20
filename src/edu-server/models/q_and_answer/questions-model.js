'use strict';

const questionsSchema = require('./questions-schema');
const mongoCourses = require('../mongo');

class Questions extends mongoCourses {
    constructor() {
        super(questionsSchema);
    }
}

module.exports = new Questions(questionsSchema);