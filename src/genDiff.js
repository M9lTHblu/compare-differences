import _ from 'lodash';
import fs from 'fs';

export const readFile = (path) => fs.readFileSync(`${path}`, 'utf8', (err, data) => {
  if (err) {
    return console.error(err);
  }
  return data;
});

export const genDiff = (path1, path2) => {
  const file1 = JSON.parse(readFile(path1));
  const file2 = JSON.parse(readFile(path2));

  const equal = Object.entries(file1)
    .filter(([key, value]) => file2[key] === value)
    .map(([key, value]) => `  ${key}: ${value}`);

  const modified = Object.keys(file1)
    .reduce((result, key) => {
      if (_.has(file2, key) && file2[key] !== file1[key]) {
        result.push(`- ${key}: ${file1[key]}`);
        result.push(`+ ${key}: ${file2[key]}`);
      }
      return result;
    }, []);

  const deleted = Object.entries(file1)
    .flatMap(([key, value]) => (!_.has(file2, key)
      ? `- ${key}: ${value}` : []));

  const added = Object.entries(file2)
    .flatMap(([key, value]) => (!_.has(file1, key)
      ? `+ ${key}: ${value}` : []));

  return [...equal, ...modified, ...deleted, ...added].join('\n');
};
