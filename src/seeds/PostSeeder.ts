import { DataSource } from 'typeorm';
import {Seeder, SeederFactoryManager} from 'typeorm-extension'
import { Post } from '../entities/Post';

export class PostSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
       const postRepository = dataSource.getRepository(Post)

       const postData = {
        content: "Post criado pela Seeder",
       }

       const newPost = postRepository.create(postData)
       await postRepository.save(newPost)
    }

}