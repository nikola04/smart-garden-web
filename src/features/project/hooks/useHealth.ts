import { useAuth } from "@/hooks/useAuth";
import type { IHealth } from "@/types/project";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getHealth } from "../services/health";

export const useHealth = (projectId?: string) => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [health, setHealth] = useState<IHealth|null>(null);

    const fetchHealth = useCallback(async () => {
        if(!user || !projectId) return;
        try {
            setLoading(true);
            const fetched = await getHealth(projectId)
            if(!fetched){
                toast.error("Failed to fetch Health.");
                return
            }
            
            setHealth(fetched);
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    }, [user, projectId]);

    useEffect(() => {
        if(authLoading) {
            setLoading(true);
        }else if(!authLoading && loggedIn){
            fetchHealth();
        }else if(!authLoading) {
            setLoading(false);
        }
    }, [authLoading, loggedIn, fetchHealth]);

    return ({ health, setHealth, loading });
}
