
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.safeLoad(data);
  }
  return ini.parse(data);
};


export default parse;
