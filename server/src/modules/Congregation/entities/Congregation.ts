

import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface  CongregationSchema{
  con_createdAt: Date;
  con_name: string;
  end_id: string;
}


export class Congregation{
    private props: CongregationSchema;
    private _con_id: string;

    constructor(props: Replace<CongregationSchema, { con_createdAt?: Date }>,con_id?: string){
        this.props = {
            ...props,
            con_createdAt: props.con_createdAt || new Date(),
        };
        this._con_id = con_id || randomUUID();
    }

    get get_con_id(){
        return this._con_id;
    }
    get get_con_name(): string{
        return this.props.con_name;
    }
    set set_con_name(con_name: string){
        this.props.con_name = con_name;
    }
    get get_end_id(): string{
        return this.props.end_id;
    }
    set set_end_id(end_id: string){
        this.props.end_id = end_id;
    }
    get get_createdAt(): Date{
        return this.props.con_createdAt;
    }
}