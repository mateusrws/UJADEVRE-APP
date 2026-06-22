import { Injectable } from "@nestjs/common";
import { Payment, PaymentStatus } from "../../entitie/payment";
import { paymentRepository } from "../../repository/paymentRepository";

interface  CreatePaymentRequest{
  id: string;
  amount: number;
  reg_id: string;
  user_id: string
}


@Injectable()
export class createPaymentUseCase{
    constructor(private paymentRepository: paymentRepository){}

    

    async execute({ id, amount, reg_id, user_id }: CreatePaymentRequest){
      const payment = new Payment({ amount, status: PaymentStatus.PENDING, reg_id, user_id }, id);
      await this.paymentRepository.create(payment);
      return payment;
    }

}
