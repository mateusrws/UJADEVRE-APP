import type { InterfaceRegistration } from '../../types/Registration/TypeRegistration';
import { apiClient } from '../apiClient';
import { getMyRegistrations } from './getMyRegistrations';

/**
 * Fetches the current user's event registrations.
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. GET /registrations/me)
 * TODO: The backend should NOT return the icon field — map a string iconName to a lucide component on the frontend
 */
export async function fetchMyRegistrations(): Promise<InterfaceRegistration[]> {
    // --- MOCK (remove when backend is ready) ---
    return getMyRegistrations();
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // const data = await apiClient<Omit<InterfaceRegistration, 'icon'>[]>('/registrations/me');
    // return data.map(r => ({ ...r, icon: resolveIcon(r.iconName) }));
}

/**
 * Submits a payment for a registration.
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. POST /registrations/:id/payment)
 * TODO: This is where you'll integrate a payment gateway (Stripe, PagSeguro, etc.)
 * TODO: The backend should return the updated registration with the new amountPaid
 */
export async function submitPayment(registrationId: number, amount: number): Promise<InterfaceRegistration> {
    // --- MOCK (remove when backend is ready) ---
    // The actual local state update is handled by processPayment in the component
    // This function will replace that logic entirely when the backend is ready
    throw new Error('submitPayment: backend not implemented yet');
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<InterfaceRegistration>(`/registrations/${registrationId}/payment`, {
    //     method: 'POST',
    //     body: { amount },
    // });
}

/**
 * Validates a ticket for check-in (admin only).
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. POST /tickets/:ticketCode/checkin)
 */
export async function checkInTicket(ticketCode: string): Promise<{ valid: boolean; message: string }> {
    // --- MOCK (remove when backend is ready) ---
    return { valid: false, message: 'Backend not implemented yet' };
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<{ valid: boolean; message: string }>(`/tickets/${ticketCode}/checkin`, {
    //     method: 'POST',
    // });
}
