import { mock } from "node:test";
import { News } from "../../entities/News";
import { mockNewsRepository as MockNewsRepository } from "../../repositories/mockNewsRepository";
import { putNewsInterface } from "../../repositories/newsRepository";
import { mockUserRepository } from "src/modules/User/repositories/mockUserRepository";

let mockNewsRepository: MockNewsRepository;

describe('Update News Tests', () => {
    beforeEach(() => {
        mockNewsRepository = new MockNewsRepository();
    })

    it('Should be returned a respect News', async () => {

        // * Create News

        const news = new News({
            new_content: "Teste",
            new_icon: "Teste",
            new_title: "Teste"
        })

        mockNewsRepository.create(news)

        // * Put News

        const newsPut: putNewsInterface = {
            new_content: "Teste Alterado",
            new_icon: "Teste Alterado",
            new_title: "Teste Alterado"
        }

        const res = await mockNewsRepository.put(news.getId, newsPut)

        
        expect(res).toEqual("Notícia Alterada com sucesso")
    });


})