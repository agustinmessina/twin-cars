const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

module.exports = function createSerialReader(portName, baudRate, onError) {
  const port = new SerialPort(portName, { baudRate }, onError);
  const parser = new Readline();
  port.pipe(parser);

  return Object.freeze({
    onData: callback => parser.on('data', callback)
  })
}