import { Injectable } from "@nestjs/common";
import { congregationRepository } from "../../repositories/congregationRepository"
import { Congregation } from "../../entities/Congregation";

interface  CreateCongregationRequest{
  con_name: string;
  end_id: string;
}


@Injectable()
export class createCongregationbUseCase{
    constructor(private congregationRepository: congregationRepository){}

    

    async execute({ con_name, end_id  }: CreateCongregationRequest){
        const congregation = new Congregation({ con_name, end_id })

        await this.congregationRepository.create(congregation);
        return congregation
    }

}
