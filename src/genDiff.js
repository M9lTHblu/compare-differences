import _ from 'lodash';
import parse from './parsers.js';

const render = (coll) => {
  const result = coll.flatMap(({
    type, name, value, oldValue, newValue,
  }) => {
    switch (type) {
      case 'unchange':
        return `    ${name}: ${value}`;
      case 'modifed':
        return [`  - ${name}: ${oldValue}`, `  + ${name}: ${newValue}`];
      case 'deleted':
        return `  - ${name}: ${value}`;
      default:
        return `  + ${name}: ${value}`;
    }
  }).join('\n');
  return `{\n${result}\n}`;
};

export default (path1, path2) => {
  const f1 = parse(path1);
  const f2 = parse(path2);

  const add = Object.entries(f2).flatMap(([key, val]) => {
    if (!_.has(f1, key)) {
      return { name: key, value: val, type: 'added' };
    }

    return [];
  });
  const other = Object.entries(f1).map(([key, val]) => {
    if (f2[key] === val) {
      return { name: key, value: val, type: 'unchange' };
    }
    if (_.has(f2, key) && f2[key] !== val) {
      return {
        name: key, oldValue: val, type: 'modifed', newValue: f2[key],
      };
    }
    return { name: key, value: val, type: 'deleted' };
  });

  return render([...other, ...add]);
};
