import { Address } from "src/modules/Address/entities/Address";
import { addressRepository, putAddressInterface } from "src/modules/Address/repositories/addressRepository";
import { PrismaService } from "../prisma.service";
import { PrismaAddressMapper } from "../mappers/PrismaAddressMapper";
import { Injectable } from "@nestjs/common";
import { CreateAddressRequest } from "src/modules/Address/useCases/createAddresUseCase/createAddresUseCase";

@Injectable()
export class PrismaAddressRepository implements addressRepository {

    constructor(private prisma: PrismaService) { }

    async create(address: Address): Promise<void> {
        const addressRaw = PrismaAddressMapper.toPrisma(address)
        await this.prisma.address.create({
            data: addressRaw
        })
    }

    async get(): Promise<Address[]> {
        const addresses = await this.prisma.address.findMany()
        return PrismaAddressMapper.toDomain(addresses)
    }

    async getById(add_id: string): Promise<Address | null> {
        const address = await this.prisma.address.findUnique({ where: { add_id } })
        if (!address) return null;
        return PrismaAddressMapper.toDomainSingle(address)
    }

    async getByObject(addressReceived: CreateAddressRequest): Promise<Address | null> {
        const address = await this.prisma.address.findFirst({
            where: { 
                add_bairro: addressReceived.add_bairro,
                add_cidade: addressReceived.add_cidade,
                add_cep: addressReceived.add_cep,
                add_comp: addressReceived.add_comp,
                add_number: addressReceived.add_number,
                add_rua: addressReceived.add_rua,
                add_uf: addressReceived.add_uf
            }
        })

        if(!address) return null

        return PrismaAddressMapper.toDomainSingle(address) 
    }

    async delete(add_id: string): Promise<String> {
        await this.prisma.address.delete({ where: { add_id } })

        return "Endereço deletado com sucesso!"
    }

    async update(add_id: string, address: putAddressInterface): Promise<String> {
        await this.prisma.address.update({
            where: { add_id },
            data: address
        })

        return "Endereço alterado com sucesso"
    }
}