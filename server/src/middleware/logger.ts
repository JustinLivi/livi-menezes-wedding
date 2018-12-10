import { RequestHandler } from 'express';

import { log } from '../log';

export const logger: RequestHandler = (req, res, next) => {
  log.info({ req });
};
