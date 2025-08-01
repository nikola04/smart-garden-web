import { apiFetch } from "@/lib/api";
import type { IProject } from "@/types/project";

export const getProjects = async (): Promise<IProject[]|null> => {
    const data = await apiFetch<{ projects: IProject[] }>(`/project`, {
        method: 'GET'
    });
    
    if(data && typeof data === "object" && 'projects' in data) {
        const raw = data.projects as IProject[];
        const projects = raw.map((project) => ({ ...project, addedAt: new Date(project.updatedAt), createdAt: new Date(project.createdAt) }));
        return projects;
    }
    
    return null;
}

export const createProject = async (name: string, description: string): Promise<IProject|null> => {
        const data = await apiFetch<{ project: IProject }>(`/project/`, { 
        method: "POST",
        body: JSON.stringify({ name, description })
    });
    if(data && data.project) {
        const raw = data.project;
        const project = ({ ...raw, updatedAt: new Date(raw.updatedAt), createdAt: new Date(raw.createdAt) });
        return project;
    }
    return null;
}
