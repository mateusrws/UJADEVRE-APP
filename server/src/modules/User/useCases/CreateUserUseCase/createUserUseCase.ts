import { Injectable } from "@nestjs/common";
import { userRepository } from "../../repositories/userRepository";
import { User } from "../../entities/User";
import { TypeUser } from "types/enums/userTypeEnum";
import { congregationRepository } from "../../../Congregation/repositories/congregationRepository";
import { addressRepository } from "../../../Address/repositories/addressRepository";

interface CreateUserRequest {
  user_name: string;
  user_email: string;
  user_tel: string;
  user_senha: string;
  user_tipo: TypeUser;
  user_data_nasc: Date;
  user_desc: string;
  user_cpf: string;
  user_foto_url: string;
  con_id: string;
  end_id: string;
}

@Injectable()
export class createUserUseCase {
  constructor(private userRepository: userRepository, private congregationRepository: congregationRepository, private addressrepository: addressRepository) {}


  async execute({ user_name, user_email, con_id, end_id, user_desc, user_cpf, user_data_nasc, user_foto_url, user_senha, user_tel, user_tipo }: CreateUserRequest) {

    const congregation = await this.congregationRepository.getById(con_id)
    console.log(end_id)
    const address = await this.addressrepository.getById(end_id)

    if(!congregation || !address){
      throw new Error("Endereço ou congregação não encontrado");
    }


    const user = new User({ user_name, user_email, con_id, end_id, user_desc, user_cpf, user_data_nasc, user_foto_url, user_senha, user_tel, user_tipo })

    await this.userRepository.create(user);
    return user
  }

}
