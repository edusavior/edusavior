'use strict';
/**
 * in this module you will find all the auth routes for our project
 *  @module  authrouter
 * 
 */

const express = require('express');

const users = require('../models/users/user-model.js');
const oauth = require('../middlewaare/oauth.js');
const basicAuth = require('../middlewaare/basic.js');

const router = express.Router();

router.post('/signup', saveHandler);

router.post('/signin', basicAuth , signinHandler);
router.get('/oauth', oauth,oauthentication);


/**
   * for /signup
   * function to save new user in database then generate token
 * @method saveHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */

async function saveHandler (req,res){
  try{
    const user = await users.save(req.body);
    const token = users.generateToken(user);
    res.json({ token });
  }catch(err){
    console.error(err);
    
    res.status(403).send('user already exists');
  }
    
}
/**
 * for /signin
   *  basicAuth will add token to the req
 * @method signinHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
function signinHandler (req, res)  {
  res.json({ token: req.token , user: req.user });
}

/**
   * for /oauth
   * oauth will add token to the req
 * @method oauthentication
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
function oauthentication(req,res){

  res.json({ token: req.token  , user:req.user});

}
module.exports = router;