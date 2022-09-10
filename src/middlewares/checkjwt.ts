import { Router, Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import 'dotenv/config'
import { userRepository } from "../repositories/userRepository";

type JwtPayload = {
    idUser: number
}

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    const token = authorization.split(" ")[1]

    const { idUser } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload

    const user = await userRepository.findOneBy({ idUser })
    if (!user) {
        return res.status(401).json({ message: "Não autorizado" })
    }

    const { password: _, ...loggedUser } = user

    req.user = loggedUser
    
    next()
}

