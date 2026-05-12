import { Registration } from "../entities/Registration";




export interface putRegistrationInterface{
    user_id: string,
    eve_id: string,
    reg_term_url: string,
    reg_remain_value: number,
    reg_isValid: boolean
}

export abstract class registrationRepository{
    abstract create(registration: Registration): Promise<void>;
    abstract get(): Promise<Registration[]>;
    abstract getMyRegistrations(userId: string, page: number, perPage: number): Promise<Registration[]>;
    abstract getById(reg_id: string): Promise<Registration | null>;
    abstract delete(reg_id: string): Promise<String>;
    abstract update(reg_id: string, registration: putRegistrationInterface): Promise<Registration | String>;
    abstract updateRemainValue(reg_id: string, value: number): Promise<String>;
}