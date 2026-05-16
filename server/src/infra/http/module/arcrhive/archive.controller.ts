import { Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { archiveUploadUseCase } from "src/modules/archives/archivesUploadUseCase";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/guards/JwtAuth.guard";


@Controller()
export class ArchiveController {
    constructor(private archiveUploadUseCase: archiveUploadUseCase) { }

    @Post('upload')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async uploadPicProfile(@Request() request: any, @UploadedFile() file: Express.Multer.File) {
        const result = await this.archiveUploadUseCase.executeForProfilePic(request.headers.authorization, file)

        return result
    }

    @Post('upload/:reg_id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("termo"))
    async uploadTermRegistration(@Param("reg_id") reg_id: string,@Request() request: any, @UploadedFile() file: Express.Multer.File) {
        const result = await this.archiveUploadUseCase.executeForTermPic(request.headers.authorization, file, reg_id)

        return result;
    }
}