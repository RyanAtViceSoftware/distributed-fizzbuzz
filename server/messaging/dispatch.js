'use strict'

const {Message} = require('../../common/messages');
const {handlers} = require('./message-handlers');

// TODO: Refactor so that you are using required to bring in all MessageProcessors
// ex: import * as MessageProcessors from './processors'
const {FizzBuzzHandler} = require('./message-handlers/fizz-buzz-handler');
const processors = [FizzBuzzHandler];

function dispatch(data) {
  const message = getMessage(data);

  if (!message) {
    throw new Error('You must specify a message.');
  }
  if (!(message instanceof Message)) {
    throw new Error('Invalid message type. message > ' + message);
  }

  for(let i=0;i<handlers.length;i++) {
    let handler = handlers[i];
    if(handler.canProcess(message)) {
      handler.process(message);
    }
  }
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
  dispatch
}