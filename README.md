## Welcome to our website :)

# Project name : Edusavior

## Team Members :
  - 1. Amal Almomani
  - 2. Osama Mousa 
  - 3. Reham Al-Sobh
  - 4. Hammad Ali

## Description for the project:
  
  - What is edusavior ? It's a website that helps (students) to select any course that interesting about it. And the student has the ability to add it to his/her dashboard, these courses can be attended remotely using video stream.

  - Also, you can sign on this website as a member of the instructional team so you have the ability to add your own courses and assignments that related to that course and the student can upload their answer.

  - Also, the members can communicate with each other.

  - finally, there are alots of information about the flow and the functionality for our website in our UML and Wireframe.

## File system
![](./assest/filesystem.png)

## Geting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

### Deploying With

1. Get code
- `git clone https://github.com/edusavior/edusavior.git`

2. Get dependencies
- `npm i dotenv base-64 bcryptjs body-parser cors debug devcert dotenv express googleapis jsonwebtoken mongoose morgan node-fetch superagent `
- `npm i -D eslint jest jsdoc`

3. create .env file 

  - MONGODB_URI=mongodb://localhost:27017/edusavior
  - CLIENT_ID => for google app
  - CLIENT_SECRET => for google app 
  - API_SERVER=http://localhost:3000/oauth => redirect url
  - CLIENT_ID_LN => for linkedin app
  - CLIENT_SECRET_LN => for linked in app
  - API_REQ=https://api.linkedin.com/v2/me

- if you need any extra information visit (google & linkedIn) for developers  and read documentaion .

4. Start Node Server
 `nodemon`
 `node index.js`

## Schema 

![](./assest/UntitledDiagram.png)

### User Schema

The user schema holds the following information:

- A required and unique username string.
- A required and unique email string.
- A required password string.
- A required role string.

 
#### POST /signup
Creates a new user profile and returns a unique token that the user must then pass to reach the other endpoints.

#### post /login
Allows existing users to log in and returns a unique token that the user must then pass to reach the other endpoints.

#### GET /oauth
Creates a new user profile and returns a unique token that the user must then pass to reach the other endpoints.


### Courses Schema

The courses schema holds the following information:

- A required  course_name string.
- A required  subject string.
- A required instructor string.
- A required description string.
- A required literature_time string.

#### GET /allCourses;
#### GET /course/:subject;
#### POST /addCourse;
#### POST /addCoursetodashboard;
#### GET /getCoursetodashboard;
#### GET /getuserinfo;
#### PUT /updateuserinfo;
#### POST /questions;

## Testing
Testing is run through jest. To test, run

npm run jest
npm test

## UML 
![](./assest/Untitled(3).png)


## Wireframe & User Stories
[Wireframe & User Stories](https://drive.google.com/file/d/128ExiZGZSSolgXec86qYTK5RtEidOG5o/view?usp=sharing)


## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Built With

1. Node.js
2. Heroku
3. Mongo
4. Swagger

**Special thanks to all of the Code Fellows staff**