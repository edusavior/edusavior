
module.exports = (io) => {
  const edu = io.of('/edu'); // of => create namespace
  edu.on('connection', (socket) => {
    console.log('Welcome to the edu App!', socket.id);
    let currentRoom = '';
    //when user join a new room leave room and all the chat will only be in the new room
    socket.on('join', (room) => {
      socket.leave(currentRoom);
      socket.join(room);
      currentRoom = room;
      console.log('joined room', room);
      // io.emit seen by anyone connected to the server
      io.emit('action', `Someone joined the room: ${room}`);
      // it will goes to the sender only using the socket.id
      edu.to(`${socket.id}`).emit('joined', room);

      socket.on('message', (payload) => {
        // emitting to everyone in the room including the sender
        edu.to(currentRoom).emit('message', payload);
      });
    });
  });
};