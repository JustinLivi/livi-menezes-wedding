import bodyParser = require('body-parser');
import helmet from 'helmet';
import hpp from 'hpp';

import { ExpressApp } from './ExpressApp';
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
  }
}
