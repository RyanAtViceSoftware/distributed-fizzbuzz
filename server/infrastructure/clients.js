'use strict'

const {info, status, error} = require('../../common/infrastructure/logger');

const clients = [];

const add = socket => clients.push(socket);

const broadcast = (message, sender) => {
  clients.forEach(function (client) {
    // Don't want to send it to sender
    if (client === sender) return;
    client.write(message);
  });

  info(message);
};

const remove = socket => {
  clients.splice(clients.indexOf(socket), 1);
  broadcast(socket.name + " left the chat.\n");
};

module.exports = {
  add,
  broadcast,
  remove
};

