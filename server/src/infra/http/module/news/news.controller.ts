import { Body, Controller, Param, Post, Get } from "@nestjs/common";
import { createNewsUseCase } from "src/modules/News/useCases/CreateNewsUseCase/createNewsUseCase";
import { getNewsUseCase } from "src/modules/News/useCases/GetNewsUseCase/getNewsUseCase";
import { CreateNewsBody } from "./dtos/createNewsBody";


@Controller('news')
export class NewsController {

    constructor(private createNewsUseCase: createNewsUseCase, private getNewsUseCase: getNewsUseCase ) { }

    @Post('')
    async createCongregation(@Body() body: CreateNewsBody) {

        const { new_content, new_icon, new_title } = body
        const news = await this.createNewsUseCase.execute({ new_icon, new_content,new_title })
        return news
    }

    @Get('/:new_id')
    async getCongregationById(@Param('new_id') new_id: string) {
        const news = await this.getNewsUseCase.executeById(new_id)

        return news
    }

    @Get()
    async getCongregations(){
        const news = await this.getNewsUseCase.execute()
        return news
    }
}