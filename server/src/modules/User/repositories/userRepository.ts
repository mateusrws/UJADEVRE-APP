import { User } from "../entities/User";

export abstract class userRepository {
    abstract create(user: User): Promise<void>;
    abstract get(): Promise<User[]>;
    abstract getById(user_id: string): Promise<User | null>;
}
