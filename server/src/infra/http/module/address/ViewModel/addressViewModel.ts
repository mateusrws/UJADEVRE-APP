import { Address } from "src/modules/Address/entities/Address";



export class AddressViewModel{
    static toHttp({get_add_bairro,get_add_cep, get_add_cidade,get_add_comp, get_add_createdAt, get_add_id, get_add_number, get_add_rua, get_add_uf}: Address){
        return({get_add_bairro,get_add_cep, get_add_cidade,get_add_comp, get_add_createdAt, get_add_id, get_add_number, get_add_rua, get_add_uf})
    }
}