import _ from 'lodash';

const check = (node) => (_.isObject(node) ? '[complex value]' : node);

const plain = (tree) => {
  const iter = (node, path) => node
    .flatMap(({
      type, name, value, child, oldValue, newValue,
    }) => {
      switch (type) {
        case 'internal':
          return iter(child, `${path + name}.`);
        case 'added':
          return `Property '${path}${name}' was added with value: '${check(value)}'\n`;
        case 'changed':
          return `Property '${path}${name}' was updated. From '${check(oldValue)}' to '${check(newValue)}'\n`;
        case 'deleted':
          return `Property '${path}${name}' was removed\n`;
        default:
          return [];
      }
    }).join('');
  return iter(tree, '');
};
export default plain;
