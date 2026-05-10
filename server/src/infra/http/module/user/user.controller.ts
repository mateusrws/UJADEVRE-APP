import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { createUserUseCase } from "../../../../modules/User/useCases/CreateUserUseCase/createUserUseCase";
import { CreateUserBody } from "./dtos/createUserBody";
import { getUserUseCase } from "src/modules/User/useCases/GetUserUseCase/getUserUseCase";
import { PrismaUserMapper } from "src/infra/database/prisma/mappers/PrismaUserMapper";
import { putUserInterface } from "src/modules/User/repositories/userRepository";
import { putUserUseCase } from "src/modules/User/useCases/PutUserUseCase/putUserUseCase";
import { deleteUserByIdUseCase } from "src/modules/User/useCases/deleteUserUseCase/deleteUserUseCase";


@Controller('user')
export class UserController {

    constructor(private createUserUseCase: createUserUseCase, private getUserUseCase: getUserUseCase, private putUserUseCase: putUserUseCase, private deleteUserUseCase: deleteUserByIdUseCase) { }

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

    @Put("/:user_id")
    async putUser(@Param('user_id') user_id: string, @Body() body: putUserInterface){
        const { con_id, end_id, user_cpf, user_data_nasc, user_desc, user_email, user_foto_url, user_name, user_tel } = body

        const user = await this.putUserUseCase.execute(user_id,{ con_id, end_id, user_cpf, user_data_nasc, user_desc, user_email, user_foto_url, user_name, user_tel })
        
        return user
    }

    @Delete("/:user_id")
    async deleteUser(@Param("user_id") user_id:string){
        return await this.deleteUserUseCase.execute(user_id)
    }
}