import { Injectable } from "@nestjs/common";
import { congregationRepository } from "../../repositories/congregationRepository"

@Injectable()
export class getCongregationUseCase{
    constructor(private congregationRepository: congregationRepository){}

    async executeById(con_id: string){
      const congregation = await this.congregationRepository.getById(con_id)
      return congregation
    }

    async execute(){
      const congregations = await this.congregationRepository.getCongregations()
      return congregations
    }

}
