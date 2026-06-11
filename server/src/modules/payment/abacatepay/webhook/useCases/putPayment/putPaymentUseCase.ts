import { Injectable, NotFoundException } from "@nestjs/common";
import { paymentRepository, putPaymentInterface } from "../../repository/paymentRepository";

@Injectable()
export class putPaymentUseCase{
    constructor(private paymentRepository: paymentRepository){}

    async execute(payment_id: string, paymentReceived: putPaymentInterface){

      const paymentExist = await this.paymentRepository.getById(payment_id)
      if(!paymentExist){
        throw new NotFoundException("Pagamento não encontrado")
      }

      const payment = await this.paymentRepository.putPayment(payment_id, paymentReceived)
      return payment
    }
}
