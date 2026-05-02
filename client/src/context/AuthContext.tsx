import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types/User/InterfaceUser';
import type { AuthContextType } from '../types/Auth/AuthContextInterfaceType';
import { getAllUsers } from '../api/User/getInfosUser';

// TODO: Import the service functions when backend is ready:
// import { loginUser, fetchAllUsers, createUser, deleteUser, updateUserProfile, logoutUser } from '../api/User/userService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(getAllUsers());

    /**
     * TODO: Make this async when backend is ready
     * TODO: Call loginUser(email, password) from userService.ts
     * TODO: Store the JWT token returned by the backend
     */
    const login = (email: string, password: string): boolean => {
        // --- MOCK (remove when backend is ready) ---
        // Password check is skipped here since it's not stored in the User interface.
        // The backend will handle credential validation.
        const user = users.find(u => u.user_email === email);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
        // --- END MOCK ---
    };

    /**
     * TODO: Call logoutUser() from userService.ts to invalidate the token on the backend
     */
    const logout = () => {
        setCurrentUser(null);
    };

    const isAdmin = () => {
        return currentUser?.user_tipo === 'admin';
    };

    /**
     * TODO: Call createUser() from userService.ts
     */
    const addUser = (userData: Omit<User, 'user_id' | 'createdAt' | 'updatedAt' | 'user_point' | 'user_cpg'>) => {
        // --- MOCK (remove when backend is ready) ---
        const now = new Date().toISOString();
        const newUser: User = {
            ...userData,
            user_id: crypto.randomUUID(),
            user_cpg: '',   // TODO: assigned by the backend
            user_point: 0,
            createdAt: now,
            updatedAt: now,
        };
        setUsers([...users, newUser]);
        // --- END MOCK ---
    };

    /**
     * TODO: Call deleteUser(userId) from userService.ts
     */
    const removeUser = (userId: string) => {
        // --- MOCK (remove when backend is ready) ---
        setUsers(users.filter(u => u.user_id !== userId));
        // --- END MOCK ---
    };

    /**
     * TODO: Call updateUserProfile(currentUser.user_id, data) from userService.ts
     */
    const updateCurrentUser = (data: Partial<User>) => {
        if (currentUser) {
            // --- MOCK (remove when backend is ready) ---
            const updatedUser = { ...currentUser, ...data };
            setCurrentUser(updatedUser);
            setUsers(users.map(u => u.user_id === updatedUser.user_id ? updatedUser : u));
            // --- END MOCK ---
        }
    };

    return (
        <AuthContext.Provider value={{
            currentUser,
            users,
            login,
            logout,
            isAdmin,
            addUser,
            removeUser,
            updateCurrentUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
