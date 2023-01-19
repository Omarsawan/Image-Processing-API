import sharp from 'sharp';
import path from 'path';

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
  if (width == undefined && height == undefined) {
    await sharp(input).toFile(output);
  } else {
    await sharp(input).resize(width, height).toFile(output);
  }
  return output;
};

export default process;
