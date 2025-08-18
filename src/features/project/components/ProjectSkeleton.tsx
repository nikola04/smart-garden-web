import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton as ShadSkeleton } from "@/components/ui/skeleton";

export function ProjectSkeleton() {
    return <>
        <AppSidebarSkeleton />
        <SidebarInset className="p-2">
            {/* <AppHeader /> */}
        </SidebarInset>
    </>
}

function Skeleton({ className, ...props }: React.ComponentProps<"div">){
    return <ShadSkeleton className={`${className} bg-black/12`} {...props}/>
}

function AppSidebarSkeleton() {
    return <Sidebar variant="sidebar" className="border-none shadow-none rounded-r-lg overflow-hidden">
        <SidebarHeader>
            <div className="p-2">
                <Skeleton className="h-9 w-full" />
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SkeletonSidebarGroup />
            <SkeletonSidebarGroup title="Gear" items={2} />
        </SidebarContent>
        <SidebarFooter>
            <SidebarUserNavSkeleton />
        </SidebarFooter>
    </Sidebar>;
}

function SkeletonSidebarGroup({ title, items = 3 }: { title?: string, items?: number }) {
    return <SidebarGroup>
        { title && <SidebarGroupLabel>
            <Skeleton className="h-4 w-24" />
        </SidebarGroupLabel> }
        <SidebarGroupContent>
            <SidebarMenu>
            {[...Array(items)].map((_, i) => (
                <SidebarMenuItem key={i}>
                <SidebarMenuButton disabled>
                    {/* <Skeleton className="h-6 w-6 mr-0.5" /> */}
                    <Skeleton className="h-6 w-full" />
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>;
}

export function SidebarUserNavSkeleton(){
    return <SidebarMenu>
        <SidebarMenuItem>
            <div className="flex items-center gap-2.5 p-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="grid flex-1 text-left text-sm leading-tight space-y-1">
                    <Skeleton className="h-3.5 w-28" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
        </SidebarMenuItem>
    </SidebarMenu>
}
