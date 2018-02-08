var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var valid = isRealString(123);
    expect(valid).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var valid = isRealString('  ');
    expect(valid).toBe(false);
  });
  it('should allow string with non-space characters', () => {
    var valid = isRealString(' qwe asd ');
    expect(valid).toBe(true);
  });
});
