
import fs from 'fs';
import genDiff, { getContent } from '../index.js';

import { stylishFormat, plainFormat, jFormat } from '../__fixtures__/expected_file.js';

const testRead = fs.readFileSync('./__fixtures__/file1.json', 'utf8');

test('get file and read from path', () => {
  expect(getContent('./__fixtures__/file1.json')).toBe(testRead);
});

test('genDiff', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish')).toBe(stylishFormat);
});


test('formats', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish')).toBe(stylishFormat);
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain')).toBe(plainFormat);
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'json')).toBe(jFormat);
});

test('extesions', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish')).toBe(stylishFormat);
  expect(genDiff('./__fixtures__/file1.ini', './__fixtures__/file2.ini', 'stylish')).toBe(stylishFormat);
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'stylish')).toBe(stylishFormat);
});
