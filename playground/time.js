var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// date.add(1, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

var date = moment().hour(10).minute(35);
console.log(date.format('HH:mm a'));
date = moment().hour(6).minute(1);
console.log(date.format('H:mm a'));

var createDate = 1234;
date = moment(createDate);
console.log(date.format('h:mm a'));

console.log(moment().valueOf());
