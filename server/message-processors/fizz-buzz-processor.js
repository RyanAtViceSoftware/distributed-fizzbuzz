const {info} = require('../../common/infrastructure/logger');
const {MessageTypes, Message} = require('../../common/messages');

// Todo: find a better Template Method pattern for ES6 classes
// and then reorganize this code into separate files.
class MessageProcessor {
  constructor(processLogic, canProcessLogic) {
    // Todo: add type checks and empty checks
    if(!processLogic) {
      throw new Error('processLogic is required.');
    }

    // Todo: add type checks
    if(!canProcessLogic) {
      throw new Error('canProcessLogic is required');
    }

    this._processLogic = processLogic;
    this._canProcessLogic = canProcessLogic;
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

    return this._canProcessLogic(message);
  }
}

const fizzBuzzRules = [
  (val) => (val % 3 === 0) ? "Fizz" : null,
  (val) => (val % 5 === 0) ? "Buzz" : null
];

const processFizzBuzz = ({value}) => {
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

const canProcess = message => message.type === MessageTypes.FIZZ_BUZZ

const FizzBuzzProcessor = new MessageProcessor(processFizzBuzz, canProcess);

module.exports = {
  FizzBuzzProcessor
}