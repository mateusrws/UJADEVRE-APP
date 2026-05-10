import { Injectable, NotFoundException } from "@nestjs/common"
import { congregationRepository } from "../../repositories/congregationRepository"

@Injectable()
export class deleteCongregationByIdUseCase {
    constructor(private congregationRepository: congregationRepository) { }

    async execute(con_id: string) {

        const congregationExist = await this.congregationRepository.getById(con_id)
        if(!congregationExist){
            throw new NotFoundException("Congregação não encontrada")
        }
        
        return await this.congregationRepository.deleteCongregation(con_id)
    }
}