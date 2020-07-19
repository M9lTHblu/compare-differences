
import diff from '../diff.js';
import parse from '../parsers.js';
import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';


export default (path1, path2, format) => {
  if (format === 'stylish') {
    return `{\n${stylish(diff(parse(path1), parse(path2)))}\n}`;
  } if (format === 'json') {
    return json(diff(parse(path1), parse(path2)));
  }
  return `${plain(diff(parse(path1), parse(path2)))}`;
};
