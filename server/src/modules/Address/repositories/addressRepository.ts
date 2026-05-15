import { Address } from "../entities/Address";
import { CreateAddressRequest } from "../useCases/createAddresUseCase/createAddresUseCase";

export interface putAddressInterface{
    add_bairro:string
    add_cep:string
    add_cidade:string
    add_number:string
    add_rua:string
    add_uf:string
    add_comp:string
}

export abstract class addressRepository {
    abstract create(address: Address): Promise<void>;
    abstract get(): Promise<Address[]>;
    abstract getById(add_id: string): Promise<Address | null>;
    abstract delete(add_id: string): Promise<String>;
    abstract update(add_id: string, address: putAddressInterface): Promise<Address | String>;
    abstract getByObject(address: CreateAddressRequest): Promise<Address | null>;
}