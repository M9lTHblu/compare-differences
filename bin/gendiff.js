#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/formatters/genDiff.js';

const format = (str) => str;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', format, 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filePath1, filePath2) => genDiff(filePath1, filePath2, program.format))
  .parse(process.argv);
const a = __dirname;
console.log(a);
