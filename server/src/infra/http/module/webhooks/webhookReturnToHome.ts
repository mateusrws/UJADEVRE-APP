import { Body, Controller, Post, Query } from "@nestjs/common";


@Controller('webhook')
export class WebhookController{

    constructor(){}

    @Post("abacatepay/")
    async ReturnToHome(@Query('webhookSecret') secret: string, @Body() body : any){
        return "google.com"
    }
}