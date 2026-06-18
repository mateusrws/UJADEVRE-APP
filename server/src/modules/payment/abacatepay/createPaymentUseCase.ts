import { BadRequestException, Injectable } from "@nestjs/common";
import { getUserId } from "src/utils/getUserIdFromToken";
export interface paymenteRequest {
    method: "PIX"
    data: {
        amount: number
        externalId: string
    }
}

@Injectable()
export class createPixPayment {
 
    constructor(){}

    async execute(token: string, payment: paymenteRequest){

        if (payment.data.amount == 0) {
            throw new BadRequestException("O valor da transação deve ser maior que 0");
        }

        const userId = getUserId(token)

        const body = JSON.stringify({
            method: payment.method,
            data: {
                amount: payment.data.amount * 100,
                metadata: {
                    pedidoId: `payment-${payment.data.externalId}`,
                    userId: userId
                }
            }
        });

        
        const baseUrl = process.env.PAYMENT_GATEWAY_ABP_URL!
        const apiKey = process.env.PAYMENT_GATEWAY_ABP_KEY!

        const response = await fetch(`${baseUrl}/transparents/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body
        });


        const data = await response.json();

        if (!response.ok) {
            console.error("❌ Payment API Error:", data);
            throw new BadRequestException(`Erro ao criar pagamento: ${data.error || 'Erro desconhecido'}`);
        }
        return data;
    }
}