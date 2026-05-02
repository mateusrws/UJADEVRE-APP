import { Address } from "../entities/Address";

export abstract class addressRepository{
    abstract create(address: Address): Promise<void>;
}