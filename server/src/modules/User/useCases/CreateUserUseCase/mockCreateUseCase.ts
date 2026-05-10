import { User } from "../../entities/User";
import { TypeUser } from "types/enums/userTypeEnum";
import { mockUserRepository } from "../../repositories/mockUserRepository";
import { MockCongregationRepository } from "src/modules/Congregation/repositories/mockCongregationRepository";
import { mockAddressRepository } from "src/modules/Address/repositories/mockAddressRepository";

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


export class mockCreateUserUseCase {
  constructor(private mockUserRepository: mockUserRepository, private mockCongregationRepository: MockCongregationRepository, private mockAddressrepository: mockAddressRepository) {}


  async execute({ user_name, user_email, con_id, end_id, user_desc, user_cpf, user_data_nasc, user_foto_url, user_senha, user_tel, user_tipo }: CreateUserRequest) {

    const congregation = await this.mockCongregationRepository.getById(con_id)

    const address = await this.mockAddressrepository.getById(end_id)

    if(!congregation || !address){
      throw new Error("Endereço ou congregação não encontrado");
    }


    const user = new User({ user_name, user_email, con_id, end_id, user_desc, user_cpf, user_data_nasc, user_foto_url, user_senha, user_tel, user_tipo })

    await this.mockUserRepository.create(user);
    return user
  }

}
