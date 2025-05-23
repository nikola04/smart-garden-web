"use client"

import { MoreVerticalIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { IUser } from "@/types/user"
import { useAuth } from "@/hooks/use-auth"

export function NavUser({ user }: {
  user: IUser
}) {
    const { logout } = useAuth();
    return (
        <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            onClick={logout}
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
        </SidebarMenuItem>
        </SidebarMenu>
    )
}
