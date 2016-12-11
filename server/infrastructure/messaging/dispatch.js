'use strict'

const {Message} = require('../../../common/messages/index');
const {handlers} = require('../../core/message-handlers/index');
const buildMessage = require('./build-message');

function dispatch(data, next) {
  let message = null;

  buildMessage(data, (err, result) => {
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

module.exports = {
  dispatch
}