import corsMiddleware from 'cors';
import createHttpError from 'http-errors';

import { UI_ORIGIN } from '../config';

const corsOrigins = UI_ORIGIN.split(',');
export const cors = corsMiddleware({
  origin: (origin, callback) => {
    if (corsOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(createHttpError(403, 'Not allowed by CORS'));
    }
  }
});
