import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import pino from 'pino-http';
import { fileRouter } from './routers/file.router.js';
import { logger } from './utils/logger.js';

const app = express();
app.disable('x-powered-by');

app.use(pino());
app.set('view engine', 'ejs');
app.set('views', path.join('./src', 'views'));
app.get('/docs', (req, res) => {
  res.status(200).render('index');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/', fileRouter);

app.use((_, res) => res.status(404).end());

// Express API is so smart :)
/* eslint-disable-next-line no-unused-vars */
app.use((err, _, res, next) => {
  const status = err.status ?? 500;
  res.status(status).json({ message: err.message });
  if (status === 500) logger.error(err);
});

export { app };
