'use strict'

const {info, error} = require('../../../common/infrastructure/logger');
const {dispatch} = require('../messaging/dispatch');

class MessageServer {
  constructor(socket, clients) {
    this._clients = clients;
    this._socket = socket;

    this.initializeSocket();

    this._clients.add(this._socket);
  }

  initializeSocket () {
    this.notifyThatNewClientJoined();

    this._socket.on('data', this.dispatchMessage);

    this._socket.on('end', this.removeClient);

    this._socket.on('error', this.handleError)
  }

  notifyThatNewClientJoined() {
    // Identify this client
    this._socket.name = this._socket.remoteAddress + ":" + this._socket.remotePort;

    // Send a nice welcome message and announce
    this._socket.write("Welcome " + this._socket.name + "\n");
    this._clients.broadcast(this._socket.name + " joined the chat\n", this._socket);
  }

  dispatchMessage(data) {
    info('Processing ' + data);
    dispatch(data, this.handleDispatchMessageResponse);
  }

  handleDispatchMessageResponse(err) {
    if (err) {
      this._socket.write('Invalid type received' + data);
      this._socket.emit(
        'error',
        new Error('Error processing data. Error > ' + err + ' stack > ' + err.stack)
      );
    }
  }

  removeClient() {
    this._clients.remove(this._socket);
  }

  handleError(err) {
    const errorMessage = 'An error occurred. err > ' + err;
    error(errorMessage);
  }
}

module.exports = MessageServer;