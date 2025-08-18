import { Suspense, useEffect, useState } from "react";
import ProjectsSkeleton from "../components/selector/ProjectsSkeleton";
import { useLocation, useNavigate } from "react-router";
import { useProjects } from "@/features/project/hooks/useProjects";
import type { IProject } from "@/types/project";
import NewProjectSheet from "../components/selector/NewProjectSheet";
import { ProjectList } from "../components/selector/ProjectList";

function SelectProject() {
    return <div className="flex flex-col p-4 h-full min-h-screen">
        <div className="pb-8">
            <div className="container mx-auto mt-8">
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-2xl font-bold text-center">Select Project</h2>
                    <p className="text-center font-light">Choose a project to view or edit its details.</p>
                </div>
                <Suspense fallback={<ProjectsSkeleton />}>
                    <ProjectSelector />
                </Suspense>
            </div>
        </div>
    </div>
}

export default SelectProject

function ProjectSelector() {
    const { projects, loading, setProjects } = useProjects();
    const location = useLocation();
    const hasNewParam = new URLSearchParams(location.search).has('new');
    const [open, setOpen] = useState<boolean>(hasNewParam);

    const pathname = location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        if(!(hasNewParam && !open)) return;
        const newParams = new URLSearchParams(location.search);
        newParams.delete('new');
        navigate(pathname + '?' + newParams.toString(), { replace: true })
    }, [pathname, open, hasNewParam, navigate, location.search]);

    const addProject = (project: IProject) => setProjects(prev => [...prev, project]);

    if(loading)
        return <ProjectsSkeleton />
    return <>
        <ProjectList projects={projects} onNewProject={() => setOpen(true)} />
        <NewProjectSheet open={open} setOpen={setOpen} onCreate={addProject} />
    </>
}
