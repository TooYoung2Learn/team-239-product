/* eslint-disable quote-props */
import { config, uploader } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @description Configures cloudinary api credentials
 * @param {object} req request object coming from the client
 * @param {object} res response object from the server
 * @param {function} next a function that passes control to the next middleware
 * @returns returns a response object containing the list of
 * associations or the control function, next if error arises
 */
const cloudinaryConfig = (req, res, next) => {
  config({
    'cloud_name': process.env.CLOUDINARY_CLOUD_NAME,
    'api_key': process.env.CLOUDINARY_API_KEY,
    'api_secret': process.env.CLOUDINARY_API_SECRET
  });
  return next();
};
export { cloudinaryConfig, uploader };
