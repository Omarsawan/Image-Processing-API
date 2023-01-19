import express from 'express';
import { Request, Response, NextFunction } from 'express';
import resize from '../utilities/imageProcess';

const routes = express.Router();

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const width = +(req.query.width as string);
  const height = +(req.query.height as string);
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
routes.get('/resize', validate, async (req: Request, res: Response) => {
  try {
    const out = await resize(
      req.query.filename as string,
      +(req.query.width as string),
      +(req.query.height as string)
    );
    res.sendFile(out);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message.split(':')[0]);
    } else {
      res.status(500).send('Internal error, please try again');
    }
  }
});

export default routes;
