import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { type CreateAddressRequest, createAddressUseCase } from "src/modules/Address/useCases/createAddresUseCase/createAddresUseCase";
import { CreateAddressBody } from "./dtos/createAddressBody";
import { getAddressUseCase } from "src/modules/Address/useCases/getAddressUseCase/getAddressUseCase";
import type { putAddressInterface } from "src/modules/Address/repositories/addressRepository";
import { putAddressUseCase } from "src/modules/Address/useCases/putAddressUseCase/putAddressUseCase";
import { deleteAddressByIdUseCase } from "src/modules/Address/useCases/deleteAddressUseCase/deleteAddressUseCase";
import { getAddressByIdUseCase } from "src/modules/Address/useCases/getAddressByIdUseCase/getAddressByIdUseCase";


@Controller('address')
export class AddressController {

    constructor(
        private createAddressUseCase: createAddressUseCase,
        private getAddressUseCase: getAddressUseCase,
        private getAddressByIdUseCase: getAddressByIdUseCase,
        private putAddressUseCase: putAddressUseCase,
        private deleteAddressUseCase: deleteAddressByIdUseCase
    ) { }

    @Post('')
    async createAddres(@Body() body: CreateAddressBody) {
        const { add_bairro, add_cep, add_cidade, add_rua, add_uf, add_comp, add_number } = body
        const address = await this.createAddressUseCase.execute({ add_bairro, add_cep, add_cidade, add_rua, add_uf, add_comp, add_number })

        // Normalize entity to plain object
        return {
            add_id: address.get_add_id,
            add_bairro: address.get_add_bairro,
            add_cep: address.get_add_cep,
            add_cidade: address.get_add_cidade,
            add_rua: address.get_add_rua,
            add_uf: address.get_add_uf,
            add_comp: address.get_add_comp,
            add_number: address.get_add_number,
            add_createdAt: address.get_add_createdAt,
        }
    }

    @Get('/:add_id')
    async getAddressById(@Param('add_id') add_id: string) {
        const address = await this.getAddressUseCase.executeById(add_id)
        return address
    }

    @Get('')
    async getAddress() {
        const addresses = await this.getAddressUseCase.execute()
        return addresses
    }

    @Post('/search')
    async getByObject(@Body() body: CreateAddressRequest) {
        const address = await this.getAddressByIdUseCase.executeByObject(body)
        return address
    }

    @Put('/:add_id')
    async putAddress(@Param('add_id') add_id: string, @Body() body: putAddressInterface) {
        return await this.putAddressUseCase.execute(add_id, body)
    }

    @Delete('/:add_id')
    async deleteAddress(@Param('add_id') add_id: string) {
        return await this.deleteAddressUseCase.execute(add_id)
    }
}
