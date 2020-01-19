const openConnection = require('./open-connection');

describe('open connection module', () => {
  let createSerialReader, query;

  beforeEach(() => {
    createSerialReader = jest.fn();
    query = { port: 'A', baudRate: '1' }
  })

  describe('query parameters', () => {

    it('reads the port name', async () => {
      const port = 'COM1';
      query.port = port;

      await openConnection(createSerialReader, query);

      expect(createSerialReader.mock.calls[0][0]).toBe(port);
    })

    it('reads the baudRate as a number', () => {
      const baudRate = 9600;
      query.baudRate = baudRate.toString();

      openConnection(createSerialReader, query);

      expect(createSerialReader.mock.calls[0][1]).toBe(baudRate);
    })

    it.each`
      port
      ${undefined}
      ${''}
    `('throws error if port is "$port"', async ({ port }) => {
      query.port = port;
      const expectedError = new Error('The port is not present');

      await expect(openConnection(createSerialReader, query))
        .rejects
        .toThrow(expectedError);
    })
    it.each`
      baudRate
      ${undefined}
      ${''}
    `('throws error if baudRate is "$baudRate"', async ({ baudRate }) => {
      query.baudRate = baudRate;

      const expectedError = new Error('The baudRate is not present');

      await expect(openConnection(createSerialReader, query))
        .rejects
        .toThrow(expectedError);
    })
  })

  describe('serial reader creation', () => {
    it('returns a serial reader 5 ms after SerialPort library calls onError() with no arguments', async () => {
      const serialReader = { onData: () => {} }
      
      createSerialReader = async (port, baudRate, onError) => {
        const result = new Promise((resolve, reject) => {
          setTimeout(() => {
            onError();
            
            resolve(serialReader);
          }, 5);
        })
        
        return await result;
      }
      
      const result = await openConnection(createSerialReader, query)

      expect(result).toBe(serialReader);
    })

    it('sends error 5 ms after calling onError with the error', () => {
      const expectedError = new Error('Error in serial reader');
      createSerialReader = (port, baudRate, onError) => {
        setTimeout(() => {
          onError(expectedError);
        }, 5);
      }

      expect(openConnection(createSerialReader, query)).rejects.toEqual(expectedError)
    })
  })
})