const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'User1',
      room: 'CourseA'
    }, {
      id: '2',
      name: 'User2',
      room: 'CourseB'
    }, {
      id: '3',
      name: 'User3',
      room: 'CourseA'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for CourseA', () => {
    var userList = users.getUserList('CourseA');
    expect(userList).toEqual(['User1', 'User3']);
  });
  it('should return names for CourseB', () => {
    var userList = users.getUserList('CourseB');
    expect(userList).toEqual(['User2']);
  });

  it('should remove user', () => {
    var user = users.removeUser('2');
    expect(user).toEqual({
      id: '2',
      name: 'User2',
      room: 'CourseB'
    });
    user = users.getUser('2');
    expect(user).toBeFalsy();
  });

  it('should not remove user', () => {
    var user = users.removeUser('4');
    expect(user).toBeFalsy();
  });

  it('should find user', () => {
    var user = users.getUser('3');
    expect(user).toEqual({
      id: '3',
      name: 'User3',
      room: 'CourseA'
    });
  });

  it('should not find user', () => {
    var user = users.getUser('0');
    expect(user).toBeFalsy();
  });
});
