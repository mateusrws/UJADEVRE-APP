import api from './api'

export interface ArchiveUploadPayload {
    file: File
}
export const archiveService = {
    async upload(payload: ArchiveUploadPayload) {

        const formData = new FormData();
        formData.append('image', payload.file)


        const { data } = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    },

    async uploadTerm(reg_id: string, payload: ArchiveUploadPayload) {
        const formData = new FormData();
        formData.append('termo', payload.file)

        const { data } = await api.post(`/upload/${reg_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    },
}
