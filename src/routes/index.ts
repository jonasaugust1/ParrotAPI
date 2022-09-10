import { Router} from "express";
import login from "./login";
import user from "./user";
import post from "./post";

const routes = Router();

routes.use("/", login)
routes.use("/", user)
routes.use("/", post)


export default routes;
