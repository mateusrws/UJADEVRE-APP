import { Registration } from "src/modules/Registration/entities/Registration";


export class RegistrationViewModel{
    static toHttp({get_eve_id, get_reg_id, get_reg_remain_value, get_reg_term_url, get_user_id}: Registration){
        return({get_eve_id, get_reg_id, get_reg_remain_value, get_reg_term_url, get_user_id})
    }
}