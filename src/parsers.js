
import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml') {
    return yaml.safeLoad(data);
  }
  if (format === '.ini') {
    return ini.parse(data);
  }
  throw new Error('Invalid file extension!');
};


export default parse;
