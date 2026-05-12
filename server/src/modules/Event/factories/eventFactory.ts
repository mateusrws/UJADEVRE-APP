import { makeAddress } from "src/modules/Address/factories/addressFactory"
import { Event } from "../entities/Event"



type overWrite = Partial<Event>

export const makeEvent = ()=>{
    const addressFake = makeAddress()
    return new Event({
        end_id: addressFake.get_add_id,
        eve_data_and_time: new Date(),
        eve_desc: "Teste",
        eve_icon: "Teste",
        eve_max_participants: 100,
        eve_nome: "Evento Teste",
        eve_point: 250,
        eve_price: 100
    })
}