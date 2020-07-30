'use strict';
/**
 *  @module basicAuthorization
 * this is used for signin
 * 
 */

const base64 = require('base-64');
const users = require('../models/users/user-model.js');
/**
 * check if the client sent authorization headers then decode it and generate token
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    const basic = req.headers.authorization.split(' ').pop();
    const [user, pass] = base64.decode(basic).split(':'); 
    users
      .authenticateBasic(user, pass)
      .then((validUser) => {
        console.log('validUser' , validUser);
        if(validUser === 'user not found'){ 
          req.user= 'user not found';
          next();
        }else if(validUser){
          console.log('validUser.............' , validUser , user, pass);
          req.token = users.generateToken(validUser[0]);
          req.user = validUser[0];
          console.log('req.user' , req.token);
          next();
        }
        else{
          req.user='wrong password';
          next();

          // next('this user does not exist!!');
        }
      })
      .catch((err) => next(err));
  }
};