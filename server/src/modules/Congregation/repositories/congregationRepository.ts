import { Congregation } from "../entities/Congregation";

export interface putCongregationInterface{
    con_name: string
    end_id: string
}
export abstract class congregationRepository {
    abstract create(congrtegation: Congregation): Promise<void>;
    abstract getById(con_id: string): Promise<Congregation | null>;
    abstract getCongregations(): Promise<Congregation[] | null>;
    abstract putCongregation(con_id: string, {}: putCongregationInterface): Promise<String>;
    abstract deleteCongregation(con_id: string): Promise<String>;
}