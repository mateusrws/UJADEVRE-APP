import { Module } from "@nestjs/common";
import { AddressController } from "./address.controller";
import { createAddressUseCase } from "src/modules/Address/useCases/createAddresUseCase/createAddresUseCase";
import { DataBaseModule } from "src/infra/database/database.module";
import { getAddressUseCase } from "src/modules/Address/useCases/getAddressUseCase/getAddressUseCase";
import { putAddressUseCase } from "src/modules/Address/useCases/putAddressUseCase/putAddressUseCase";
import { deleteAddressByIdUseCase } from "src/modules/Address/useCases/deleteAddressUseCase/deleteAddressUseCase";
import { ifAddressExist } from "src/utils/ifAddressExist";
import { getAddressByIdUseCase } from "src/modules/Address/useCases/getAddressByIdUseCase/getAddressByIdUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [AddressController],
    providers: [createAddressUseCase, getAddressUseCase, putAddressUseCase, deleteAddressByIdUseCase, ifAddressExist, getAddressByIdUseCase]
})
export class AdressModule{}