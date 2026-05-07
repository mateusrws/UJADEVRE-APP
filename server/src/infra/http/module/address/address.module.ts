import { Module } from "@nestjs/common";
import { AddressController } from "./address.controller";
import { createAddressUseCase } from "src/modules/Address/useCases/createAddresUseCase/createAddresUseCase";
import { DataBaseModule } from "src/infra/database/database.module";
import { getAddressUseCase } from "src/modules/Address/useCases/getAddressUseCase/getAddressUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [AddressController],
    providers: [createAddressUseCase, getAddressUseCase]
})
export class AdressModule{}