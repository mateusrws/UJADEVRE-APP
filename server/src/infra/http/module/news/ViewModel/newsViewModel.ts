import { News } from "src/modules/News/entities/News";

export class EventViewModel{
    static toHttp({ getContent, getDate, getIcon, getId, getTitle}: News){
        return({getContent, getDate, getIcon, getId, getTitle})
    }
}