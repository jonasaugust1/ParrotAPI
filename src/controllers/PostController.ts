import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entities/Post";
import { validate } from 'class-validator';
import { userRepository } from './../repositories/userRepository';
import { postRepository } from './../repositories/postRepository';
import { FindOptionsWhere } from "typeorm";
import { User } from "../entities/User";

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


    // static listAll = async (req: Request, res: Response) => {
    //     const posts = await postRepository.find({
    //         relations: {
    //             user: true
    //         },
    //         select: {
    //             user: {
    //                 idUser: true,
    //                 name: true,
    //                 appartament: true,
    //             }
    //         }
    //     })

    //     res.status(200).send(posts)
    // };

    // static getByUser = async (req: Request, res: Response) => {
    //     const userId: FindOptionsWhere<User> = req.params.user

    //     const user = userRepository.findOneBy({userId})
    //     let post: Post

    //     try {
    //          post = await postRepository.findOneOrFail({where: userId})

    //          if(post) {
    //             res.status(200).send(post)
    //          }
    //     } catch (error) {
    //         res.status(404).send("Post not found")
    //     }

    // }

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

    // async deletePost(req: Request, res: Response) {
    //     const {idPost} = req.params;

    //     try {
    //         const post = await postRepository.findOneBy({idPost: Number(idPost)});
    //     } catch (error) {
    //         res.status(404).send("Post not found");
    //     }

    //     postRepository.delete(post);

    //     res.status(204);
    // }
};
