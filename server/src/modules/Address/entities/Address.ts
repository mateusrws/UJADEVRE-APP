
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
    add_rua: string
    add_createdAt: Date
    add_comp: string
}

export class Address{
    props: AddressSchema;
    _add_id: string;

    constructor(props: Replace<AddressSchema, { add_createdAt?: Date, add_comp?: string }>,add_id?: string){
        this.props = {
            ...props,
            add_comp: props.add_comp || "",
            add_createdAt: props.add_createdAt || new Date(),
        };
        this._add_id = add_id || randomUUID();
    }

    get add_id(): string{
        return this._add_id
    }
    get add_bairro(): string{
        return this.props.add_bairro
    }   
    get add_cidade(): string{
        return this.props.add_cidade
    }
    get add_uf(): string{
        return this.props.add_uf
    }
    get add_cep(): string{
        return this.props.add_cep
    }
    get add_rua(): string{
        return this.props.add_rua
    }
    get add_comp(): string{
        return this.props.add_comp
    }
    get add_createdAt(): Date{
        return this.props.add_createdAt
    }

    set add_bairro(add_bairro:string){
        this.props.add_bairro = add_bairro;
    }   
    set add_cidade(add_cidade:string){
        this.props.add_cidade = add_cidade;
    }  
    set add_uf(add_uf:string){
        this.props.add_uf = add_uf;
    }
    set add_cep(add_cep:string){
        this.props.add_cep = add_cep;
    }
    set add_rua(add_rua:string){
        this.props.add_rua = add_rua;
    }
    set add_comp(add_comp:string){
        this.props.add_comp = add_comp;
    }
}