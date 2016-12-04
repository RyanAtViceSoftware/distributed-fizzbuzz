const {processFizzBuzz} = require('./fizz-buzz-processor');
const {Message} = require('../../common/messages/message');
const {MessageTypes} = require('../../common/messages/message-types');

function processMessage(message) {
  if (!message) {
    throw new Error('You must specify a message.');
  }
  if (!(message instanceof Message)) {
    throw new Error('Invalid message type. message > ' + message);
  }

  if(message.type === MessageTypes.FIZZ_BUZZ) {
    return processFizzBuzz(message.value);
  }

  throw new Error('Invalid message type. message > ' + message);
}

module.exports = {
  processMessage
}