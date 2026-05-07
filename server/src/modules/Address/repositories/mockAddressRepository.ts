import { Address } from "../entities/Address";
import { addressRepository } from "./addressRepository";


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

}