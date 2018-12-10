import { App } from './App';
import { PORT } from './config';
import { SIGINT, SIGTERM, UNCAUGHT_EXCEPTION } from './constants';
import { log } from './log';

process.on(UNCAUGHT_EXCEPTION, err => {
  log.fatal('Uncaught exception', err);
  throw err;
});

const server = new App();

const endGracefuly = async () => {
  log.info('Attempting to end gracefully');
  try {
    await server.stop();
    log.info('Server closed gracefully');
    process.exit(0);
  } catch (err) {
    log.fatal(`Server closed with error '${err}'`);
    process.exit(1);
  }
};

process.on(SIGINT, endGracefuly);
process.on(SIGTERM, endGracefuly);

server.start(PORT);
