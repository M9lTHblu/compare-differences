import _ from 'lodash';

const makeSpace = (count) => '  '.repeat(count);

const internal = (tree, dep) => {
  const iter = (node, depth) => {
    if (_.isObject(node)) {
      const toArr = Object.entries(node);
      return (
        toArr.flatMap(([key, val]) => (`{\n    ${makeSpace(depth + 2)}${key}: ${iter(val, depth + 2)}\n${makeSpace(depth + 2)}}`))
      );
    }
    return node;
  };
  return iter(tree, dep);
};

const stylish = (tree) => {
  const iter = (node, depth) => node
    .map(({
      type, name, value, child, oldValue, newValue,
    }) => {
      switch (type) {
        case 'internal':
          return (`  ${makeSpace(depth + 1)}${name}: {\n${iter(child, depth + 2)}\n${makeSpace(depth + 2)}}`);
        case 'added':
          return `${makeSpace(depth + 1)}+ ${name}: ${internal(value, depth)}`;
        case 'changed':
          return (`${makeSpace(depth + 1)}- ${name}: ${internal(oldValue, depth)}\n${makeSpace(depth + 1)}+ ${name}: ${internal(newValue, depth)}`);
        case 'deleted':
          return `${makeSpace(depth + 1)}- ${name}: ${internal(value, depth)}`;
        default:
          return `  ${makeSpace(depth + 1)}${name}: ${internal(value, depth)}`;
      }
    }).join('\n');
  return iter(tree, 0);
};
export default stylish;
