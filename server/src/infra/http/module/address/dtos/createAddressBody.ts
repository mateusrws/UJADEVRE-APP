import { IsNotEmpty, IsString } from "class-validator"
export class CreateAddressBody{
    @IsString()
    @IsNotEmpty()
    add_bairro: string

    @IsString()
    @IsNotEmpty()
    add_cep: string

    @IsString()
    @IsNotEmpty()
    add_cidade: string

    @IsString()
    @IsNotEmpty()
    add_rua:string

    @IsString()
    @IsNotEmpty()
    add_number: string

    @IsString()
    @IsNotEmpty()
    add_uf: string
    
    @IsString()
    add_comp?: string
}