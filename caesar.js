const fs = require('fs');
const path = require('path');
const { program, Option } = require('commander');
const { pipeline } = require('stream')
const { createCaesarStream } = require('./caesar-transform');

program
  .requiredOption('-s, --shift <number>', 'a shift', parseInt)
  .requiredOption('-a , --action <type>', 'an action encode/decode')
  .addOption(new Option('-a , --action <type>', 'an action encode/decode').choices(['decode', 'encode']))
  .option('-i, --input <path>', 'an input file')
  .option('-o, --output <path>', 'an output file')

program.parse(process.argv);
const params = program.opts()

const inputStream = params.input
  ? fs.createReadStream(path.resolve(__dirname, params.input))
  : process.stdin;
const outputStream = params.output
  ? fs.createWriteStream(path.resolve(__dirname, params.output))
  : process.stdout;

pipeline(
  inputStream,
  createCaesarStream(params.shift, params.action === 'decode'),
  outputStream,
  err => {
    if (err) {
      process.stderr.write('Access denied or invalid file path')
    }
  }
)
