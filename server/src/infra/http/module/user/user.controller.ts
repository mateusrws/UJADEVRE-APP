import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { createUserUseCase } from "../../../../modules/User/useCases/CreateUserUseCase/createUserUseCase";
import { CreateUserBody } from "./dtos/createUserBody";
import { getUserUseCase } from "src/modules/User/useCases/GetUserUseCase/getUserUseCase";
import { PrismaUserMapper } from "src/infra/database/prisma/mappers/PrismaUserMapper";


@Controller('user')
export class UserController {

    constructor(private createUserUseCase: createUserUseCase, private getUserUseCase: getUserUseCase) { }

    @Post('')
    async createUser(@Body() body: CreateUserBody) {

        const { con_id, end_id, user_cpf, user_data_nasc, user_desc, user_email, user_foto_url, user_name, user_senha, user_tel, user_tipo } = body
        const user = await this.createUserUseCase.execute({ con_id, end_id, user_cpf, user_data_nasc, user_email, user_foto_url, user_name, user_senha, user_tel, user_tipo, user_desc })
        return user
    }

    @Get('/:user_id')
    async getUser(@Param('user_id') user_id: string){
        const user = await this.getUserUseCase.executeById(user_id)
        const userMapper = await PrismaUserMapper.toDomainSingle(user)

        return userMapper
    }

    @Get()
    async getUsers(){
        const users = await this.getUserUseCase.execute()

        return users
    }
}