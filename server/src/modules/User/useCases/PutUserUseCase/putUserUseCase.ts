import { Injectable, NotFoundException } from "@nestjs/common";
import { putUserInterface, userRepository } from "../../repositories/userRepository";
import { ifAddressExist } from "src/utils/ifAddressExist";

@Injectable()
export class putUserUseCase{
    constructor(private userRepository: userRepository, private ifAddressExist: ifAddressExist){}

    async execute(user_id: string, userReceived: putUserInterface){

      const userExist = await this.userRepository.getById(user_id)
      if(!userExist){
        throw new NotFoundException("Usuário não encontrado")
      }

      this.ifAddressExist.validateSomething(userReceived.end_id)

      const event = await this.userRepository.put(user_id, userReceived)
      return event
    }
}
