import _ from 'lodash';
import diff from '../src/diff.js';
import parse from '../src/parsers.js';

const fileFlat1 = ('./__fixtures__/before.json');
const fileFlat2 = ('./__fixtures__/after.json');

const file1 = parse('./__fixtures__/treeBefore.json');
const file2 = parse('./__fixtures__/treeAfter.json');

const resulFlat = ['name', 'value', 'type', 'oldValue', 'newValue'];
const resultInternal = ['name', 'child', 'type'];

test('diff function flat file', () => {
  expect(_.union(diff(fileFlat1, fileFlat2).flatMap(Object.keys))).toEqual(resulFlat);
});
test('diff function multidimensional file', () => {
  expect(_.union(diff(file1, file2).flatMap(Object.keys))).toEqual(resultInternal);
});
