import { Congregation } from "../entities/Congregation";
import { congregationRepository } from "./congregationRepository";

export class mockCongregationRepository implements congregationRepository {

    public congregation: Congregation[] = []

    async create(congregation: Congregation): Promise<void> {
        this.congregation.push(congregation);
    }

    async getById(con_id: string): Promise<Congregation | null> {
        return this.congregation.find(c => c.get_con_id === con_id) ?? null;
    }

    async getCongregations(): Promise<Congregation[]> {
        return this.congregation
    }

}