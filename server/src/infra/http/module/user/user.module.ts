import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { UserController } from "./user.controller";
import { createUserUseCase } from "../../../../modules/User/useCases/CreateUserUseCase/createUserUseCase";
import { getUserUseCase } from "src/modules/User/useCases/GetUserUseCase/getUserUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [UserController],
    providers: [createUserUseCase, getUserUseCase]
})
export class UserModule {}