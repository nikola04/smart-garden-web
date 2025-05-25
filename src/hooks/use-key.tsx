import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./use-auth"
import { IAPIKey } from "@/types/apikey";
import { getAPIKey } from "@/services/apikey";

export const useKey = (deviceId: string) => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [keys, setKeys] = useState<IAPIKey[]>([]);

    const fetchKeys = useCallback(async () => {
        if(user == null) return;
        try {
            setLoading(true);
            const keys = await getAPIKey(deviceId);
            setKeys(keys);
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    }, [user, deviceId]);

    useEffect(() => {
        if(authLoading) {
            setLoading(true);
        }else if(!authLoading && loggedIn){
            fetchKeys();
        }else if(!authLoading) {
            setLoading(false);
        }
    }, [authLoading, loggedIn, fetchKeys]);

    return ({ keys, loading });
}
