import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const pageLoader = async (url, outputDir = process.cwd()) => {
  const response = await axios.get(url);
  const fileName = url.replace(/https?:\/\//, '').replace(/[^a-z0-9]+/g, '-').concat('.html');
  const filePath = path.join(outputDir, fileName);
  await fs.writeFile(filePath, response.data);
  return { filepath: filePath };
};

export default pageLoader;
