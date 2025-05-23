"use client";

import { usePathname } from "next/navigation";
import { ChartLine, Cpu, Fence, LayoutDashboard, ThermometerSun, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Link from "next/link";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Analytics", url: "/analytics", icon: ChartLine },
  { title: "Family", url: "/family", icon: Users },
];
const gearItems = [
  { title: "Devices", url: "/devices", icon: Cpu },
  { title: "Sensors", url: "/sensors", icon: ThermometerSun },
];

export function AppSidebar() {
  const user = {
    email: "test@gmail.com",
    name: "patak",
    avatar: "",
  };
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
            <div className="flex gap-2 items-center cursor-default data-[slot=sidebar-menu-button]:!p-1.5">
                <Fence className="h-5 w-5" />
                <span className="text-base font-semibold">My Garden</span>
            </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CustomSidebarGroup items={items} />
        <CustomSidebarGroup title="Gear" items={gearItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

function CustomSidebarGroup({
  title,
  items,
}: {
  title?: string;
  items: { url: string; title: string; icon: any }[];
}) {
  const pathname = usePathname(); // Get the current path

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={pathname === item.url ? "!bg-primary !text-white" : ""}
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
