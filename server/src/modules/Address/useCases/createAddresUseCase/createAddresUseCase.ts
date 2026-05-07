import { Injectable } from "@nestjs/common";
import { addressRepository } from "../../repositories/addressRepository";
import { Address } from "../../entities/Address";



interface CreateAddressRequest{
    add_bairro: string
    add_cidade: string
    add_uf: string
    add_cep: string
    add_number: string
    add_rua: string
    add_comp?: string
}


@Injectable()
export class createAddressUseCase{
    constructor(private addressRepository: addressRepository){}

    

    async execute({ add_bairro, add_cep,add_cidade,add_rua,add_uf,add_comp, add_number  }: CreateAddressRequest){
        const addres = new Address({
            add_bairro, 
            add_cep,
            add_cidade,
            add_rua,
            add_uf,
            add_number,
            add_comp
        })

        await this.addressRepository.create(addres);
        return addres
    }

}
