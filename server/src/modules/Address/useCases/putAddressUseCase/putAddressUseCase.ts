import { Injectable } from "@nestjs/common"
import { addressRepository, putAddressInterface } from "../../repositories/addressRepository"
import { ifAddressExist } from "src/utils/ifAddressExist"

@Injectable()
export class putAddressUseCase {
    constructor(private addressRepository: addressRepository, private ifAddressExist: ifAddressExist) { }

    async execute(add_id: string,addressReceived: putAddressInterface) {

        await this.ifAddressExist.validateSomething(add_id)
        
        return await this.addressRepository.update(add_id,addressReceived)
    }
}