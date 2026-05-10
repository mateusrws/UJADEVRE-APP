import { NotFoundException } from "@nestjs/common";
import { User } from "../entities/User";
import { putUserInterface, userRepository } from "./userRepository";

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

    async put(user_id: string, userReceived: putUserInterface): Promise<String> {
        const user = this.users.find(u => u.get_user_id == user_id)

        if(!user) throw new NotFoundException("Usuário não existe")

        user.set_user_tel = userReceived.user_tel
        user.set_user_name = userReceived.user_cpf
        user.set_user_foto_url = userReceived.user_foto_url
        user.set_user_email = userReceived.user_email
        user.set_user_desc = userReceived.user_desc
        user.set_user_data_nasc = userReceived.user_data_nasc
        user.set_user_cpf = userReceived.user_cpf
        user.set_end_id = userReceived.end_id
        user.set_con_id = userReceived.con_id
        
        return "Usuário alterado com sucesso"
    }

    async delete(user_id:string): Promise<String>{
        const user = this.users.find(u => u.get_user_id == user_id)

        if(!user) throw new NotFoundException("Usuário não existe")

        this.users.splice(this.users.indexOf(user),1)

        return "Usuário deletado com sucesso"
    }
}
