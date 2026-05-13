import { Registration } from "../entities/Registration";
import { putRegistrationInterface, registrationRepository } from "./registrationRepository";



export class mockRegistrationRepository implements registrationRepository {
    public registrations: Registration[] = []

    async create(registration: Registration): Promise<void> {
        this.registrations.push(registration);
    }

    async get(): Promise<Registration[]> {
        return this.registrations;
    }

    async getById(reg_id: string): Promise<Registration | null> {
        return this.registrations.find(r => r.get_reg_id === reg_id) ?? null;
    } 1

    async getMyRegistrations(userId: string, page: number, perPage: number): Promise<Registration[]> {
        return this.registrations.filter(r => r.get_user_id === userId).slice((page - 1) * perPage, page * perPage)
    }

    async update(reg_id: string, registration: putRegistrationInterface): Promise<Registration | String> {
        const i = this.registrations.findIndex(r => r.get_reg_id === reg_id)

        if (i === -1) return "Ingresso não encontrado"

        const oldId = this.registrations[i].get_reg_id

        this.registrations[i] = new Registration({
            eve_id: registration.eve_id ?? this.registrations[i].get_eve_id,
            reg_remain_value: registration.reg_remain_value ?? this.registrations[i].get_reg_remain_value,
            reg_term_url: registration.reg_term_url ?? this.registrations[i].get_reg_term_url,
            user_id: registration.user_id ?? this.registrations[i].get_user_id,
            reg_isValid: registration.reg_isValid ?? this.registrations[i].get_reg_isValid,
        }, oldId)
        return this.registrations[i]
    }

    async delete(reg_id: string): Promise<String> {
        const i = this.registrations.findIndex(r => r.get_reg_id === reg_id)

        if (i === -1) return "Registration not found"

        this.registrations.splice(i, 1)
        return "Ingresso deletado com sucesso"
    }

    async updateRemainValue(reg_id: string, value: number): Promise<String> {
        const i = this.registrations.findIndex(r => r.get_reg_id === reg_id)

        if (i === -1) return "Ingresso não encontrado"

        this.registrations[i].set_reg_remain_value = this.registrations[i].set_reg_remain_value - value
        return "Valor restante atualizado com sucesso"
    }

    async toggleIsValid(reg_id: string): Promise<String> {
        const i = this.registrations.findIndex(r => r.get_reg_id === reg_id)

        if (i === -1) return "Registration not found"

        this.registrations[i].set_reg_isValid = !this.registrations[i].get_reg_isValid
        return "Validação foi alterada"
    }
}