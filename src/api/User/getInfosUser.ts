import type { User } from "../../types/User/InterfaceUser";



export function getInfosUser(){
    const user = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
        memberSince: '2025-01-15',
        avatarUrl: null as string | null,
        bio: 'Entusiasta de tecnologia e eventos comunitários.',
        points: 580,
    };

}

export function getAllUsers(){
    const initialUsers: User[] = [
      {
        id: 1,
        name: 'Administrador',
        email: 'admin@ujadevre.com',
        password: 'admin123',
        role: 'admin',
        phone: '(11) 99999-9999',
        memberSince: '2025-01-01',
        avatarUrl: null,
        bio: 'Administrador do sistema',
        points: 1000,
      },
      {
        id: 2,
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'user123',
        role: 'user',
        phone: '(11) 98765-4321',
        memberSince: '2025-01-15',
        avatarUrl: null,
        bio: 'Entusiasta de tecnologia e eventos comunitários.',
        points: 580,
      },
    ];
    return initialUsers;
}