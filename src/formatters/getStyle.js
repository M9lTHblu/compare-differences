
import plain from './plain.js';
import stylish from './stylish.js';
import j from './jSON.js';

export default (data, format) => {
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'json') {
    return j(data);
  }
  return `{\n${stylish(data)}\n}`;
};
