import { ValidateUserUseCase } from "./ValidateUserUseCase"
import { mockUserRepository as MockUserRepository } from "../../../../../../modules/User/repositories/mockUserRepository";
import { mockAddressRepository as MockAddressRepository } from "../../../../../../modules/Address/repositories/mockAddressRepository";
import { MockCongregationRepository } from "../../../../../../modules/Congregation/repositories/mockCongregationRepository";
import { makeAddress } from "../../../../../../modules/Address/factories/addressFactory";
import { makeCongregation } from "../../../../../../modules/Congregation/factories/congFactory";
import { makeUser } from "../../../../../../modules/User/factories/userFactory";
import { UnauthorizedException } from "@nestjs/common";


let validateUserUseCase: ValidateUserUseCase;
let mockUserRepository: MockUserRepository;
let mockAddressRepository: MockAddressRepository;
let mockCongregationRepository: MockCongregationRepository
describe('Validate User', () => {
    beforeEach(() => {
        mockUserRepository = new MockUserRepository()
        validateUserUseCase = new ValidateUserUseCase(mockUserRepository)
        mockAddressRepository = new MockAddressRepository()
        mockCongregationRepository = new MockCongregationRepository()
    })
    it("Should be able return user when credentials is correct", async () => {
        const address = makeAddress()

        const congregation = makeCongregation()


        mockAddressRepository.Address.push(address);
        mockCongregationRepository.congregation.push(congregation);

        expect(mockUserRepository.users).toEqual([]);

        const userPassWithoutEncription = "testepa-ssword"

        const user = makeUser({
            user_senha: userPassWithoutEncription
        })

        await mockUserRepository.create(user);

        const result = await validateUserUseCase.execute({
            email: user.get_user_email,
            password: userPassWithoutEncription
        })

        expect(result).toEqual(user)
    })
    it("Should be able to throw error when credentials incorrect", async () => {
        const userPassWithoutEncription = "testepa-ssword"

        const user = makeUser({
            user_senha: userPassWithoutEncription
        })

        await mockUserRepository.create(user);

        expect(async ()=>{
            await validateUserUseCase.execute({
                email: "incorret.email@gmail.com",
                password: userPassWithoutEncription
            })
        }).rejects.toThrow(UnauthorizedException)
        expect(async ()=>{
            await validateUserUseCase.execute({
                email: user.get_user_email,
                password: "IncorrectPass"
            })
        }).rejects.toThrow(UnauthorizedException)
    })
})