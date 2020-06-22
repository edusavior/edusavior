'use strict';
/**
 *  @module acl
 * 
 */

/**
 *  expecting the bearerAuth middleware to add the user on the req
 * check if this capability allowed to the user or not 
 * @param {Object} req -  req.user 
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
    