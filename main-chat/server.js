const express = require('express');
// const { connected } = require('process');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const users = [];
const connections = [];

server.listen(process.env.PORT || 4000);
console.log('server running ..');


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    // Disconnect, to till us how mant still connected

    socket.on('disconnect', function (data) {
        // step 2 ,when the user disconnect we wanna the user be down
        users.splice(users.indexOf(socket.username), 1);
        updateUsername();

        // step 1
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);

    });

    // Send Message
    socket.on('send message', function (data) {
        // console.log('username', socket.username);
        io.sockets.emit('new message', { msg: data, user: socket.username });
    });

    // New User

    socket.on('new user', function (data, callback) {

        callback(true);
        socket.username = data;
        // i should write here validation
        users.push(socket.username);
        updateUsername();
    });

    function updateUsername() {
        io.sockets.emit('get users', users);
    }

});