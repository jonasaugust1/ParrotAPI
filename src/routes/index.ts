import {Router} from "express"
import user from "./user"
import post from "./post"
import auth from "./auth"

const routes = Router()

routes.use("/auth", auth)
routes.use("/user", user)
routes.use("/post", post)

export default routes