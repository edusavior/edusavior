'use strict';

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'mysecret';

const  user = ['read'];
const writer = ['read', 'create'];
const editor = ['read', 'create', 'update' ];
const admin = ['read', 'create', 'update', 'delete'];

class Model {
  constructor(schema) {
    this.schema = schema;
  }
  
  async saveUser(record) {
    
    let db =await this.schema.find({ username: record.username } );
    // console.log('reeeeeeecooooooooooooooooooord',db.length);

    // console.log('d bbbbbbbb',db[0].username);
    if (db.length===0) {
      record.password = await bcrypt.hash(record.password, 5);
      const newRecord = new this.schema(record);
      return  newRecord.save();    
      
    }else{
      
      return  Promise.reject('user is exists!'); 
    
    }}
  async authenticateBasic (user, pass) {
    // console.log('useeeeeeeeeeeeeeer',user ,'paaaaaaaaaaaaaaaaaaaaaas',pass);
    let userInfo = await this.schema.find({username : user});
    // console.log('useeeeeeeeeeeeeeerinfo',userInfo);

    const valid = await bcrypt.compare(pass, userInfo[0].password);
    return valid ? userInfo: Promise.reject('wrong password');
  }

  
  capability (role){
    let capabilities;
    if (role === 'user'){
      capabilities = user;

    }else if (role === 'writer')
    {
      capabilities = writer;
      
    }else if( role === 'editor'){
      capabilities= editor;

    }else if (role === 'admin'){
      capabilities=admin;
    }
    return capabilities;
  }
  generateToken (user) {
    console.log('user iin generate token',user);
    console.log('user.username iin generate tooooooken',user.username);

    if(user.username){

      let capabilities= this.capability(user.role);
      const userData = { username: user.username,capabilities: capabilities };
      const token = jwt.sign(userData, SECRET,{expiresIn:60*15});//{expiresIn:60*15 to convert 15 min to second}
      console.log('111token in generat',token);
      return token;
    }else{
      let capabilities= this.capability(user[0].role);
      const userData = { username: user[0].username,capabilities: capabilities };
      const token = jwt.sign(userData, SECRET,{expiresIn:60*15});
      console.log('222token in generat',token);

      return token;
    }
  }


  
  async authenticateToken (token) {
    console.log('ttttttttttttoken',token);
    // akjsndlaksnd.34naliendiasnd.3nksabndfw334ng
    try {
      const tokenObject = await jwt.verify(token, SECRET);
      console.log('toooooooookenobject',tokenObject);
      // tokenObject = {username:"mahmoud",iat:91223238}
      
      if (tokenObject.username) {
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
  
  async list() {
    // console.log('liiiiiiiiiiiist',await this.schema.find({ }));

    return await this.schema.find({ });

  }
}
  
module.exports = Model;