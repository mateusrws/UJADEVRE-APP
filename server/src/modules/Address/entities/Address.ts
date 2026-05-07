
// model Address{
//   createdAt     DateTime          @default(now())
//   updatedAt     DateTime          @updatedAt
//   add_id        String            @id @default(uuid())
//   add_bairro    String    
//   add_cidade    String
//   add_uf        String
//   add_cep       String
//   add_rua       String
//   add_comp      String?
//   congregations Congregation[]
//   users         User[]
//   events        Event[]
// }

import { randomUUID } from "crypto"
import { Replace } from "src/utils/replace"

interface AddressSchema{
    add_bairro: string
    add_cidade: string
    add_uf: string
    add_cep: string
    add_number
    add_rua: string
    add_createdAt: Date
    add_comp: string
}

export class Address{
    private props: AddressSchema;
    private _add_id: string;

    constructor(props: Replace<AddressSchema, { add_createdAt?: Date, add_comp?: string }>,add_id?: string){
        this.props = {
            ...props,
            add_comp: props.add_comp || "",
            add_createdAt: props.add_createdAt || new Date(),
        };
        this._add_id = add_id || randomUUID();
    }

    get get_add_id(): string{
        return this._add_id
    }
    get get_add_bairro(): string{
        return this.props.add_bairro
    }   
    get get_add_cidade(): string{
        return this.props.add_cidade
    }
    get get_add_uf(): string{
        return this.props.add_uf
    }
    get get_add_cep(): string{
        return this.props.add_cep
    }
    get get_add_rua(): string{
        return this.props.add_rua
    }
    get get_add_comp(): string{
        return this.props.add_comp
    }
    get get_add_createdAt(): Date{
        return this.props.add_createdAt
    }

    get get_add_number(): string{
        return this.props.add_number
    }

    set set_add_number(add_number: string){
        
        this.props.add_number = add_number;

    }

    set set_add_bairro(add_bairro:string){
        this.props.add_bairro = add_bairro;
    }   
    set set_add_cidade(add_cidade:string){
        this.props.add_cidade = add_cidade;
    }  
    set set_add_uf(add_uf:string){
        this.props.add_uf = add_uf;
    }
    set set_add_cep(add_cep:string){
        this.props.add_cep = add_cep;
    }
    set set_add_rua(add_rua:string){
        this.props.add_rua = add_rua;
    }
    set set_add_comp(add_comp:string){
        this.props.add_comp = add_comp;
    }
}