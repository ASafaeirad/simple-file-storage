import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileRouter } from './routers/file.router.js';

const app = express();
app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('views', path.join('./src', 'views'));
app.get('/docs', (req, res) => {
  res.status(200).render('index');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/', fileRouter);

app.use((_, res) => res.status(404).end());

app.use((err, _, res) => {
  res.status(err.statusCode || 500).end();
  console.error(err);
});

export { app };
