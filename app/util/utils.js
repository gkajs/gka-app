const colors = require = require('colors/safe')

function warn(...info) {
  console.log(colors.yellow(...info));
}

function err(...info) {
  console.log(colors.red(...info));
}

function log(...info) {
  console.log(colors.green(...info));
}

module.exports = {
  warn,
  err,
  log
}