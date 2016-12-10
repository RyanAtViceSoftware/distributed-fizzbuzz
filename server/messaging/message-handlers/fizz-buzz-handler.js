'use strict'

const {info} = require('../../../common/infrastructure/logger');
const {MessageTypes, Message} = require('../../../common/messages/index');
const clients = require('../../infrastructure/clients');

// Todo: find a better Template Method pattern for ES6 classes
// and then reorganize this code into separate files.
class MessageHandler {
  constructor(processingLogic, handles) {
    // Todo: add type checks and empty checks
    if(!processingLogic) {
      throw new Error('processLogic is required.');
    }

    // Todo: add type checks
    if(!handles) {
      throw new Error('handles is required');
    }

    this._processLogic = processingLogic;
    this._handles = handles;
  }

  process(message) {
    if (!(message instanceof Message)){
      throw new Error("message must be an instance of a Message class");
    }

    info(
      'Processing message type > ' + message.type
      + ' with value > ' + message.value
    );

    return this._processLogic(message);
  }

  canProcess(message) {
    if (!(message instanceof Message)){
      throw new Error("message must be an instance of a Message class");
    }

    return this._handles.find(
      messageType => messageType === message.type
    );
  }
}

const fizzBuzzRules = [
  (val) => (val % 3 === 0) ? "Fizz" : null,
  (val) => (val % 5 === 0) ? "Buzz" : null
];

const processFizzBuzz = ({value}) => {
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
};

const handles = [MessageTypes.FIZZ_BUZZ];

const FizzBuzzHandler = new MessageHandler(processFizzBuzz, handles);

module.exports = FizzBuzzHandler;