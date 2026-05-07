import { Injectable } from "@nestjs/common";
import { userRepository } from "../../repositories/userRepository";

@Injectable()
export class getUserUseCase {
    constructor(private userRepository: userRepository) { }

    async execute() {
        const users = await this.userRepository.get();
        return users.map(user => ({
            user_id: user.get_user_id,
            user_name: user.get_user_name,
            user_email: user.get_user_email,
            user_tel: user.get_user_tel,
            user_tipo: user.get_user_tipo,
            user_point: user.get_user_point,
            con_id: user.get_con_id,
            end_id: user.get_end_id,
        }));
    }

    async executeById(user_id: string) {
        const user = await this.userRepository.getById(user_id);
        if (!user) throw new Error("User not found!");
        return {
            user_id: user.get_user_id,
            user_name: user.get_user_name,
            user_email: user.get_user_email,
            user_cpf: user.get_user_cpf,
            user_data_nasc: user.get_user_data_nasc,
            user_tel: user.get_user_tel,
            user_tipo: user.get_user_tipo,
            user_point: user.get_user_point,
            user_foto_url: user.get_user_foto_url,
            user_senha: user.get_user_senha,
            user_bio: user.get_user_desc,
            createdAt: user.get_user_createdAt,
            updatedAt: new Date(),
            con_id: user.get_con_id,
            end_id: user.get_end_id,
        };
    }
}
