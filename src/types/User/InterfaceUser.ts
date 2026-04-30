// TODO: When backend is ready, change id type from number to string (UUID)
export interface User {
    id: number;
    name: string;
    email: string;
    // TODO: Remove password from this interface after backend integration
    // The frontend should never store or handle raw passwords after login
    password: string;
    role: 'admin' | 'user';
    phone?: string;
    memberSince: string;
    // TODO: avatarUrl will be a full URL returned by the backend (e.g. S3 bucket URL)
    avatarUrl: string | null;
    bio: string;
    points: number;
}
