import { UserController } from './controllers/UserController';
import { PostController } from './controllers/PostController';
import {Router} from 'express'
import AuthController from './controllers/AuthController';
import { checkJwt } from './middlewares/checkjwt';

const routes = Router()

routes.post('/user/:idUser/create', new PostController().createPost)
routes.post('/user', new UserController().createUser)
routes.get('/user', new UserController().listAll)
routes.post('/login', new AuthController().login)

routes.get('/profile', checkJwt, new AuthController().getProfile)


export default routes