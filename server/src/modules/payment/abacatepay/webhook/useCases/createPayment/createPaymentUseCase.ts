import { Injectable } from "@nestjs/common";
import { Payment, PaymentStatus } from "../../entitie/payment";
import { paymentRepository } from "../../repository/paymentRepository";

interface  CreatePaymentRequest{
  id: string;
  amount: number;
}


@Injectable()
export class createPaymentUseCase{
    constructor(private paymentRepository: paymentRepository){}

    

    async execute({ id, amount }: CreatePaymentRequest){
      const payment = new Payment({ amount, status: PaymentStatus.PENDING }, id);
      await this.paymentRepository.create(payment);
      return payment;
    }

}
