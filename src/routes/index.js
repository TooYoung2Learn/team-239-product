import Auth from '../controllers/authController';
import { validateSignUp, validateSignIn } from '../middlewares/authentication';
import Communities from '../controllers/communityController';
import { verifyLoggedInUser, verifyAdminUser } from '../middlewares/authorizations';
import Associations from '../controllers/associationController';
import Products from '../controllers/productController';

/**
 *
 * @param {*} app
 */
const routes = (app) => {
  app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to our API' }));

  /**
   * AUTHENTICATION ENDPOINTS
   */
  app.post('/api/auth/sign_up', validateSignUp, Auth.signUp);
  app.post('/api/auth/sign_in', validateSignIn, Auth.signIn);
  app.get('/api/auth/join/communities/:communityId', verifyLoggedInUser, Auth.joinCommunity);
  app.get('/api/auth/join/associations/:associationId', verifyLoggedInUser, Auth.joinAssociation);

  /**
   * COMMUNITIES' ENDPOINTS
   */
  app.post('/api/communities', verifyLoggedInUser, verifyAdminUser, Communities.create);
  app.get('/api/communities', Communities.fetchAll);
  app.get('/api/communities/:communityId', Communities.fetchOne);
  app.put('/api/communities/:communityId', verifyLoggedInUser, verifyAdminUser, Communities.update);
  app.delete('/api/communities/:communityId', verifyLoggedInUser, verifyAdminUser, Communities.delete);

  /**
   * ASSOCIATIONS' ENDPOINTS
   */
  app.post('/api/associations', verifyLoggedInUser, Associations.create);
  app.get('/api/associations', Associations.fetchAll);
  app.get('/api/associations/:associationId', Associations.fetchOne);
  app.put('/api/associations/:associationId', verifyLoggedInUser, Associations.update);
  app.delete('/api/associations/:associationId', verifyLoggedInUser, Associations.delete);

  /**
   * PRODUCTS' ENDPOINTS
   */
  app.post('/api/products', verifyLoggedInUser, Products.create);
  app.get('/api/products', Products.fetchAll);
  app.get('/api/products/:productId', Products.fetchById);
  app.put('/api/products/:productId', verifyLoggedInUser, Products.update);
  app.delete('/api/products/:productId', verifyLoggedInUser, Products.delete);
};

export default routes;
