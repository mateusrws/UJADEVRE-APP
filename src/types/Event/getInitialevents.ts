import { Camera, Gamepad2, PartyPopper, TreePine } from "lucide-react";
import type { InterfaceEvent } from "./EventInterface";

export function getInitialEvents(){
    const initialEvents: InterfaceEvent[] = [
    {
        id: 1,
        name: 'Encontro Mensal - Maio',
        date: new Date('2026-05-15T19:00:00'),
        location: 'Clube Central',
        participants: 45,
        maxParticipants: 60,
        points: 50,
        icon: PartyPopper,
    },
    {
        id: 2,
        name: 'Workshop de Fotografia',
        date: new Date('2026-05-08T14:00:00'),
        location: 'Estúdio Arte & Luz',
        participants: 12,
        maxParticipants: 20,
        points: 75,
        icon: Camera,
    },
    {
        id: 3,
        name: 'Caminhada Ecológica',
        date: new Date('2026-05-22T08:00:00'),
        location: 'Parque Municipal',
        participants: 28,
        maxParticipants: 40,
        points: 40,
        icon: TreePine,
    },
    {
        id: 4,
        name: 'Noite de Jogos',
        date: new Date('2026-05-29T20:00:00'),
        location: 'Sede Social',
        participants: 18,
        maxParticipants: 30,
        points: 35,
        icon: Gamepad2,
    },
    ];
    return initialEvents;
}