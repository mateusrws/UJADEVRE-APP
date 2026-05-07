import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { userRepository } from "src/modules/User/repositories/userRepository";
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
}