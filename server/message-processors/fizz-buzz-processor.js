const {info} = require('../../common/infrastructure/logger');

const fizzBuzzRules = [
  (val) => (val % 3 === 0) ? "Fizz" : null,
  (val) => (val % 5 === 0) ? "Buzz" : null
];

const processFizzBuzz = (value) => {
  info('processFizzBuzz - processing value: ' + value);
  let matches = [];

  fizzBuzzRules.forEach(rule => {
    const result = rule(value)
    if (result) {
      matches.push(result);
    }
  });

  if (matches.length === 0) {
    return value;
  } else {
    return matches.join();
  }
};

module.exports = {
  processFizzBuzz
}