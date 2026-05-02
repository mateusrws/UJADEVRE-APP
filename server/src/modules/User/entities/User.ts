// model User{
//   createdAt      DateTime         @default(now())
//   updatedAt      DateTime         @updatedAt
//   user_id        String           @id @default(uuid())
//   user_name      String
//   user_data_nasc DateTime 
//   user_bio       String
//   end_id         String
//   user_cpg       String           @unique
//   user_foto_url  String?
//   user_email     String           @unique
//   user_tel       String           @unique
//   user_senha     String
//   con_id         String
//   user_tipo      String
//   user_point     Int              @default(0)

//   registrations  Registration[]
//   end            Address          @relation(fields: [end_id],references: [add_id])
//   cong           Congregation     @relation(fields: [con_id], references: [con_id])
// }


interface UserSchema{ 
    user_name: string;
    user_email: string;
    user_tel: string;
    user_senha: string;
    user_tipo: string;
}