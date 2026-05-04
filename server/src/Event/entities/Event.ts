// model Event{
//   eve_id                String    @id @default(uuid())
//   eve_name              String
//   eve_date              DateTime
//   eve_desc              String
//   eve_price             Float     @default(0)
//   eve_point             Int       @default(0)
//   eve_start             DateTime
//   eve_participants      Int       @default(0)
//   eve_max_participants  Int     
//   eve_icon              String   
//   end_id                String

import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

//   end                   Address   @relation(fields: [end_id],references: [add_id])
//   registrations         Registration[]           
// }


interface EventSchema{
    eve_nome: string,
    eve_data_and_time: Date,
    eve_desc: string,
    eve_price: number,
    eve_point: number,
    end_id: string,
    eve_participants: number,
    eve_max_participants: number,
    eve_icon: string,
    eve_createdAt: Date
}

export class Event{
    props: EventSchema;
    _eve_id: string;

    constructor(props: Replace<EventSchema, { eve_createdAt?: Date, eve_participants?: number }>, eve_id?: string){
        this.props = {
            ...props,
            
            eve_createdAt: props.eve_createdAt ?? new Date(),
            eve_participants: props.eve_participants ?? 0
        };
        this._eve_id = eve_id || randomUUID();
    }
    

}