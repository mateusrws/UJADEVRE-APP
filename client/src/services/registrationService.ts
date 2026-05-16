import api from './api'

// The backend returns Registration entity instances serialized as JSON.
// NestJS serializes class instances — private fields won't appear.
// The controller returns the entity directly, so we get the raw Prisma shape
// from createRegistration (which returns the entity after create).
// For GET /registration, the use case returns Registration[] from the repo
// which are entity instances — NestJS will serialize their public getters
// only if they are enumerable. Since they use private props + getters,
// the actual JSON shape depends on NestJS class-transformer behavior.
//
// In practice, the POST /registration returns the Registration entity which
// has no toJSON — so we get an empty object or the props directly.
// We work around this by using the known field names from the Prisma schema.

export interface RegistrationRaw {
    reg_id: string
    eve_id: string
    user_id: string
    reg_remain_value: number
    reg_term_url: string
    reg_is_valid: boolean
}

export interface CreateRegistrationPayload {
    eve_id: string
    user_id: string
    reg_term_url: string
}

export interface UpdateRegistrationPayload {
    eve_id?: string
    user_id?: string
    reg_term_url?: string
    reg_remain_value?: number
    reg_isValid?: boolean
}

export const registrationService = {
    async getAll(): Promise<RegistrationRaw[]> {
        const { data } = await api.get<any[]>('/registration')
        // Normalize: entity getters are serialized as plain props by NestJS
        return data.map(normalizeRegistration)
    },

    async getById(reg_id: string): Promise<RegistrationRaw> {
        const { data } = await api.get<any>(`/registration/${reg_id}`)
        return normalizeRegistration(data)
    },

    async create(payload: CreateRegistrationPayload): Promise<RegistrationRaw> {
        const { data } = await api.post<any>('/registration', payload)
        return normalizeRegistration(data)
    },

    async update(reg_id: string, payload: UpdateRegistrationPayload): Promise<RegistrationRaw> {
        const { data } = await api.put<any>(`/registration/${reg_id}`, payload)
        return normalizeRegistration(data)
    },

    async delete(reg_id: string): Promise<void> {
        await api.delete(`/registration/${reg_id}`)
    },

    async payment(reg_id: string, value: number): Promise<string> {
        const { data } = await api.patch<string>(`/registration/${reg_id}`, { value })
        return data
    },

    async toggleIsValid(reg_id: string): Promise<void> {
        await api.patch(`/registration/term/${reg_id}`)
    },

    async checkIn(reg_id: string): Promise<{ message: string; points_added: number; reg_term_url: string }> {
        const { data } = await api.post<{ message: string; points_added: number; reg_term_url: string }>(`/registration/checkin/${reg_id}`)
        return {
            message: data.message,
            pointsAdded: data.points_added,
            reg_term_url: data.reg_term_url
        }
    },

    // Fetch registrations for a specific user by filtering all registrations
    async getMyRegistrations(user_id: string): Promise<RegistrationRaw[]> {
        const all = await registrationService.getAll()
        return all.filter((r) => r.user_id === user_id)
    },
}

// The Registration entity class uses private props with getters.
// NestJS/class-transformer serializes the instance — the getters ARE
// enumerable on the prototype so they appear in JSON.stringify output.
// The getter names are: get_reg_id, get_eve_id, get_user_id, etc.
// But the Prisma repo also returns instances built from toDomainSingle.
// We normalize both shapes (getter-named and direct Prisma field names).
function normalizeRegistration(r: any): RegistrationRaw {
    return {
        reg_id: r.reg_id ?? r._reg_id ?? r.get_reg_id ?? '',
        eve_id: r.eve_id ?? r.get_eve_id ?? '',
        user_id: r.user_id ?? r.get_user_id ?? '',
        reg_remain_value: r.reg_remain_value ?? r.get_reg_remain_value ?? 0,
        reg_term_url: r.reg_term_url ?? r.get_reg_term_url ?? '',
        reg_is_valid: r.reg_is_valid ?? r.reg_isValid ?? r.get_reg_isValid ?? false,
    }
}
