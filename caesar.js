const { program } = require('commander');

program
  .option('-s, --shift', 'a shift')
  .option('-i, --input', 'an input file')
  .option('-o, --output', 'an output file')
  .option('-a , --action', 'an action encode/decode');

program.parse(process.argv);
program.help();
// const options = program.opts()
