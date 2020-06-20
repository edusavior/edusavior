'use strict';
const schema = require('./user-schema.js');
const Model = require('../model.js');

class Product extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Product();