const express = require('express');
const app = express();
const openConnection = require('./connection/open-connection');
const createSerialReader = require('./connection/serial-reader');
const inputValuesEmitter = require('./input-handler/input-values-emitter');

app.get('/openConnection', async (req, res) => {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*"
  });

  try {
    const serialReader = await openConnection(createSerialReader, req.query);
    
    inputValuesEmitter(serialReader, res);

  } catch (error) {
    res.write('event: connection-error\n');
    res.write(`data: ${error.message}\n\n`);
  }
})

app.listen(3001, () => {
  console.log('Listening on port 3001');
})