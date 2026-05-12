import { Injectable } from "@nestjs/common";
import { registrationRepository, putRegistrationInterface } from "src/modules/Registration/repositories/registrationRepository";
import { Registration } from "src/modules/Registration/entities/Registration";
import { PrismaService } from "../prisma.service";
import { PrismaRegistrationMapper } from "../mappers/PrismaRegistrationMapper";

@Injectable()
export class PrismaRegistrationRepository implements registrationRepository {

    constructor(private prisma: PrismaService) { }

    async create(registration: Registration): Promise<void> {
        const raw = PrismaRegistrationMapper.toPrisma(registration);
        await this.prisma.registration.create({ data: raw });
    }

    async get(): Promise<Registration[]> {
        const registrations = await this.prisma.registration.findMany();
        return PrismaRegistrationMapper.toDomain(registrations);
    }

    async getById(reg_id: string): Promise<Registration | null> {
        const r = await this.prisma.registration.findUnique({ where: { reg_id } });
        if (!r) return null;
        return PrismaRegistrationMapper.toDomainSingle(r);
    }

    async update(reg_id: string, registration: putRegistrationInterface): Promise<Registration | String> {
        const updated = await this.prisma.registration.update({
            where: { reg_id },
            data: {
                eve_id: registration.eve_id,
                user_id: registration.user_id,
                reg_remain_value: registration.reg_remain_value,
                reg_term_url: registration.reg_term_url,
            }
        });
        return PrismaRegistrationMapper.toDomainSingle(updated);
    }

    async delete(reg_id: string): Promise<String> {
        await this.prisma.registration.delete({ where: { reg_id } });
        return "Ingresso deletado com sucesso";
    }

    async updateRemainValue(reg_id: string, value: number): Promise<String> {
        const current = await this.prisma.registration.findUnique({ where: { reg_id } });
        if (!current) return "Ingresso não encontrado";

        await this.prisma.registration.update({
            where: { reg_id },
            data: { reg_remain_value: current.reg_remain_value - value }
        });

        return "Valor atualizado com sucesso";
    }
}
