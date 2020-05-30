import { readFile, genDiff } from '../src/genDiff.js';
import result from '../__fixtures__/variables.js';

test('search and conversion', () => {
  expect(typeof readFile('./__fixtures__/before.json')).toBe('string');
});

test('gendiff', () => {
  expect(genDiff('./__fixtures__/before.json', './__fixtures__/after.json')).toStrictEqual(result);
});
