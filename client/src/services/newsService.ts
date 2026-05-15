import api from './api'

export interface News {
    new_id: string
    new_title: string
    new_content: string
    new_icon: string
    createdAt: string
}

export interface CreateNewsPayload {
    new_title: string
    new_content: string
    new_icon: string
}

export interface UpdateNewsPayload {
    new_title?: string
    new_content?: string
    new_icon?: string
}

export const newsService = {
    async getAll(): Promise<News[]> {
        const { data } = await api.get<News[]>('/news')
        return data
    },

    async getById(new_id: string): Promise<News> {
        const { data } = await api.get<News>(`/news/${new_id}`)
        return data
    },

    async create(payload: CreateNewsPayload): Promise<News> {
        const { data } = await api.post<News>('/news', payload)
        return data
    },

    async update(new_id: string, payload: UpdateNewsPayload): Promise<News> {
        const { data } = await api.put<News>(`/news/${new_id}`, payload)
        return data
    },

    async delete(new_id: string): Promise<void> {
        await api.delete(`/news/${new_id}`)
    },
}
