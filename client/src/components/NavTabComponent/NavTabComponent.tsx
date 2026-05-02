import type { Dispatch } from "react";
import type { Tabs } from "../../types/Tab/typeTabs";
import type { TabIds } from "../../types/Tab/typeTabId";

type NavTabProps = {
    tabs: Tabs;
    activeTab: TabIds;
    dispatch: Dispatch<TabIds>;
};

export function NavTab({ tabs, activeTab, dispatch }: NavTabProps) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="flex justify-around items-center px-2 py-3">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => dispatch(tab.id)}
                            className={`flex flex-col cursor-pointer items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                                isActive
                                    ? 'text-black bg-gray-100'
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-xs font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}