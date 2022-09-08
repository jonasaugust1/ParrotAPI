import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"
import { validate } from 'class-validator';

export class UserController {

    static listAll = async (req: Request, res: Response) => {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find({select: ["idUser", "name", "email", "appartament",]})

        res.send(users)
    }

    static getOneById = async (req: Request, res: Response) => {
        const id: any = req.params.idUser

        const userRepository = AppDataSource.getRepository(User)
        let user: User
        try {
            user = await userRepository.findOneOrFail({where: id})
            res.status(200).send(user)
        } catch (error) {
            res.status(404).send("User not found")
        }

        
    }

    static newUser = async (req: Request, res: Response) => {
        let {name, email, appartament, password} = req.body

        let user: User = new User()
        user.name = name
        user.email = email
        user.appartament = appartament
        user.password = password

        const errors = await validate(user)

        if(errors.length > 0) {
            res.status(400).send(errors)
        }

        user.hashPassword()

        const userRepository = AppDataSource.getRepository(User)

        try {
            await userRepository.save(user)
        } catch (error) {
            res.status(400).send(error)
        }

        res.status(201).send("User created")
    }

    static editUser = async (req: Request, res: Response) => {
        
        const id: any = req.params.id

        const {name, email, appartament} = req.body

        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try {
            user = await userRepository.findOneOrFail({where: id})
        } catch (error) {
            res.status(404).send("User not found")
        }

        if(name) {
            user.name = name
        }

        if(email) {
            user.email = email
        }

        if(appartament){
            user.appartament = appartament
        }

        const errors = await validate(user)
        if(errors.length > 0){
            res.status(400).send(errors)
        }

        try {
            await userRepository.save(user)
        } catch (error) {
            res.status(409).send("Email already in use")
        }

        res.status(204)
    }

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