import api from './api'

export interface User {
    user_id: string
    user_name: string
    user_email: string
    user_tel: string
    user_cpf: string
    user_data_nasc: string
    user_bio: string
    user_foto_url: string | null
    user_tipo: string
    user_point: number
    con_id: string
    end_id: string
    createdAt: string
    updatedAt: string
}

export interface CreateUserPayload {
    user_name: string
    user_email: string
    user_senha: string
    user_tel: string
    user_cpf: string
    user_data_nasc: string
    user_bio?: string
    user_foto_url?: string
    user_tipo: string
    con_id: string
    end_id: string
    user_desc?: string
}

export interface UpdateUserPayload {
    user_name?: string
    user_email?: string
    user_tel?: string
    user_cpf?: string
    user_data_nasc?: string
    user_desc?: string
    user_foto_url?: string
    con_id?: string
    end_id?: string
}

export const userService = {
    async getMe(): Promise<User> {
        const { data } = await api.get<User>('/user/me')
        return data
    },

    async getAll(): Promise<User[]> {
        const { data } = await api.get<User[]>('/user')
        return data
    },

    async getById(user_id: string): Promise<User> {
        const { data } = await api.get<User>(`/user/${user_id}`)
        return data
    },

    async create(payload: CreateUserPayload): Promise<User> {
        const { data } = await api.post<User>('/user', payload)
        return data
    },

    async update(user_id: string, payload: UpdateUserPayload): Promise<User> {
        console.log(`{
            userId: ${user_id},
            payload: ${payload}    
        }`)
        const { data } = await api.put<User>(`/user/${user_id}`, payload)
        return data
    },

    async delete(user_id: string): Promise<void> {
        await api.delete(`/user/${user_id}`)
    },
}
