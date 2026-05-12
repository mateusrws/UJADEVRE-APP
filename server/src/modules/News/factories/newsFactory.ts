import { News } from "../entities/News"




type overWrite = Partial<News>

export const makeNews = ({}: overWrite)=>{
    return new News({
         new_content: "Teste",
         new_icon: "Teste",
         new_title: "Teste"
    })
}
