import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { IProject } from "@/types/project";
import { toast } from "sonner";
import { getProject } from "../services/project";

export const useProject = (projectId?: string) => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [project, setProject] = useState<IProject|null>(null);

    const fetchProject = useCallback(async () => {
        if(!user) return;
        if(!projectId) return;
        try {
            setLoading(true);
            const project = await getProject(projectId);
            if(!project){
                setProject(null);
                toast.error("Failed to fetch projects.");
                return;
            }
            
            setProject(project);
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
            fetchProject();
        }else if(!authLoading) {
            setLoading(false);
        }
    }, [authLoading, loggedIn, fetchProject]);

    return ({ project, setProject, loading });
}
