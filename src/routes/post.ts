import { PostController } from '../controllers/PostController';
import {Router} from 'express'
import { checkJwt } from '../middlewares/checkjwt';

const routes = Router()

routes.post('/post/:idUser/create', checkJwt, new PostController().createPost)
routes.get('/post', checkJwt, new PostController().listAll)

routes.get('/post/:idPost', checkJwt, new PostController().listById)
routes.delete('/post/:idPost', checkJwt, new PostController().destroy)

export default routes