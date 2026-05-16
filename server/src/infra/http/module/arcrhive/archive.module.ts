import { Module } from "@nestjs/common";
import { ArchiveController } from "./archive.controller";
import { archiveUploadUseCase } from "src/modules/archives/archivesUploadUseCase";
import { putUserUseCase } from "src/modules/User/useCases/PutUserUseCase/putUserUseCase";
import { DataBaseModule } from "src/infra/database/database.module";
import { ifAddressExist } from "src/utils/ifAddressExist";
import { getAddressByIdUseCase } from "src/modules/Address/useCases/getAddressByIdUseCase/getAddressByIdUseCase";
import { putRegistrationUseCase } from "src/modules/Registration/useCases/putRegistrationUseCase/putRegistrationUseCase";


@Module({
    imports: [DataBaseModule],
    controllers: [ArchiveController],
    providers: [
        archiveUploadUseCase,
        putUserUseCase,
        ifAddressExist,
        getAddressByIdUseCase,
        putRegistrationUseCase
    ]
})

export class ArchiveModule { }