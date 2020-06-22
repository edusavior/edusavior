'use strict';
/**
 *  @module notFoundError
 * 
 */

/**
 * this function will send a JSON Formatted 404 Response
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */
function notFoundHandler(req,res,next){
  res.status(404);
  res.statusMessage = 'Recource Not Found :(';
  res.json({error: 'not Found'});
}
module.exports = notFoundHandler;