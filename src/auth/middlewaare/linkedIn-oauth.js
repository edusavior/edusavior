require('dotenv').config();
const superagent = require('superagent');
const CLIENT_ID_LN = process.env.CLIENT_ID_LN;
const CLIENT_SECRET_LN = process.env.CLIENT_SECRET_LN;
const tokenServerUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
const API_REQ = process.env.API_REQ;
const users = require('../models/users/user-model.js');


module.exports = async (req, res, next) => {
  try {
    let code = req.query.code;
    let token = await exchangeCodeForToken(code);
    let userInfo = await getUserInfo(token);
    const [user, token1] = await getUser(userInfo);
    req.user = user;
    req.token = token1;
    next();
  } catch (e) {
    console.log(e.message);
  }

};
async function exchangeCodeForToken(code) {
  try {
    let tokenResponse = await superagent.post(tokenServerUrl).set('Content-Type', 'application/x-www-form-urlencoded').send({
      code: code,
      client_id: CLIENT_ID_LN,
      client_secret: CLIENT_SECRET_LN,
      redirect_uri: 'http://localhost:3000/linkedIn_oauth',
      grant_type: 'authorization_code',
    });
    let accessToken = tokenResponse.body.access_token;
    return accessToken;
  } catch (err) {
    console.log(err.message);
  }
}

async function getUserInfo(token) {
  try {
    let user = await superagent.get(API_REQ).set(`Authorization`, `Bearer ${token}`);
    return user.body;
  }
  catch (err) { console.log(err);
  }
}

async function getUser(remoteUser) {
  console.log(remoteUser);
  
  const userRecord = {
    username: remoteUser.localizedFirstName + remoteUser.localizedLastName,
    password: 'Rehaaaam',
    email:'email@gmail.com', 
  };
  const user = await users.save(userRecord);
  let token = users.generateToken(user);
  return [user, token];
}


