import { Module } from "@nestjs/common";
import { WebhookController } from "./webhookReturnToHome";

@Module({
    imports: [],
    controllers: [WebhookController],
    providers: []
})
export class WebHookModule {}