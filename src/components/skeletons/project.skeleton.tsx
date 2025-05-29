import { AppHeader } from "../app-header";
import { SidebarInset } from "../ui/sidebar";
import { AppSidebarSkeleton } from "./sidebar.skeleton";

export function ProjectSkeleton() {
    return <>
        <AppSidebarSkeleton />
        <SidebarInset className="p-2">
            <AppHeader />
        </SidebarInset>
    </>
}
