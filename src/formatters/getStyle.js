
import plain from './plain.js';
import stylish from './stylish.js';
import j from './j.js';

export default (data, format) => {
  switch (format) {
    case 'plain':
      return plain(data);
    case 'json':
      return j(data);
    default: return `{\n${stylish(data)}\n}`;
  }
};
