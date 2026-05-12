import { makeAddress } from "src/modules/Address/factories/addressFactory"
import { User } from "../entities/User"
import { makeCongregation } from "src/modules/Congregation/factories/congFactory"
import { TypeUser } from "types/enums/userTypeEnum"

interface UserSchema {
    user_name: string;
    user_email: string;
    user_tel: string;
    user_senha: string;
    user_tipo: TypeUser;
    user_data_nasc: Date;
    user_desc: string;
    user_cpf: string;
    user_foto_url: string;
    con_id: string;
    end_id: string;
}

type Override = Partial<UserSchema>

export const makeUser = (override: Override = {}) => {
    const addressFake = makeAddress({})
    const congFake = makeCongregation({})
    return new User({
        con_id: congFake.get_con_id,
        end_id: addressFake.get_add_id,
        user_cpf: "12345678900",
        user_email: "teste@gmail.com",
        user_foto_url: "teste.png",
        user_name: "teste da silva",
        user_senha: "123123",
        user_tel: "+5511999999999",
        user_tipo: TypeUser.ADOLESCENTE,
        user_data_nasc: new Date("2000-01-01"),
        user_desc: "Descrição teste",
        ...override
    })
}