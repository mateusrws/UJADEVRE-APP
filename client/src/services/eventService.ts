import api from './api'

// Shape returned by GET /event (use case maps entity getters to these names)
export interface Event {
    eve_id: string
    eve_nome: string           // backend returns eve_nome, NOT eve_name
    eve_data_and_time: string  // backend returns eve_data_and_time, NOT eve_date
    eve_desc: string
    eve_price: number
    eve_point: number
    eve_participants: number
    eve_max_participants: number
    eve_icon: string
}

export interface CreateEventPayload {
    eve_nome: string
    eve_data_and_time: string
    eve_desc: string
    eve_price: number
    eve_point: number
    eve_participants: number
    eve_max_participants: number
    eve_icon: string
    end_id: string
}

export interface UpdateEventPayload {
    eve_nome?: string
    eve_data_and_time?: string
    eve_desc?: string
    eve_price?: number
    eve_point?: number
    eve_participants?: number
    eve_max_participants?: number
    eve_icon?: string
    end_id?: string
}

export const eventService = {
    async getAll(): Promise<Event[]> {
        const { data } = await api.get<Event[]>('/event')
        return data
    },

    async getById(eve_id: string): Promise<Event> {
        const { data } = await api.get<Event>(`/event/${eve_id}`)
        return data
    },

    async create(payload: CreateEventPayload): Promise<Event> {
        console.log(payload)
        const { data } = await api.post<Event>('/event', payload)
        return data
    },

    async update(eve_id: string, payload: UpdateEventPayload): Promise<Event> {
        const { data } = await api.put<Event>(`/event/${eve_id}`, payload)
        return data
    },

    async delete(eve_id: string): Promise<void> {
        await api.delete(`/event/${eve_id}`)
    },
}
