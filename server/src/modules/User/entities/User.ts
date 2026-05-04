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
  user_bio: string;
  user_cpf: string;
  user_foto_url: string;
  con_id: string;
  end_id: string;
  user_point: number;
  user_createdAt: Date;
}


export class User{
    props: UserSchema;
    _user_id: string;

    constructor(props: Replace<UserSchema, { user_createdAt?: Date, user_point?: number }>,_user_id?: string){
        this.props = {
            ...props,
            user_senha:  hashSync(this.user_senha, 10),
            user_point: props.user_point || 0,
            user_createdAt: props.user_createdAt || new Date(),
        }
        this._user_id = _user_id || randomUUID();
    }

    get user_id(): string{
        return this._user_id;
    }
    get user_name(): string{
        return this.props.user_name;
    }
    set user_name(user_name: string){
        this.props.user_name = user_name;
    }
    get user_email(): string{
        return this.props.user_email;
    }
    set user_email(user_email: string){
        this.props.user_email = user_email;
    }
    get user_tel(): string{
        return this.props.user_tel;
    }
    set user_tel(user_tel: string){
        this.props.user_tel = user_tel;
    }
    get user_senha(): string{
        return this.props.user_senha;
    }
    set user_senha(user_senha: string){
        this.props.user_senha = hashSync(user_senha, 10);
    }   
    get user_tipo(): string{
        return this.props.user_tipo;
    }
    set user_tipo(user_tipo: UserType){
        this.props.user_tipo = user_tipo;
    }
    get user_data_nasc(): Date{
        return this.props.user_data_nasc;
    }
    set user_data_nasc(user_data_nasc: Date){
        this.props.user_data_nasc = user_data_nasc;
    }
    get user_bio(): string{
        return this.props.user_bio;
    }
    set user_bio(user_bio: string){
        this.props.user_bio = user_bio;
    }
    get user_cpf(): string{
        return this.props.user_cpf;
    }
    set user_cpf(user_cpf: string){
        this.props.user_cpf = user_cpf;
    }
    get user_foto_url(): string{
        return this.props.user_foto_url;
    }
    set user_foto_url(user_foto_url: string){
        this.props.user_foto_url = user_foto_url;
    }
    get user_point(): number{
        return this.props.user_point;
    }
    set user_point(user_point: number){
        this.props.user_point = user_point;
    }
    get user_createdAt(): Date{
        return this.props.user_createdAt;
    }
    get con_id(){
        return this.props.con_id;
    }
    set con_id(con_id: string){
        this.props.con_id = con_id;
    }
    get end_id(): string{
        return this.props.end_id;
    }
    set end_id(end_id: string){
        this.props.end_id = end_id;
    }
}