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

    get id(): string {
        return this._eve_id;
    }

    get nome(): string {
        return this.props.eve_nome;
    }

    set nome(value: string) {
        this.props.eve_nome = value;
    }

    get dataAndTime(): Date {
        return this.props.eve_data_and_time;
    }

    set dataAndTime(value: Date) {
        this.props.eve_data_and_time = value;
    }

    get desc(): string {
        return this.props.eve_desc;
    }

    set desc(value: string) {
        this.props.eve_desc = value;
    }

    get price(): number {
        return this.props.eve_price;
    }

    set price(value: number) {
        this.props.eve_price = value;
    }

    get point(): number {
        return this.props.eve_point;
    }

    set point(value: number) {
        this.props.eve_point = value;
    }

    get endId(): string {
        return this.props.end_id;
    }

    set endId(value: string) {
        this.props.end_id = value;
    }

    get participants(): number {
        return this.props.eve_participants;
    }

    set participants(value: number) {
        if(this.maxParticipants  < value){
            throw Error("O número de participantes não pode ultrapassar o máximo de participantes")
        }
        this.props.eve_participants = value;
    }

    get maxParticipants(): number {
        return this.props.eve_max_participants;
    }

    set maxParticipants(value: number) {
        if(this.participants >= 0) {
            throw Error("O número máximo de participantes não pode ser menor que 1")
        }

        this.props.eve_max_participants = value;
    }

    get icon(): string {
        return this.props.eve_icon;
    }

    set icon(value: string) {
        this.props.eve_icon = value;
    }

    get createdAt(): Date {
        return this.props.eve_createdAt;
    }
}
