/* eslint-disable no-useless-escape */
import validator from 'validator';
import { ErrorHandler } from '../helpers/error';

export const validateSignUp = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) {
    throw new ErrorHandler(400, 'Name cannot be empty');
  }
  if (!validator.isEmail(email)) {
    throw new ErrorHandler(400, 'Invalid email address');
  }
  if (password.length < 8) {
    throw new ErrorHandler(400, 'Password length must be at least 8');
  }
  return next();
};

export const validateSignIn = (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email) || !password) {
    throw new ErrorHandler(400, 'Wrong email/password combination');
  }
  return next();
};
