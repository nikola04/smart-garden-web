"use client";

import { useParams, usePathname } from "next/navigation";
import { ChartLine, Cpu, LayoutDashboard, LucideProps, ThermometerSun, Users } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ProjectSwitcher } from "./project-switcher";
import { SidebarUserNavSkeleton } from "./skeletons/sidebar.skeleton";

const useSidebarItems = (currentProjectId: string) => {
    const items = [
        { title: "Dashboard", url: `/project/${currentProjectId}`, icon: LayoutDashboard },
        { title: "Analytics", url: `/project/${currentProjectId}/analytics`, icon: ChartLine },
        { title: "Family", url: `/project/${currentProjectId}/family`, icon: Users },
    ];

    const gearItems = [
        { title: "Devices", url: `/project/${currentProjectId}/devices`, icon: Cpu },
        { title: "Sensors", url: `/project/${currentProjectId}/sensors`, icon: ThermometerSun },
    ];

    return ({ items, gearItems });
}

export function AppSidebar() {
    const { user, loading } = useAuth();
    const { projectId } = useParams<{ projectId: string }>();

    const { items, gearItems } = useSidebarItems(projectId);
    return <Sidebar variant="inset">
        <SidebarHeader>
            <ProjectSwitcher projectId={projectId} loading={loading} />
        </SidebarHeader>
        <SidebarContent>
            <CustomSidebarGroup items={items} />
            <CustomSidebarGroup title="Gear" items={gearItems} />
        </SidebarContent>
        <SidebarFooter>
            { user != null ? <NavUser user={user} /> :
                <SidebarUserNavSkeleton />
            }
        </SidebarFooter>
    </Sidebar>;
}

function CustomSidebarGroup({
    title,
    items,
}: {
    title?: string;
    items: { url: string; title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> }[];
}) {
    const pathname = usePathname();

    return <SidebarGroup>
        {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
        <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                >
                    <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>;
}
