'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const sharp_1 = __importDefault(require('sharp'));
const path_1 = __importDefault(require('path'));
const fs_1 = __importDefault(require('fs'));
const process = (filename, width, height) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const input = path_1.default.join(
      __dirname,
      '..',
      '..',
      'images',
      filename + '.jpg'
    );
    const output = path_1.default.join(
      __dirname,
      '..',
      '..',
      'images',
      'output',
      filename + '_' + width + '_' + height + '.jpg'
    );
    if (fs_1.default.existsSync(output)) {
      // Image is already processed before with the same width/height
      return output;
    }
    if (width == undefined && height == undefined) {
      yield (0, sharp_1.default)(input).toFile(output);
    } else {
      yield (0, sharp_1.default)(input).resize(width, height).toFile(output);
    }
    return output;
  });
exports.default = process;
