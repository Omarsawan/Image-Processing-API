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
const supertest_1 = __importDefault(require('supertest'));
const index_1 = __importDefault(require('../index'));
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
  afterEach(function () {
    return __awaiter(this, void 0, void 0, function* () {
      const output_path = path_1.default.join(
        __dirname,
        '..',
        '..',
        'images',
        'output'
      );
      // Clean the output directory
      fs_1.default.rmSync(output_path, { recursive: true, force: true });
      fs_1.default.mkdirSync(output_path);
    });
  });
  it('gets the process endpoint without width and height successfully', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/process').query({
        filename: 'fjord'
      });
      expect(response.status).toBe(200);
    }));
  it('gets the process endpoint successfully', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/process').query({
        filename: 'fjord',
        width: '50',
        height: '300'
      });
      expect(response.status).toBe(200);
    }));
  it('test sending invalid file name to the reisze  api', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/process').query({
        filename: 'invalid',
        width: '50',
        height: '300'
      });
      expect(response.status).toBe(400);
      expect(response.text).toBe('Input file is missing');
    }));
  it('test sending invalid width to the reisze  api', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/process').query({
        filename: 'invalid',
        width: 'abc',
        height: '300'
      });
      expect(response.status).toBe(400);
      expect(response.text).toBe('Width is not a valid number');
    }));
  it('test sending invalid height to the reisze  api', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/process').query({
        filename: 'invalid',
        width: '50',
        height: 'cde'
      });
      expect(response.status).toBe(400);
      expect(response.text).toBe('Height is not a valid number');
    }));
  it('test sending width with decimal point to the reisze api', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/process').query({
        filename: 'invalid',
        width: '50.5',
        height: '300'
      });
      expect(response.status).toBe(400);
      expect(response.text).toBe(
        'Width must be integer, it should not have decimal point'
      );
    }));
  it('test sending height with decimal point to the reisze api', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/process').query({
        filename: 'invalid',
        width: '50',
        height: '300.2'
      });
      expect(response.status).toBe(400);
      expect(response.text).toBe(
        'Height must be integer, it should not have decimal point'
      );
    }));
});
