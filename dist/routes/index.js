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
const express_1 = __importDefault(require('express'));
const imageProcess_1 = __importDefault(require('../utilities/imageProcess'));
const routes = express_1.default.Router();
const validate = (req, res, next) => {
  if (req.query.width == undefined && req.query.height == undefined) {
    next();
    return;
  }
  const width = +req.query.width;
  const height = +req.query.height;
  if (isNaN(width)) {
    res.status(400).send('Width is not a valid number');
    return;
  }
  if (width % 1 != 0) {
    res
      .status(400)
      .send('Width must be integer, it should not have decimal point');
    return;
  }
  if (isNaN(height)) {
    res.status(400).send('Height is not a valid number');
    return;
  }
  if (height % 1 != 0) {
    res
      .status(400)
      .send('Height must be integer, it should not have decimal point');
    return;
  }
  next();
};
routes.get('/process', validate, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const out = yield (0, imageProcess_1.default)(
        req.query.filename,
        req.query.width == undefined ? undefined : +req.query.width,
        req.query.height == undefined ? undefined : +req.query.height
      );
      res.sendFile(out);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message.split(':')[0]);
      } else {
        res.status(500).send('Internal error, please try again');
      }
    }
  })
);
exports.default = routes;
