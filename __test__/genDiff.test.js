
import {  getContent} from '../index.js';
import genDiff from '../index.js';
import { stylishFormat } from '../__fixtures__/expected_file.js';
import fs from 'fs';


const testRead = fs.readFileSync('./__fixtures__/file1.json', 'utf8');
const testGenDiff = genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json');

test('get file and read from path', () => {
  expect(getContent('./__fixtures__/file1.json')).toBe(testRead);
});

test('genDiff', () => {
  expect(testGenDiff).toBe(stylishFormat);
});