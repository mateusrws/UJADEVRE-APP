import { Body, Controller, Param, Post, Get, Put, Delete } from "@nestjs/common";
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase";
import { createEventUseCase } from "src/modules/Event/useCases/CreateEventUseCase/createEventUseCase";
import { CreateEventBody } from "./dtos/createEventBody";
import { putEventInterface } from "src/modules/Event/repositories/eventRepository";
import { putEventUseCase } from "src/modules/Event/useCases/putEventUseCase/putEventUseCase";
import { deleteEventByIdUseCase } from "src/modules/Event/useCases/deleteEventUseCase/deleteEventUseCase";


@Controller('event')
export class EventController {

    constructor(private createEventUseCase: createEventUseCase, private getEventUseCase: getEventUseCase, private putEventUseCase: putEventUseCase, private deleteEventUseCase: deleteEventByIdUseCase ) { }

    @Post('')
    async createEvent(@Body() body: CreateEventBody) {

        const { end_id, eve_data_and_time, eve_desc, eve_icon, eve_max_participants, eve_nome, eve_participants, eve_point, eve_price } = body
        const event = await this.createEventUseCase.execute({ end_id, eve_data_and_time, eve_desc, eve_icon, eve_max_participants, eve_nome, eve_participants, eve_point, eve_price })
        return event
    }

    @Get('/:eve_id')
    async getEventById(@Param('eve_id') con_id: string) {
        const event = await this.getEventUseCase.executeById(con_id)

        return event
    }

    @Get()
    async getEvents(){
        const events = await this.getEventUseCase.execute()
        return events
    }

    @Put("/:eve_id")
    async putEvent(@Param("eve_id") con_id, @Body() body: putEventInterface){
        const putCongregation = await this.putEventUseCase.execute(con_id, body)

        return putCongregation
    }

    @Delete("/:eve_id")
    async deleteEvent(@Param("eve_id") eve_id: string){
        await this.deleteEventUseCase.execute(eve_id)

        return "Evento deletado com sucesso"
    }
}