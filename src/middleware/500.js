'use strict';
/**
 * 
 * @module errorHandler
 * 
 */

/**
 * this function will send a JSON Formatted 500 Response
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */
function errorHandler(err,req,res,next){
  res.status(500);
  res.statusMessage = 'Server Error :(';
  res.json({error: 'Server error :('});
}
module.exports = errorHandler;