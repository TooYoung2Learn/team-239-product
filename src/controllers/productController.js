import models from '../models';
import { ErrorHandler } from '../helpers/error';

const { Product, Association } = models;

const constructOwner = (associationId, userId) => (
  associationId ? { associationId } : { farmerId: userId }
);

const Products = {
  /**
   *
   * @param {object} param0
   * @param {object} res
   * @param {*} next
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
      await product.setDataValue('association', await product.getAssociation({
        attributes: ['id', 'name', 'description', 'chairman', 'image']
      }));
      return res.status(201).send({ product });
    } catch (err) {
      return next(err);
    }
  },

  /**
   *
   * @param {object} param0
   * @param {object} res
   * @param {*} next
   */
  async fetchById({ params }, res, next) {
    const { productId } = params;

    try {
      const product = await Product.findByPk(productId, {
        include: [{
          model: Association,
          as: 'association',
          attributes: ['id', 'name', 'description', 'chairman', 'image']
        }]
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
   *
   * @param {object} req
   * @param {object} res
   * @param {*} next
   */
  async fetchAll(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [{
          model: Association,
          as: 'association',
          attributes: ['id', 'name', 'description', 'chairman', 'image']
        }]
      });
      return res.status(200).send({ products });
    } catch (err) {
      return next(err);
    }
  },

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
      const updatedProduct = await product.update({
        name: name || product.name,
        description: description || product.description,
        images: images && images.length ? product.images.concat(images) : product.images,
        state: state || product.state,
        investorId: investorId || product.investorId,
        farmerId: farmerId || product.farmerId
      }, {
        include: [{
          model: Association,
          as: 'association',
          attributes: ['id', 'name', 'description', 'chairman', 'image']
        }]
      });
      return res.status(200).send({ product: updatedProduct });
    } catch (err) {
      return next(err);
    }
  },

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
