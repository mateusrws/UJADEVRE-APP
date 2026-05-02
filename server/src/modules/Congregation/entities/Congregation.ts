// model Congregation{
//   createdAt     DateTime          @default(now())
//   updatedAt     DateTime          @updatedAt
//   con_id        String            @id @default(uuid())
//   con_name      String
//   end_id        String

import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

//   end           Address           @relation(fields: [end_id],references: [add_id])
//   users         User[]
// }

interface  CongregationSchema{
  con_createdAt: Date;
  con_name: string;
  end_id: string;
}


export class Congregation{
    props: CongregationSchema;
    _con_id: string;

    constructor(props: Replace<CongregationSchema, { con_createdAt?: Date }>,con_id?: string){
        this.props = {
            ...props,
            con_createdAt: props.con_createdAt || new Date(),
        };
        this._con_id = con_id || randomUUID();
    }

    get  con_id(){
        return this._con_id;
    }
    get con_name(): string{
        return this.props.con_name;
    }
    set con_name(con_name: string){
        this.props.con_name = con_name;
    }
    get end_id(): string{
        return this.props.end_id;
    }
    set end_id(end_id: string){
        this.props.end_id = end_id;
    }
    get createdAt(): Date{
        return this.props.con_createdAt;
    }
}