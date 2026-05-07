import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"
export class CreateEventBody {
    @IsString()
    @IsNotEmpty()
    eve_nome: string

    @IsDate()
    @IsNotEmpty()
    eve_data_and_time: Date

    @IsString()
    @IsNotEmpty()
    eve_desc: string

    @IsDecimal()
    @IsNotEmpty()
    eve_price: number

    @IsInt()
    @IsNotEmpty()
    eve_point: number


    @IsString()
    @IsNotEmpty()
    end_id: string

    @IsNumber()
    @IsNotEmpty()
    eve_participants: number

    @IsNumber()
    @IsNotEmpty()
    eve_max_participants: number

    @IsString()
    @IsNotEmpty()
    eve_icon: string
}