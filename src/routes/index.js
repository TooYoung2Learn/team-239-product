import Auth from '../controllers/authController';
import { validateSignUp, validateSignIn } from '../middlewares/authentication';

/**
 *
 * @param {*} app
 */
const routes = (app) => {
  app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to our API' }));

  /**
   * USER'S ENDPOINTS
   */
  app.post('/api/auth/sign_up', validateSignUp, Auth.signUp);
  app.post('/api/auth/sign_in', validateSignIn, Auth.signIn);
};

export default routes;
