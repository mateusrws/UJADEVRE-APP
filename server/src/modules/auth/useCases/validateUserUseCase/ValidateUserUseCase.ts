import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";
import { userRepository } from "../../../User/repositories/userRepository";

interface ValidateUserRequest {
    email: string,
    password: string
}

@Injectable()
export class ValidateUserUseCase {
    constructor(private userRepository: userRepository) { }

    async execute({ email, password }: ValidateUserRequest) {

        const user = await this.userRepository.findByEmail(email)

        if (!user) throw new UnauthorizedException("Email ou senha incorretos")

        const isMatchPass = await compare(password, user.get_user_senha)

        if (!isMatchPass) throw new UnauthorizedException("Email ou senha incorretos")

        return user;
    }
}