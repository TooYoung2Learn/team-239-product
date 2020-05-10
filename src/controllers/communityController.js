import models from '../models';
import { ErrorHandler } from '../helpers/error';
import { dataUri } from '../middlewares/multer';
import { uploader } from '../config/cloudinaryConfig';

const { Community, Association } = models;

/**
 * @description finds a particular community by id with option to include associated collection
 * @param {number} communityId number
 * @param {object} include object
 * @returns returns the association or the next function if any error arises
 */
const findCommunityByPk = async (communityId, include = {}) => {
  const community = await Community.findByPk(communityId, include);
  if (!community) {
    throw new ErrorHandler(400, 'The community with that Id is not found');
  }
  return community;
};

const Communities = {
  /**
   * @description Create a community
   * @param {object} req request object
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object or the control function, next
   */
  async create(req, res, next) {
    const { name, description } = req.body;
    let imageUrl = '';

    try {
      // image upload
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        imageUrl = result.url;
      }

      const community = await Community.create({ name, description, image: imageUrl });
      return res.status(201).send({ community });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Fetch all communities
   * @param {object} req request object coming from the client
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object or the control function, next
   */
  async fetchAll(req, res, next) {
    try {
      const communities = await Community.findAll({
        include: [
          {
            model: Association,
            as: 'associations'
          }
        ]
      });
      return res.status(200).send({ communities });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Fetch one community
   * @param {object} param0 request parameter object from the client
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object or the control function, next
   */
  async fetchOne({ params }, res, next) {
    const { communityId } = params;

    try {
      const community = await findCommunityByPk(communityId, {
        include: [
          {
            model: Association,
            as: 'associations'
          }
        ]
      });
      return res.status(200).send({ community });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Updates a particular community
   * @param {object} req request object coming from the client
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object or the control function, next
   */
  async update(req, res, next) {
    const { communityId } = req.params;
    const { name, description } = req.body;
    let imageUrl = '';

    try {
      const community = await findCommunityByPk(communityId);

      // cloudinary image upload
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        imageUrl = result.url;
      }

      const updatedCommunity = await community.update(
        {
          name: name || community.name,
          description: description || community.description,
          image: imageUrl || community.image
        },
        {
          include: [
            {
              model: Association,
              as: 'associations'
            }
          ]
        }
      );
      return res.status(200).send({ community: updatedCommunity });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Deletes a particular community
   * @param {object} param0 request parameter containing the community Id as a property
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object or the control function, next
   */
  async delete({ params }, res, next) {
    const { communityId } = params;

    try {
      const community = await findCommunityByPk(communityId);

      await community.destroy();
      return res.status(200).send({});
    } catch (err) {
      return next(err);
    }
  }
};

export default Communities;
