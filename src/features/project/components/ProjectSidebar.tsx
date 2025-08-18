import { ChartLine, Cpu, LayoutDashboard, LogOut, type LucideProps, MoreVerticalIcon, Settings, ThermometerSun, User, Wrench } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation, useParams } from "react-router";
import { SidebarUserNavSkeleton } from "./ProjectSkeleton";
import type { IUser } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectSwitcher } from "./ProjectSwitcher";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/useMobile";

const useSidebarItems = (currentProjectId: string) => {
    const items = [
        { title: "Dashboard", url: `/project/${currentProjectId}/dashboard`, icon: LayoutDashboard },
        { title: "Analytics", url: `/project/${currentProjectId}/analytics`, icon: ChartLine },
        { title: "Settings", url: `/project/${currentProjectId}/settings`, icon: Wrench },
    ];

    const gearItems = [
        { title: "Devices", url: `/project/${currentProjectId}/devices`, icon: Cpu },
        { title: "Sensors", url: `/project/${currentProjectId}/sensors`, icon: ThermometerSun },
    ];

    return ({ items, gearItems });
}

export function ProjectSidebar() {
    const { user, loading } = useAuth();
    const projectId = useParams<{ projectId: string }>().projectId!

    const { items, gearItems } = useSidebarItems(projectId)
    return <Sidebar variant="sidebar" className="border-none shadow-none rounded-r-lg overflow-hidden">
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

function CustomSidebarGroup({ title, items }: {
    title?: string;
    items: { url: string; title: string; icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> }[];
}) {
    const pathname = useLocation().pathname

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
                    <Link className="font-light" to={item.url}>
                        <item.icon />
                        <span>{ item.title }</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>;
}

function NavUser({ user }: {
  user: IUser
}) {
    const isMobile = useIsMobile()
    const { logout } = useAuth()

    const handleAccount = () => {}
    const handleSettings = () => {}
    const handleLogout = () => logout()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar ?? ""} alt={user.name} />
                                <AvatarFallback className="rounded-lg">{ user.name[0].toUpperCase() }</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                            <MoreVerticalIcon className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleAccount}>
                                <User />
                                <p>Account</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleSettings}>
                                <Settings />
                                <p>Settings</p>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            <p>Log out</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
