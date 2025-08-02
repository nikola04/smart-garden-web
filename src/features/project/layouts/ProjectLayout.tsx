import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProjectWrapper from "../components/ProjectWrapper";
import { ProjectSidebar } from "../components/ProjectSidebar";
import { Outlet, useLocation } from "react-router";
import { ProjectHeader } from "../components/ProjectHeader";
import { useEffect } from "react";

function ProjectLayout() {
    const location = useLocation()

    useEffect(() => {
        // document.title = "Smart Garden | Project"
    }, [location.pathname])

    return <SidebarProvider>
            <ProjectWrapper>
                <ProjectSidebar/>
                <SidebarInset className="p-2" style={{ background: 'var(--background-alt)'}}>
                    <ProjectHeader />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-0 md:gap-6 md:py-1">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </ProjectWrapper>
    </SidebarProvider>;
}

export default ProjectLayout
