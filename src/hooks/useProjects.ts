import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth"
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import type { IProject } from "@/types/project";
import { getProjects } from "@/features/project/services/project";

export const useProjects = () => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [projects, setProjects] = useState<IProject[]>([]);

    const fetchProjects = useCallback(async () => {
        if(user == null) return;
        try {
            setLoading(true);
            const projects = await getProjects();
            if(!projects){
                setProjects([]);
                toast.error("Failed to fetch projects.");
                return;
            }
            
            setProjects(projects);
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
