import { Injectable, NotFoundException } from "@nestjs/common";
import { getAddressByIdUseCase } from "src/modules/Address/useCases/getAddressByIdUseCase/getAddressByIdUseCase";


@Injectable()
export class ifAddressExist {
  constructor(private readonly getAddressUseCase: getAddressByIdUseCase) {}

  async validateSomething(id: string) {
    const exists = await this.getAddressUseCase.execute(id);
    if (!exists) {
      throw new NotFoundException('Endereço não encontrado');
    }
  }
}
