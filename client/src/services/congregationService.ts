import api from './api'

export interface Congregation {
    con_id: string
    con_name: string
    end_id: string
    createdAt: string
    updatedAt: string
}

export interface CreateCongregationPayload {
    con_name: string
    end_id: string
}

export const congregationService = {
    async getAll(): Promise<Congregation[]> {
        const { data } = await api.get<Congregation[]>('/congregation')
        return data
    },

    async getById(con_id: string): Promise<Congregation> {
        const { data } = await api.get<Congregation>(`/congregation/${con_id}`)
        return data
    },

    async create(payload: CreateCongregationPayload): Promise<Congregation> {
        const { data } = await api.post<Congregation>('/congregation', payload)
        return data
    },

    async delete(con_id: string): Promise<void> {
        await api.delete(`/congregation/${con_id}`)
    },
}
