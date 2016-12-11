'use strict'

const net = require('net');
const {status} = require('../common/infrastructure/logger');
const messageServerFactory = require('./infrastructure/message-server/message-server-factory');

net.createServer(messageServerFactory).listen(5000);

status("Chat server running at port 5000");
