import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { EventController } from "./event.controller";
import { createEventUseCase } from "src/modules/Event/useCases/CreateEventUseCase/createEventUseCase";
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase";
import { putEventUseCase } from "src/modules/Event/useCases/putEventUseCase/putEventUseCase";
import { ifAddressExist } from "src/utils/ifAddressExist";
import { getAddressByIdUseCase } from "src/modules/Address/useCases/getAddressByIdUseCase/getAddressByIdUseCase";
import { deleteEventByIdUseCase } from "src/modules/Event/useCases/deleteEventUseCase/deleteEventUseCase";
import { createAddressUseCase } from "src/modules/Address/useCases/createAddresUseCase/createAddresUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [EventController],
    providers: [
        createEventUseCase,
        getEventUseCase,
        putEventUseCase,
        ifAddressExist,
        getAddressByIdUseCase,
        deleteEventByIdUseCase,
        createAddressUseCase
    ]
})
export class EventModule { }