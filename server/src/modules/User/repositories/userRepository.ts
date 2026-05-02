import { User } from "../entities/User";


export abstract class userRepository{
    abstract create(congrtegation: User): Promise<void>;
}