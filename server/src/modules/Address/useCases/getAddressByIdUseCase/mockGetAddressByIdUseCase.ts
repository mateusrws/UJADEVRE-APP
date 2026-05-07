import { mockAddressRepository as MockAddressRepository } from "../../repositories/mockAddressRepository"

interface getAddressSchema {
    add_bairro: string
    add_cidade: string
    add_uf: string
    add_cep: string
    add_number: string
    add_rua: string
    add_comp?: string
}


export class getAddressByIdUseCase {
    constructor(private mockAddressRepository: MockAddressRepository) { }

    async execute(add_id: string): Promise<getAddressSchema | undefined> {

        const address = await this.mockAddressRepository.getById(add_id)

        if (!address) {

            return undefined
        }

        return {
            add_bairro: address.get_add_bairro,
            add_cidade: address.get_add_cidade,
            add_uf: address.get_add_uf,
            add_cep: address.get_add_cep,
            add_number: address.get_add_number,
            add_rua: address.get_add_rua,
            add_comp: address.get_add_comp
        }

    }
}