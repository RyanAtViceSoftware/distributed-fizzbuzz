'use strict'

const net = require('net');
const {info, status, error} = require('../common/infrastructure/logger');
const {dispatch} = require('./messaging/dispatch');

// Keep track of the chat clients
const clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  broadcast(socket.name + " joined the chat\n", socket);

  // Handle incoming message-handlers from clients.
  socket.on('data', function (data) {
    try {
      info('Processing ' + data);
      const messageResult = dispatch(data);
      broadcast(messageResult.type + ' latest result: ' + messageResult.value);
    } catch (err) {
      error('Invalid type received. Error > ' + err);
      socket.write('Invalid type received' + data);
    }
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + " left the chat.\n");
  });

  // Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });

    info(message)
  }

}).listen(5000);

status("Chat server running at port 5000");