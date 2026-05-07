import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { createAddressUseCase } from "src/modules/Address/useCases/createAddresUseCase/createAddresUseCase";
import { CreateAddressBody } from "./dtos/createAddressBody";
import { getAddressUseCase } from "src/modules/Address/useCases/getAddressUseCase/getAddressUseCase";


@Controller('address')
export class AddressController{

    constructor(private createAddressUseCase: createAddressUseCase, private getAddressUseCase: getAddressUseCase){}

    @Post('')
    async createAddres(@Body() body: CreateAddressBody){

        const { add_bairro, add_cep, add_cidade, add_rua, add_uf, add_comp, add_number } = body
        const user = await this.createAddressUseCase.execute({ add_bairro, add_cep, add_cidade, add_rua, add_uf, add_comp, add_number })
        return user
    }

    @Get('/:add_id')
    async getAddressById(@Param('add_id') add_id: string){
        const address = await this.getAddressUseCase.executeById(add_id)
        return address
    }

    @Get('')
    async getAddress(){
        const addresses = await this.getAddressUseCase.execute()
        return addresses
    }
}