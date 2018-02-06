var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'admin';
    var text = 'welcome to the chat app';
    var message = generateMessage(from, text);
    expect(message).toBeTruthy();
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    var from = 'admin';
    var url = 'https://www.google.com/maps?q=123.456,456.789';
    var message = generateLocationMessage(from, '123.456', '456.789');
    expect(message).toBeTruthy();
    expect(message).toMatchObject({from, url});
    expect(typeof message.createdAt).toBe('number');
  });
});
