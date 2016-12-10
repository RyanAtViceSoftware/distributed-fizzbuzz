'use strict'

const fs = require('fs');
const path = require('path');
const {info} = require('../../../common/infrastructure/logger');

const files = fs.readdirSync(__dirname);

const handlers = files.reduce((set, item) => {
  if (!item.endsWith('.js') || item === 'index.js') {
    return set;
  }

  set.push(require(path.join(__dirname, item)));

  return set;
}, [])

module.exports = {
  handlers
};