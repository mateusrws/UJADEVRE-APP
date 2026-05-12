import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"
export class createRegistrationBody{
    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    eve_id: string

    @IsNumber()
    @IsNotEmpty()
    reg_remain_value: number

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    reg_term_url: string
}