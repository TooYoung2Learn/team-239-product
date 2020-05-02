import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to our API' }));

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server running on http://localhost:${port}`);
});
