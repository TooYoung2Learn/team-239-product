import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log(`Server running on http://localhost:${port}`);
});
