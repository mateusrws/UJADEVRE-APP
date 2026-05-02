import { Address } from "../entities/Address";
import { addressRepository } from "./addressRepository";

export class mockAddressRepository implements addressRepository{

    public Address: Address[] = []

    async create(address: Address): Promise<void> {
        this.Address.push(address);
    }

}