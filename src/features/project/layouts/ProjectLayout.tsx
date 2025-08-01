import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProjectWrapper from "../components/ProjectWrapper";
import { ProjectSidebar } from "../components/ProjectSidebar";
import { Outlet } from "react-router";

function ProjectLayout() {
    return <SidebarProvider>
            <ProjectWrapper>
                <ProjectSidebar/>
                <SidebarInset className="p-2">
                    {/* <AppHeader/> */}
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </ProjectWrapper>
    </SidebarProvider>;
}

export default ProjectLayout
