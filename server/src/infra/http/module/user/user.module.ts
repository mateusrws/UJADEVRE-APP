import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { UserController } from "./user.controller";
import { createUserUseCase } from "../../../../modules/User/useCases/CreateUserUseCase/createUserUseCase";
import { getUserUseCase } from "src/modules/User/useCases/GetUserUseCase/getUserUseCase";
import { putUserUseCase } from "src/modules/User/useCases/PutUserUseCase/putUserUseCase";
import { ifAddressExist } from "src/utils/ifAddressExist";
import { getAddressByIdUseCase } from "src/modules/Address/useCases/getAddressByIdUseCase/getAddressByIdUseCase";
import { deleteUserByIdUseCase } from "src/modules/User/useCases/deleteUserUseCase/deleteUserUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [UserController],
    providers: [createUserUseCase, getUserUseCase, putUserUseCase, ifAddressExist, getAddressByIdUseCase, deleteUserByIdUseCase]
})
export class UserModule {}