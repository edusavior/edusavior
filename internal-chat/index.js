'use strict';

// require('dotenv').config();



// const mongoose = require('mongoose');
const server = require('./server');

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

server.start(3000);