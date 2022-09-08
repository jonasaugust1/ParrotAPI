import { validate } from 'class-validator';
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import config from "../config/config";
import { userRepository } from '../repositories/userRepository';
import bcrypt from "bcrypt"



class AuthController {
    async login(req: Request, res: Response) {

        const {email, password} = req.body

        const user = await userRepository.findOneBy({email})

        if(!user) {
            return res.json({message: "E-mail ou senha inválidos"})
        }

        const verifyPass = await bcrypt.compare(password, user.password)

        if(!verifyPass) {
            return res.json({message: "E-mail ou senha inválidos"})
        }

        const token = jwt.sign(
            {id: user.idUser}, 
            process.env.JWT_SECRET ?? '',
            {expiresIn: '1h'}
        )

        const {password: _, ...userLogin} = user

        return res.json({
            user: userLogin,
            token: token
        })
    }

    async getProfile(req: Request, res: Response) {
        return res.json(req.user)
    }
 

    static changePassword = async (req:Request, res: Response) => {
        
        const id = res.locals.jwtPayload.idUser
        const {oldPassword, newPassword} = req.body

        if( !(oldPassword && newPassword) ) {
            return res.status(400).send()
        }

        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try {
            user = await userRepository.findOneOrFail({where: id})
        } catch (error) {
            return res.status(401).send("User not found")
        }

        if( !user.checkIfUnencryptedPasswordIsValid(oldPassword) ) {
            return res.status(401).send("Old password not match")
        }

        user.password = newPassword
        const errors = await validate(user)

        if(errors.length > 0) {
            return res.status(400).send(errors)
        }

        user.hashPassword()
        userRepository.save(user)

        res.status(204).send("Password changed")
    }
}

export default AuthController