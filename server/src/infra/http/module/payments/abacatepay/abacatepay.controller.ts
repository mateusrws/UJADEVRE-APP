import { Body, Controller, Post, Request } from "@nestjs/common";
import { PrismaPaymentRepository } from "src/infra/database/prisma/repositories/PrismaPaymentRepository";
import { createPixPayment } from "src/modules/payment/abacatepay/createPaymentUseCase";
import { PaymentStatus } from "src/modules/payment/abacatepay/webhook/entitie/payment";


@Controller("payment/abacate")
export class abacatePayController{
    constructor(private createPixPayment: createPixPayment, private paymentRepository: PrismaPaymentRepository){}

    @Post("")
    async createPayment(@Request() request: any, @Body() body: any){
        const result = await this.createPixPayment.execute(request.headers.authorization, {
            data: {
                amount: body.amount
            },
            method: "PIX"
        })

        return result
    }   

    @Post("/webhook")
    async handleWebhook(@Request() request: any, @Body() body: any){
        if(body.event === "checkout.completed"){   
            await this.paymentRepository.putPayment(body.data.externalId, {
                amount: body.data.amount,
                status: PaymentStatus.PAID
            })
            console.log("Pagamento atualizado para PAID")
        }
    }
}