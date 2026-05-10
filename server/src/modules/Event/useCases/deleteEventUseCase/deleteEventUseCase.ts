import { Injectable, NotFoundException } from "@nestjs/common"
import { eventRepository as EventRepository } from "../../repositories/eventRepository"

@Injectable()
export class deleteEventByIdUseCase {
    constructor(private eventRepostory: EventRepository) { }

    async execute(con_id: string) {

        const eventExisits = await this.eventRepostory.getById(con_id)
        if(!eventExisits){
            throw new NotFoundException("Evento não encontrado")
        }
        
        return await this.eventRepostory.delete(con_id)
    }
}