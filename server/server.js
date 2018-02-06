const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey. What is going on.',
  //   createdAt: 123
  // });
  // socket.emit('newMessage', {
  //   from: 'mike',
  //   text: 'Hey. What is going on.',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`server up on port ${port}`);
});
