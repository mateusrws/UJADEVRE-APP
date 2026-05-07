import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface EventSchema {
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

export class Event {
    props: EventSchema;
    _eve_id: string;

    constructor(
        props: Replace<EventSchema, { eve_createdAt?: Date, eve_participants?: number }>,
        eve_id?: string
    ) {

        const participants = props.eve_participants ?? 0;


        if (props.eve_max_participants < 1) {
            throw new Error("O número máximo de participantes não pode ser menor que 1");
        }

        if (participants < 0) {
            throw new Error("Participantes não pode ser negativo");
        }

        if (participants > props.eve_max_participants) {
            throw new Error("O número de participantes não pode ultrapassar o máximo de participantes");
        }

        this.props = {
            ...props,
            eve_createdAt: props.eve_createdAt ?? new Date(),
            eve_participants: participants
        };

        this._eve_id = eve_id || randomUUID();
    }


    get get_id(): string {
        return this._eve_id;
    }


    get get_nome(): string {
        return this.props.eve_nome;
    }

    set set_nome(value: string) {
        this.props.eve_nome = value;
    }


    get get_dataAndTime(): Date {
        return this.props.eve_data_and_time;
    }

    set set_dataAndTime(value: Date) {
        this.props.eve_data_and_time = value;
    }


    get get_desc(): string {
        return this.props.eve_desc;
    }

    set set_desc(value: string) {
        this.props.eve_desc = value;
    }

    get get_price(): number {
        return this.props.eve_price;
    }

    set set_price(value: number) {
        this.props.eve_price = value;
    }


    get get_point(): number {
        return this.props.eve_point;
    }

    set set_point(value: number) {
        this.props.eve_point = value;
    }


    get get_endId(): string {
        return this.props.end_id;
    }

    set set_endId(value: string) {
        this.props.end_id = value;
    }


    get get_participants(): number {
        return this.props.eve_participants;
    }

    set set_participants(value: number) {
        if (value < 0) {
            throw new Error("Participantes não pode ser negativo");
        }

        if (value > this.get_maxParticipants) {
            throw new Error("O número de participantes não pode ultrapassar o máximo de participantes");
        }

        this.props.eve_participants = value;
    }


    get get_maxParticipants(): number {
        return this.props.eve_max_participants;
    }

    set set_maxParticipants(value: number) {
        if (value < 1) {
            throw new Error("O número máximo de participantes não pode ser menor que 1");
        }

        if (value < this.get_participants) {
            throw new Error("O máximo não pode ser menor que os participantes atuais");
        }

        this.props.eve_max_participants = value;
    }


    get get_icon(): string {
        return this.props.eve_icon;
    }

    set set_icon(value: string) {
        this.props.eve_icon = value;
    }


    get get_createdAt(): Date {
        return this.props.eve_createdAt;
    }
}