const express = require('express');
const router = require('./edu-server/routes/router.js');
const router_auth = require('./auth/routes/router.js');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


const notFoundHandler = require('../middleware/404.js');
const errorHandler = require('../middleware/500.js');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


// app.use('/api/v1', router);
app.use('/', router_auth);
app.use('/', router);



app.use('*', notFoundHandler);
// app.use(errorHandler);
module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`),
    );
  },
};