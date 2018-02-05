var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey. This is Andrew.'
  // });
  socket.emit('createMessage', {
    to: 'jen',
    text: 'Hey. This is Andrew.'
  });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// socket.on('newEmail', function (email) {
//   console.log('new email', email);
// });

socket.on('newMessage', function (message) {
  console.log('new message', message);
});
