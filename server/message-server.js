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
    info('Processing ' + data);
    dispatch(data, err => {
      if (err) {
        socket.write('Invalid type received' + data);
        socket.emit(
          'error',
          new Error('Error processing data. Error > ' + err + ' stack > ' + err.stack)
        );
      }
    });
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.remove(socket);
  });

  socket.on('error', function(err) {
    const errorMessage = 'An error occurred. err > ' + err;
    error(errorMessage);
  })
}).listen(5000);

status("Chat server running at port 5000");