import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { SignInUseCase } from "src/modules/auth/useCases/signInUsecase/SignInUseCase";
import { LocalAuthGuard } from "./guards/LocalAuth.guard";
import { JwtAuthGuard } from "./guards/JwtAuth.guard";
import { Public } from "./decorators/isPublic";


@Controller()
export class AuthController {
    constructor(private singInUseCase: SignInUseCase) { }
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Public()
    async signIn(@Request() request: any) {
        const access_token = await this.singInUseCase.execute({ user: request.user });

        return { access_token }
    }
}