import bcrypt from 'bcrypt';
import models from '../models';
import { ErrorHandler } from '../helpers/error';
import { createToken } from '../helpers/jwt';
import { hash } from '../helpers';

const { User, Community } = models;

const Auth = {
  /**
   *  Register a user to the database
   * @param {object} req
   * @param {object} res
   * @param {*} next
   */
  async signUp(req, res, next) {
    const {
      name, email, password, role
    } = req.body;
    const hashPassword = hash(password);

    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new ErrorHandler(409, 'An account with that email exist already');
      }

      const newUser = await User.create({
        name, email, password: hashPassword, role
      });
      const token = createToken(newUser);
      return res.status(201).send({ token, user: newUser });
    } catch (err) {
      return next(err);
    }
  },

  /**
   *  signs in a user to the application
   * @param {object} req
   * @param {object} res
   * @param {*} next
   */
  async signIn(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new ErrorHandler(400, 'Wrong email/password combination');
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw new ErrorHandler(400, 'Wrong email/password combination');
      }

      const token = createToken(user);
      return res.status(200).json({ token, user });
    } catch (err) {
      return next(err);
    }
  },

  /**
   *  Adds user to a community
   * @param {object} req
   * @param {object} res
   * @param {*} next
   */
  async joinCommunity(req, res, next) {
    const { email } = req.decoded;
    const { communityId } = req.params;

    try {
      const community = await Community.findByPk(communityId);
      if (!community) {
        throw new ErrorHandler(404, 'Community with that ID is not in our database');
      }
      const user = await User.findOne({ where: { email } });
      const updatedUser = await user.update({ communityId });
      const token = createToken(updatedUser);
      return res.status(200).send({ token, user: updatedUser });
    } catch (err) {
      return next(err);
    }
  }
};

export default Auth;
