import { makeAddress } from "src/modules/Address/factories/addressFactory"
import { Congregation } from "../entities/Congregation"



type Overrride = Partial<Congregation>

export const makeCongregation = ({}: Overrride)=>{
    const addressFake = makeAddress({})
    return new Congregation({
        con_name: "Teste",
        end_id: addressFake.get_add_id
    })
}