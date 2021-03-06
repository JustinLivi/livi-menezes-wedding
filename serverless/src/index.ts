import bodyParser from 'body-parser';
import express from 'express';
import helmet = require('helmet');
import hpp = require('hpp');
import { STATUS_CODES } from 'http';
import createError from 'http-errors';
import serverless from 'serverless-http';

import { UNCAUGHT_EXCEPTION } from './constants';
import { log } from './log';
import { cors } from './middleware/cors';
import { errorware } from './middleware/errorware';
import { logger } from './middleware/logger';
import { rootRouter } from './routes';

process.on(UNCAUGHT_EXCEPTION, err => {
  log.fatal('Uncaught exception', err);
  throw err;
});

const app = express();

app.options('*');
app.use(cors);
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
