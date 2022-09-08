import { validate } from 'class-validator';
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import config from "../config/config";

class AuthController {
    static login = async (req: Request, res: Response) => {
        let {email, password} = req.body

        if( !(email && password) ) {
            return res.status(404).send()
        }

        const userRepository = AppDataSource.getRepository(User)
        let user: User

        try {
            user = await userRepository.findOneOrFail({where: {email}})
        } catch (error) {
            return res.status(401).send("User not found")
        }

        if( !user.checkIfUnencryptedPasswordIsValid(password) ){
            return res.status(401).send("Password or user is invalid")
        }

        const token = jwt.sign(
            {
             userId: user.idUser,
             email: user.email
            },
             config.jwtSecret!,
             {expiresIn: "1h"}
        )
        console.log(token)
        return res.send(token)
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