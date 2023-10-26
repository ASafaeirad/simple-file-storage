import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileRouter } from './routers/file.router.js';

const app = express();
app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join('./src', 'views'));

app.use('/f', fileRouter);

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.use((req, res) => res.status(404).end());

app.use((err, req, res) => {
  res.status(err.statusCode || 500).end();
  console.error(err);
});

export { app };
