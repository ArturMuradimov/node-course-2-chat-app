var expect = require('expect');

var {generateMessage} = require('./message');

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
