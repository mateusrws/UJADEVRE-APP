import type { User } from '../../types/User/InterfaceUser';
import { getAllUsers } from './getInfosUser';

export type LoginCredentials = {
    email: string;
    password: string;
};

/**
 * Authenticates the user against the backend.
 * TODO: Replace mock logic with real API call (POST /auth/login)
 * TODO: After login, store the JWT token: localStorage.setItem('token', response.token)
 */
export async function loginUser(email: string, password: string): Promise<User | null> {
    // --- MOCK (remove when backend is ready) ---
    const users = getAllUsers();
    const user = users.find(u => u.user_email === email);
    return user ?? null;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // try {
    //     const response = await apiClient<{ user: User; token: string }>('/auth/login', {
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
 * TODO: Replace mock with real API call (GET /users)
 */
export async function fetchAllUsers(): Promise<User[]> {
    // --- MOCK (remove when backend is ready) ---
    return getAllUsers();
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<User[]>('/users');
}

/**
 * Updates the current user's profile.
 * TODO: Replace mock with real API call (PATCH /users/:id)
 * TODO: Handle avatar upload separately — use multipart/form-data for image files
 */
export async function updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
    // --- MOCK (remove when backend is ready) ---
    return data as User;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<User>(`/users/${userId}`, { method: 'PATCH', body: data });
}

/**
 * Deletes a user by ID (admin only).
 * TODO: Replace mock with real API call (DELETE /users/:id)
 */
export async function deleteUser(userId: string): Promise<void> {
    // --- MOCK (remove when backend is ready) ---
    return;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // await apiClient<void>(`/users/${userId}`, { method: 'DELETE' });
}

/**
 * Logs out the current user.
 * TODO: If backend has a logout endpoint, call it here and clear the JWT token.
 */
export async function logoutUser(): Promise<void> {
    // TODO: Uncomment when using JWT:
    // localStorage.removeItem('token');
}
