import { Congregation } from "../entities/Congregation";


export abstract class congregationRepository{
    abstract create(congrtegation: Congregation): Promise<void>;
}