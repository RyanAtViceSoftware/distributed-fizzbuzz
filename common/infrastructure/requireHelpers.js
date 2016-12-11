'use strict'

const fs = require('fs');
const path = require('path');

function getDirectoryAsArray(directory) {
  const files = fs.readdirSync(directory);

  return files.reduce((set, item) => {
    if (!item.endsWith('.js') || item === 'index.js') {
      return set;
    }

    set.push(require(path.join(directory, item)));

    return set;
  }, [])
}

module.exports = {
  getDirectoryAsArray
}