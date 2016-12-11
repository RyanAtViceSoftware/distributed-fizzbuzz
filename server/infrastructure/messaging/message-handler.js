'use strict'

const {Message} = require('../../../common/messages/index');
const {info} = require('../../../common/infrastructure/logger');

class MessageHandler {
  constructor(processingLogic, handles) {
    // Todo: add type checks and empty checks
    if (!processingLogic) {
      throw new Error('processLogic is required.');
    }

    // Todo: add type checks
    if (!handles) {
      throw new Error('handles is required');
    }

    this._processLogic = processingLogic;
    this._handles = handles;
  }

  process(message, next) {
    if (!(message instanceof Message)) {
      throw new Error("message must be an instance of a Message class");
    }

    info(
      'Processing message type > ' + message.type
      + ' with value > ' + message.value
    );

    this.canProcess(message, (err, result) => {
      if (err) {
        next("Error while trying to determine if message could be processed", err);
      }

      if(result) {
        this._processLogic(message, (err) => {
          if (err) {
            next(new Error(
              "Error while trying to process message. (message, err) > "
              + message + ', ' + err));
          }
        });
      }
    })
  }

  canProcess(message, next) {
    if (!(message instanceof Message)) {
      next(new Error("message must be an instance of a Message class"));
    }

    next(
      null,
      this._handles.find(messageType => messageType === message.type
      ));
  }
}

module.exports = MessageHandler;