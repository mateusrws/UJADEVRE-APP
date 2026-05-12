import { Address } from "../entities/Address"


type Override = Partial<Address>

export const makeAddress = ({} : Override)=>{
    return new Address({
        add_bairro: "Teste",
        add_cep: "Teste", 
        add_cidade: "Teste",
        add_number: "92",
        add_rua: "Rua teste",
        add_uf: "TT",
        add_comp: "Teste"
    })
}