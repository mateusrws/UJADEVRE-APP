import { mockUserRepository as MockUserRepository } from "../../repositories/mockUserRepository";

export class mockGetUserUseCase {
    constructor(private mockUserRepository: MockUserRepository) { }

    async execute() {
        const users = await this.mockUserRepository.get();
        return users.map(user => ({
            user_id: user.get_user_id,
            user_name: user.get_user_name,
            user_email: user.get_user_email,
            user_tel: user.get_user_tel,
            user_tipo: user.get_user_tipo,
            user_point: user.get_user_point,
        }));
    }

    async executeGet() {
        return this.mockUserRepository.get();
    }

    async executeById(user_id: string) {
        return this.mockUserRepository.getById(user_id);
    }
}
