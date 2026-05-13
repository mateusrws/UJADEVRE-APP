import { Registration } from "src/modules/Registration/entities/Registration";
import { Registration as RegistrationRaw } from "@prisma/client";

export class PrismaRegistrationMapper {

    static toPrisma(registration: Registration): RegistrationRaw {
        return {
            reg_id: registration.get_reg_id,
            eve_id: registration.get_eve_id,
            user_id: registration.get_user_id,
            reg_remain_value: registration.get_reg_remain_value,
            reg_term_url: registration.get_reg_term_url,
            reg_is_valid: registration.get_reg_isValid,
        }
    }

    static toDomain(registrations: RegistrationRaw[]): Registration[] {
        return registrations.map(r => PrismaRegistrationMapper.toDomainSingle(r));
    }

    static toDomainSingle(r: RegistrationRaw): Registration {
        return new Registration(
            {
                eve_id: r.eve_id,
                user_id: r.user_id,
                reg_remain_value: r.reg_remain_value,
                reg_term_url: r.reg_term_url,
                reg_isValid: r.reg_is_valid,
            },
            r.reg_id
        );
    }
}
