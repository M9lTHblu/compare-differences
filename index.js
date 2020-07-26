import fs from 'fs';
import path from 'path';
import diff from './src/diff.js';
import parse from './src/parsers.js';
import getStyle from './src/formatters/getStyle.js';

const getContent = (pathToFile) => fs.readFileSync(`${pathToFile}`, 'utf8');
const getExtension = (pathToFile) => path.extname(`${pathToFile}`);

export default (pathToFile1, pathToFile2, format) => {
  const data1 = parse(getContent(pathToFile1), getExtension(pathToFile1));
  const data2 = parse(getContent(pathToFile2), getExtension(pathToFile2));
  const differences = diff(data1, data2);
  return getStyle(differences, format);
};
