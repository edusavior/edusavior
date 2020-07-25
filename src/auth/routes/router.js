'use strict';
/**
 * in this module you will find all the auth routes for our project
 *  @module  authrouter
 * 
 */

const express = require('express');
const superagent=require('superagent');

const users = require('../models/users/user-model.js');
const oauth = require('../middlewaare/oauth.js');
const basicAuth = require('../middlewaare/basic.js');
// const path = require('path');
const router = express.Router();
const linkedinOuth = require('../middlewaare/linkedIn-oauth.js');
router.post('/signup', saveHandler);

router.post('/signin', basicAuth, signinHandler);
router.get('/oauth', oauth, oauthentication);


/**
   * for /signup
   * function to save new user in database then generate token
 * @method saveHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */




router.get('/linkedIn_oauth', linkedinOuth, (req, res) => {
  res.json({ token: req.token  , user:req.user});
});






async function saveHandler (req,res,next){
  const verfiy = req.body.email;
  let url = `https://email-checker.p.rapidapi.com/verify/v1?email=${verfiy}`;
  superagent.get(url)
    .set('x-rapidapi-host','email-checker.p.rapidapi.com')
    .set('x-rapidapi-key','38d26207a5msh5bff551ba95f8b8p1d6710jsn4fe4f49bd360')
    .set('useQueryString','true')
    .then(emailData => {
      const emailSummaries = emailData.body.status;
      if( emailSummaries === 'valid'){
        savedEmail(req,res,next);
      } else{
        res.send('The mailbox doesn\'t exist.');
      }
    });
  
  
  async function savedEmail(req,res,next){

    try{
      const user = await users.save(req.body);
      const token = users.generateToken(user);
      res.json({ token });
      
    }catch(err){
      console.error(err);
      next('server rrrs');
      // res.status(403).send('user already exists');
    }
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



router.get('/linkedIn_oauth', linkedinOuth, (req, res) => {
  res.json({ token: req.token  , user:req.user});
});






// async function saveHandler (req,res,next){
//   const verfiy = req.body.email;
//   let url = `https://email-checker.p.rapidapi.com/verify/v1?email=${verfiy}`;
//   superagent.get(url)
//     .set('x-rapidapi-host','email-checker.p.rapidapi.com')
//     .set('x-rapidapi-key','38d26207a5msh5bff551ba95f8b8p1d6710jsn4fe4f49bd360')
//     .set('useQueryString','true')
//     .then(emailData => {
//       const emailSummaries = emailData.body.status;
//       if( emailSummaries === 'valid'){
//         savedEmail(req,res,next);
//       } else{
//         res.send('The mailbox doesn\'t exist.');
//       }
//     });
  
  
  // async function savedEmail(req,res,next){

  //   try{
  //     const user = await users.save(req.body);
  //     const token = users.generateToken(user);
  //     res.json({ token });
      
  //   }catch(err){
  //     console.error(err);
  //     next('server rrrs');
  //     // res.status(403).send('user already exists');
  //   }
  // }

 
    
// }
/**
 * for /signin
   *  basicAuth will add token to the req
 * @method signinHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
// function signinHandler (req, res)  {
//   res.json({ token: req.token , user: req.user });
// }

/**
   * for /oauth
   * oauth will add token to the req
 * @method oauthentication
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
function oauthentication(req,res){


  res.json({ token: req.token, user: req.user });

}
module.exports = router;



// {
//   "course_name" : "E 201", 
//   "subject" :"English",
//   "instructor" : "hammad",
// "description" : "good staff",
// "literature_time" : "10:00 AM"
// }