// ! Depois de criar o BackEnd devo trocar o tipo do ID para string
export interface InterfaceEvent {
  id: number;
  name: string;
  date: Date;
  location: string;
  participants: number;
  maxParticipants: number;
  points: number;
  icon: any;
}
