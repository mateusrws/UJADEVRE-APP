import { Congregation } from "src/modules/Congregation/entities/Congregation";

export class CongregationViewModel{
    static toHttp({get_con_id, get_con_name, get_createdAt , get_end_id, set_con_name, set_end_id}: Congregation){
        return({get_con_id, get_con_name, get_createdAt , get_end_id, set_con_name, set_end_id})
    }
}