'use strict';
const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const base64 = require('base-64');

let token;
let course;
let id;
// 200 
describe('signin/up',()=>{

  it('POST to /signup to create a new user', ()=>{
    let obj = {'username': 'reham', 'password': '1234','email':'rehamalsobh96@gmail.com','role':'student'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        expect(result.status).toEqual(200);
        expect(typeof result.body.token).toEqual('string');

      });
      
  });
  it('POST to /signin ', ()=>{
    let obj = {'username': 'reham', 'password': '1234'};
    
    let header={
      headers:{
        'authorization':'reham:1234',
      },
    };
    let header3=base64.encode(header.headers.authorization);

    return mockRequest.post('/signin').set({'authorization':`Basic ${header3}`})
      .send(obj)
      .then(data=>{
        id =data.body.user._id;
        expect(data.status).toEqual(200);
        expect(typeof data.body.token).toEqual('string');
        expect(data.body.user.username).toEqual(obj.username);

      });
      
  });
  it('catch error with same body send in signup ', ()=>{
    let obj = {'username': 'reham', 'password': '1234','email':'rehamalsobh96@gmail.com','role':'student'};

    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('nnnnnnnnnnnnnnnnnn',result.body);
        expect(result.status).toEqual(500);
        // expect(result.body).toEqual('user already exists');

  
      });
  });
 
});

describe('sever', () => {

  it('should respond with 200 and add course  on /addCoursetodashboard', () => {
    let obj = {'username': 'osama', 'password': '1234','email':'rehamalsobh96@gmail.com','role':'instructor'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        token=result.body.token;
        course = {'course_name': 'maths', 'subject': 'math','instructor':'reham','description':'diff','literature_time':'12-1pm'};

        return mockRequest.post('/addCoursetodashboard').set({ 'authorization':`Bearer ${token}`})
          .send(course)  
          .then((results) => {
            expect(results.status).toBe(200);

            Object.keys(course).forEach((key) => {
              expect(results.body.courses[0][key]).toEqual(course[key]);
            });
          });
      });
    
  });

  it('should respond to a get request to /allCourses', ()=>{
    let course = {'course_name': 'arabic', 'subject': 'arabic','instructor':'eman','description':'litreture','literature_time':'12-2pm'};
    return mockRequest.post('/addCourse').set({ 'authorization':`Bearer ${token}`})
      .send(course)
      .then(data => {
        return mockRequest.get('/allCourses').set({ 'authorization':`Bearer ${token}`})
          .then(result=> {          
            Object.keys(course).forEach((key) => {
              expect(result.body.allCourses[0][key]).toEqual(course[key]);
            });
          });

      });
  });
  it('should respond to a get profile info to /getuserinfo', ()=>{
    return mockRequest.get('/getuserinfo').set({ 'authorization':`Bearer ${token}`})
      .then(data=>{
        expect(data.body.user[0].username).toEqual('osama');
        expect(data.body.user[0].role).toEqual('instructor');
        expect(data.body.user[0].email).toEqual('rehamalsobh96@gmail.com');

      });
  });
  it('should respond to a get request to /getCoursetodashboard', ()=>{
    return mockRequest.get('/getCoursetodashboard').set({ 'authorization':`Bearer ${token}`})
      .then(result=> {     
        Object.keys(course).forEach((key) => {
          expect(result.body.courses[0][key]).toEqual(course[key]);
        });
      });
  });

  it('should respond to a put request to /updateuserinfo/:id', ()=>{
    let updateObj =  {'username': 'nada', 'password': '1234','email':'rehamalsobh96@gmail.com','role':'student'};
    return mockRequest.put(`/updateuserinfo/${id}`).set({ 'authorization':`Bearer ${token}`})
      .send(updateObj )
      .then(results => {
        Object.keys(updateObj).forEach((key) => {
          expect(results.body[key]).toEqual(updateObj[key]);
        });
      });
           
  });

  it('should respond to a get request to /course/:subject', ()=>{
    let course = {'course_name': 'arabic', 'subject': 'arabic','instructor':'eman','description':'litreture','literature_time':'12-2pm'};
    return mockRequest.post('/addCourse').set({ 'authorization':`Bearer ${token}`})
      .send(course)
      .then(data => {
        return mockRequest.get(`/course/${data.body.subject}`).set({ 'authorization':`Bearer ${token}`})
          .then(result=> {    
            Object.keys(course).forEach((key) => {
              expect(result.body.course[0][key]).toEqual(course[key]);
            });
          });

      });
  });
});
      