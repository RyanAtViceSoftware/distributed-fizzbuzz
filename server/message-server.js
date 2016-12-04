// Load the TCP Library
const net = require('net');
const {processFizzBuzz} = require('./message-processors/fizz-buzz-processor');
const {info, status, error} = require('../common/infrastructure/logger');
const {FizzBuzzMessage} = require('./../common/messages/fizz-buzz-message');
const {MessageTypes} = require('./../common/messages/message-types');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort

  // Put this new client in the list
  clients.push(socket);

  // Send a nice welcome message and announce
  socket.write("Welcome " + socket.name + "\n");
  broadcast(socket.name + " joined the chat\n", socket);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    const dataAsString = data.toString();
    let message;
    try {
      message = new FizzBuzzMessage(JSON.parse(dataAsString));
    } catch (err) {
      error("Invalid message format:" + err + '. Data >' + data);
      return;
    }

    if (message && message.type === MessageTypes.FIZZ_BUZZ) {
      info('Processing ' + message.type);
      broadcast(message.type + ' latest result: ' + processFizzBuzz(message.value));
      return;
    }

    error('Invalid type received');
    socket.write('Invalid type received' + data);
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