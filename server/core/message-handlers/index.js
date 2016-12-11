'use strict'

const {getDirectoryAsArray} = require('../../../common/infrastructure/requireHelpers');

const handlers = getDirectoryAsArray(__dirname);

module.exports = {
  handlers
};