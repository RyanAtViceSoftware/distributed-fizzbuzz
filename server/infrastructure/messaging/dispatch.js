'use strict'

const {Message} = require('../../../common/messages/index');
const {handlers} = require('../../core/message-handlers/index');
const {EventEmitter} = require("events");
const util = require("util");

var dispatch = function(data, next) {
  EventEmitter.call(this);

  let message = null;

  this.on('buildMessage', buildMessage);
  this.on('validateMessage', validateMessage);
  this.on('processMessage', processMessage);

  this.emit('buidMessage', data);

  function buildMessage(data) {
    const dataAsString = data.toString();
    try {
      this.emit('validateMessage', new Message(JSON.parse(dataAsString)));
    } catch (err) {
      this.emit('error', 'Invalid message format:' + err + '. Data >' + data);
    }
  }

  function validateMessage(message) {
    if (!message) {
      this.emit('error', 'You must specify a message.');
    }

    if (!(message instanceof Message)) {
      this.emit('error', 'Invalid message type. message > ' + message);
    }

    this.emit('processMessage', message);
  }

  function processMessage(message) {
    for (let i = 0; i < handlers.length; i++) {
      let handler = handlers[i];

      handler.process(message, handleProcessMessageResult);
    }
  }

  function handleProcessMessageResult(err) {
    if (err) {
      next('Error processing message. (message, err) > ', message, err);
    }
  }
}

util.inherits(dispatch, EventEmitter);

module.exports = {
  dispatch
}