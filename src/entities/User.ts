import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany
} from "typeorm"
import { Length, IsNotEmpty, IsEmail } from 'class-validator'
import * as bcrypt from 'bcryptjs'
import { Post } from "./Post"

@Entity('users')
@Unique(["email"])
export class User {

    @PrimaryGeneratedColumn()
    idUser: number

    @Column({type: "text"})
    @IsNotEmpty()
    name: string

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Column()
    @IsNotEmpty()
    appartament: string

    @Column()
    @Length(6, 100)
    password: string

    @OneToMany(() => Post, (post) => post.user)
    post: Post[]

    

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(uncryptedPassword: string) {
        return bcrypt.compareSync(uncryptedPassword, this.password)
    }

}