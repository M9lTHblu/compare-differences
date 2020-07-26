#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index.js';

const format = (str) => str;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', format, 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => {
    const result = genDiff(filePath1, filePath2, program.format);
    return console.log(result);
  })
  .parse(process.argv);
