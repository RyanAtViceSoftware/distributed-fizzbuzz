const {Message} = require('../../common/messages');

// TODO: Refactor so that you are using required to bring in all MessageProcessors
// ex: import * as MessageProcessors from './processors'
const {FizzBuzzProcessor} = require('./fizz-buzz-processor');
const processors = [FizzBuzzProcessor];

function processMessage(data) {
  const message = getMessage(data);

  if (!message) {
    throw new Error('You must specify a message.');
  }
  if (!(message instanceof Message)) {
    throw new Error('Invalid message type. message > ' + message);
  }

  for(let i=0;i<processors.length;i++) {
    let processor = processors[i];
    if(processor.canProcess(message)) {
      // TODO: a new type would make sense here but reusing
      // what I have to save time.
      return new Message({
        type: message.type,
        value: processor.process(message)
      });
    }
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