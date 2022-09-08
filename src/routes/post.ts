import {Router} from "express"
import {PostController} from '../controllers/PostController'

const router = Router()

// Get ALl
router.get("/", PostController.listAll)

// Get by User
router.get("/:id", PostController.getByUser)

router.post("/", PostController.newPost)

router.put("/:id", PostController.editPost)

router.delete('/:id', PostController.deletePost)

export default router

