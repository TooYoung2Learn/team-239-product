import models from '../models';

const { Community } = models;

const Communities = {
  /**
   *  Create a community
   * @param {object} param0
   * @param {object} res
   * @param {function} next
   */
  async create({ body }, res, next) {
    const { name, description, image } = body;

    try {
      const community = await Community.create({ name, description, image });
      return res.status(201).send({ community });
    } catch (err) {
      return next(err);
    }
  }
};

export default Communities;
