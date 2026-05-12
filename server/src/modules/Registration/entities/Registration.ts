// model Registration {
//   reg_id           String @id @default(uuid())
//   eve_id           String
//   user_id          String
//   reg_remain_value Float
//   reg_term_url     String

import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

//   user  User  @relation(fields: [user_id], references: [user_id])
//   event Event @relation(fields: [eve_id], references: [eve_id])
// }

interface RegistrationSchema {
    eve_id: string,
    user_id: string
    reg_remain_value: number,
    reg_term_url: string,
    reg_isValid: boolean
}

export class Registration {
    private props: RegistrationSchema;
    private _reg_id: string
    constructor(props: Replace<RegistrationSchema, { reg_isValid?: boolean }>, _reg_id?: string) {
        this.props = {
            ...props,
            reg_isValid: props.reg_isValid || false
        };
        this._reg_id = _reg_id || randomUUID()
    }

    get get_reg_id(): string {
        return this._reg_id;
    }
    get get_eve_id(): string {
        return this.props.eve_id;
    }
    get get_user_id(): string {
        return this.props.user_id;
    }
    get get_reg_remain_value(): number {
        return this.props.reg_remain_value;
    }
    get get_reg_term_url(): string {
        return this.props.reg_term_url;
    }

    get get_reg_isValid(): boolean {
        return this.props.reg_isValid ?? false;
    }

    set set_reg_remain_value(value: number) {
        this.props.reg_remain_value = value;
    }

    set set_reg_term_url(value: string) {
        this.props.reg_term_url = value;
    }
    set set_eve_id(eve_id: string) {
        this.props.eve_id = eve_id;
    }
    set set_user_id(user_id: string) {
        this.props.user_id = user_id;
    }

    set set_reg_isValid(value: boolean) {
        this.props.reg_isValid = value;
    }

}