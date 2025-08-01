import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const titles: Record<string, string> = {
    "/project": "Dashboard",
    "/project/:projectId/analytics": "Analytics",
    "/project/:projectId/settings": "Settings",
    "/project/:projectId/devices": "Devices",
    "/project/:projectId/sensors": "Sensors"
};

export function ProjectHeader() {
    const [title, setTitle] = useState("");
    const pathname = useLocation().pathname;

    useEffect(() => {
        setTitle(getTitleFromPath(pathname));
    }, [pathname]);
    
    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <div className="flex w-full items-center gap-1 px-2 lg:gap-2 lg:px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <h1 className="text-base font-medium">{ title }</h1>
        </div>
        </header>
    )
}

function getTitleFromPath(pathname: string): string {
    const projectRouteRegex = /^\/project\/[^/]+(\/[^/]*)?$/;
    if (!projectRouteRegex.test(pathname)) {
        return "";
    }

    const [basePath] = pathname.split("/").slice(3);
    const staticPath = `/project/:projectId${basePath ? `/${basePath}` : ""}`;
    return titles[staticPath] || "Dashboard";
}
