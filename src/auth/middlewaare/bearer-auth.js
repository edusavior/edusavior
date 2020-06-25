'use strict';
/**
 *  @module bearerTokenAuthorization
 * 
 */
const users = require('../models/users/user-model.js');
/**
 * this function will check  the validation of login 
 * test if the header have an authorization then decode it and generate token
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login no auth headers');
  } else {
    const [auth, token] = req.headers.authorization.split(' ');
    if (auth === 'Bearer') {
      users
        .authenticateToken(token)
        .then((validUser) => {          
          req.user = {
            username : validUser.username,
            capabilities : validUser.capabilities,
          };
          req.role = validUser.role;
          next();
        });
      // .catch((e) => next('Invalid login', e.message));
    } else {
      next('Invalid auth header');
    }
  }
};