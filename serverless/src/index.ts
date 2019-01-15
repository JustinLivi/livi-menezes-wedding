import bodyParser from 'body-parser';
import cors = require('cors');
import express from 'express';
import helmet = require('helmet');
import hpp = require('hpp');
import { STATUS_CODES } from 'http';
import createError from 'http-errors';
import serverless from 'serverless-http';

import { UI_ORIGIN } from './config';
import { UNCAUGHT_EXCEPTION } from './constants';
import { log } from './log';
import { errorware } from './middleware/errorware';
import { logger } from './middleware/logger';
import { rootRouter } from './routes';

process.on(UNCAUGHT_EXCEPTION, err => {
  log.fatal('Uncaught exception', err);
  throw err;
});

const app = express();

app.use(
  cors({
    origin: UI_ORIGIN
  })
);
app.use(logger);
app.use(bodyParser.json());
app.use(helmet());
app.use(hpp());
app.use(rootRouter);
app.use('*', (req, res, next) => {
  log.info('should be 404');
  next(createError(404, STATUS_CODES[404] as string));
});
app.use(errorware);

export const handler = serverless(app);
