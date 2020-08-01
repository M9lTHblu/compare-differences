import _ from 'lodash';

const makeSpace = (count) => '  '.repeat(count);

const extractValue = (value, depth) => {
  if (_.isObject(value)) {
    const keysValues = Object.entries(value);
    const result = keysValues
      .map(([key, val]) => `${makeSpace(depth + 4)}${key}: ${extractValue(val, depth + 2)}`).join('\n');
    return `{\n${result}\n${makeSpace(depth + 2)}}`;
  }
  return `${value}`;
};

export default (tree) => {
  const iter = (node, depth) => node
    .map((item) => {
      switch (item.type) {
        case 'unchanged':
          return `  ${makeSpace(depth + 1)}${item.name}: ${extractValue(item.value, depth)}`;
        case 'deleted':
          return `${makeSpace(depth + 1)}- ${item.name}: ${extractValue(item.value, depth)}`;
        case 'added':
          return `${makeSpace(depth + 1)}+ ${item.name}: ${extractValue(item.value, depth)}`;                            
        case 'nested':
          return (`  ${makeSpace(depth + 1)}${item.name}: {\n${iter(item.child, depth + 2)}\n${makeSpace(depth + 2)}}`);
        case 'changed':
          return (`${makeSpace(depth + 1)}- ${item.name}: ${extractValue(item.oldValue, depth)}\n${makeSpace(depth + 1)}+ ${item.name}: ${extractValue(item.newValue, depth)}`);
        default:
          throw new Error(`Unknown type: '${item.type}'  /stylish.js`);
      }
    }).join('\n');
  return iter(tree, 0);
};
