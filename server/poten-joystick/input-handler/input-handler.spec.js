const inputValuesEmitter = require('./input-values-emitter');

describe('input-handler module', () => {
  let writeHead, write, callInputValuesEmitter;

  beforeEach(() => {
    writeHead = jest.fn();
    write = jest.fn();

    const response = { writeHead, write };

    const defaultSerialReader = { onData: callback => callback('P1:1 P2:1') };

    callInputValuesEmitter = (serialReader = defaultSerialReader) =>
      inputValuesEmitter(serialReader, response);
  })

  describe('handles serial reader input and sends values', () => {
    describe('correct values', () => {
      it.each`
      p1       |   p2
      ${100}   |   ${300}
      ${230}   |   ${5}
      ${97}    |   ${97}
    `('writes json with "data:" followed by input (p1:$p1 p2:$p2)', ({ p1, p2 }) => {
        const serialReader = { onData: callback => callback(`P1:${p1} P2:${p2}`) };

        callInputValuesEmitter(serialReader);

        expect(write.mock.calls[0][0]).toBe('data:' + JSON.stringify({ p1, p2 }));
      })

      it('writes "\\n\\n" after writing data"', () => {
        callInputValuesEmitter();

        expect(write.mock.calls[1][0]).toBe('\n\n');
      })
    })

    describe('throws error if input format is incorrect', () => {
      it.each`
      wrongInput
      ${'P2:100'}
      ${'P1:300'}
      ${'P1:100P2:100'}
      `('P1 or P2 doesn\' exist or are not separated (input "$wrongInput")', ({ wrongInput }) => {
        const serialReader = { onData: callback => callback(wrongInput) }
        const error = new Error(`The input ${wrongInput} is not in the format "P1:<number> P2:<number>"`);

        expect(() => callInputValuesEmitter(serialReader)).toThrow(error);
      })

      it.each`
      wrongInput
      ${'p1:100'}
      ${'P1:100,'}
      ${''}
      ${'50'}
      ${':50'}
      ${'P1:5a0'}
      `('P1 is bad formatted (input "$wrongInput")', ({ wrongInput }) => {
        const serialReader = { onData: callback => callback(`${wrongInput} P2:100`) }
        const error = new Error(`Couldn't find "P1:<number>" in "${wrongInput}"`);

        expect(() => callInputValuesEmitter(serialReader)).toThrow(error);
      })

      it.each`
      wrongInput
      ${'ads'}
      ${'P500'}
      ${'P230'}
      ${'P2:b'}
      `('P2 is bad formatted (input "$wrongInput")', ({ wrongInput }) => {
        const serialReader = { onData: callback => callback(`P1:100 ${wrongInput}`) }
        const error = new Error(`Couldn't find "P2:<number>" in "${wrongInput}"`);

        expect(() => callInputValuesEmitter(serialReader)).toThrow(error);
      })
    })
  })
})