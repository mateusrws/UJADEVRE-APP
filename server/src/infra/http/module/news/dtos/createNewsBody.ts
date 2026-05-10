// interface CreateNewsRequest {
//     new_title: string;
//     new_content: string;
//     new_icon: string;
// }
import { IsDate, IsNotEmpty, IsString } from "class-validator"
export class CreateNewsBody {
    @IsString()
    @IsNotEmpty()
    new_title: string

    @IsString()
    @IsNotEmpty()
    new_content: string

    @IsString()
    @IsNotEmpty()
    new_icon: string
}