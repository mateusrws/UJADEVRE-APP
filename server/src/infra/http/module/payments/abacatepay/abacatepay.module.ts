import { Module } from "@nestjs/common";
import { abacatePayController } from "./abacatepay.controller";
import { createPixPayment } from "src/modules/payment/abacatepay/createPaymentUseCase";
import { PrismaPaymentRepository } from "src/infra/database/prisma/repositories/PrismaPaymentRepository";
import { DataBaseModule } from "src/infra/database/database.module";


@Module({
    imports: [DataBaseModule],
    controllers: [abacatePayController],
    providers: [
        createPixPayment,
        PrismaPaymentRepository
    ]
})

export class AbacatePayModule { }