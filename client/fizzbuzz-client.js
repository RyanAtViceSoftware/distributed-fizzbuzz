const net = require('net');
const readline = require('readline');
const {status, info} = require('../common/infrastructure/logger');
const {FizzBuzzMessage} = require('../common/messages/fizz-buzz-message');

var readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var client = new net.Socket();

readlineInterface.on('line', function (line) {
  if (line === 'q') {
    status('Quiting...');
    client.destroy();
    return;
  }

  var message = new FizzBuzzMessage({
    value: line
  });

  var string = JSON.stringify(message);
  info('Sending: ' + line);
  client.write(string);
})

client.connect(5000, function () {
  status("Connected. Type 'q' to quit");
});

client.on('data', function (data) {
  info('Received: ' + data);
});

client.on('close', function () {
  status('Connection closed');
  process.exit();
});