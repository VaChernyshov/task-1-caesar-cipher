const { Transform } = require('stream');
const { caesarCipher } = require('./caesar-cipher');

class CaesarTransform extends Transform {

  constructor(shift, decode, opts) {
    super(opts);

    this.shift = shift
    this.decode = decode
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = caesarCipher(chunk.toString(), this.shift, this.decode);
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

const createCaesarStream = (shift, decode) => {
  return new CaesarTransform(shift, decode)
}

module.exports = {
  createCaesarStream
}

