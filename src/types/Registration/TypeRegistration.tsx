// TODO: When backend is ready, change id type from number to string (UUID)
// TODO: Remove the icon field — the backend will return an iconName string instead
//       Map iconName to a lucide component in the frontend using a lookup table
export interface InterfaceRegistration {
    id: number;
    // TODO: Add eventId field to link back to the event when backend is ready
    eventName: string;
    // TODO: Backend will return date as ISO string — keep as string or parse to Date
    date: string;
    price: number;
    amountPaid: number;
    // TODO: Replace with iconName: string when backend is ready
    icon: any;
}
