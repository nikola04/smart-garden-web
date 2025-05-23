"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const titles: Record<string, string> = {
    "/app": "Dashboard",
    "/app/analytics": "Analytics",
    "/app/family": "Family",
    "/app/devices": "Devices",
    "/app/sensors": "Sensors"
};

export default function PageTitle(){
    const [title, setTitle] = useState("");

    const pathname = usePathname();

    useEffect(() => {
        setTitle(titles[pathname] || "");
    }, [pathname]);
    
    return <>{ title }</>
}
