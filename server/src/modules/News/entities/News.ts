

// model News{
//   new_id              String      @id @default(uuid())
//   new_title           String
//   new_content         String
//   createdAt           DateTime    @default(now())
//   new_icon            String
// }

import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface NewsSchemas{
    new_title: string;
    new_content: string;
    new_createdAt: Date;
    new_icon: string;
}

export class News{
    private props: NewsSchemas;
    private _new_id: string;

    constructor(props: Replace<NewsSchemas, { new_createdAt?: Date }>,_new_id?: string){
        this.props = {
            ...props,
            new_createdAt: props.new_createdAt || new Date(),
        }
        this._new_id = _new_id || randomUUID()
    }
    get getId(){
        return this._new_id;
    }
    get getTitle(){
        return this.props.new_title;
    }  
    get getContent(){
        return this.props.new_content;
    }
    get getIcon(){
        return this.props.new_icon;
    }
    get getDate(){
        return this.props.new_createdAt;
    }
    set title(title: string){
        this.props.new_title = title;
    }
    set content(content: string){
        this.props.new_content = content;
    }
    set icon(icon: string){
        this.props.new_icon = icon;
    }
}