import pageLoader from '../src/pageLoader';
import nock from 'nock';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

describe('pageLoader', () => {
  let tempDir;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should download the page and save it to the specified directory', async () => {
    const url = 'https://ru.hexlet.io/courses';
    const scope = nock('https://ru.hexlet.io')
      .get('/courses')
      .reply(200, '<html><body><h1>Courses</h1></body></html>');

    const { filepath } = await pageLoader(url, tempDir);
    const fileContents = await fs.readFile(filepath, 'utf-8');

    expect(scope.isDone()).toBe(true);
    expect(fileContents).toBe('<html><body><h1>Courses</h1></body></html>');
    expect(filepath).toBe(path.join(tempDir, 'ru-hexlet-io-courses.html'));
  });
});
