import type { InterfaceEvent } from '../../types/Event/EventInterface';
import { apiClient } from '../apiClient';
import { getInitialEvents } from '../../types/Event/getInitialevents';

/**
 * Fetches all events from the backend.
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. GET /events)
 * TODO: The backend should NOT return the icon field — map a string iconName to a lucide component on the frontend
 * TODO: The backend should return date as ISO string — convert to Date object here
 */
export async function fetchEvents(): Promise<InterfaceEvent[]> {
    // --- MOCK (remove when backend is ready) ---
    return getInitialEvents();
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // const data = await apiClient<Omit<InterfaceEvent, 'icon' | 'date'>[]>('/events');
    // return data.map(e => ({ ...e, date: new Date(e.date), icon: resolveIcon(e.iconName) }));
}

/**
 * Creates a new event (admin only).
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. POST /events)
 * TODO: Send iconName as a string, date as ISO string
 */
export async function createEvent(eventData: Omit<InterfaceEvent, 'id'>): Promise<InterfaceEvent> {
    // --- MOCK (remove when backend is ready) ---
    return { ...eventData, id: Date.now() };
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<InterfaceEvent>('/events', { method: 'POST', body: eventData });
}

/**
 * Deletes an event by ID (admin only).
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. DELETE /events/:id)
 */
export async function deleteEvent(eventId: number): Promise<void> {
    // --- MOCK (remove when backend is ready) ---
    return;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // await apiClient<void>(`/events/${eventId}`, { method: 'DELETE' });
}

/**
 * Registers the current user for an event.
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. POST /events/:id/register)
 */
export async function registerForEvent(eventId: number): Promise<void> {
    // --- MOCK (remove when backend is ready) ---
    return;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // await apiClient<void>(`/events/${eventId}/register`, { method: 'POST' });
}

/**
 * Cancels the current user's registration for an event.
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. DELETE /events/:id/register)
 */
export async function cancelEventRegistration(eventId: number): Promise<void> {
    // --- MOCK (remove when backend is ready) ---
    return;
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // await apiClient<void>(`/events/${eventId}/register`, { method: 'DELETE' });
}
