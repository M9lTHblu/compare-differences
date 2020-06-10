import parse from '../src/parsers.js';

const testParse = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('parse', () => {
  expect(parse('./__fixtures__/after.json')).toEqual(testParse);
});
