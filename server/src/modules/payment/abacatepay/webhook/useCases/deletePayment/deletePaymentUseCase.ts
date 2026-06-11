import { Injectable, NotFoundException } from "@nestjs/common"
import { paymentRepository } from "../../repository/paymentRepository"

@Injectable()
export class deletePaymentByIdUseCase {
    constructor(private paymentRepository: paymentRepository) { }

    async execute(payment_id: string) {

        const paymentExist = await this.paymentRepository.getById(payment_id)
        if(!paymentExist){
            throw new NotFoundException("Pagamento não encontrado")
        }
        
        return await this.paymentRepository.deletePayment(payment_id)
    }
}