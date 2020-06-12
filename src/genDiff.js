import _ from 'lodash';
import parse from './parsers.js';

const render = (coll) => {
  const result = coll
    .flatMap(({
      type, name, value, oldValue, newValue,
    }) => {
      switch (type) {
        case 'unchanged':
          return `    ${name}: ${value}`;
        case 'changed':
          return [`  - ${name}: ${oldValue}`, `  + ${name}: ${newValue}`];
        case 'deleted':
          return `  - ${name}: ${value}`;
        default:
          return `  + ${name}: ${value}`;
      }
    }).join('\n');
  return `{\n${result}\n}`;
};

const genDiff = (path1, path2) => {
  const file1 = parse(path1);
  const file2 = parse(path2);
  const union = _.union(Object.keys(file1), Object.keys(file2));

  const deleted = union.filter((key) => !_.has(file2, key))
    .map((key) => ({ name: key, value: file1[key], type: 'deleted' }));
  const added = union.filter((key) => !_.has(file1, key))
    .map((key) => ({ name: key, value: file2[key], type: 'added' }));
  const unchanged = union
    .filter((key) => file1[key] === file2[key])
    .map((key) => ({ name: key, value: file1[key], type: 'unchanged' }));
  const changed = union
    .filter((key) => (_.has(file2, key) && _.has(file1, key)) && file1[key] !== file2[key])
    .map((key) => ({
      name: key, oldValue: file1[key], newValue: file2[key], type: 'changed',
    }));

  return render([...unchanged, ...changed, ...added, ...deleted]);
};

export default genDiff;
