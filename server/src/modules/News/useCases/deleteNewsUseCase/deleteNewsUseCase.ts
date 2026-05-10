import { Injectable, NotFoundException } from "@nestjs/common"
import { newsRepository as NewsRepository} from "../../repositories/newsRepository"

@Injectable()
export class deleteNewsByIdUseCase {
    constructor(private newsRepository: NewsRepository) { }

    async execute(new_id: string) {

        const newsExisits = await this.newsRepository.getById(new_id)
        if(!newsExisits){
            throw new NotFoundException("Evento não encontrado")
        }
        
        return await this.newsRepository.delete(new_id)
    }
}