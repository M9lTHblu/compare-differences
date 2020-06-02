import genDiff from '../src/genDiff.js';
import parse from '../src/parsers.js';
import { gendiff, readfile } from '../__fixtures__/variables.js';

test('search and conversion', () => {
  expect(parse('./__fixtures__/before.json')).toEqual(readfile);
  expect(parse('./__fixtures__/before.yml')).toEqual(readfile);
});

test('gendiff', () => {
  expect(genDiff('./__fixtures__/before.json', './__fixtures__/after.json')).toEqual(gendiff);
});
