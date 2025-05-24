import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./use-auth"
import { toast } from "sonner";
import { IAPIKey } from "@/types/apikey";

export const useKey = (deviceId: string) => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [key, setKey] = useState<IAPIKey|null>(null);

    const fetchKey = useCallback(async () => {
        if(user == null) return;
        const csrfToken = localStorage.getItem('csrfToken');
        try {
            setLoading(true);
            const response = await fetch(`/api/device/${deviceId}/key?csrf=${csrfToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (response.ok) {
                const json = await response.json();
                if(json?.data?.key) {
                    const raw = json.data.key as IAPIKey;
                    const key = ({ ...raw, expiresAt: raw.expiresAt != null ? new Date(raw.expiresAt) : null, createdAt: new Date(raw.createdAt) });
                    setKey(key);
                }else toast(json.message);
            }else {
                const json = await response.json();
                toast(json.message);
            }
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
            fetchKey();
        }else if(!authLoading) {
            setLoading(false);
        }
    }, [authLoading, loggedIn, fetchKey]);

    return ({ key, loading });
}
