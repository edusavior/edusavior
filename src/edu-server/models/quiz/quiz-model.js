'use strict';

const quizzesSchema = require('./quiz-schema');
const mongoCourses = require('../mongo');

class Quizzes extends mongoCourses {
    constructor() {
        super(quizzesSchema);
    }
}

module.exports = new Quizzes(quizzesSchema);