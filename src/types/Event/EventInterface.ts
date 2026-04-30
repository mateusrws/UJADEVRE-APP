// TODO: When backend is ready, change id type from number to string (UUID)
// TODO: Remove the icon field — the backend will return an iconName string instead
//       Map iconName to a lucide component in the frontend using a lookup table
export interface InterfaceEvent {
    id: number;
    name: string;
    // TODO: Backend will return date as ISO string — parse to Date on the frontend
    date: Date;
    location: string;
    participants: number;
    maxParticipants: number;
    points: number;
    // TODO: Replace with iconName: string when backend is ready
    icon: any;
}
