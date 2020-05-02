"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use((0, _morgan.default)('dev'));
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to our API'
}));
const port = process.env.PORT || 4000;
app.listen(port, err => {
  if (err) {
    return console.log(err);
  }

  return console.log(`Server running on http://localhost:${port}`);
});