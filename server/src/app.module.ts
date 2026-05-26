import { Module } from '@nestjs/common';
import { AdressModule } from "./infra/http/module/address/address.module"
import { DataBaseModule } from './infra/database/database.module';
import { CongregationModule } from './infra/http/module/congregation/congregation.module';
import { UserModule } from './infra/http/module/user/user.module';
import { NewsModule } from './infra/http/module/news/news.module';
import { EventModule } from './infra/http/module/event/event.module';
import { RegistrationModule } from './infra/http/module/registration/registration.module';
import { AuthModule } from './infra/http/module/auth/auth.module';
import { JwtAuthGuard } from './infra/http/module/auth/guards/JwtAuth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ArchiveModule } from './infra/http/module/arcrhive/archive.module';
import { WebHookModule } from './infra/http/module/webhooks/webhook';
@Module({
  imports: [DataBaseModule, AdressModule, CongregationModule, UserModule, NewsModule, EventModule, RegistrationModule, AuthModule, ArchiveModule, WebHookModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
