import { Injectable, NotFoundException } from "@nestjs/common";
import { eventRepository, putEventInterface } from "../../repositories/eventRepository";
import { ifAddressExist } from "src/utils/ifAddressExist";



@Injectable()
export class putEventUseCase{
    constructor(private eventRepository: eventRepository, private ifAddressExist: ifAddressExist){}

    async execute(eve_id: string, eventReceived: putEventInterface){

      const congregationExist = await this.eventRepository.getById(eve_id)
      if(!congregationExist){
        throw new NotFoundException("Evento não encontrado")
      }

      this.ifAddressExist.validateSomething(eventReceived.end_id)

      const event = await this.eventRepository.put(eve_id, eventReceived)
      return event
    }
}
