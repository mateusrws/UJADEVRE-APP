import { paymentRepository, putPaymentInterface } from "src/modules/payment/abacatepay/webhook/repository/paymentRepository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNewsMapper } from "../mappers/PrismaNewsMapper";
import { PrismaPaymentMapper } from "../mappers/PrismaPaymentMapper";
import { Payment } from "src/modules/payment/abacatepay/webhook/entitie/payment";

@Injectable()
export class PrismaPaymentRepository implements paymentRepository {

    constructor(private prisma: PrismaService) { }

    async create(payment: Payment): Promise<void> {
        const paymentRaw = PrismaPaymentMapper.toPrisma(payment)
        await this.prisma.payment.create({
            data: paymentRaw
        })
    }

    async getPayments(): Promise<Payment[]> {
        const payments = await this.prisma.payment.findMany()
        return PrismaPaymentMapper.toDomain(payments)
    }

    async getById(payment_id: string): Promise<Payment | null> {
        const payment = await this.prisma.payment.findUnique({ where: { id: payment_id } })
        if (!payment) return null;
        return PrismaPaymentMapper.toDomainSingle(payment)
    }

    async putPayment(payment_id: string, paymentReceived: putPaymentInterface): Promise<String> {
        await this.prisma.payment.update({
            where: { id: payment_id },
            data: paymentReceived
        })

        return "Pagamento alterado com sucesso"
    }

    async deletePayment(payment_id: string): Promise<String> {
        await this.prisma.payment.delete({ where: { id: payment_id }})

        return "Pagamento deletado com sucesso"
    }
}