import { IsNotEmpty, IsString } from "class-validator"
export class CreateCongregationBody{
    @IsString()
    @IsNotEmpty()
    con_name: string

    @IsString()
    @IsNotEmpty()
    end_id: string
}