import { Injectable, NotFoundException } from "@nestjs/common";
import { congregationRepository } from "../../repositories/congregationRepository"
import { Congregation } from "../../entities/Congregation";
import { addressRepository } from "../../../Address/repositories/addressRepository";

interface  CreateCongregationRequest{
  con_name: string;
  end_id: string;
}


@Injectable()
export class createCongregationUseCase{
    constructor(private congregationRepository: congregationRepository, private addressRepository: addressRepository){}

    

    async execute({ con_name, end_id  }: CreateCongregationRequest){
      

      // const congregationAlreadyExists = await this.congregationRepository.findByname(con_name)
        
      // if(congregationAlreadyExists){
      //     throw new Error("Congregation already exists")
      // }

      const addressExist = await this.addressRepository.getById(end_id)
      if(!addressExist){
        throw new NotFoundException("Endereço não encontrado")
      }


      const congregation = new Congregation({ con_name, end_id })
      await this.congregationRepository.create(congregation);
      return congregation
    }

}
