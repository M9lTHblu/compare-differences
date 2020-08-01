import _ from 'lodash';

const reveal = (node) => (_.isObject(node) ? '[complex value]' : node);

export default (tree) => {
  const iter = (node, path) => node
    .flatMap((item) => {
      switch (item.type) {
        case 'unchanged':
          return [];
        case 'nested':
          return iter(item.child, `${path + item.name}.`);
        case 'added':
          return `Property '${path}${item.name}' was added with value: '${reveal(item.value)}'`;
        case 'changed':
          return `Property '${path}${item.name}' was updated. From '${reveal(item.oldValue)}' to '${reveal(item.newValue)}'`;
        case 'deleted':
          return `Property '${path}${item.name}' was removed`;
        default:
          throw new Error(`Unknown type: '${item.type}'  /plain.js`);
      }
    }).join('\n');
  return iter(tree, '');
};
