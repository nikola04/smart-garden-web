"use client";

import { Skeleton } from "@/components/ui/skeleton"
import { usePathname, useRouter } from "next/navigation";
import { ChartLine, Cpu, LayoutDashboard, LucideProps, ThermometerSun, Users } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

const items = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Analytics", url: "/app/analytics", icon: ChartLine },
  { title: "Family", url: "/app/family", icon: Users },
];
const gearItems = [
  { title: "Devices", url: "/app/devices", icon: Cpu },
  { title: "Sensors", url: "/app/sensors", icon: ThermometerSun },
];

export function AppSidebar() {
    const { user, loggedIn, loading } = useAuth();
    const path = usePathname();
    const router = useRouter();
    useEffect(() => {
        if (!loggedIn && !loading) {
            router.push(`/login?redirect=${encodeURIComponent(path)}`);
        }
    }, [loggedIn, loading, router, path]);

    return <Sidebar variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <div className="flex gap-2 px-1.5 items-center cursor-default data-[slot=sidebar-menu-button]:p-1.5!">
                    <span className="text-lg font-black">MyGarden</span>
                </div>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <CustomSidebarGroup items={items} />
            <CustomSidebarGroup title="Gear" items={gearItems} />
        </SidebarContent>
        <SidebarFooter>
            { user != null ? <NavUser user={user} /> :
                <SidebarMenu>
                <SidebarMenuItem>
                    <div className="flex items-center space-x-4 p-2">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <div className="grid flex-1 text-left text-sm leading-tight space-y-1">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-40" />
                        </div>
                    </div>
                </SidebarMenuItem>
                </SidebarMenu>
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

  return (
    <SidebarGroup>
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
    </SidebarGroup>
  );
}
