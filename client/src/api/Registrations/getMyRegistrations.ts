import { Briefcase, Camera, Gamepad2, PartyPopper, TreePine } from "lucide-react";
import type { InterfaceRegistration } from "../types/Registration/TypeRegistration";

export function getMyRegistrations(){
    const initialRegistrations: InterfaceRegistration[] = [
        {
            id: 1,
            eventName: 'Workshop de Fotografia',
            date: '2026-05-08',
            price: 50.0,
            amountPaid: 50.0,
            icon: Camera,
        },
        {
            id: 2,
            eventName: 'Encontro Mensal - Abril',
            date: '2026-04-15',
            price: 30.0,
            amountPaid: 30.0,
            icon: PartyPopper,
        },
        {
            id: 3,
            eventName: 'Caminhada Ecológica',
            date: '2026-05-22',
            price: 25.0,
            amountPaid: 0,
            icon: TreePine,
        },
        {
            id: 4,
            eventName: 'Noite de Jogos',
            date: '2026-05-29',
            price: 20.0,
            amountPaid: 0,
            icon: Gamepad2,
        },
        {
            id: 5,
            eventName: 'Palestra de Empreendedorismo',
            date: '2026-03-20',
            price: 40.0,
            amountPaid: 40.0,
            icon: Briefcase,
        },
    ];

    return initialRegistrations;
}