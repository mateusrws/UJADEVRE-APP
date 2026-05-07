import { Event } from "src/modules/Event/entities/Event";

export class EventViewModel{
    static toHttp({get_createdAt,get_dataAndTime, get_desc, get_endId, get_icon, get_id, get_maxParticipants, get_nome, get_participants, get_point, get_price}: Event){
        return({get_createdAt,get_dataAndTime, get_desc, get_endId, get_icon, get_id, get_maxParticipants, get_nome, get_participants, get_point, get_price})
    }
}