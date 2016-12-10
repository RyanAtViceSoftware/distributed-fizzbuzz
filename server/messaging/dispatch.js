'use strict'

const {Message} = require('../../common/messages');
const {handlers} = require('./message-handlers');

function dispatch(data, next) {
  let message = null;

  getMessage(data, (err, result) => {
    if (err) {
      next(new Error('Unable to get message from data. Error >' + err));
    }

    message = result;
  });

  if (!message) {
    next(new Error('You must specify a message.'));
  }

  if (!(message instanceof Message)) {
    next(new Error('Invalid message type. message > ' + message));
  }

  for(let i=0;i<handlers.length;i++) {
    let handler = handlers[i];

    handler.process(message, err => {
      if(err) {
        next('Error processing message. (message, err) > ', message, err);
      }
    });
  }
}

// TODO: There is a better place for this...
function getMessage(data, next) {
  const dataAsString = data.toString();
  try {
    next(null, new Message(JSON.parse(dataAsString)));
  } catch (err) {
    next(new Error('Invalid message format:' + err + '. Data >' + data));
  }
}

module.exports = {
  dispatch
}