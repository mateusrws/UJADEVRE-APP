// model User{
//   createdAt      DateTime         @default(now())
//   updatedAt      DateTime         @updatedAt
//   user_id        String           @id @default(uuid())
//   user_name      String
//   user_data_nasc DateTime
//   user_bio       String
//   end_id         String
//   user_cpf      String           @unique
//   user_foto_url  String?
//   user_email     String           @unique
//   user_tel       String           @unique
//   user_senha     String
//   con_id         String
//   user_tipo      String
//   user_point     Int              @default(0)

import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";
import { hashSync } from "bcrypt"
import { TypeUser } from "types/enums/userTypeEnum";

//   registrations  Registration[]
//   end            Address          @relation(fields: [end_id],references: [add_id])
//   cong           Congregation     @relation(fields: [con_id], references: [con_id])
// }

interface UserSchema {
    user_name: string;
    user_email: string;
    user_tel: string;
    user_senha: string;
    user_tipo: TypeUser;
    user_data_nasc: Date;
    user_desc: string;
    user_cpf: string;
    user_foto_url: string;
    con_id: string;
    end_id: string;
    user_point: number;
    user_createdAt: Date;
}


export class User {
    private props: UserSchema;
    private _user_id: string;

    constructor(props: Replace<UserSchema, { user_createdAt?: Date, user_point?: number }>, _user_id?: string) {
        this.props = {
            ...props,
            user_senha: hashSync(props.user_senha, 10),
            user_point: props.user_point || 0,
            user_createdAt: props.user_createdAt || new Date(),
        }
        this._user_id = _user_id || randomUUID();
    }

    // Used by mappers to reconstruct from DB without re-hashing the password
    static reconstitute(props: UserSchema, user_id: string): User {
        const user = new User({ ...props, user_senha: '_placeholder_' }, user_id);
        user.props.user_senha = props.user_senha;
        return user;
    }

    get get_user_id(): string {
        return this._user_id;
    }
    get get_user_name(): string {
        return this.props.user_name;
    }
    set set_user_name(user_name: string) {
        this.props.user_name = user_name;
    }
    get get_user_email(): string {
        return this.props.user_email;
    }
    set set_user_email(user_email: string) {
        this.props.user_email = user_email;
    }
    get get_user_tel(): string {
        return this.props.user_tel;
    }
    set set_user_tel(user_tel: string) {
        this.props.user_tel = user_tel;
    }
    get get_user_senha(): string {
        return this.props.user_senha;
    }
    set set_user_senha(user_senha: string) {
        this.props.user_senha = hashSync(user_senha, 10);
    }
    get get_user_tipo(): string {
        return this.props.user_tipo;
    }
    set set_user_tipo(user_tipo: TypeUser) {
        this.props.user_tipo = user_tipo;
    }
    get get_user_data_nasc(): Date {
        return this.props.user_data_nasc;
    }
    set set_user_data_nasc(user_data_nasc: Date) {
        this.props.user_data_nasc = user_data_nasc;
    }
    get get_user_desc(): string {
        return this.props.user_desc;
    }
    set set_user_desc(user_desc: string) {
        this.props.user_desc = user_desc;
    }
    get get_user_cpf(): string {
        return this.props.user_cpf;
    }
    set set_user_cpf(user_cpf: string) {
        this.props.user_cpf = user_cpf;
    }
    get get_user_foto_url(): string {
        return this.props.user_foto_url;
    }
    set set_user_foto_url(user_foto_url: string) {
        this.props.user_foto_url = user_foto_url;
    }
    get get_user_point(): number {
        return this.props.user_point;
    }
    set set_user_point(user_point: number) {
        this.props.user_point = user_point;
    }
    get get_user_createdAt(): Date {
        return this.props.user_createdAt;
    }
    get get_con_id() {
        return this.props.con_id;
    }
    set set_con_id(con_id: string) {
        this.props.con_id = con_id;
    }
    get get_end_id(): string {
        return this.props.end_id;
    }
    set set_end_id(end_id: string) {
        this.props.end_id = end_id;
    }
}