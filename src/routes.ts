import { UserController } from './controllers/UserController';
import { PostController } from './controllers/PostController';
import {Router} from 'express'
import AuthController from './controllers/AuthController';
import { checkJwt } from './middlewares/checkjwt';

const routes = Router()

routes.post('/user', new UserController().createUser)
routes.post('/login', new AuthController().login)


routes.post('/user/:idUser/create', new PostController().createPost)
routes.get('/post', new PostController().listAll)
routes.get('/post/:idPost', new PostController().listById)
routes.delete('/post/:idPost', new PostController().destroy)


routes.get('/user', new UserController().listAll)
routes.get('/user/:idUser', new UserController().listById)
routes.put('/user/:idUser', new UserController().editUser)
routes.delete('/user/:idUser', new UserController().deleteUser)



routes.get('/profile', checkJwt, new AuthController().getProfile)




export default routes