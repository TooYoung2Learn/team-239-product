import models from '../models';
import { ErrorHandler } from '../helpers/error';
import { dataUri } from '../middlewares/multer';
import { uploader } from '../config/cloudinaryConfig';

const { Association, Community, Product } = models;

/**
 * @description finds a particular association by id with option to include associated collection
 * @param {number} associationId number
 * @param {object} include object
 * @returns returns the association
 */
const findAssociationByPk = async (associationId, include = {}) => {
  const association = await Association.findByPk(associationId, include);
  if (!association) {
    throw new ErrorHandler(400, 'The association with that Id is not found');
  }
  return association;
};

const Associations = {
  /**
   * @description Creates an Association
   * @param {object} param0
   * @param {object} res
   * @param {function} next
   * @returns returns a response object or the control function, next if error arises
   */
  async create(req, res, next) {
    const { name, description } = req.body;
    const { communityId } = req.decoded;
    let imageUrl = '';

    try {
      // A user needs to join a community before he/she can create an assiation
      if (!communityId) {
        throw new ErrorHandler(400, 'You must be part of a community to create an association');
      }
      const community = await Community.findByPk(communityId);
      if (!community) {
        throw new ErrorHandler(404, 'Your community is not in our database');
      }
      // If there is an image...
      // cloudinary image upload
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        imageUrl = result.url;
      }

      const association = await Association.create({
        chairman: req.decoded.name,
        name,
        description,
        image: imageUrl,
        communityId
      });
      return res.status(201).send({ association });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Fetch and return a list of all associations
   * @param {object} req request object coming from the client
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object containing the list of
   * associations or the control function, next if error arises
   */
  async fetchAll(req, res, next) {
    try {
      const associations = await Association.findAll({
        include: [
          {
            model: Product,
            as: 'products'
          }
        ]
      });
      return res.status(200).send({ associations });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Fetch and return a particular association
   * @param {object} req request object coming from the client
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object containing the association or the control
   * function, next if error arises
   */
  async fetchOne({ params }, res, next) {
    const { associationId } = params;

    try {
      const association = await findAssociationByPk(associationId, {
        include: [
          {
            model: Product,
            as: 'products'
          }
        ]
      });
      return res.status(200).send({ association });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description updates a particular association and returns it in the response
   * @param {object} req request object coming from the client
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object containing the updated association or the
   * control function, next if error arises
   */
  async update(req, res, next) {
    const { associationId } = req.params;
    const { name, description, chairman } = req.body;
    let imageUrl = '';

    try {
      const association = await findAssociationByPk(associationId);

      // cloudinary image upload
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        imageUrl = result.url;
      }

      const updatedAssociation = await association.update(
        {
          name: name || association.name,
          description: description || association.description,
          image: imageUrl || association.image,
          chairman: chairman || association.chairman
        },
        {
          include: [
            {
              model: Product,
              as: 'products'
            }
          ]
        }
      );
      return res.status(200).send({ association: updatedAssociation });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Deletes a particular association
   * @param {object} param0 request parameters containing the association Id
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns an empty response object or the control function, next if error arises
   */
  async delete({ params }, res, next) {
    const { associationId } = params;
    try {
      const association = await findAssociationByPk(associationId);
      await association.destroy();
      return res.status(200).send({});
    } catch (err) {
      return next(err);
    }
  }
};

export default Associations;
