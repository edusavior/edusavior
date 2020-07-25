'use strict';
/**
 * in this module you will find all the routes for our project
 *  @module router
 * 
 */
const express = require('express');
const users = require('../../auth/models/users/user-model.js');
const router = express.Router();
const courses = require('../models/couses/courses-model.js');
const quiz_model = require('../models/quiz/quiz-model.js');
// const question = require('../models/q_and_answer/questions-model.js');
const bearerAuth = require('../../auth/middlewaare/bearer-auth.js');
const acl = require('../../auth/middlewaare/acl.js');




//routes

router.get('/allCourses', bearerAuth, allCoursesHandler);
router.get('/course/:subject', bearerAuth, getCoursesHandler);
router.post('/addCourse', bearerAuth, acl('addcourse'), addCourseHandler);
router.delete('/deleteCourse/:id', bearerAuth, deleteCourseHandler);
router.post('/addCoursetodashboard/:id', bearerAuth, addCoursetodashboardHandler);
router.get('/getCoursetodashboard', bearerAuth, getCoursetodashboardHandler);
router.delete('/deleteCoursetodashboard/:id', bearerAuth, deleteCoursetodashboardHandler);
router.get('/getuserinfo', bearerAuth, getuserinfoHandler);
router.put('/updateuserinfo/:id', bearerAuth, updateUserInfoHandler);
router.post('/questions', bearerAuth, acl('addQuiz'), questionsHandler);
// router.post('/find', bearerAuth, chatValidation);


//routes handlers



/**
   * for /allCourses
   * function to get all the courses from the data base
 * @method allCoursesHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
async function allCoursesHandler(req,res){

  const allCourses = await  courses.get();
  res.json({allCourses});

}
/**
   * for /addCourse
   * function to add course if the role is instructor
 * @method allCoursesHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
async function addCourseHandler(req,res){


  try {
    const data = await courses.create(req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
}

/**
   * for /addCoursetodashboard
   * function to add course to the dashboard 
 * @method addCoursetodashboardHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
async function addCoursetodashboardHandler(req,res){

  try {
    const user = await users.get({ username: req.user.username });
    const oneCourse = await courses.get({ _id: req.params.id });
    user[0].courses.push(oneCourse[0]);
    const data = await users.update(user[0]._id, user[0]);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
}

/**
   * for /getuserinfo
   * function to show the user information in profile page
 * @method getuserinfoHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
async function getuserinfoHandler(req,res){



  try {
    const user = await users.get({ username: req.user.username });
    res.json({ user });
  } catch (error) {
    console.error(error);
  }
}


/**
   * for /getCoursetodashboard
   * function to get all the user  courses and show it in his/here dashboard
 * @method getCoursetodashboardHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
async function getCoursetodashboardHandler(req,res){


  try {
    const user = await users.get({ username: req.user.username });
    const courses = user[0].courses;
    res.json({ courses });
  } catch (error) {
    console.error(error);
  }
}

/**
 * for /course/:subject
 * function to get all the courses based on the subject
 * @method getCoursesHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
async function getCoursesHandler(req,res){



  try {
    const course = await courses.get({ subject: req.params.subject });
    res.json({ course });
  } catch (error) {
    console.error(error);
  }
}

/**
   * for /updateuserinfo/:id
   * function to update user information
 * @method updateUserInfoHandler
 * @param {Object} req - request 
 * @param {Object} res -response 
 */
async function updateUserInfoHandler(req,res){
  const updatedUser = await users.update(req.params.id , req.body);


  res.json(updatedUser);
}

async function questionsHandler(req, res) {
  try {
    let obj = {
      description: req.body.description,
      alternatives: [
        {
          text: req.body.a1,
        },
        {
          text: req.body.a2,
        },
        {
          text: req.body.a3,
        },
        {
          text: req.body.a4,
        },
      ],
    };
    obj.alternatives.forEach((val, idx) => {
      if (req.body.correctAnswer == idx + 1) {
        val.isCorrect = true;
      }
    });
    const question = await quiz_model.create(
      obj,
    );
    return res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ 'error': error });
  }
  // async function chatValidation(req, res) {
  //   try {
  //     let findUser = mainSchema.generateToken(req.data.username);
  //     console.log('user', req.data.username);
  //     res.status(200).json({ 'user': findUser });

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

}
async function deleteCourseHandler(req,res){
  console.log('req.params._id' , req.params.id);
  try {
    await courses.delete(req.params.id);
    res.json({ status : 'item deleted' });
  } catch (error) {
    console.error(error);
  }
}

async function deleteCoursetodashboardHandler(req,res){
  // console.log('user' , user);
  // console.log('req.params.id' , req.params.id);
  try {
    const user = await users.get({ username: req.user.username });
    let arr = user[0].courses.filter(i=> req.params.id != i._id);
    user[0].courses = arr;
    // console.log('user' , user[0]);
    const data = await users.update(user[0]._id, user[0]);
    res.json({data });
  } catch (error) {
    console.error(error);
  }
}
// {
//   "username" : "hammad", 
//   "password" :"1234",
//   "email" : "hammad@gmail.com",
// "role" : "instructor"
// }

module.exports = router;