import { Injectable } from "@nestjs/common";
import { userRepository } from "../repositories/userRepository";
import { User } from "../entities/User";

interface CreateUserRequest {
  user_name: string;
  user_email: string;
  user_tel: string;
  user_senha: string;
  user_tipo: string;
  user_data_nasc: Date;
  user_bio: string;
  user_cpf: string;
  user_foto_url: string;
  con_id: string;
  end_id: string;
}

@Injectable()
export class createUserUseCase{
    constructor(private userRepository: userRepository){}

    

    async execute({ user_name, user_email, con_id, end_id, user_bio, user_cpf, user_data_nasc,user_foto_url, user_point, user_senha, user_tel, user_tipo  }: CreateUserRequest){
        const user = new User({ user_name, user_email, con_id, end_id, user_bio, user_cpf, user_data_nasc,user_foto_url, user_point, user_senha, user_tel, user_tipo  })

        await this.userRepository.create(user);
        return user
    }

}
