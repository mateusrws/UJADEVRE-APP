import type { User } from '../../types/User/InterfaceUser';
import { apiClient } from '../apiClient';
import { getAllUsers } from './getInfosUser';

export type LoginResponse = {
    user: User;
    // TODO: Add token field when backend returns JWT
    // token: string;
};

/**
 * Authenticates the user against the backend.
 * TODO: Replace mock logic with real API call
 * TODO: After login, store the JWT token: localStorage.setItem('token', response.token)
 * TODO: Confirm the endpoint path with your backend (e.g. POST /auth/login)
 */
export async function loginUser(email: string, password: string): Promise<User | null> {
    // --- MOCK (remove when backend is ready) ---
    const users = getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user ?? null;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // try {
    //     const response = await apiClient<LoginResponse>('/auth/login', {
    //         method: 'POST',
    //         body: { email, password },
    //     });
    //     localStorage.setItem('token', response.token);
    //     return response.user;
    // } catch {
    //     return null;
    // }
}

/**
 * Fetches all users (admin only).
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. GET /users)
 */
export async function fetchAllUsers(): Promise<User[]> {
    // --- MOCK (remove when backend is ready) ---
    return getAllUsers();
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<User[]>('/users');
}

/**
 * Creates a new user (admin only).
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. POST /users)
 */
export async function createUser(userData: Omit<User, 'id' | 'memberSince' | 'points'>): Promise<User> {
    // --- MOCK (remove when backend is ready) ---
    return {
        ...userData,
        id: Date.now(),
        memberSince: new Date().toISOString().split('T')[0],
        points: 0,
    };
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<User>('/users', { method: 'POST', body: userData });
}

/**
 * Deletes a user by ID (admin only).
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. DELETE /users/:id)
 */
export async function deleteUser(userId: number): Promise<void> {
    // --- MOCK (remove when backend is ready) ---
    return;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // await apiClient<void>(`/users/${userId}`, { method: 'DELETE' });
}

/**
 * Updates the current user's profile.
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. PATCH /users/me)
 * TODO: Handle avatar upload separately — use multipart/form-data for image files
 */
export async function updateUserProfile(userId: number, data: Partial<User>): Promise<User> {
    // --- MOCK (remove when backend is ready) ---
    return data as User;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<User>(`/users/${userId}`, { method: 'PATCH', body: data });
}

/**
 * Logs out the current user.
 * TODO: If backend has a logout endpoint (e.g. to invalidate tokens), call it here
 * TODO: Clear the JWT token from localStorage on logout
 */
export async function logoutUser(): Promise<void> {
    // TODO: Uncomment if backend has a logout endpoint:
    // await apiClient<void>('/auth/logout', { method: 'POST' });

    // TODO: Uncomment when using JWT:
    // localStorage.removeItem('token');
}
