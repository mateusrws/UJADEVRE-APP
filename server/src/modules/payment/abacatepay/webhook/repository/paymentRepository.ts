import { Payment, PaymentStatus } from "../entitie/payment"

export interface putPaymentInterface{
    amount: number
    status: PaymentStatus
}
export abstract class paymentRepository {
    abstract create(payment: Payment): Promise<void>;
    abstract getById(payment_id: string): Promise<Payment | null>;
    abstract getPayments(): Promise<Payment[] | null>;
    abstract putPayment(payment_id: string, paymentData: putPaymentInterface): Promise<String>;
    abstract deletePayment(payment_id: string): Promise<String>;
}