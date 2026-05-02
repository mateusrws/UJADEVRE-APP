import type { User } from "../../types/User/InterfaceUser";

export function getAllUsers(): User[] {
    return [
        {
            user_id: '00000000-0000-0000-0000-000000000001',
            user_name: 'Administrador',
            user_email: 'admin@ujadevre.com',
            user_tel: '(11) 99999-9999',
            user_bio: 'Administrador do sistema',
            user_foto_url: null,
            user_data_nasc: '1990-01-01',
            user_cpg: 'CPG-0001',
            user_point: 1000,
            user_tipo: 'admin',
            con_id: 'con-001',
            end_id: 'add-001',
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z',
        },
        {
            user_id: '00000000-0000-0000-0000-000000000002',
            user_name: 'João Silva',
            user_email: 'joao@email.com',
            user_tel: '(11) 98765-4321',
            user_bio: 'Entusiasta de tecnologia e eventos comunitários.',
            user_foto_url: null,
            user_data_nasc: '1995-06-15',
            user_cpg: 'CPG-0002',
            user_point: 580,
            user_tipo: 'user',
            con_id: 'con-001',
            end_id: 'add-002',
            createdAt: '2025-01-15T00:00:00.000Z',
            updatedAt: '2025-01-15T00:00:00.000Z',
        },
    ];
}
