'use strict';
const express = require('express');
const users = require('../../auth/models/users/user-model.js');
const router = express.Router();
const courses = require('../models/couses/courses-model.js');
// const question = require('../models/q_and_answer/questions-model.js');
const bearerAuth = require('../../auth/middlewaare/bearer-auth.js');
const acl = require('../../auth/middlewaare/acl.js');




//routes

router.get('/allCourses', bearerAuth ,allCoursesHandler);
router.get('/course/:subject', bearerAuth ,getCoursesHandler);
router.post('/addCourse', bearerAuth, acl('addcourse'),addCourseHandler);
router.post('/addCoursetodashboard', bearerAuth , addCoursetodashboardHandler);
router.get('/getCoursetodashboard', bearerAuth , getCoursetodashboardHandler);
router.get('/getuserinfo', bearerAuth , getuserinfoHandler);
router.put('/updateuserinfo/:id' ,bearerAuth , updateUserInfoHandler);

//routes handlers

async function allCoursesHandler(req,res){
  const allCourses = await  courses.get();
  res.json({allCourses});
}

async function addCourseHandler(req,res){
  try {
    const data = await courses.create(req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
}

async function addCoursetodashboardHandler(req,res){
  try {
    const user = await  users.get({username : req.user.username});
    user[0].courses.push(req.body);
    const data = await users.update(user[0]._id,user[0]);    
    res.json(data);
  } catch (error) {
    console.error(error);
  }
}

async function getuserinfoHandler(req,res){
  try {
    const user = await  users.get({username : req.user.username});
    res.json({user});
  } catch (error) {
    console.error(error);
  }
}


async function getCoursetodashboardHandler(req,res){
  try {
    const user = await  users.get({username : req.user.username});
    const courses = user[0].courses;
    res.json({courses});
  } catch (error) {
    console.error(error);
  }
}

async function getCoursesHandler(req,res){
  try {
    const course = await  courses.get({subject : req.params.subject});
    res.json({course});
  } catch (error) {
    console.error(error);
  }   
}

async function updateUserInfoHandler(req,res){
  const updatedUser = await users.update(req.params.id , req.body);
  res.json(updatedUser);
}

module.exports = router;