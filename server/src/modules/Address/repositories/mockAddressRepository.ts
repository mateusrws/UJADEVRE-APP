import { Address } from "../entities/Address";
import { CreateAddressRequest } from "../useCases/createAddresUseCase/createAddresUseCase";
import { addressRepository, putAddressInterface } from "./addressRepository";


export class mockAddressRepository implements addressRepository {
    

    public Address: Address[] = []

    async create(address: Address): Promise<void> {
        this.Address.push(address);
    }

    async get(): Promise<Address[]> {
        return this.Address;
    }

    async getById(add_id: string): Promise<Address | null> {
        return this.Address.find(a => a.get_add_id === add_id) ?? null;
    }

    async getByObject(address: CreateAddressRequest): Promise<Address | null> {

        const addressFound = this.Address.find(a => 
            a.get_add_bairro === address.add_bairro &&
            a.get_add_cep === address.add_cep &&
            a.get_add_cidade === address.add_cidade &&
            a.get_add_comp === address.add_comp &&
            a.get_add_number === address.add_number &&
            a.get_add_rua === address.add_rua &&
            a.get_add_uf === address.add_uf
        );
        return addressFound ?? null
    }

    async update(add_id: string, address: putAddressInterface): Promise<Address | String> {
        const i = this.Address.findIndex(a => a.get_add_id === add_id)

        if(this.Address[i] === undefined) return "Endereço não encontrado"


        this.Address[i] = new Address({
            add_bairro: address.add_bairro,
            add_cep: address.add_cep,
            add_cidade: address.add_cidade,
            add_number: address.add_number,
            add_rua: address.add_rua,
            add_uf: address.add_uf,
            add_comp: address.add_comp,
        }, add_id)
        return this.Address[i]
    }

    async delete(add_id: string): Promise<String> {
        const i = this.Address.findIndex(a => a.get_add_id === add_id)

        if(this.Address[i] === undefined) return "Endereço não encontrado"

        this.Address.splice(i, 1)
        return "Endereço deletado com sucesso"
    }

}