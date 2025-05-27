"use client"

import { Check, ChevronsUpDown, FolderKanban } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { IProject } from "@/types/project"
import { useParams, useRouter } from "next/navigation"

export function ProjectSwitcher({
    projects,
    loading
}: {
    projects: IProject[],
    loading: boolean
}) {
    const [selectedProject, setSelectedProject] = useState<IProject|null>(null);
    const router = useRouter();
    const { projectId } = useParams();

    useEffect(() => {
        const project = projects.find((p) => p.id === projectId);
        if(!project){
            if(loading) return;
            const firstProject = projects.length > 0 ? projects[0] : null;
            if(!firstProject) {
                router.replace("/project/select-project");
                return;
            }
            router.replace(`/project/${firstProject.id}/`);
            setSelectedProject(firstProject);
            return;
        }
        setSelectedProject(project);
    }, [projects, loading, projectId, router]);

    const handleProjectChange = (project: IProject) => {
        setSelectedProject(project);
        router.replace(`/project/${project.id}/`);
    };
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
                            <span className="">{loading ? "" : selectedProject?.name ?? "None"}&nbsp;</span>
                        </div>
                        <ChevronsUpDown className="ml-auto" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
                    {projects.map((project) => <DropdownMenuItem key={project.id} onSelect={() => handleProjectChange(project)} >
                        {project.name}{" "}
                        {project.id === selectedProject?.id && <Check className="ml-auto" />}
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
}
