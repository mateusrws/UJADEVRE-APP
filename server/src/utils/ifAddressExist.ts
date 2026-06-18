import { BadRequestException, Injectable } from "@nestjs/common";
import { Address } from "src/modules/Address/entities/Address";
import { CreateAddressRequest } from "src/modules/Address/useCases/createAddresUseCase/createAddresUseCase";
import { getAddressByIdUseCase } from "src/modules/Address/useCases/getAddressByIdUseCase/getAddressByIdUseCase";


@Injectable()
export class ifAddressExist {
  constructor(private readonly getAddressUseCase: getAddressByIdUseCase) { }

  async ifAlrefyExist(address: CreateAddressRequest): Promise<null | Address> {
    const exists = await this.getAddressUseCase.executeByObject(address)
    if (!exists) {
      return null
    }
    return exists
  }

  async somethingValidate(id: string) {
    const exists = await this.getAddressUseCase.execute(id)
    if (!exists) {
      throw new BadRequestException("Endereço não existe")
    }
  }
}
