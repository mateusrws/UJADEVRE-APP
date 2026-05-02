import { Congregation } from "../entities/Congregation";
import { congregationRepository } from "./congregationRepository";

export class mockCongregationRepository implements congregationRepository{

    public congregation: Congregation[] = []

    async create(congregation: Congregation): Promise<void> {
        this.congregation.push(congregation);
    }

}