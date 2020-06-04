import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';


const parse = (path) => {
  const read = fs.readFileSync(`${path}`, 'utf8');
  return path.endsWith('json') ? JSON.parse(read) : path.endsWith('yml') ? yaml.safeLoad(read) : ini.parse(read);
};
export default parse;
