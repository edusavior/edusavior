require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server');
let MONGODB_URI  ='mongodb://localhost:27017/edusavior';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.start(process.env.PORT);

