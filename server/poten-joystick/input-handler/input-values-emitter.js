const parseData = require('./parse-data');

module.exports = function inputValuesEmitter(serialReader, response) {
  const handleInput = data => {
    const parsedValues = parseData(data);
    response.write('data:' + JSON.stringify(parsedValues));
    response.write('\n\n');
  }

  serialReader.onData(handleInput);
}