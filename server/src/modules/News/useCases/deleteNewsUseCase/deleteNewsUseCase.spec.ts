import { News } from "../../entities/News";
import { mockNewsRepository as MockNewsRepository } from "../../repositories/mockNewsRepository";


let mockNewsRepository: MockNewsRepository;


describe('Delete News Tests', () => {
    beforeEach(() => {
        mockNewsRepository = new MockNewsRepository()
    })

    it('Should be delete a news', async () => {

        // * Create a News

        const newsPayload = new News({
            new_content: "Teste",
            new_icon: "Teste",
            new_title:"Test"
        })
        mockNewsRepository.create(newsPayload)

        // * Delete a News

        const deleteNews = await mockNewsRepository.delete(newsPayload.getId)

        expect(deleteNews).toEqual("Notícia deletada com sucesso")
        
    });

})