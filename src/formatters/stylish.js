import _ from 'lodash';

const makeSpace = (count) => '  '.repeat(count);



const extractValue = (value, depth) => {
  if (_.isObject(value)) {
    const keysValues = Object.entries(value);
    const result = keysValues
      .map(([key, val]) => `${makeSpace(depth + 4)}${key}: ${extractValue(val, depth + 2)}`).join('\n')
    return `{\n${result}\n${makeSpace(depth + 2)}}`
  }
  return `${value}`
};

export default (tree) => {
  const iter = (node, depth) => node
    .map((item) => {
      switch (item.type) {
        case 'nested':
          return (`  ${makeSpace(depth + 1)}${item.name}: {\n${iter(item.child, depth + 2)}\n${makeSpace(depth + 2)}}`);
        case 'added':
          return `${makeSpace(depth + 1)}+ ${item.name}: ${extractValue(item.value, depth)}`;
        case 'changed':
          return (`${makeSpace(depth + 1)}- ${item.name}: ${extractValue(item.oldValue, depth)}\n${makeSpace(depth + 1)}+ ${item.name}: ${extractValue(item.newValue, depth)}`);
        case 'deleted':
          return `${makeSpace(depth + 1)}- ${item.name}: ${extractValue(item.value, depth)}`;
        default:
          return `  ${makeSpace(depth + 1)}${item.name}: ${extractValue(item.value, depth)}`;
      }
    }).join('\n');
  return iter(tree, 0);
};
