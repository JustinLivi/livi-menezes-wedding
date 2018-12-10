import bodyParser = require('body-parser');
import helmet from 'helmet';
import hpp from 'hpp';
import { STATUS_CODES } from 'http';
import createError from 'http-errors';

import { ExpressApp } from './ExpressApp';
import { errorware } from './middleware/errorware';
import { logger } from './middleware/logger';

export class App extends ExpressApp {
  constructor() {
    super();
  }

  protected configureMiddleware() {
    this.express.use(logger);
    this.express.use(bodyParser.json);
    this.express.use(helmet());
    this.express.use(hpp());
    this.express.use('*', (req, res, next) =>
      next(createError(404, STATUS_CODES[404] as string))
    );
    this.express.use(errorware);
  }
}
