import { User } from "src/modules/User/entities/User";

export class EventViewModel{
    static toHttp({ get_con_id, get_end_id, get_user_cpf, get_user_createdAt, get_user_data_nasc, get_user_desc, get_user_email, get_user_foto_url, get_user_id, get_user_name, get_user_point, get_user_senha, get_user_tel, get_user_tipo}: User){
        return({ get_con_id, get_end_id, get_user_cpf, get_user_createdAt, get_user_data_nasc, get_user_desc, get_user_email, get_user_foto_url, get_user_id, get_user_name, get_user_point, get_user_senha, get_user_tel, get_user_tipo})
    }
}