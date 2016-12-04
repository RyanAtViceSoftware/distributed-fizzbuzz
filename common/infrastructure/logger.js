require('colors');

function log(value) {
  process.stdout.write(value + '\n');
}

function info(value) {
  log(value.blue);
}

function status(value) {
  log(value.green);
}

function error(value) {
  log(value.red);
}

module.exports = {
  info: info,
  status: status,
  error: error
}