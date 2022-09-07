import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm"
import { Length, IsNotEmpty } from 'class-validator'
import { User } from "./User"

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn()
    idPost: number

    @Column({type: "text"})
    @IsNotEmpty()
    @Length(6, 300)
    content: string

    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({name: "user_id"})
    user: User

    

}