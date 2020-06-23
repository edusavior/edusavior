const express = require('express');
require('express-async-errors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectRoute = require('./routes/posts');


//database connection
require('.');

//Models
require('./model/Post');
require('./model/Comment');

//Middleware
app.use(bodyParser.json());

//Routes
app.use('/posts', connectRoute);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the main route');
});

// check comment



module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listining on ${PORT}`));
  },
};
