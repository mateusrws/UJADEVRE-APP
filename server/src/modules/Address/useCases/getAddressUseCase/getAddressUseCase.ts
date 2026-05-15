import { Injectable } from "@nestjs/common"
import { addressRepository } from "../../repositories/addressRepository"

@Injectable()
export class getAddressUseCase {
    constructor(private addressRepository: addressRepository) { }

    async execute() {
        const addresses = await this.addressRepository.get()
        const addressesRaw = addresses.map(address => {
            return {
                add_id: address.get_add_id,
                add_bairro: address.get_add_bairro,
                add_rua: address.get_add_rua,
                add_number: address.get_add_number,
                add_comp: address.get_add_comp,
                add_cidade: address.get_add_cidade,
                add_uf: address.get_add_uf,
                add_cep: address.get_add_cep,
            }
        })
        return addressesRaw
    }
    async executeById(add_id: string) {
        const address = await this.addressRepository.getById(add_id);
        if (!address) throw new Error("Address not found!")
        const addressRaw = {
            add_id: address.get_add_id,
            add_bairro: address.get_add_bairro,
            add_rua: address.get_add_rua,
            add_number: address.get_add_number,
            add_comp: address.get_add_comp,
            add_cidade: address.get_add_cidade,
            add_uf: address.get_add_uf,
            add_cep: address.get_add_cep,
        }
        return addressRaw
    }
}