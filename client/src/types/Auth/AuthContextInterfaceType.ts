import type { User } from '../User/InterfaceUser';

export interface AuthContextType {
    currentUser: User | null;
    users: User[];
    // TODO: Change login return type to Promise<boolean> when backend is async
    login: (email: string, password: string) => boolean;
    logout: () => void;
    isAdmin: () => boolean;
    addUser: (user: Omit<User, 'user_id' | 'createdAt' | 'updatedAt' | 'user_point' | 'user_cpg'>) => void;
    removeUser: (userId: string) => void;
    updateCurrentUser: (data: Partial<User>) => void;
    // TODO: Add isLoading: boolean to show loading states during async operations
    // TODO: Add authError: string | null to surface login errors from the backend
}
