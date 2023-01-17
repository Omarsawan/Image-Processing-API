import sharp from 'sharp';
import fs from 'fs';

const resize = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const input = __dirname + '//images//' + filename + '.jpg';
  const output =
    __dirname +
    '//images//output//' +
    filename +
    '_' +
    width +
    '_' +
    height +
    '.jpg';

  await sharp(input).resize(width, height).toFile(output);
  return output;
};

export default resize;
