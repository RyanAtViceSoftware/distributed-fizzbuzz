'use strict'

const {Message} = require('../../../common/messages/index');

function buildMessage(data, next) {
  const dataAsString = data.toString();
  try {
    next(null, new Message(JSON.parse(dataAsString)));
  } catch (err) {
    next(new Error('Invalid message format:' + err + '. Data >' + data));
  }
}

module.exports = buildMessage;