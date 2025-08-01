import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth"
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { IProject } from "@/types/project";

export const useProjects = () => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [projects, setProjects] = useState<IProject[]>([]);

    const fetchProjects = useCallback(async () => {
        if(user == null) return;
        try {
            setLoading(true);
            const data = await apiFetch<{ projects: IProject[] }>(`/project`, {
                method: 'GET'
            });
            if(data && typeof data === "object" && 'projects' in data) {
                const raw = data.projects as IProject[];
                const projects = raw.map((project) => ({ ...project, addedAt: new Date(project.updatedAt), createdAt: new Date(project.createdAt) }));
                setProjects(projects);
            } else {
                setProjects([]);
                toast.error("Failed to fetch projects.");
            }
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if(authLoading) {
            setLoading(true);
        }else if(!authLoading && loggedIn){
            fetchProjects();
        }else if(!authLoading) {
            setLoading(false);
        }
    }, [authLoading, loggedIn, fetchProjects]);

    return ({ projects, setProjects, loading });
}
