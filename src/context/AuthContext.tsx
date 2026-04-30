import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types/User/InterfaceUser';
import type { AuthContextType } from '../types/Auth/AuthContextInterfaceType';
import { getAllUsers } from '../api/User/getInfosUser';

// TODO: Import the service functions when backend is ready:
// import { loginUser, fetchAllUsers, createUser, deleteUser, updateUserProfile, logoutUser } from '../api/User/userService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // TODO: Replace getAllUsers() with an async fetch from the backend on mount
    // Use useEffect + fetchAllUsers() from userService.ts
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(getAllUsers());

    /**
     * TODO: Make this async when backend is ready
     * TODO: Call loginUser(email, password) from userService.ts
     * TODO: Store the JWT token returned by the backend
     * TODO: Handle loading state and error messages
     */
    const login = (email: string, password: string): boolean => {
        // --- MOCK (remove when backend is ready) ---
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
        // --- END MOCK ---
    };

    /**
     * TODO: Call logoutUser() from userService.ts to invalidate the token on the backend
     * TODO: Clear the JWT token from localStorage
     */
    const logout = () => {
        setCurrentUser(null);
    };

    const isAdmin = () => {
        return currentUser?.role === 'admin';
    };

    /**
     * TODO: Call createUser() from userService.ts
     * TODO: After backend responds with the created user, add it to local state
     * TODO: Handle errors (e.g. duplicate email)
     */
    const addUser = (userData: Omit<User, 'id' | 'memberSince' | 'points'>) => {
        // --- MOCK (remove when backend is ready) ---
        const newUser: User = {
            ...userData,
            id: Math.max(...users.map(u => u.id)) + 1,
            memberSince: new Date().toISOString().split('T')[0],
            points: 0,
        };
        setUsers([...users, newUser]);
        // --- END MOCK ---
    };

    /**
     * TODO: Call deleteUser(userId) from userService.ts
     * TODO: Remove from local state only after backend confirms deletion
     */
    const removeUser = (userId: number) => {
        // --- MOCK (remove when backend is ready) ---
        setUsers(users.filter(u => u.id !== userId));
        // --- END MOCK ---
    };

    /**
     * TODO: Call updateUserProfile(currentUser.id, data) from userService.ts
     * TODO: For avatar changes, use a separate multipart/form-data upload endpoint
     * TODO: Update local state only after backend confirms the update
     */
    const updateCurrentUser = (data: Partial<User>) => {
        if (currentUser) {
            // --- MOCK (remove when backend is ready) ---
            const updatedUser = { ...currentUser, ...data };
            setCurrentUser(updatedUser);
            setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
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
