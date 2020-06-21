const quiz_schema = require('./quiz-schema.js');
const Model = require('../mongo.js');
class Questions extends Model {
  constructor() {
    super(quiz_schema);
  }
}
module.exports = new Questions(quiz_schema);