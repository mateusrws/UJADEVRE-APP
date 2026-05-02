import type { EventCategory } from "./EnumEventCategory";


export interface User {
    user_id: string;
    user_name: string;
    user_email: string;
    user_tel: string;
    user_bio: string;
    user_foto_url: string | null;
    user_data_nasc: string;
    user_cpg: string;
    user_point: number;
    user_tipo: string;
    con_id: string;
    end_id: string;
    createdAt: string;
    updatedAt: string;
    eventcategory: EventCategory;
}
