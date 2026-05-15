import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { RegistrationController } from "./registration.controller";
import { createRegistrationUseCase } from "src/modules/Registration/useCases/createRegistrationUseCase/createRegistrationUseCase";
import { getRegistrationsUseCase } from "src/modules/Registration/useCases/getRegistrationUseCase/getRegistrationUseCase";
import { putRegistrationUseCase } from "src/modules/Registration/useCases/putRegistrationUseCase/putRegistrationUseCase";
import { deleteRegistrationByIdUseCase } from "src/modules/Registration/useCases/deleteRegistrationUseCase/deleteRegistrationUseCase";
import { paymentRegistrationUseCase } from "src/modules/Registration/useCases/paymentRegistration/paymentRegistrationUseCase";
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase";
import { putEventUseCase } from "src/modules/Event/useCases/putEventUseCase/putEventUseCase";
import { toggleIsValdUseCase } from "src/modules/Registration/useCases/toggleIsValidUseCase/toggleIsValidUseCase";
import { checkInUseCase } from "src/modules/Registration/useCases/checkInUseCase/checkInUseCase";
import { ifAddressExist } from "src/utils/ifAddressExist";
import { getAddressByIdUseCase } from "src/modules/Address/useCases/getAddressByIdUseCase/getAddressByIdUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [RegistrationController],
    providers: [
        createRegistrationUseCase,
        getRegistrationsUseCase,
        putRegistrationUseCase,
        deleteRegistrationByIdUseCase,
        paymentRegistrationUseCase,
        getEventUseCase,
        putEventUseCase,
        ifAddressExist,
        getAddressByIdUseCase,
        toggleIsValdUseCase,
        checkInUseCase
    ]
})
export class RegistrationModule { }