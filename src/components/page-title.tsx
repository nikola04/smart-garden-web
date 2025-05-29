"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const titles: Record<string, string> = {
    "/project": "Dashboard",
    "/project/:projectId/analytics": "Analytics",
    "/project/:projectId/settings": "Settings",
    "/project/:projectId/devices": "Devices",
    "/project/:projectId/sensors": "Sensors"
};


function getTitleFromPath(pathname: string): string {
    const projectRouteRegex = /^\/project\/[^/]+(\/[^/]*)?$/;
    if (!projectRouteRegex.test(pathname)) {
        return "";
    }

    const [basePath] = pathname.split("/").slice(3);
    const staticPath = `/project/:projectId${basePath ? `/${basePath}` : ""}`;
    return titles[staticPath] || "Dashboard";
}

export default function PageTitle(){
    const [title, setTitle] = useState("");

    const pathname = usePathname();

    useEffect(() => {
        setTitle(getTitleFromPath(pathname));
    }, [pathname]);
    
    return <>{ title }</>
}
