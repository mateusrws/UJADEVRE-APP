import { NotFoundException } from "@nestjs/common";
import { congregationRepository } from "../../repositories/congregationRepository"
import { Congregation } from "../../entities/Congregation";
import { mockAddressRepository } from "src/modules/Address/repositories/mockAddressRepository";

interface  CreateCongregationRequest{
  con_name: string;
  end_id: string;
}


export class mockCreateCongregationUseCase{
    constructor(private congregationRepository: congregationRepository, private mockAddressRepository: mockAddressRepository){}

    

    async execute({ con_name, end_id  }: CreateCongregationRequest){
      

      // const congregationAlreadyExists = await this.congregationRepository.findByname(con_name)
        
      // if(congregationAlreadyExists){
      //     throw new Error("Congregation already exists")
      // }

      const addressExist = await this.mockAddressRepository.getById(end_id)
      if(!addressExist ){
        throw new NotFoundException("Endereço não encontrado")
      }


      const congregation = new Congregation({ con_name, end_id })
      await this.congregationRepository.create(congregation);
      return congregation
    }

}
