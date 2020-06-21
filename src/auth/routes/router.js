const express = require('express');

const users = require('../models/users/user-model.js');
const oauth = require('../middlewaare/oauth.js');
const basicAuth = require('../middlewaare/basic.js');

const router = express.Router();

router.post('/signup', saveHandler);

router.post('/signin', basicAuth , signinHandler);
router.get('/oauth', oauth,oauthentication);




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

function signinHandler (req, res)  {
  res.json({ token: req.token , user: req.user });
}

function oauthentication(req,res){

  res.json({ token: req.token  , user:req.user});

}
module.exports = router;