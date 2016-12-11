'use strict'

const net = require('net');
const {status} = require('../common/infrastructure/logger');
const messageServerFactory = require('./infrastructure/message-server/message-server-factory');
const config = require('./config');

net.createServer(messageServerFactory).listen(config.port);

status("Chat server running at port 5000");
