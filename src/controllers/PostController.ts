import { Request, Response } from "express";
import { userRepository } from './../repositories/userRepository';
import { postRepository } from './../repositories/postRepository';

export class PostController {

    async listAll(req: Request, res: Response) {

        try {
            const users = await postRepository.find({
                relations: {
                    user: true
                }
            })

            return res.json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async listById (req: Request, res: Response){
        const idLogado = req.user.idUser;
        const userPosts = await postRepository.find({
            where:{
                    user:{
                            idUser:idLogado
                    }
        }});
        return res.json(userPosts)
    }

    async listById (req: Request, res: Response){
        const {idPost} = req.params;
        const userPosts = await postRepository.findOneBy({idPost: Number(idPost)})
        return res.json(userPosts)
    }

    async createPost(req: Request, res: Response) {
        const {content} = req.body
        const {idUser} = req.params
        try {
            const user = await userRepository.findOneBy({idUser: Number(idUser)})

            if(!user){
                return res.status(404).json({message: "Usuário não existe"})
            }

            const newPost = postRepository.create({
                content,
                user
            })

            await postRepository.save(newPost)

            return res.status(201).json(newPost)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async destroy(req: Request, res: Response) {
        try {
          const { idPost } = req.params;

          const postDestroy = await postRepository.findOneBy({idPost: Number(idPost)});

          if (!postDestroy) {
            return res.status(404).json("Id not found")
          } else {
            await postRepository.delete(idPost)

<<<<<<< HEAD
    //     res.status(204);
    // }

    async destroy(req: Request, res: Response) {
        try {
          const { idPost } = req.params;
    
          const postDestroy = await postRepository.findOneBy({idPost: Number(idPost)});
    
          if (!postDestroy) {
            return res.status(404).json("Id not found")
          } else {
            await postRepository.delete(idPost)
    
=======
>>>>>>> 61ff5ca3a354e83e169cc66503b65b43066c9fa6
          res.status(204).json(`${idPost} deleted`);
          }
        } catch (error) {
          return res.status(400);
        }
      }
};
