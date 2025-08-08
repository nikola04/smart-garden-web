import { useAuth } from "@/hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { IAggregatedSensorSnapshot } from "@/types/sensors";
import { getSnapshot } from "../services/data";

export const useAggregatedSnapshot = (projectId?: string) => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [snapshot, setSnapshot] = useState<IAggregatedSensorSnapshot|null>(null);

    const fetchSnapshot = useCallback(async () => {
        if(!user || !projectId) return;
        try {
            setLoading(true);
            const fetched = await getSnapshot(projectId)
            if(!fetched){
                toast.error("Failed to fetch snapshot.");
                return
            }
            
            setSnapshot(fetched);
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
            fetchSnapshot();
        }else if(!authLoading) {
            setLoading(false);
        }
    }, [authLoading, loggedIn, fetchSnapshot]);

    return ({ snapshot, setSnapshot, loading });
}
