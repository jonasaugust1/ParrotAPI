import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";


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
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }

    async listById(req: Request, res: Response) {
        const { idUser } = req.params

        try {
            const user = await userRepository.findOneBy({ idUser: Number(idUser) })

            if (!user) {
                res.status(400).send("User not found")
            }

            return res.json(user)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal Server Error" })
        }
    }

    async createUser(req: Request, res: Response) {

        const { name, email, appartament, password } = req.body

        const userExists = await userRepository.findOneBy({ email })

        if (userExists) {
            return res.json({ message: "E-mail já existe" })
        }

        if (!name || !email || !appartament || !password) {
            return res.status(400).json({ message: "Argumentos faltando" })
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

            const { password, ...user } = newUser

            return res.status(201).json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal Server Error" })
        }

    }

    async editUser(req: Request, res: Response) {

        const { idUser } = req.params

        const { name, email, appartament } = req.body

        const userExists = await userRepository.findOneBy({ email })

        if (userExists) {
            return res.json({ message: "E-mail já existe" })
        }

        try {
            const user = await userRepository.findOneBy({ idUser: Number(idUser) })

            if (!user) {
                return res.status(404).json({ message: "Usuário não existe" })
            }

            const editedUser = userRepository.update(idUser, {
                ...user,
                name,
                email,
                appartament
            })

            res.status(204).json(editedUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal Server Error" })
        }

    }

    async deleteUser(req: Request, res: Response) {

        const { idUser } = req.params

        try {
            const user = await userRepository.findOneBy({ idUser: Number(idUser) })
        } catch (error) {
            res.status(404).send("User not found")
        }

        userRepository.delete(idUser)

        res.status(204)
    }
}