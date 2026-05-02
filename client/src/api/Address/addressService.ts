import type { Address } from '../../types/Address/AddressInterface';

// --- MOCK (remove when backend is ready) ---
const mockAddresses: Address[] = [
    {
        add_id: 'add-001',
        add_rua: 'Rua das Flores',
        add_comp: null,
        add_bairro: 'Centro',
        add_cidade: 'São Paulo',
        add_uf: 'SP',
        add_cep: '01001-000',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
    },
    {
        add_id: 'add-002',
        add_rua: 'Av. Brasil',
        add_comp: 'Bloco B',
        add_bairro: 'Vila Nova',
        add_cidade: 'Campinas',
        add_uf: 'SP',
        add_cep: '13010-000',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
    },
    {
        add_id: 'add-003',
        add_rua: 'Rua Sete de Setembro',
        add_comp: null,
        add_bairro: 'Jardim América',
        add_cidade: 'Ribeirão Preto',
        add_uf: 'SP',
        add_cep: '14010-000',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
    },
];

/**
 * Fetches all addresses.
 * TODO: Replace mock with real API call (GET /addresses)
 */
export async function fetchAddresses(): Promise<Address[]> {
    return mockAddresses;

    // TODO: Uncomment when backend is ready:
    // return apiClient<Address[]>('/addresses');
}

/**
 * Creates a new address.
 * TODO: Replace mock with real API call (POST /addresses)
 */
export async function createAddress(data: Omit<Address, 'add_id' | 'createdAt' | 'updatedAt'>): Promise<Address> {
    const now = new Date().toISOString();
    return {
        ...data,
        add_id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
    };

    // TODO: Uncomment when backend is ready:
    // return apiClient<Address>('/addresses', { method: 'POST', body: data });
}
