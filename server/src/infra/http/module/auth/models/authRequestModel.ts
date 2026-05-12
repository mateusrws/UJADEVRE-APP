import { User } from "src/modules/User/entities/User";


export class AuthResquestModel extends Request{
    user: User;
}