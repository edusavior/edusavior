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
     * @parma {object} schema - mongo schema 
     */
  constructor(schema) {
    this.schema = schema;
  }

  /**
     * 
     * @param {string} _id optional mongo record id
     * @return {*} 
     */
  get(_id) {
    const queryObject = _id ?  _id  : {};
    return this.schema.find(queryObject);
  }

  /**
     * 
     * @param {object} record matches the schema fromat 
     * @return {*} 
     */
  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
     * 
     * @param {String} _id mongo record id 
     * @param {object} record schema object format
     * @return {*}  
     */

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
     * 
     * @param {string} _id 
     * @returns
     * {*}
     */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;