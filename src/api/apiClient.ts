// TODO: Set the base URL to your backend API when it's ready
const BASE_URL = 'http://localhost:3000/api';

// TODO: After implementing JWT authentication, store the token in localStorage
// and read it here to attach to every request
function getAuthToken(): string | null {
    return localStorage.getItem('token');
}

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: unknown;
};

/**
 * Base HTTP client. All API calls go through here.
 * TODO: Add error handling for 401 (redirect to login) and 403 (show permission error)
 * TODO: Add request/response interceptors if needed (e.g. refresh token logic)
 */
export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', body } = options;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const token = getAuthToken();
    if (token) {
        // TODO: Confirm the Authorization header format with your backend (Bearer vs other)
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        // TODO: Parse backend error messages and surface them to the UI
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
}
