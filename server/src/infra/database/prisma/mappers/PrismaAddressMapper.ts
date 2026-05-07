import { Address } from "src/modules/Address/entities/Address";
import { Address as AddressRaw } from "@prisma/client";

export class PrismaAddressMapper {
    static toPrisma(address: Address): AddressRaw {
        return {
            add_bairro: address.get_add_bairro,
            add_cep: address.get_add_cep,
            add_cidade: address.get_add_cidade,
            add_comp: address.get_add_comp ?? null,
            add_createdAt: address.get_add_createdAt,
            add_updatedAt: new Date(),
            add_id: address.get_add_id,
            add_number: address.get_add_number,
            add_rua: address.get_add_rua,
            add_uf: address.get_add_uf,
        }
    }

    static toDomain(addresses: AddressRaw[]): Address[] {
        return addresses.map(address => new Address(
            {
                add_bairro: address.add_bairro,
                add_cep: address.add_cep,
                add_cidade: address.add_cidade,
                add_comp: address.add_comp ?? "",
                add_createdAt: address.add_createdAt,
                add_number: address.add_number,
                add_rua: address.add_rua,
                add_uf: address.add_uf,
            },
            address.add_id
        ))
    }
    static toDomainSingle(address: AddressRaw): Address {
        return new Address(
            {
                add_bairro: address.add_bairro,
                add_cep: address.add_cep,
                add_cidade: address.add_cidade,
                add_comp: address.add_comp ?? "",
                add_createdAt: address.add_createdAt,
                add_number: address.add_number,
                add_rua: address.add_rua,
                add_uf: address.add_uf,
            },
            address.add_id
        )
    }

}