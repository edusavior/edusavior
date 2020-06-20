'use strict';
const express = require('express');
const oauth = require('../middlewaare/oauth.js');


const router = express.Router();


router.get('/oauth', oauth,oauthentication);

function oauthentication(req,res){
  // console.log('ooooooooauth',req.token);
  res.json(req.user);

  // res.json({ token: req.token  , user:req.user});

}

module.exports = router;