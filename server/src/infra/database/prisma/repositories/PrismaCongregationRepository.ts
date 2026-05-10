import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { Congregation } from "src/modules/Congregation/entities/Congregation";
import { PrismaCongregationMapper } from "../mappers/PrismaCongregationMapper";
import { congregationRepository, putCongregationInterface } from "src/modules/Congregation/repositories/congregationRepository";

@Injectable()
export class PrismaCongregationRepository implements congregationRepository {

    constructor(private prisma: PrismaService) { }



    async deleteCongregation(con_id: string): Promise<String> {
        await this.prisma.congregation.delete({ where: { con_id } })

        return "Congregação deletada com sucesso!"
    }


    async putCongregation(con_id: string, congregationReceived: putCongregationInterface): Promise<String> {

        await this.prisma.congregation.update({
            where: { con_id },
            data: congregationReceived
        })

        return "Congregação alterada com sucesso"
    }

    async getCongregations(): Promise<Congregation[] | null> {
        const congregations = await this.prisma.congregation.findMany()
        return PrismaCongregationMapper.toDomain(congregations)
    }

    async create(congregation: Congregation): Promise<void> {

        let congregationRaw = PrismaCongregationMapper.toPrisma(congregation)

        await this.prisma.congregation.create({
            data: congregationRaw
        })
    }

    async getById(con_id: string): Promise<Congregation | null> {
        const congregation = await this.prisma.congregation.findUnique({
            where: { con_id }
        })

        if (!congregation) return null;
        return PrismaCongregationMapper.toDomainSingle(congregation)
    }

}