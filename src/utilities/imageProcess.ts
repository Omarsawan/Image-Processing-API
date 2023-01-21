import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const process = async (
  filename: string,
  width: number | undefined,
  height: number | undefined
): Promise<string> => {
  const input = path.join(__dirname, '..', '..', 'images', filename + '.jpg');
  const output = path.join(
    __dirname,
    '..',
    '..',
    'images',
    'output',
    filename + '_' + width + '_' + height + '.jpg'
  );
  if (fs.existsSync(output)) {
    // Image is already processed before with the same width/height
    return output;
  }
  if (width == undefined && height == undefined) {
    await sharp(input).toFile(output);
  } else {
    await sharp(input).resize(width, height).toFile(output);
  }
  return output;
};

export default process;
