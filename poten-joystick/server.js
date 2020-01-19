const express = require('express');
const app = express();
const path = require('path');
const open = require('open');
const openConnection = require('./connection/open-connection');
const createSerialReader = require('./connection/serial-reader');
const inputValuesEmitter = require('./input-handler/input-values-emitter');

let serialReader;
let errorMessage;
openConnection(createSerialReader, { port: 'COM4', baudRate: 9600 })
  .then(reader => serialReader = reader)
  .catch(error => errorMessage = error.message)

app.use(express.static(path.join(
  __dirname.substring(0, __dirname.indexOf('\\twin-cars')), 
  '\\twin-cars\\client\\',
  'build')));

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

open(`http://localhost:${port}/`);