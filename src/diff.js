import _ from 'lodash';

const diff = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  return (
    keys
      .flatMap((node) => {
        if (_.isObject(file2[node]) && _.isObject(file1[node])) {
          const children = diff(file1[node], file2[node]);
          return { name: node, child: children, type: 'internal' };
        }
        if (!_.has(file1, node)) {
          return { name: node, value: file2[node], type: 'added' };
        }
        if (_.has(file2, node) && file1[node] === file2[node]) {
          return { name: node, value: file1[node], type: 'unchanged' };
        }
        if (!_.has(file2, node)) {
          return { name: node, value: file1[node], type: 'deleted' };
        }
        return {
          name: node, oldValue: file1[node], newValue: file2[node], type: 'changed',
        };
      })
  );
};
export default diff;
