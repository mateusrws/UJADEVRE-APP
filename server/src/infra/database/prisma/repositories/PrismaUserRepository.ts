import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { putUserInterface, userRepository } from "src/modules/User/repositories/userRepository";
import { User } from "src/modules/User/entities/User";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";

@Injectable()
export class PrismaUserRepository implements userRepository {

    constructor(private prisma: PrismaService) { }

    async create(user: User): Promise<void> {
        const userRaw = PrismaUserMapper.toPrisma(user)
        await this.prisma.user.create({
            data: userRaw
        })
    }

    async get(): Promise<User[]> {
        const users = await this.prisma.user.findMany()
        return PrismaUserMapper.toDomain(users)
    }

    async getById(user_id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { user_id } })
        if (!user) return null;
        return PrismaUserMapper.toDomainSingle(user)
    }

    async put(user_id: string, userReceived: putUserInterface): Promise<String> {
        await this.prisma.user.update({
            where: { user_id },
            data: {
                user_name: userReceived.user_name ?? undefined,
                user_email: userReceived.user_email ?? undefined,
                user_tel: userReceived.user_tel ?? undefined,
                user_bio: userReceived.user_desc ?? undefined,
                user_cpf: userReceived.user_cpf ?? undefined,
                user_foto_url: userReceived.user_foto_url ?? undefined,
                con_id: userReceived.con_id ?? undefined,
                end_id: userReceived.end_id ?? undefined,
                user_point: userReceived.user_point ?? undefined,
            }
        });
        return "Usuário alterado com sucesso";
    }
    async delete(user_id: string): Promise<String> {
        await this.prisma.user.delete({ where: { user_id } })

        return "Usuário deletado com sucesso"
    }

    async findByEmail(user_email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { user_email } });
        if (!user) return null;
        return PrismaUserMapper.toDomainSingle(user);
    }
}