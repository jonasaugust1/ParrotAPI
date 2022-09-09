import { UserController } from './controllers/UserController';
import { PostController } from './controllers/PostController';
import {Router} from 'express'
import AuthController from './controllers/AuthController';
import { checkJwt } from './middlewares/checkjwt';

const routes = Router()

routes.post('/user', new UserController().createUser)
routes.post('/login', new AuthController().login)


routes.post('/user/:idUser/create', checkJwt, new PostController().createPost)
routes.get('/post', checkJwt, new PostController().listAll)
routes.get('/post/:idPost', checkJwt, new PostController().listById)
routes.delete('/post/:idPost', checkJwt, new PostController().destroy)


routes.get('/user', checkJwt, new UserController().listAll)
routes.get('/user/:idUser', checkJwt, new UserController().listById)
routes.put('/user/:idUser', checkJwt, new UserController().editUser)
routes.delete('/user/:idUser', checkJwt, new UserController().deleteUser)



routes.get('/profile', checkJwt, new AuthController().getProfile)




export default routes