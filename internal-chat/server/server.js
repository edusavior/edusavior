const express = require('express');
const app = express();


app.use(express.json());


const io = require('socket.io')(3000);

require('./apps/edu.js')(io);

io.on('connection', (socket) => {
  console.log(`Welcome to the Global Connection ${socket.id}`);
  socket.on('error', (payload) => {
    io.emit('error', payload);
  });
  socket.on('action', (payload) => {
    io.emit('action', payload);
  });
});

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listining on ${PORT}`));
  },
};