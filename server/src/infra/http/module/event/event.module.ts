import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { EventController } from "./event.controller";
import { createEventUseCase } from "src/modules/Event/useCases/CreateEventUseCase/createEventUseCase";
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [EventController],
    providers: [createEventUseCase, getEventUseCase]
})
export class EventModule { }