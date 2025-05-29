import { useMemo } from "react";
import { useProjects } from "./use-projects";

export const useProject = (projectId: string|undefined) => {
    const { projects, loading } = useProjects();
    const project = useMemo(() => projects.find((project) => project.id === projectId), [projects, projectId]);

    return ({ project, projects, loading });
}
