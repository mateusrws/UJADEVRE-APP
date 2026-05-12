import { makeEvent } from "src/modules/Event/factories/eventFactory"
import { Registration } from "../entities/Registration"
import { makeUser } from "src/modules/User/factories/userFactory"

interface RegistrationSchema {
    eve_id: string;
    user_id: string;
    reg_remain_value: number;
    reg_term_url: string;
    reg_isValid?: boolean;
}

type Override = Partial<RegistrationSchema>

export const makeRegistration = (override: Override = {}) => {
    const eventFake = makeEvent({})
    const userFake = makeUser({})
    return new Registration({
        eve_id: eventFake.get_id,
        reg_remain_value: 30,
        reg_term_url: "Teste.com",
        user_id: userFake.get_user_id,
        reg_isValid: false,
        ...override
    })
}
