import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { addressRepository } from "src/modules/Address/repositories/addressRepository";
import { PrismaAddressRepository } from "./prisma/repositories/PrismaAddressRepository";
import { congregationRepository } from "src/modules/Congregation/repositories/congregationRepository";
import { PrismaCongregationRepository } from "./prisma/repositories/PrismaCongregationRepository";
import { userRepository } from "src/modules/User/repositories/userRepository";
import { PrismaUserRepository } from "./prisma/repositories/PrismaUserRepository";
import { eventRepository } from "src/modules/Event/repositories/eventRepository";
import { PrismaEventRepository } from "./prisma/repositories/PrismaEventrepository";
import { newsRepository } from "src/modules/News/repositories/newsRepository";
import { PrismaNewsRepository } from "./prisma/repositories/PrismaNewsRepository";
import { registrationRepository } from "src/modules/Registration/repositories/registrationRepository";
import { PrismaRegistrationRepository } from "./prisma/repositories/PrismaRegistrationRepository";

@Module({
    providers: [
        PrismaService,
        { provide: addressRepository, useClass: PrismaAddressRepository },
        { provide: congregationRepository, useClass: PrismaCongregationRepository },
        { provide: userRepository, useClass: PrismaUserRepository },
        { provide: eventRepository, useClass: PrismaEventRepository },
        { provide: newsRepository, useClass: PrismaNewsRepository },
        { provide: registrationRepository, useClass: PrismaRegistrationRepository },
    ],
    exports: [
        PrismaService,
        addressRepository,
        congregationRepository,
        userRepository,
        newsRepository,
        eventRepository,
        registrationRepository,
    ],
})
export class DataBaseModule { }