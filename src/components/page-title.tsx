"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/analytics": "Analytics",
    "/family": "Family",
    "/devices": "Devices",
    "/sensors": "Sensors"
};

export default function PageTitle(){
    const [title, setTitle] = useState("");

    const pathname = usePathname();

    useEffect(() => {
        setTitle(titles[pathname] || "");
    }, [pathname]);
    
    return <>{ title }</>
}
