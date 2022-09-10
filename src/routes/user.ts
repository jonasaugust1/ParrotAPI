import { UserController } from '../controllers/UserController';
import {Router} from 'express';
import { checkJwt } from '../middlewares/checkjwt';

const routes = Router()

routes.post('/user', new UserController().createUser)

routes.get('/user', checkJwt, new UserController().listAll)
routes.get('/user/:idUser', checkJwt, new UserController().listById)
routes.put('/user/:idUser', checkJwt, new UserController().editUser)
routes.delete('/user/:idUser', checkJwt, new UserController().deleteUser)

export default routes
