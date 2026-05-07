import { Congregation } from "src/modules/Congregation/entities/Congregation";
import { Congregation as congregationRaw } from "generated/prisma";

export class PrismaCongregationMapper {
    static toPrisma({ get_con_id, get_con_name, get_createdAt, get_end_id }: Congregation): congregationRaw {
        return (
            { 
                con_id: get_con_id,
                con_name: get_con_name, 
                createdAt: get_createdAt, 
                end_id: get_end_id,
                updatedAt: new Date(),
            }
        )
    }

    static toDomain(congregations: congregationRaw[]): Congregation[] {
        return congregations.map(address => new Congregation(
            {
                con_name: address.con_name,
                end_id: address.end_id
            },
            address.con_id
        ))
    }

    static toDomainSingle(congregation: congregationRaw): Congregation {
        return new Congregation(
            {
                con_name: congregation.con_name,
                end_id: congregation.end_id
            },
            congregation.con_id
        )
    }
}