"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTitle(){
    const [title, setTitle] = useState("");

    const pathname = usePathname();
    const pageTitles: Record<string, string> = {
        "/dashboard": "Dashboard",
        "/analytics": "Analytics",
        "/family": "Family",
        "/devices": "Devices",
        "/sensors": "Sensors"
    };

    useEffect(() => {
        setTitle(pageTitles[pathname] || "Unknown Page");
    }, [pathname]);
    
    return <>{ title }</>
}
