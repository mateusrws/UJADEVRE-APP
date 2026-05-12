import { MiddlewareConsumer, Module } from "@nestjs/common";
import { LocalStrategy } from "src/modules/auth/strategies/local.strategy";
import { ValidateUserUseCase } from "src/modules/auth/useCases/validateUserUseCase/ValidateUserUseCase";
import { UserModule } from "../user/user.module";
import { DataBaseModule } from "src/infra/database/database.module";
import { AuthController } from "./auth.controller";
import { SignInDTOValidateMiddleware } from "./middleware/SignInDTOValidate.middlware";
import { SignInUseCase } from "src/modules/auth/useCases/signInUsecase/SignInUseCase";
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from "src/modules/auth/strategies/jwt.strategy";

@Module({
    controllers: [AuthController],
    imports: [DataBaseModule, UserModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRE as any ?? '7d' }
    }),],
    providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase]
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignInDTOValidateMiddleware).forRoutes("/signin")
    }
}