import { User } from "../entities/User";
import { userRepository } from "./userRepository";

export class mockUserRepository implements userRepository {

    public users: User[] = []

    async create(user: User): Promise<void> {
        this.users.push(user);
    }

    async get(): Promise<User[]> {
        return this.users;
    }

    async getById(user_id: string): Promise<User | null> {
        return this.users.find(u => u.get_user_id === user_id) ?? null;
    }
}
