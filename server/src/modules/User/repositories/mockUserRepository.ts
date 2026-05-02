import { User } from "../entities/User";
import { userRepository } from "./userRepository";


export class mockUserRepository implements userRepository{

    public users: User[] = []

    async create(user: User): Promise<void> {
        this.users.push(user);
    }

}