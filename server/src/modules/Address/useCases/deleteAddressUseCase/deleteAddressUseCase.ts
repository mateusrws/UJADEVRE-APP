import { Injectable } from "@nestjs/common"
import { addressRepository } from "../../repositories/addressRepository"
import { ifAddressExist } from "src/utils/ifAddressExist"

@Injectable()
export class deleteAddressByIdUseCase {
    constructor(private addressRepository: addressRepository, private ifAddressExist: ifAddressExist) { }

    async execute(add_id: string) {

        await this.ifAddressExist.validateSomething(add_id)
        
        return await this.addressRepository.delete(add_id)
    }
}