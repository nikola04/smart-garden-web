"use client"

import { Check, ChevronsUpDown, FolderKanban, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { IProject } from "@/types/project"
import { useRouter } from "next/navigation"
import { useProject } from "@/hooks/use-project"

export function ProjectSwitcher({
    projectId,
    loading,
}: {
    projectId: string,
    loading: boolean
}) {
    const { project, projects } = useProject(projectId);
    const [selectedProject, setSelectedProject] = useState<IProject|null>(null);
    const router = useRouter();

    useEffect(() => {
        if(!project) return;
        setSelectedProject(project);
    }, [project]);

    const handleProjectChange = (project: IProject) => {
        setSelectedProject(project);
        router.replace(`/project/${project.id}/`);
    };

    const handleNewProject = () => {
        router.push('/select-project?new')
    }
    return <SidebarMenu>
        <SidebarMenuItem className="w-full relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size="lg" className="data-[state=open]:ring-2 data-[state=open]:ring-primary focus-visible:ring-0">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <FolderKanban className="size-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">Project</span>
                            <span className="max-w-[130px] overflow-x-clip whitespace-nowrap text-ellipsis">{loading ? "" : selectedProject?.name ?? ""}&nbsp;</span>
                        </div>
                        <ChevronsUpDown className="ml-auto" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
                    {projects.map((project) => <DropdownMenuItem key={project.id} onSelect={() => handleProjectChange(project)} >
                        {project.name}{" "}
                        {project.id === selectedProject?.id && <Check className="ml-auto" />}
                    </DropdownMenuItem>)}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleNewProject}><Plus className="mr-2 h-4 w-4" /> New Project</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
}
