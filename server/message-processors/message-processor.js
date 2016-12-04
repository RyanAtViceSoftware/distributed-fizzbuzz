const {processFizzBuzz} = require('./fizz-buzz-processor');
const {MessageTypes, Message} = require('../../common/messages');

function processMessage(data) {
  const message = getMessage(data);

  if (!message) {
    throw new Error('You must specify a message.');
  }
  if (!(message instanceof Message)) {
    throw new Error('Invalid message type. message > ' + message);
  }

  if(message.type === MessageTypes.FIZZ_BUZZ) {
    // TODO: a new type would make sense here but reusing
    // what I have to save time.
    return new Message({
      type: message.type,
      value: processFizzBuzz(message.value)
    });
  }

  throw new Error('Invalid message type. message > ' + message);
}

// TODO: There is a better place for this...
function getMessage(data) {
  const dataAsString = data.toString();
  try {
    return new Message(JSON.parse(dataAsString));
  } catch (err) {
    throw new Error('Invalid message format:' + err + '. Data >' + data);
  }
}

module.exports = {
  processMessage
}