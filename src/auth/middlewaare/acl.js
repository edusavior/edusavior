'use strict';
/**
 *  @module acl
 * 
 */

/**
 * this function will send a JSON Formatted Response
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */
module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        res.json({error : 'Access Denied'});
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};
    