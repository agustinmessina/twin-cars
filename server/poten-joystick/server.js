const express = require('express');
const app = express();
const openConnection = require('./connection/open-connection');
const createSerialReader = require('./connection/serial-reader');
const inputValuesEmitter = require('./input-handler/input-values-emitter');

let serialReader;
let errorMessage;
openConnection(createSerialReader, { port: 'COM4', baudRate: 9600 })
  .then(reader => serialReader = reader)
  .catch(error => errorMessage = error.message)

app.get('/potentiometerValues', async (req, res) => {
  console.log('requesting values');

  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*"
  });

  if (errorMessage) {
    res.write('event: connection-error\n');
    res.write(`data: ${error.message}\n\n`);

    return;
  }

  inputValuesEmitter(serialReader, res);
})

app.listen(3001, () => {
  console.log('Listening on port 3001');
})