import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entities/Post";
import { validate } from 'class-validator';

export class PostController {

    static listAll = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(Post)
        const posts = await userRepository.find({select: ["idPost", "content", "user"]})

        res.send(posts)
    };

    static newPost = async (req: Request, res: Response) => {
        let {content} = req.body

        let post: Post = new Post()
        post.content = content

        const errors = await validate(post)

        if(errors.length > 0) {
            res.status(400).send(errors);
        }
    };

    static editPost = async (req: Request, res: Response) => {
        
        const id: any = req.params.idPost;

        const {content} = req.body;

        const userRepository = AppDataSource.getRepository(Post);
        let post: Post;

        try {
            post = await userRepository.findOneOrFail({where: id})
        } catch (error) {
            res.status(404).send("Post not found")
        }

        if(content) {
            post.content = content
        }

        const errors = await validate(post)
        if(errors.length > 0){
            res.status(400).send(errors)
        }

        res.status(204)
    }

    static deletePost = async (req: Request, res: Response) => {
            
        const id: any = req.params.idPost;

        const postRepository = AppDataSource.getRepository(Post);
        let post: Post;

        try {
            post = await postRepository.findOneOrFail({where: id});
        } catch (error) {
            res.status(404).send("Post not found");
        }

        postRepository.delete(id);

        res.status(204);
    };

};
