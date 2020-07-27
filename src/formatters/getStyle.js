
import plain from './plain.js';
import stylish from './stylish.js';
import j from './j.js';

export default (data, format) => {
  if (format === 'stylish') {
    return `{\n${stylish(data)}\n}`;
  }
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'json') {
    return j(data);
  }
  return;
};
