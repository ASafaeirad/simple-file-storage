import 'dotenv/config';
import { app } from './app.js';
import { config } from './configs/app.config.js';
import { logConfigs } from './utils/helpers.js';

const server = app.listen(config.port, () => {
  logConfigs();
  console.log(`Server is running at: http://${config.host}:${config.port}`);
});

async function closeGracefully(signal) {
  console.log(`=> Received signal to terminate: ${signal}`);
  server.close((err) => {
    console.log(err ? `Error while closing the server: ${err}` : 'Server closed gracefully');
    process.kill(process.pid, signal);
  });
}

process.once('SIGINT', closeGracefully);
process.once('SIGTERM', closeGracefully);
