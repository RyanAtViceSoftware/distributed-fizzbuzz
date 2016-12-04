const {Message} = require('./message');
const {MessageTypes} = require('./index');

class FizzBuzzMessage extends Message {
  constructor(data) {
    super(data, MessageTypes.FIZZ_BUZZ);
  }
}

module.exports = {
  FizzBuzzMessage
}