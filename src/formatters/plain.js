import _ from 'lodash';

const reveal = (node) => (_.isObject(node) ? '[complex value]' : node);

export default (tree) => {
  const iter = (node, path) => node
    .map(({
      type, name, value, child, oldValue, newValue,
    }) => {
      switch (type) {
        case 'nested':
          return iter(child, `${path + name}.`);
        case 'added':
          return `Property '${path}${name}' was added with value: '${reveal(value)}'\n`;
        case 'changed':
          return `Property '${path}${name}' was updated. From '${reveal(oldValue)}' to '${reveal(newValue)}'\n`;
        case 'deleted':
          return `Property '${path}${name}' was removed\n`;
        default:
          return [];
      }
    }).join('');
  return iter(tree, '');
};
