import fs from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

import diff from './src/diff.js';
import parse from './src/parsers.js';
import getStyle from './src/formatters/getStyle.js';

const getFile = (filePath) => path.resolve(process.cwd(), '.', filePath);
const getContent = (file) => fs.readFileSync(getFile(file), 'utf8');
const getExtension = (filePath) => path.extname(filePath);

export default (filePath1, filePath2, format) => {
  const data1 = parse(getContent(getFile(filePath1)), getExtension(filePath1));
  const data2 = parse(getContent(getFile(filePath2)), getExtension(filePath2));
  const differences = diff(data1, data2);
  return getStyle(differences, format);
};
export { getContent };
