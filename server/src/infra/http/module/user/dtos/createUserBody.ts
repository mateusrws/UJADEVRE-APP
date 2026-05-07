import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"
import { TypeUser } from "types/enums/userTypeEnum"
export class CreateUserBody{
    @IsString()
    @IsNotEmpty()
    con_id: string

    @IsString()
    @IsNotEmpty()
    end_id: string

    @IsString()
    @IsNotEmpty()
    user_name: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    user_email: string

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    user_tel: string

    @IsString()
    @IsNotEmpty()
    user_senha: string

    @IsString()
    @IsNotEmpty()
    user_tipo: TypeUser

    @IsDate()
    @IsNotEmpty()
    user_data_nasc: Date

    @IsString()
    @IsNotEmpty()
    user_cpf: string

    @IsString()
    @IsNotEmpty()
    user_foto_url: string

    @IsString()
    @IsNotEmpty()
    user_desc: string
}