'use strict';
const schema = require('./user-schema.js');
const Model = require('../mongo.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET || 'mysecret';
/**
* Model Model
* @constructor Products
*/



class Users extends Model {
  constructor() {
    super(schema);
  }
  async save(record){
    const result = await this.get({username : record.username});
    if(result.length == 0){
      const user = await this.create(record);
      return user;
    }
    
  }
  async authenticateBasic(user,pass){
    const result = await this.get({username : user});
    if(result.length !=0){
      const valid = await bcryptjs.compare(pass, result[0].password);
      return valid ? result : Promise.reject('wrong password');
    }

  }
  generateToken(user){
    const token =  jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (15 * 60),
      algorithm:  'RS384',
      username: user.username,
    }, SECRET);
    return token;
  }

  async authenticateToken  (token) {
    try {
      const tokenObject = await jwt.verify(token, SECRET);
      const result = await this.get({username : tokenObject.username});
      if (result.length != 0) {
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
 
}

module.exports = new Users();
