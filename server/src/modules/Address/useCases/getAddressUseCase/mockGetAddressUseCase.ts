import { mockAddressRepository as MockAddressRepository } from "../../repositories/mockAddressRepository"


export class mockGetAddressUseCase{
    constructor(private mockAddressRepository: MockAddressRepository){}
    async execute(){    
        const addresses = await this.mockAddressRepository.get()
        const addressesRaw = addresses.map(address => {
                return{
                    add_id: address.get_add_id,
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

    async executeGet(){
        const addresses = await this.mockAddressRepository.get()
        return addresses
    }
    
    async executeById(add_id: string){
        const address = await this.mockAddressRepository.getById(add_id)

        return address
    }
}