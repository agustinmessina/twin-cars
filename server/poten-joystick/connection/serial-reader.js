const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

module.exports = function createSerialReader(portName, baudRate, onError) {
  const port = new SerialPort(portName, { baudRate }, onError);
  const parser = new Readline();
  port.pipe(parser);

  port.on('open', () => console.log('The port is open'))

  return Object.freeze({
    onData: callback => parser.on('data', callback)
  })
}