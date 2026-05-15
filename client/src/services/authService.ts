import api from './api'

export interface SignInPayload {
    email: string
    password: string
}

export interface SignInResponse {
    access_token: string
}

export const authService = {
    async signIn(payload: SignInPayload): Promise<SignInResponse> {
        const { data } = await api.post<SignInResponse>('/signin', payload)
        return data
    },
}
