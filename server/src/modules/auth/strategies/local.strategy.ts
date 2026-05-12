
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common'; 
import { ValidateUserUseCase } from '../useCases/validateUserUseCase/ValidateUserUseCase';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: ValidateUserUseCase) {
    super({
        usernameField: "email",
    });
  }

  async validate(email: string, password: string){
    return await this.validateUserUseCase.execute({ email, password })
  }
}
