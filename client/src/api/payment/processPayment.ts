import type { InterfaceRegistration } from '../../types/Registration/TypeRegistration';

/**
 * Aplica um pagamento parcial ou total a uma inscrição.
 * Retorna a lista atualizada de inscrições.
 *
 * TODO: substituir pela chamada ao backend de pagamento quando implementado.
 */
export function processPayment(
    registrations: InterfaceRegistration[],
    targetId: number,
    amount: number
): InterfaceRegistration[] {
    return registrations.map(r =>
        r.id === targetId
            ? { ...r, amountPaid: r.amountPaid + amount }
            : r
    );
}
