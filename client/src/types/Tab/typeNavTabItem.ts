import type { LucideIcon } from "lucide-react"
import type { TabIds } from "./typeTabId"

export type NavTabItem = {
    id: TabIds,
    icon: LucideIcon,
    label: string
}