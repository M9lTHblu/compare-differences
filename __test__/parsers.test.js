import parse from '../src/parsers.js';
import { testParse } from '../__fixtures__/variables.js';

test('parse', () => {
  expect(parse('./__fixtures__/after.json')).toEqual(testParse);
});
