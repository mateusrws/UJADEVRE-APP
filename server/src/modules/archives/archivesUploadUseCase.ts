import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { createClient } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import { putUserUseCase } from "../User/useCases/PutUserUseCase/putUserUseCase";
import { putRegistrationUseCase } from "../Registration/useCases/putRegistrationUseCase/putRegistrationUseCase";

function getUserId(token: string){
    // Remove "Bearer " do token
    const tokenLimpo = token.replace(/^Bearer\s+/i, '').trim();

    // Decodifica o token limpo
    const decoded: any = jwtDecode(tokenLimpo);
    const userId = decoded.sub;

    if (!userId) {
        throw new BadRequestException("Token inválido ou ID do usuário não encontrado.");
    }
    return userId
}

@Injectable()
export class archiveUploadUseCase {

    private readonly supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

    constructor(private putUserUseCase: putUserUseCase, private putRegistrationUseCase: putRegistrationUseCase) { }

    async executeForProfilePic(token: string, file: Express.Multer.File) {

        if (!file) {
            throw new BadRequestException("Arquivo não fornecido.");
        }

        const userId = getUserId(token)

        const extension = file.originalname.split(".").pop()?.trim().toLowerCase();
        if (!extension) {
            throw new BadRequestException("Arquivo sem extensão válida.");
        }

        const fileName = `${userId}-avatar.${extension}`;

        console.log('📤 Uploading to Supabase:', {
            bucket: 'Images',
            fileName: fileName,
            userId: userId,
            mimetype: file.mimetype,
            size: file.size
        });

        const { data, error } = await this.supabase.storage
            .from("Images")
            .upload(fileName, file.buffer, {
                upsert: true,
                contentType: file.mimetype
            });

        if (error) {
            console.error("❌ Erro detalhado do Supabase:", error);


            if (error.statusCode === 'PGRST125' || error.message.includes('Invalid path')) {
                throw new InternalServerErrorException(
                    'Bucket "Images" não existe no Supabase Storage. ' +
                    'Por favor, crie o bucket manualmente no painel do Supabase: ' +
                    'Storage → New Bucket → Nome: "Images" → Public: Yes'
                );
            }

            throw new InternalServerErrorException(`Erro ao fazer upload: ${error.message}`);
        }

        console.log('✅ Upload bem-sucedido:', data);

        const { data: publicUrlData } = this.supabase.storage
            .from("Images")
            .getPublicUrl(fileName);

        const putUser = await this.putUserUseCase.execute(userId, { user_foto_url: publicUrlData.publicUrl })

        return {
            message: "Imagem alterada com sucesso",
            path: data.path,
            publicUrl: publicUrlData.publicUrl,
            fileName: fileName
        };
    }

    async executeForTermPic(token: string, file: Express.Multer.File, reg_id: string) {

        if (!file) {
            throw new BadRequestException("Arquivo não fornecido.");
        }

        const userId = getUserId(token)

        const extension = file.originalname.split(".").pop()?.trim().toLowerCase();
        if (!extension) {
            throw new BadRequestException("Arquivo sem extensão válida.");
        }

        const fileName = `${userId}-termo.${extension}`;

        console.log('📤 Uploading to Supabase:', {
            bucket: 'Termos',
            fileName: fileName,
            userId: userId,
            mimetype: file.mimetype,
            size: file.size
        });

        const { data, error } = await this.supabase.storage
            .from("Termos")
            .upload(fileName, file.buffer, {
                upsert: true,
                contentType: file.mimetype
            });

        if (error) {
            console.error("❌ Erro detalhado do Supabase:", error);

            if (error.statusCode === 'PGRST125' || error.message.includes('Invalid path')) {
                throw new InternalServerErrorException(
                    'Bucket "Images" não existe no Supabase Storage. ' +
                    'Por favor, crie o bucket manualmente no painel do Supabase: ' +
                    'Storage → New Bucket → Nome: "Images" → Public: Yes'
                );
            }

            throw new InternalServerErrorException(`Erro ao fazer upload: ${error.message}`);
        }

        console.log('✅ Upload bem-sucedido:', data);
 
        const { data: publicUrlData } = this.supabase.storage
            .from("Termos")
            .getPublicUrl(fileName);

        const putRegistration = await this.putRegistrationUseCase.execute(reg_id, { reg_term_url: publicUrlData.publicUrl })

        return {
            message: "Upload do termo realizado com sucesso",
            path: data.path,
            publicUrl: publicUrlData.publicUrl,
            fileName: fileName
        };
    }
}