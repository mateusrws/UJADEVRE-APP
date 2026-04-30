import type { TabIds } from "../../types/Tab/typeTabId"
import { Ranking } from "../../pages/Ranking"
import { News } from "../../pages/News"
import { Events } from "../../pages/Events"
import { Registration } from "../../pages/Registration"
import { Profile } from "../../pages/Profile"

type ContentComponentProps = {
    activeTab: TabIds
}

export function ContentComponent({ activeTab }: ContentComponentProps){
    return(
        <div className="flex-1 overflow-y-auto pt-20 pb-20">
            {activeTab === 'ranking' && <Ranking />}
            {activeTab === 'news' && <News />}
            {activeTab === 'events' && <Events />}
            {activeTab === 'registrations' && <Registration />}
            {activeTab === 'profile' && <Profile />}
        </div>
    )
}