import sharp from 'sharp';
import path from 'path';

const resize = async (
  filename: string,
  width: number,
  height: number
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
  await sharp(input).resize(width, height).toFile(output);
  return output;
};

export default resize;
