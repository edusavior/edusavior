const quiz_schema = require('./quiz-schema.js');
const Model = require('../../../auth/models/mongo.js');
class Questions extends Model {
  constructor(quiz_schema) {
    super(quiz_schema);
  }
}
module.exports = new Questions(quiz_schema);