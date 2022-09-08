import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entities/Post";
import { validate } from 'class-validator';

export class PostController {

    static listAll = async (req: Request, res: Response) => {
        const postRepository = AppDataSource.getRepository(Post)
        const posts = await postRepository.find({select: ["idPost", "content", "user"]})

        res.status(200).send(posts)
    };

    static getByUser = async (req: Request, res: Response) => {
        const userId: any = req.params.user

        const postRepository = AppDataSource.getRepository(Post)
        let post: Post

        try {
             post = await postRepository.findOneOrFail({where: userId})

             if(post) {
                res.status(200).send(post)
             }
        } catch (error) {
            res.status(404).send("Post not found")
        }

    }

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

            if(content) {
                post.content = content
                res.status(204)
            }

            const errors = await validate(post)

            if(errors.length > 0){
                res.status(400).send(errors)
            }

        } catch (error) {
            res.status(404).send("Post not found")
        }
        
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
