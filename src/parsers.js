import fs from 'fs';
import yaml from 'js-yaml';


export default (path) => {
  const read = fs.readFileSync(`${path}`, 'utf8');
  return path.endsWith('json') ? JSON.parse(read) : yaml.safeLoad(read);
};