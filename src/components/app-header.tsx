import PageTitle from "./page-title";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export function AppHeader() {
    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <div className="flex w-full items-center gap-1 px-2 lg:gap-2 lg:px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium"><PageTitle/></h1>
        </div>
        </header>
    )
}
