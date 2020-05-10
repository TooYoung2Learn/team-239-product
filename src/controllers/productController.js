import models from '../models';
import { ErrorHandler } from '../helpers/error';

const { Product, Association } = models;

const constructOwner = (associationId, userId) => (
  associationId ? { associationId } : { farmerId: userId }
);

const Products = {
  /**
   * @description Create a product
   * @param {object} param0 decoded user and request body
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object or the control function, next if any error arises
   */
  async create({ decoded, body }, res, next) {
    const {
      name, description, images, state, investorId
    } = body;
    const { userId, associationId } = decoded;

    try {
      const product = await Product.create({
        name,
        description,
        images,
        state,
        investorId,
        farmerId: userId,
        ...constructOwner(associationId, userId)
      });
      await product.setDataValue(
        'association',
        await product.getAssociation({
          attributes: ['id', 'name', 'description', 'chairman', 'image']
        })
      );
      return res.status(201).send({ product });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Fetches a product by Id
   * @param {object} param0 parameter object
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object or the control function, next if any error arises
   */
  async fetchById({ params }, res, next) {
    const { productId } = params;

    try {
      const product = await Product.findByPk(productId, {
        include: [
          {
            model: Association,
            as: 'association',
            attributes: ['id', 'name', 'description', 'chairman', 'image']
          }
        ]
      });
      if (!product) {
        throw new ErrorHandler(400, 'Wrong product ID');
      }
      return res.status(200).send({ product });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Fetches a list of all products
   * @param {object} param0 request object
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object containing the list of products or the
   * control function, next if any error arises
   */
  async fetchAll(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Association,
            as: 'association',
            attributes: ['id', 'name', 'description', 'chairman', 'image']
          }
        ]
      });
      return res.status(200).send({ products });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Updates a particular product
   * @param {object} param0 request parameter and body coming the client
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns a response object containing the updated product or the control
   * function, next if any error arises
   */
  async update({ params, body }, res, next) {
    const { productId } = params;
    const {
      name, description, images, state, investorId, farmerId
    } = body;
    try {
      if (!Array.isArray(images)) {
        throw new ErrorHandler(400, 'images should be an array');
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new ErrorHandler(400, 'Wrong product ID');
      }
      const updatedProduct = await product.update(
        {
          name: name || product.name,
          description: description || product.description,
          images: images && images.length ? product.images.concat(images) : product.images,
          state: state || product.state,
          investorId: investorId || product.investorId,
          farmerId: farmerId || product.farmerId
        },
        {
          include: [
            {
              model: Association,
              as: 'association',
              attributes: ['id', 'name', 'description', 'chairman', 'image']
            }
          ]
        }
      );
      return res.status(200).send({ product: updatedProduct });
    } catch (err) {
      return next(err);
    }
  },

  /**
   * @description Delete a product
   * @param {object} param0 request parameter object
   * @param {object} res response object from the server
   * @param {function} next a function that passes control to the next middleware
   * @returns returns an empty response object or the control function, next if any error arises
   */
  async delete({ params }, res, next) {
    const { productId } = params;
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new ErrorHandler(400, 'Wrong product ID');
      }
      await product.destroy();
      return res.status(200).send({});
    } catch (err) {
      return next(err);
    }
  }
};

export default Products;
