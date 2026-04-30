import { apiClient } from '../apiClient';
import { getRankingMembers } from './getRankingMembers';

export type RankingMember = {
    id: number;
    name: string;
    points: number;
    // TODO: Add avatarUrl when backend supports it
};

/**
 * Fetches the ranking leaderboard.
 * TODO: Replace mock with real API call
 * TODO: Confirm the endpoint path with your backend (e.g. GET /ranking)
 * TODO: Add pagination support if the list grows large (e.g. GET /ranking?page=1&limit=20)
 */
export async function fetchRanking(): Promise<RankingMember[]> {
    // --- MOCK (remove when backend is ready) ---
    return getRankingMembers();
    // --- END MOCK ---

    // TODO: Uncomment and use when backend is ready:
    // return apiClient<RankingMember[]>('/ranking');
}
