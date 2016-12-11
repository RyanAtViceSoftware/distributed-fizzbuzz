'use strict'

const {info} = require('../../../common/infrastructure/logger');
const {MessageTypes} = require('../../../common/messages/index');
const clients = require('../../infrastructure/clients');
const MessageHandler = require('../../infrastructure/messaging/message-handler');

const fizzBuzzRules = [
  (val) => (val % 3 === 0) ? "Fizz" : null,
  (val) => (val % 5 === 0) ? "Buzz" : null
];

const processFizzBuzz = ({value}, next) => {
  info('processFizzBuzz - processing value: ' + value);
  let matches = [];
  let result;

  fizzBuzzRules.forEach(rule => {
    const result = rule(value)
    if (result) {
      matches.push(result);
    }
  });

  if (matches.length === 0) {
    result = value;
  } else {

    result = matches.join();
  }

  clients.broadcast(MessageTypes.FIZZ_BUZZ + ' latest result: '
    + result);

  next();
};

const handles = [MessageTypes.FIZZ_BUZZ];

const FizzBuzzHandler = new MessageHandler(processFizzBuzz, handles);

module.exports = FizzBuzzHandler;