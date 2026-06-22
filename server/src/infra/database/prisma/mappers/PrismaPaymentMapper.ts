import { Payment as PaymentRaw } from "@prisma/client";
import { Payment, PaymentStatus } from "src/modules/payment/abacatepay/webhook/entitie/payment";

export class PrismaPaymentMapper {
    static toPrisma(payment: Payment): PaymentRaw {
        return(
            {
                id: payment.get_id,
                amount: payment.get_amount,
                status: payment.get_status,
                reg_id: payment.get_reg_id,
                user_id: payment.get_user_id,
                createdAt: payment.get_createdAt,
                updatedAt: payment.get_updatedAt,
            }
        )
    }

    static toDomain(paymentList: PaymentRaw[]): Payment[] {
        return paymentList.map(payment => new Payment(
            {
                amount: payment.amount,
                status: payment.status as PaymentStatus,
                reg_id: payment.reg_id,
                user_id: payment.user_id,
                createdAt: payment.createdAt,
                updatedAt: payment.updatedAt
            },
            payment.id
        ))
    }

    static toDomainSingle(payment: PaymentRaw): Payment {
        return new Payment(
            {
                amount: payment.amount,
                status: payment.status as PaymentStatus,
                reg_id: payment.reg_id,
                user_id: payment.user_id,
                createdAt: payment.createdAt,
                updatedAt: payment.updatedAt
            },
            payment.id
        )
    }
}
