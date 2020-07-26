import _ from 'lodash';


const diff = (tree1, tree2) => {
  const keys = _.union(Object.keys(tree1), Object.keys(tree2)).sort();
  return (
    keys
      .flatMap((node) => {
        if (_.has(tree2, node) && tree1[node] === tree2[node]) {
          return { name: node, value: tree1[node], type: 'unchanged' };
        }
        if (!_.has(tree2, node)) {
          return { name: node, value: tree1[node], type: 'deleted' };
        }
        if (!_.has(tree1, node)) {
          return { name: node, value: tree2[node], type: 'added' };
        }
        if (_.isObject(tree2[node]) && _.isObject(tree1[node])) {
          const children = diff(tree1[node], tree2[node]);
          return { name: node, child: children, type: 'nested' };
        }
        return {
          name: node, oldValue: tree1[node], newValue: tree2[node], type: 'changed',
        };
      })
  );
};
export default diff;
