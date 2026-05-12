import { Module } from '@nestjs/common';
import { AdressModule } from "./infra/http/module/address/address.module"
import { DataBaseModule } from './infra/database/database.module';
import { CongregationModule } from './infra/http/module/congregation/congregation.module';
import { UserModule } from './infra/http/module/user/user.module';
import { NewsModule } from './infra/http/module/news/news.module';
import { EventModule } from './infra/http/module/event/event.module';
import { RegistrationModule } from './infra/http/module/registration/registration.module';
@Module({
  imports: [DataBaseModule, AdressModule, CongregationModule, UserModule, NewsModule, EventModule, RegistrationModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
