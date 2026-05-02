import type { Congregation } from '../../types/Congregation/CongregationInterface';

// --- MOCK (remove when backend is ready) ---
const mockCongregations: Congregation[] = [
    {
        con_id: 'con-001',
        con_name: 'Congregação Central',
        end_id: 'add-001',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
    },
    {
        con_id: 'con-002',
        con_name: 'Congregação Norte',
        end_id: 'add-002',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
    },
    {
        con_id: 'con-003',
        con_name: 'Congregação Sul',
        end_id: 'add-003',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
    },
];

/**
 * Fetches all congregations.
 * TODO: Replace mock with real API call (GET /congregations)
 */
export async function fetchCongregations(): Promise<Congregation[]> {
    return mockCongregations;

    // TODO: Uncomment when backend is ready:
    // return apiClient<Congregation[]>('/congregations');
}
