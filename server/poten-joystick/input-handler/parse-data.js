module.exports = function parseData(data) {
  const values = data.split(' ');

  if (values.length !== 2)
    throw new Error(`The input ${data} is not in the format "P1:<number> P2:<number>"`);

  const p1 = getPotentiometerValue('P1:', values[0]);
  const p2 = getPotentiometerValue('P2:', values[1]);

  return Object.freeze({ p1, p2 })
}

const getPotentiometerValue = (name, fullStr) => {
  const separatedValue = fullStr.split(name);
  const value = Number(separatedValue[1]);

  if (separatedValue.length !== 2 || isNaN(value))
    throw new Error(`Couldn't find "${name}<number>" in "${fullStr}"`);

  return value;
}