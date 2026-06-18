import { BadRequestException } from "node_modules/@nestjs/common";
import { jwtDecode } from "node_modules/jwt-decode/build/cjs";

export function getUserId(token: string){
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