import { useAuth } from "@/hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { getDevices } from "../services/device";
import { toast } from "sonner";
import type { IDevice } from "@/types/device";

export const useDevices = (projectId?: string) => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [devices, setDevices] = useState<IDevice[]>([]);

    const fetchDevices = useCallback(async () => {
        if(!user || !projectId) return;
        try {
            setLoading(true);
            const fetched = await getDevices(projectId)
            if(!fetched){
                toast.error("Failed to fetch devices.");
                return
            }
            
            setDevices(fetched);
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
            fetchDevices();
        }else if(!authLoading) {
            setLoading(false);
        }
    }, [authLoading, loggedIn, fetchDevices]);

    return ({ devices, setDevices, loading });
}
