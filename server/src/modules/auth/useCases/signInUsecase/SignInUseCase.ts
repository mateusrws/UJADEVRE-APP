import { Injectable } from "@nestjs/common";
import { User } from "src/modules/User/entities/User";
import { JwtService } from "@nestjs/jwt"
import { UserPayload } from "../../models/userPayload";

interface SignInRequest {
    user: User;
}

@Injectable()
export class SignInUseCase {
    constructor(private jwtService: JwtService) { }
    async execute({ user }: SignInRequest) {
        const payload: UserPayload = {
            sub: user.get_user_id,
            email: user.get_user_email,
            name: user.get_user_name,
            createdAt: user.get_user_createdAt.toJSON()
        };

        const jwtToken = this.jwtService.sign(payload)
        return jwtToken;
    }
}