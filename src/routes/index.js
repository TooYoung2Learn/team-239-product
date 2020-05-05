import Auth from '../controllers/authController';
import { validateSignUp, validateSignIn } from '../middlewares/authentication';
import Communities from '../controllers/communityController';
import { verifyLoggedInUser, verifyAdminUser } from '../middlewares/authorizations';

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

  /**
   * COMMUNITIES' ENDPOINTS
   */
  app.post('/api/communities', verifyLoggedInUser, verifyAdminUser, Communities.create);
};

export default routes;
