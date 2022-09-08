import { postRepository } from './../repositories/postRepository';
import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"
import { validate } from 'class-validator';
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt"


export class UserController {

    async listAll(req: Request, res: Response) {

        try {
            const users = await userRepository.find({
                relations: {
                    post: true
                }
            })

            return res.json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }

    async createUser(req: Request, res: Response) {

        const {name, email, appartament, password} = req.body

        const userExists = await userRepository.findOneBy({email})

        if(userExists) {
            return res.json({message: "E-mail já existe"})
        }

        if(!name || !email || !appartament || !password){
            return res.status(400).json({message: "Argumentos faltando"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        try {
            const newUser = userRepository.create({
                name,
                email,
                appartament,
                password: hashPassword
            })

            await userRepository.save(newUser)

            const {password, ...user} = newUser

            return res.status(201).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal Server Error"})
        }

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

   

   
    // static editUser = async (req: Request, res: Response) => {
        
    //     const id: any = req.params.id

    //     const {name, email, appartament} = req.body

    //     const userRepository = AppDataSource.getRepository(User)
    //     let user: User

    //     try {
    //         user = await userRepository.findOneOrFail({where: id})

    //         if(name) {
    //             user.name = name
    //         }
    
    //         if(email) {
    //             user.email = email
    //         }
    
    //         if(appartament){
    //             user.appartament = appartament
    //         }

    //         try {
    //             await userRepository.save(user)
    //         } catch (error) {
    //             res.status(409).send("Email already in use")
    //         }
            
    //         const errors = await validate(user)
    //         if(errors.length > 0){
    //             res.status(400).send(errors)
    //         }
    //     } catch (error) {
    //         res.status(404).send("User not found")
    //     }

    //     res.status(204)
    // }

    static deleteUser = async (req: Request, res: Response) => {
        
        const id: any = req.params.idUser

        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try {
            user = await userRepository.findOneOrFail({where: id})
        } catch (error) {
            res.status(404).send("User not found")
        }

        userRepository.delete(id)

        res.status(204)
    }
}