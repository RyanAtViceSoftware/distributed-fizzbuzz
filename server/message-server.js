'use strict'

const net = require('net');
const {info, status, error} = require('../common/infrastructure/logger');
const {dispatch} = require('./messaging/dispatch');
const clients = require('./infrastructure/clients');

// Keep track of the chat clients

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.add(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  clients.broadcast(socket.name + " joined the chat\n", socket);

  // Handle incoming message-handlers from clients.
  socket.on('data', function (data) {
    try {
      info('Processing ' + data);
      dispatch(data);
    } catch (err) {
      error('Invalid type received. Error > ' + err
        + ' stack > ' + err.stack);
      socket.write('Invalid type received' + data);
    }
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.remove(socket);
  });
}).listen(5000);

status("Chat server running at port 5000");