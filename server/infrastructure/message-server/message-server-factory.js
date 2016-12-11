'use strict'

const MessageServer = require('./message-server');
const clients = require('../../infrastructure/clients');

const messageServer = socket => new MessageServer(socket, clients)

module.exports = messageServer;