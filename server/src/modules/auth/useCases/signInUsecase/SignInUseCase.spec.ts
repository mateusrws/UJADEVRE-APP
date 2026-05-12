import { makeUser } from "src/modules/User/factories/userFactory"
import { SignInUseCase } from "./SignInUseCase"
import { JwtService } from "@nestjs/jwt"
import { UserPayload } from "../../models/userPayload"

let singInUseCase: SignInUseCase

let jwtService: JwtService

describe("Sing In", () => {
    beforeEach(() => {
        jwtService = new JwtService({ secret: "secret" })
        singInUseCase = new SignInUseCase(jwtService)
    })

    it("Should be able to create valid acess-token", async ()=> {
        const user = makeUser({})

        const token = await singInUseCase.execute({
            user,
        })

        const payload = jwtService.decode(token) as UserPayload
        
        expect(payload.sub).toEqual(user.get_user_id)
    })
})