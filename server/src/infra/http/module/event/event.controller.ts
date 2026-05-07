import { Body, Controller, Param, Post, Get } from "@nestjs/common";
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase";
import { createEventUseCase } from "src/modules/Event/useCases/CreateEventUseCase/createEventUseCase";
import { CreateEventBody } from "./dtos/createEventBody";


@Controller('event')
export class EventController {

    constructor(private createEventUseCase: createEventUseCase, private getEventUseCase: getEventUseCase ) { }

    @Post('')
    async createCongregation(@Body() body: CreateEventBody) {

        const { end_id, eve_data_and_time, eve_desc, eve_icon, eve_max_participants, eve_nome, eve_participants, eve_point, eve_price } = body
        const event = await this.createEventUseCase.execute({ end_id, eve_data_and_time, eve_desc, eve_icon, eve_max_participants, eve_nome, eve_participants, eve_point, eve_price })
        return event
    }

    @Get('/:eve_id')
    async getCongregationById(@Param('eve_id') con_id: string) {
        const event = await this.getEventUseCase.executeById(con_id)

        return event
    }

    @Get()
    async getCongregations(){
        const events = await this.getEventUseCase.execute()
        return events
    }
}