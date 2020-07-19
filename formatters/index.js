
import diff from '../src/diff.js';
import parse from '../src/parsers.js';
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';


export default (path1, path2, format) => {
  if (format === 'stylish') {
    return console.log(`{\n${stylish(diff(parse(path1), parse(path2)))}\n}`);
  } if (format === 'json') {
    return console.log(json(diff(parse(path1), parse(path2))));
  }
  return console.log(`${plain(diff(parse(path1), parse(path2)))}`);
};
