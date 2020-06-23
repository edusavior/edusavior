'use strict';
/**
 * Google oauth 
 *  @module GoogleOauth
 * 
 */
require('dotenv').config();
const superagent = require('superagent');
const users = require('../models/users/user-model.js');
const tokenServerUrl = 'https://oauth2.googleapis.com/token';
const remoteAPI = 'https://www.googleapis.com/oauth2/v1/userinfo';

const CLIENT_ID = process.env.CLIENT_ID;

const CLIENT_SECRET = process.env.CLIENT_SECRET;

const API_SERVER = process.env.API_SERVER;
/**
 *  this is a middleware we can put user and token on the req obj
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */
module.exports = async (req, res, next) => {
  //2 & 3
  try {
  //the code is coming back from the popup
    const code = req.query.code;
    console.log('__THE CODE__', code);
    // this will call the function and will get back the Token from GH
    const remoteToken = await exchangeCodeForToken(code);
    console.log('The TOKEN', remoteToken);
    // get the user obj from GH by sending the token from Google
    const remoteUser = await getRemoteUserInfo(remoteToken);
    // console.log('Goodle USER', remoteUser);
    // sending the GH user and save it to db get back local user + token
    const [user, token] = await getUser(remoteUser);
    // console.log('LOCAL USER', user);
    // since this is a middleware we can put user and token on the req obj
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err.message);
  }
};

/**
 * after the popup send the code to google for Token
 * exchangeCodeForToken function will take this code then get back the Token from Google
 * @param {string} code - input 
 * @returns {string} access_token
 */
async function exchangeCodeForToken(code) {
  
  const tokenResponse = await superagent.post(tokenServerUrl).send({
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
  });

  const access_token = tokenResponse.body.access_token;

  return access_token;
}
/**
 * getRemoteUserInfo function will get the remote user from Google by using the Token that came from Google
 * 
 * @param {string} token - input 
 * @returns {string} user
 */
async function getRemoteUserInfo(token) {
  let userResponse = await superagent
    .get(remoteAPI)
    .set('Authorization', `Bearer ${token}`);

  let user = userResponse.body;
  return user;
}

/**
 * getUser function  send the Google user and save it to db get back local user + token
 * @param {string} token - input 
 * @returns {string} user and token
 */
async function getUser(remoteUser) {
  console.log('remoteUser' , remoteUser);
  
  const userRecord = {
    username: remoteUser.name,
    password: 'Rehaaaam',
    email:remoteUser.email, 
  };
  const user = await users.save(userRecord);
  let token = users.generateToken(user);
  return [user, token];
}