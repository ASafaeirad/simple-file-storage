import 'dotenv/config';
import { app } from './app.js';
import { config } from './configs/app.config.js';
import { logger } from './utils/logger.js';

const server = app.listen(config.port, () => {
  logger.info(`Server is running at: http://${config.host}:${config.port}`);
  logger.info(config);
});

async function closeGracefully(signal) {
  logger.warn(`=> Received signal to terminate: ${signal}`);
  server.close((err) => {
    logger.warn(err ? `Error while closing the server: ${err}` : 'Server closed gracefully');
    process.kill(process.pid, signal);
  });
}

process.once('SIGINT', closeGracefully);
process.once('SIGTERM', closeGracefully);
