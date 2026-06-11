import api from './api'

export interface Address {
    _add_id: string
    props: {
        add_bairro: string
        add_cidade: string
        add_uf: string
        add_cep: string
        add_number: string
        add_rua: string
        add_comp?: string
        add_createdAt: string
        add_updatedAt: string
    }
}

export interface CreateAddressPayload {
    add_bairro: string
    add_cidade: string
    add_uf: string
    add_cep: string
    add_number: string
    add_rua: string
    add_comp?: string
}

export interface getByObjectPayload {
    add_bairro: string
    add_cidade: string
    add_uf: string
    add_cep: string
    add_number: string
    add_rua: string
    add_comp?: string
}

export const addressService = {
    async getAll(): Promise<Address[]> {
        const { data } = await api.get<Address[]>('/address')
        return data
    },

    async getById(add_id: string): Promise<Address> {
        const { data } = await api.get<Address>(`/address/${add_id}`)
        return data
    },

    async getByObject(body: getByObjectPayload) {
        const { data } = await api.post<Address>(`/address/search`, body)
        return data
    },

    async create(payload: CreateAddressPayload): Promise<Address> {
        const { data } = await api.post<Address>('/address', payload)
        return data
    },

    async update(add_id: string, payload: Partial<CreateAddressPayload>): Promise<Address> {
        const { data } = await api.put<Address>(`/address/${add_id}`, payload)
        return data
    },

    async delete(add_id: string): Promise<void> {
        await api.delete(`/address/${add_id}`)
    },
}
