import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { RegistrationController } from "./registration.controller";
import { createRegistrationUseCase } from "src/modules/Registration/useCases/createRegistrationUseCase/createRegistrationUseCase";
import { getRegistrationsUseCase } from "src/modules/Registration/useCases/getRegistrationUseCase/getRegistrationUseCase";
import { putRegistrationUseCase } from "src/modules/Registration/useCases/putRegistrationUseCase/putRegistrationUseCase";
import { deleteRegistrationByIdUseCase } from "src/modules/Registration/useCases/deleteRegistrationUseCase/deleteRegistrationUseCase";
import { paymentRegistrationUseCase } from "src/modules/Registration/useCases/paymentRegistration/paymentRegistrationUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [RegistrationController],
    providers: [createRegistrationUseCase, getRegistrationsUseCase, putRegistrationUseCase, deleteRegistrationByIdUseCase, paymentRegistrationUseCase]
})
export class RegistrationModule { }