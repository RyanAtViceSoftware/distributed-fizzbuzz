const {Message} = require('./message');
const {MessageTypes} = require('./message-types');

class FizzBuzzMessage extends Message {
  constructor(data) {
    super(data, MessageTypes.FIZZ_BUZZ);
  }
}

module.exports = {
  FizzBuzzMessage
}