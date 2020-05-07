/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import models from '../models';
import { ErrorHandler } from '../helpers/error';

const { User } = models;

/**
 *  Verify that the user is logged in and log them in
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const verifyLoggedInUser = (req, res, next) => {
  if (!req.headers.authorization && !req.headers['x-access-token']) {
    throw new ErrorHandler(401, 'Unauthorized Access');
  }
  const token = req.headers.authorization.split(' ')[1] || req.headers['x-access-token'].split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new ErrorHandler(401, 'Invalid token');
    }

    req.decoded = decoded;
    // Verify that the user is in the database
    return User.findByPk(decoded.userId).then((existingUser) => {
      if (!existingUser) {
        throw new ErrorHandler(403, "User doesn't exist");
      }
      return next();
    }).catch((error) => next(error));
  });
};

/**
 *  Verify that the logged in user is an 'admin'
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const verifyAdminUser = (req, res, next) => {
  if (req.decoded.role !== 'admin') {
    throw new ErrorHandler(401, 'Unauthorize access');
  }
  return next();
};
