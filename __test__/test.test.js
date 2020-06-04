import _test from '../src/test.js';

test('check test', () => {
  expect(_test(1, 2)).toBe(3)
  expect(_test(3, 2)).toBe(5)
});