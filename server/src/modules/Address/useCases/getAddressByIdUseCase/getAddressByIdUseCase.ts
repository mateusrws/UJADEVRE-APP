import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { addressRepository } from "../../repositories/addressRepository"
import { CreateAddressRequest } from "../createAddresUseCase/createAddresUseCase"

export interface getAddressSchema {
    add_bairro: string
    add_cidade: string
    add_uf: string
    add_cep: string
    add_number: string
    add_rua: string
    add_comp?: string
}

@Injectable()
export class getAddressByIdUseCase {
    constructor(@Inject(addressRepository) private addressRepository: addressRepository) { }

    async execute(add_id: string): Promise<getAddressSchema> {
        const address = await this.addressRepository.getById(add_id)
        if (!address) {
            throw new BadRequestException("Endereço não encontrado")
        }
        return {
            add_bairro: address.get_add_bairro,
            add_cep: address.get_add_cep,
            add_cidade: address.get_add_cidade,
            add_number: address.get_add_number,
            add_rua: address.get_add_rua,
            add_uf: address.get_add_uf,
            add_comp: address.get_add_comp,
        }
    }

    async executeByObject(address: CreateAddressRequest) {
        const exists = await this.addressRepository.getByObject(address)
        return exists
    }
}