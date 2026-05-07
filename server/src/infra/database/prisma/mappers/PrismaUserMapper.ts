import { User as UserRaw } from "@prisma/client";
import { User } from "src/modules/User/entities/User";
import { TypeUser } from "types/enums/userTypeEnum";

export class PrismaUserMapper {
    static toPrisma(user: User): UserRaw {
        return {
            con_id: user.get_con_id,
            end_id: user.get_end_id,
            user_bio: user.get_user_desc,
            user_cpf: user.get_user_cpf,
            createdAt: user.get_user_createdAt,
            updatedAt: new Date(),
            user_data_nasc: user.get_user_data_nasc,
            user_email: user.get_user_email,
            user_foto_url: user.get_user_foto_url ?? null,
            user_id: user.get_user_id,
            user_name: user.get_user_name,
            user_senha: user.get_user_senha,
            user_point: user.get_user_point,
            user_tipo: user.get_user_tipo,
            user_tel: user.get_user_tel,
        }
    }

    static toDomain(users: UserRaw[]): User[] {
        return users.map(user => new User(
            {
                con_id: user.con_id,
                end_id: user.end_id,
                user_desc: user.user_bio,
                user_cpf: user.user_cpf,
                user_createdAt: user.createdAt,
                user_data_nasc: user.user_data_nasc,
                user_email: user.user_email,
                user_foto_url: user.user_foto_url ?? "",
                user_name: user.user_name,
                user_senha: user.user_senha,
                user_point: user.user_point,
                user_tipo: user.user_tipo as TypeUser,
                user_tel: user.user_tel,
            },
            user.user_id
        ))
    }

    static toDomainSingle(user: UserRaw): User {
        return new User(
            {
                con_id: user.con_id,
                end_id: user.end_id,
                user_desc: user.user_bio,
                user_cpf: user.user_cpf,
                user_createdAt: user.createdAt,
                user_data_nasc: user.user_data_nasc,
                user_email: user.user_email,
                user_foto_url: user.user_foto_url ?? "",
                user_name: user.user_name,
                user_senha: user.user_senha,
                user_point: user.user_point,
                user_tipo: user.user_tipo as TypeUser,
                user_tel: user.user_tel,
            },
            user.user_id
        )
    }
}