import { TypeUser } from "types/enums/userTypeEnum";
import { User } from "../entities/User";

export interface putUserInterface {
  user_name: string;
  user_email: string;
  user_tel: string;
  user_data_nasc: Date;
  user_desc: string;
  user_cpf: string;
  user_foto_url: string;
  con_id: string;
  end_id: string;
}
export abstract class userRepository {
    abstract create(user: User): Promise<void>;
    abstract get(): Promise<User[]>;
    abstract getById(user_id: string): Promise<User | null>;
    abstract put(user_id: string, userReceived: putUserInterface): Promise<String>;
    abstract delete(user_id: string): Promise<String>;
    abstract findByEmail(user_email: string): Promise<User | null>;
}
