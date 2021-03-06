var socket = io();

function scrollToBottom() {
  // selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // console.log(newMessage);
  // heights
  var clientHeight = messages.prop('clientHeight');
  // console.log('clientHeight:', clientHeight);
  var scrollTop = messages.prop('scrollTop');
  // console.log('scrollTop:', scrollTop);
  var scrollHeight = messages.prop('scrollHeight');
  // console.log('scrollHeight:', scrollHeight);
  var newMessageHeight = newMessage.innerHeight();
  // console.log('newMessageHeight:', newMessageHeight);
  var lastMessageHeight = newMessage.prev().innerHeight();
  // console.log('lastMessageHeight:', lastMessageHeight);

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    // console.log('should scroll');
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('connected to server');
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey. This is Andrew.'
  // });
  // socket.emit('createMessage', {
  //   from: 'andrew',
  //   text: 'Hey. This is Andrew.'
  // });
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
  console.log('users', users);
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

// socket.on('newEmail', function (email) {
//   console.log('new email', email);
// });

socket.on('newMessage', function (message) {
  console.log('new message', message);
  var template = jQuery('#message-template').html();
  var formattedTime = moment(message.createAt).format('h:mm a');
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);

  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  console.log('new location message', message);
  var formattedTime = moment(message.createAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
  var template = jQuery('#location-message-template').html();
  var formattedTime = moment(message.createAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    locationButton.removeAttr('disabled').text('Sending location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Sending location');
    alert('Unable to fetch location');
  });
});
