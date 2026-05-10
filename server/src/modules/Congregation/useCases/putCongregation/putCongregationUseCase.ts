import { Injectable, NotFoundException } from "@nestjs/common";
import { congregationRepository, putCongregationInterface } from "../../repositories/congregationRepository"

@Injectable()
export class putCongregationUseCase{
    constructor(private congregationRepository: congregationRepository){}

    async execute(con_id: string, congregationReceived: putCongregationInterface){

      const congregationExist = await this.congregationRepository.getById(con_id)
      if(!congregationExist){
        throw new NotFoundException("Congregação não encontrada")
      }

      const congregation = await this.congregationRepository.putCongregation(con_id, congregationReceived)
      return congregation
    }
}
