import _ from 'lodash';

const makeSpace = (count) => '  '.repeat(count);

const extractСhildren = (children, dep) => {
  const iter = (child, depth) => {
    if (_.isObject(child)) {
      const keysValues = Object.entries(child);
      return (
        keysValues.map(([key, val]) => (`{\n    ${makeSpace(depth + 2)}${key}: ${iter(val, depth + 2)}\n${makeSpace(depth + 2)}}`))
      );
    }
    return child;
  };
  return iter(children, dep);
};

export default (tree) => {
  const iter = (node, depth) => node
    .map((item) => {
      switch (item.type) {
        case 'nested':
          return (`  ${makeSpace(depth + 1)}${item.name}: {\n${iter(item.child, depth + 2)}\n${makeSpace(depth + 2)}}`);
        case 'added':
          return `${makeSpace(depth + 1)}+ ${item.name}: ${extractСhildren(item.value, depth)}`;
        case 'changed':
          return (`${makeSpace(depth + 1)}- ${item.name}: ${extractСhildren(item.oldValue, depth)}\n${makeSpace(depth + 1)}+ ${item.name}: ${extractСhildren(item.newValue, depth)}`);
        case 'deleted':
          return `${makeSpace(depth + 1)}- ${item.name}: ${extractСhildren(item.value, depth)}`;
        default:
          return `  ${makeSpace(depth + 1)}${item.name}: ${extractСhildren(item.value, depth)}`;
      }
    }).join('\n');
  return iter(tree, 0);
};
