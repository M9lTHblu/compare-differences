#!/usr/bin/env node
import program from 'commander';
import compareData from '../src/index.js';

program
.version('0.0.1')
.description('Compares two configuration files and shows a difference.')
.arguments('<filepath1> <filepath2>')
.action((filepath1, filepath2) => {
  return compareData(filepath1, filepath2)
})
.option('-f, --format [type]', 'output format')
.parse(process.argv)
