import { Event } from "../../entities/Event";
import { mockEventRepository as MockEventRepository } from "../../repositories/mockEventeRepository";
import { getEventUseCase as GetEventUseCase } from "./getEventUseCase";
import { createEventUseCase as CreateEventUseCase } from "../CreateEventUseCase/createEventUseCase";

let getEventUseCase: GetEventUseCase;
let createEventUseCase: CreateEventUseCase;
let mockEventRepository: MockEventRepository;

const eventTest = new Event({
    eve_nome: "Evento Teste",
    eve_data_and_time: new Date("2026-12-01T18:00:00"),
    eve_desc: "Descrição Teste",
    eve_price: 50,
    eve_point: 100,
    end_id: "end-teste",
    eve_max_participants: 30,
    eve_icon: "icon-teste",
})

describe('Get Event Tests', () => {
    beforeEach(() => {
        mockEventRepository = new MockEventRepository()
        getEventUseCase = new GetEventUseCase(mockEventRepository)
        createEventUseCase = new CreateEventUseCase(mockEventRepository)
    })

    it("Should return all events", async () => {
        expect(mockEventRepository.events).toEqual([])

        await createEventUseCase.execute({
            eve_nome: "Evento Teste",
            eve_data_and_time: new Date("2026-12-01T18:00:00"),
            eve_desc: "Descrição Teste",
            eve_price: 50,
            eve_point: 100,
            end_id: "end-teste",
            eve_max_participants: 30,
            eve_icon: "icon-teste",
        })

        const events = await getEventUseCase.execute()

        expect(events).toHaveLength(1)
        expect(events[0]).toMatchObject({
            eve_nome: "Evento Teste",
            eve_desc: "Descrição Teste",
            eve_price: 50,
        })
    })

    it("Should return event by id", async () => {
        await mockEventRepository.create(eventTest)

        const event = await getEventUseCase.executeById(eventTest.get_id)

        expect(event).not.toBeNull()
        expect(event.eve_id).toBe(eventTest.get_id)
    })

    it("Should throw when event not found", async () => {
        await expect(getEventUseCase.executeById("non-existent-id")).rejects.toThrow("Event not found!")
    })
})
