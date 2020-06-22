'use strict';

/**
 * Generic mongo model : will be extended in other models
 * @class Model
 * @property {object} schema - mongo schema
 * @property {function}  get - get data
 * @property {function} create - post data to the database
 * @property {function} delete -delete data using id
 * @property {function} update - update data using id
 */


class Model {

  /** 
    * Model Constructor 
    * @param {object} schema - mongo schema 
  */
  constructor(schema) {
    this.schema = schema;
  }
  /**
   * get one or all records
   * @param {string} _id optional mongo record id
   * @returns {array} the records
   */

  get(_id) {
    const queryObject = _id ?  _id  : {};
    return this.schema.find(queryObject);
  }
  /**
   * Create a record
   * @param  {object}  record
   * 
   */

  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }
  
  /**
   * Update a record in the database
   * @param {number} _id Record ID
   * @param {object} record The new data to replace. ID is a required field
   * @returns {object}
   */
  
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * Deletes a recod in the model
   * @param {string} _id  Mongo Record ID
   */

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
