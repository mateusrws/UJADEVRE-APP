import { Injectable, NotFoundException } from "@nestjs/common";
import { ifAddressExist } from "src/utils/ifAddressExist";
import { newsRepository, putNewsInterface } from "../../repositories/newsRepository";



@Injectable()
export class putNewsUseCase{
    constructor(private newsRepository: newsRepository){}

    async execute(new_id: string, newsReceived: putNewsInterface){

      const mewsExist = await this.newsRepository.getById(new_id)
      if(!mewsExist){
        throw new NotFoundException("Notícia não encontrada")
      }

      const news = await this.newsRepository.put(new_id, newsReceived)
      return news
    }
}
