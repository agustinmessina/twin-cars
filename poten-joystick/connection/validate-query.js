module.exports = validateQuery = query => {
  if (!query.port || query.port === '') {
    throw new Error('The port is not present');
  }
  if (!query.baudRate || query.baudRate === '') {
    throw new Error('The baudRate is not present');
  }
}