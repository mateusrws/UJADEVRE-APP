import { NotFoundException } from "@nestjs/common";
import { Congregation } from "../entities/Congregation";
import { congregationRepository, putCongregationInterface } from "./congregationRepository";


export class MockCongregationRepository implements congregationRepository {

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

    async putCongregation(con_id: string, congregationReceived: putCongregationInterface): Promise<String>{
        const congregation = this.congregation.find(c => c.get_con_id == con_id)

        if(!congregation) throw new NotFoundException("Congregação não existe")

        congregation.set_con_name = congregationReceived.con_name;
        congregation.set_end_id = congregationReceived.end_id
        return "Congregação alterada com sucesso"

    }

    async deleteCongregation(con_id: string): Promise<String> {
        const congregationIndex = this.congregation.findIndex(c => c.get_con_id == con_id);

        if(congregationIndex < 0) throw new NotFoundException("Congregação não existe")

        this.congregation.splice(congregationIndex,1)
        return "Congregação deletada com sucesso"
    }

}