import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (path) => {
  const read = fs.readFileSync(`${path}`, 'utf8');
  if (path.endsWith('json')) {
    return JSON.parse(read);
  } if (path.endsWith('yml')) {
    return yaml.safeLoad(read);
  }
  return ini.parse(read);
};

export default parse;
