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

* sending
    - *body* : 
        ```
        {
        "username":"Reham",
            "password":"9",
            "role":"instructor",
            "email":"rehamalsobh96@gmail.com"
        }
        ```

    - *headers*:.....

* response
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiYWRkY291cnNlIl0sImlhdCI6MTU5Mjk4Mjg0Mn0.qWs9SfK3lA6BXNGjWeEnhATugj4gO0tg994jNwqdGTg"
    }
    ```

#### post /login
Allows existing users to log in and returns a unique token that the user must then pass to reach the other endpoints.

* sending
    - *body* : ---

    - *headers*: 
        - basic Auth 
            - username : Reham 
            - password : 9

* response
    ```
    {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiYWRkY291cnNlIl0sImlhdCI6MTU5Mjk4MzA1Mn0.uCTIhz9HxwHmwXpuZl69yhCq3ta8q-nAkJVMa0AdN14",
        "user": {
            "role": "instructor",
            "courses": [],
            "questions": [],
            "_id": "5ef2fd39c41c2b024c545b92",
            "username": "Reham",
            "password": "$2a$05$Cm9qZOe2fxtYRpyeQz7tJuTmnLUJO8jQ6L1OspGwhHIYJGNfg6PUm",
            "email": "rehamalsobh96@gmail.com",
            "__v": 0
        }
    }
    ```

#### GET /oauth
Creates a new user profile and returns a unique token that the user must then pass to reach the other endpoints.

**Google**
  - http://localhost:3000/
  * Response

                ```
            {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0gQUwtU29iaCIsInJvbGUiOiJzdHVkZW50IiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiXSwiaWF0IjoxNTkyOTg0NjEzfQ.17CBvzfIH4L3pRUmXRzSW2o76-EUCpXWZdPIOL8kOl4",
        "user": {
        "role": "student",
        "courses": [],
        "questions": [],
        "_id": "5ef30425ae988c077bc340fd",
        "username": "Reham AL-Sobh",
        "password": "$2a$05$zwmBvcE6Jum/yo9ZgvHABeY8Vi2AdIg/rcgLq8ql8j.JyckR5HndK",
        "email": "rehamalsobh96@gmail.com",
        "__v": 0
        }
            }
        ```

**linkedIn**
  - http://localhost:3000/
  * Response

            ```
            {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0gQUwtU29iaCIsInJvbGUiOiJzdHVkZW50IiwiY2FwYWJpbGl0aWVzIjpbInJlYWQiXSwiaWF0IjoxNTkyOTg1NTcwfQ.yKrwUzMbgS8yy6fg5CQhw5w3T1fJiMiLOIPfe4K20Qw",
        "user": {
        "role": "student",
        "courses": [],
        "questions": [],
        "_id": "5ef307e242c2c50a6433da38",
        "username": "Reham AL-Sobh",
        "password": "$2a$05$b.NljSfihQc.uEses31mkuu/2xjO6rtJx6xPw2ZA3Q.hmOwahNQm2",
        "email": "email@gmail.com",
        "__v": 0
        }
            }
            ```
  
### Courses Schema

The courses schema holds the following information:

- A required  course_name string.
- A required  subject string.
- A required instructor string.
- A required description string.
- A required literature_time string.

#### GET /allCourses
* sending
    - *headers*: 
        - bearer Auth 
        {
        token : ` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiYWRkY291cnNlIl0sImlhdCI6MTU5Mjk4NTc5MH0.VdhgZx3f15MQCIeJ1QeTfC10YcJ9elhOGq2OvmHHqvo`
        }
    

* response

        ```
        {
        "allCourses": [
            {
                "quiz": [],
                "_id": "5eee95398a4cb369de96258d",
                "course_name": "maths",
                "subject": "math",
                "instructor": "reham",
                "description": "maaaath",
                "literature_time": "1-2",
                "__v": 0
            },
            {
                "quiz": [],
                "_id": "5eeef71fbdacaf14fd692d2c",
                "course_name": "maaaaaaaaaaaaaaaaaaths",
                "subject": "math",
                "instructor": "reham",
                "description": "maaaath",
                "literature_time": "1-2",
                "__v": 0
            }
        ]
        }
        ```

#### GET /course/:subject 
* sending
    - *body* : ---

    - *headers*: 
        - bearer Auth 
                {
                token :  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiYWRkY291cnNlIl0sImlhdCI6MTU5Mjk4NTc5MH0.VdhgZx3f15MQCIeJ1QeTfC10YcJ9elhOGq2OvmHHqvo`
                }
            
* response
  - subject : html

        ```
        {  "course": 
            [
                {
                    "quiz": [],
                    "_id": "5ef30b9b42c2c50a6433da3a",
                    "course_name": "html",
                    "subject": "html",
                    "instructor": "Reham",
                    "description": "teach from tha basic up to heigh level ",
                    "literature_time": "9-11 am",
                    "__v": 0
                }
            ]
        }
            ```
#### POST /addCourse
* sending
   - *body* : 
        ```
        {
            "course_name":"html",
            "subject":"html",
            "instructor":"Reham",
            "description" :"teach from tha basic up to heigh level ",
            "literature_time" : "9-11 am",
            "quiz" : []
        }
        ```
    - *headers*: 
        - bearer Auth 
                {
                token : ` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiYWRkY291cnNlIl0sImlhdCI6MTU5Mjk4NTc5MH0.VdhgZx3f15MQCIeJ1QeTfC10YcJ9elhOGq2OvmHHqvo`
                }
            
           

* response
  ```
        {
           "quiz": [],
                "_id": "5ef30b9b42c2c50a6433da3a",
                "course_name": "html",
                "subject": "html",
                "instructor": "Reham",
                "description": "teach from tha basic up to heigh level ",
                "literature_time": "9-11 am",
                "__v": 0
        }
        ```
       
#### POST /addCoursetodashboard
* sending
   - *body* :
   ```
        {
           "course_name":"html",
        "subject":"html",
        "instructor":"Reham",
        "description" :"teach from tha basic up to heigh level ",
        "literature_time" : "9-11 am",
        "quiz" : []
        }
        ``` 
        
    - *headers*: 
        - bearer Auth 
                 {
                token : ` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiYWRkY291cnNlIl0sImlhdCI6MTU5Mjk4NTc5MH0.VdhgZx3f15MQCIeJ1QeTfC10YcJ9elhOGq2OvmHHqvo`
                }

* response
    ```
            {"role": "instructor",
                "courses": [
                    {
                        "course_name": "html",
                        "subject": "html",
                        "instructor": "Reham",
                        "description": "teach from tha basic up to heigh level ",
                        "literature_time": "9-11 am",
                        "quiz": []
                    }
                ],
                "questions": [],
                "_id": "5ef308be42c2c50a6433da39",
                "username": "Reham",
                "password": "$2a$05$vuLosH5xYWnmwKCx4DfvX.uJ.ICvTiubBXsrGYWEW0xSVA581NY36",
                "email": "rehamalsobh96@gmail.com",
                "__v": 0
            }
            ``` 
           
#### GET /getCoursetodashboard
* sending
   - *body* : ---
 
    - *headers*: 
        - bearer Auth 
                {
                token :  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiYWRkY291cnNlIl0sImlhdCI6MTU5Mjk4NTc5MH0.VdhgZx3f15MQCIeJ1QeTfC10YcJ9elhOGq2OvmHHqvo`
                }
                
           

* response
  ```
            { "courses": [
            {
                "course_name": "html",
                "subject": "html",
                "instructor": "Reham",
                "description": "teach from tha basic up to heigh level ",
                "literature_time": "9-11 am",
                "quiz": []
            }
        ]
            }
            ```
      
#### PUT /updateuserinfo/:id
  - id : '5ef308be42c2c50a6433da39'

* sending
   - *body* : 
        ```
            {
                "username":"Reham Omar AL-Sobh",
            "password":"9",
            "role":"instructor",
            "email":"rehamalsobh96@gmail.com"
            }
            ``` 
       
    - *headers*: 
        - bearer Auth 
                {
                token :  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGdvcml0aG0iOiJSUzM4NCIsInVzZXJuYW1lIjoiUmVoYW0iLCJyb2xlIjoiaW5zdHJ1Y3RvciIsImNhcGFiaWxpdGllcyI6WyJyZWFkIiwiYWRkY291cnNlIl0sImlhdCI6MTU5Mjk4NTc5MH0.VdhgZx3f15MQCIeJ1QeTfC10YcJ9elhOGq2OvmHHqvo`
                }
                
           

* response
  ```
            {"role": "instructor",
        "courses": [
            {
                "course_name": "html",
                "subject": "html",
                "instructor": "Reham",
                "description": "teach from tha basic up to heigh level ",
                "literature_time": "9-11 am",
                "quiz": []
            }
        ],
        "questions": [],
        "_id": "5ef308be42c2c50a6433da39",
        "username": "Reham Omar AL-Sobh",
        "password": "9",
        "email": "rehamalsobh96@gmail.com",
        "__v": 0
            }
            ``` 
       

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