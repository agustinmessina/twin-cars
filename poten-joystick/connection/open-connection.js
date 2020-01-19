const validateQuery = require('./validate-query');

module.exports = async function openConnection(createSerialReader, query) {
  validateQuery(query);

  const promise = new Promise((resolve, reject) => {
    let errorMsg;
    const onError = error => {
      errorMsg = error && error.message;
    }

    const port = createSerialReader(query.port, Number(query.baudRate), onError);

    setTimeout(() => {
      if (errorMsg) {
        reject(errorMsg)
      } else {
        resolve(port)
      }
    }, 10);
  })

  let port;

  await promise
    .then(result => port = result)
    .catch(errorMessage => { throw new Error(errorMessage) });

  return port;
}