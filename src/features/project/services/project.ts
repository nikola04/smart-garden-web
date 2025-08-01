import { apiFetch } from "@/lib/api";
import type { IProject } from "@/types/project";

export const createProject = async (name: string, description: string): Promise<IProject|null> => {
        const data = await apiFetch<{ project: IProject }>(`/api/project/`, { 
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
