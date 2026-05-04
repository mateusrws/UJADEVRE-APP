import { mockEventRepository as MockEventRepository } from "../repositories/mockEventeRepository";
import { createEventUseCase as CreateEventeUseCase } from "./createEventUseCase";

let createEventUseCase: CreateEventeUseCase;

let mockEventRepository: MockEventRepository;

describe('', ()=>{
    beforeEach(() => {
        mockEventRepository = new MockEventRepository()
        createEventUseCase = new CreateEventeUseCase(mockEventRepository)
    })

    it("Should be able to create event", async () => {
        expect(mockEventRepository.events).toEqual([])

        const event = createEventUseCase.execute({
            end_id: "123",
            eve_nome: "any_name",
            eve_desc: "any_description",
            eve_data_and_time: new Date(),
            eve_max_participants: 100,
            eve_icon: "teste",
            eve_point: 100,
            eve_price: 12.50
        })

        expect(mockEventRepository.events).toEqual([
            expect.objectContaining({ _eve_id: (await event)._eve_id })
        ]); 
    
    
    })
    it("Should be return error if the max participants be <= 0", async () => {
        expect(mockEventRepository.events).toEqual([])

        const data = {
            end_id: "123",
            eve_nome: "any_name",
            eve_desc: "any_description",
            eve_data_and_time: new Date(),
            eve_max_participants: 0,
            eve_icon: "teste",
            eve_point: 100,
            eve_price: 12.50
        }


        expect((await createEventUseCase.execute(data))).toThrowErrorMatchingInlineSnapshot(`"O número máximo de participantes não pode ser menor que 1"`)
    })
    it("Should be return error if the set participants > max_participants", async () => {
        expect(mockEventRepository.events).toEqual([])

        const event = createEventUseCase.execute({
            end_id: "123",
            eve_nome: "any_name",
            eve_desc: "any_description",
            eve_data_and_time: new Date(),
            eve_max_participants: 0,
            eve_icon: "teste",
            eve_point: 100,
            eve_price: 12.50
        }) 


        expect((await event).participants = 101).toThrowErrorMatchingInlineSnapshot(`"O número de participantes não pode ultrapassar o máximo de participantes"`)
    })
})