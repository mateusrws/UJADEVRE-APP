import { Injectable } from "@nestjs/common";
import { paymentRepository } from "../../repository/paymentRepository";

@Injectable()
export class getPaymentUseCase{
    constructor(private paymentRepository: paymentRepository){}

    async executeById(payment_id: string){
      const payment = await this.paymentRepository.getById(payment_id)
      return payment
    }

    async execute(){
      const payments = await this.paymentRepository.getPayments()
      return payments
    }

}
