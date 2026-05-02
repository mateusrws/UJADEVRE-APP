import type { News } from '../../types/News/NewsType';
import { apiClient } from '../apiClient';
import { getInitialNews } from './getInitialnews';

/**
 * Fetches all news from the backend.
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. GET /news)
 * TODO: The backend should NOT return the icon field — map a string iconName to a lucide component on the frontend
 */
export async function fetchNews(): Promise<News[]> {
    // --- MOCK (remove when backend is ready) ---
    return getInitialNews();
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // const data = await apiClient<Omit<News, 'icon'>[]>('/news');
    // return data.map(item => ({ ...item, icon: resolveIcon(item.iconName) }));
}

/**
 * Creates a new news item (admin only).
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. POST /news)
 * TODO: Send iconName as a string instead of the component reference
 */
export async function createNews(newsData: Omit<News, 'id'>): Promise<News> {
    // --- MOCK (remove when backend is ready) ---
    return { ...newsData, id: Date.now() };
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<News>('/news', { method: 'POST', body: newsData });
}

/**
 * Deletes a news item by ID (admin only).
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. DELETE /news/:id)
 */
export async function deleteNews(newsId: number): Promise<void> {
    // --- MOCK (remove when backend is ready) ---
    return;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // await apiClient<void>(`/news/${newsId}`, { method: 'DELETE' });
}
