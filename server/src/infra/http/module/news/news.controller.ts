import { Body, Controller, Param, Post, Get, Put, Delete } from "@nestjs/common";
import { createNewsUseCase } from "src/modules/News/useCases/CreateNewsUseCase/createNewsUseCase";
import { getNewsUseCase } from "src/modules/News/useCases/GetNewsUseCase/getNewsUseCase";
import { CreateNewsBody } from "./dtos/createNewsBody";
import { type putNewsInterface } from "src/modules/News/repositories/newsRepository";
import { putNewsUseCase } from "src/modules/News/useCases/putNewsUseCase/putNewsUseCase";
import { deleteNewsByIdUseCase } from "src/modules/News/useCases/deleteNewsUseCase/deleteNewsUseCase";


@Controller('news')
export class NewsController {

    constructor(private createNewsUseCase: createNewsUseCase, private getNewsUseCase: getNewsUseCase, private putNewsUseCase: putNewsUseCase, private deleteNewsUseCase: deleteNewsByIdUseCase ) { }

    @Post('')
    async createNews(@Body() body: CreateNewsBody) {

        const { new_content, new_icon, new_title } = body
        const news = await this.createNewsUseCase.execute({ new_icon, new_content,new_title })
        return news
    }

    @Get('/:new_id')
    async getNewsById(@Param('new_id') new_id: string) {
        const news = await this.getNewsUseCase.executeById(new_id)

        return news
    }

    @Get()
    async getNews(){
        const news = await this.getNewsUseCase.execute()
        return news
    }

    @Put("/:new_id")
    async putNews(@Param("new_id") new_id: string, @Body() body: putNewsInterface){
        const news = await this.putNewsUseCase.execute(new_id, body)
        return news
    }

    @Delete('/:new_id')
    async deleteNews(@Param('new_id') new_id: string){
        const news = await this.deleteNewsUseCase.execute(new_id)
        return news
    }
}