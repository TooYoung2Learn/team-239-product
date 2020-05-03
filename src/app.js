/* eslint-disable no-console, no-unused-vars */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import { handleError } from './helpers/error';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Our API endpoints
routes(app);

// Error handler middleware
app.use((err, req, res, next) => {
  if (err) {
    handleError(err, res);
  }
});

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server running on http://localhost:${port}`);
});
module.exports = app;
