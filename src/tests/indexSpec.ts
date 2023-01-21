import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'path';
import process from '../utilities/imageProcess';

const request = supertest(app);
describe('Test endpoint responses', () => {
  afterEach(async function () {
    const output_path = path.join(__dirname, '..', '..', 'images', 'output');
    // Clean the output directory
    fs.rmSync(output_path, { recursive: true, force: true });
    fs.mkdirSync(output_path);
  });

  it('gets the process endpoint without width and height successfully', async () => {
    const response = await request.get('/process').query({
      filename: 'fjord'
    });
    expect(response.status).toBe(200);
  });

  it('gets the process endpoint with width and height successfully', async () => {
    const response = await request.get('/process').query({
      filename: 'fjord',
      width: '50',
      height: '300'
    });
    expect(response.status).toBe(200);
  });

  it('test sending invalid file name to the process api', async () => {
    const response = await request.get('/process').query({
      filename: 'invalid',
      width: '50',
      height: '300'
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Input file is missing');
  });

  it('test sending invalid width to the process api', async () => {
    const response = await request.get('/process').query({
      filename: 'invalid',
      width: 'abc',
      height: '300'
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Width is not a valid number');
  });

  it('test sending invalid height to the process api', async () => {
    const response = await request.get('/process').query({
      filename: 'invalid',
      width: '50',
      height: 'cde'
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Height is not a valid number');
  });

  it('test sending width with decimal point to the process api', async () => {
    const response = await request.get('/process').query({
      filename: 'invalid',
      width: '50.5',
      height: '300'
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      'Width must be integer, it should not have decimal point'
    );
  });

  it('test sending height with decimal point to the process api', async () => {
    const response = await request.get('/process').query({
      filename: 'invalid',
      width: '50',
      height: '300.2'
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      'Height must be integer, it should not have decimal point'
    );
  });
});

describe('Test for sharp image processing', () => {
  afterEach(async function () {
    const output_path = path.join(__dirname, '..', '..', 'images', 'output');
    // Clean the output directory
    fs.rmSync(output_path, { recursive: true, force: true });
    fs.mkdirSync(output_path);
  });

  it('Process an image without resizing it', async () => {
    const output = await process('fjord', undefined, undefined);
    expect(output).toContain('fjord_undefined_undefined');
    expect(fs.existsSync(output)).toBeTruthy();
  });

  it('Process an image and resize it', async () => {
    const output = await process('fjord', 20, 30);
    expect(output).toContain('fjord_20_30');
    expect(fs.existsSync(output)).toBeTruthy();
  });

  it('Process a non-existing image and should throw error', async () => {
    await expectAsync(process('invalid', 20, 30)).toBeRejected();
  });
});
