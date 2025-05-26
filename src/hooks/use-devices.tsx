import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./use-auth"
import { IDevice } from "@/types/device";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export const useDevices = () => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [devices, setDevices] = useState<IDevice[]>([]);

    const fetchDevices = useCallback(async () => {
        if(user == null) return;
        const csrfToken = localStorage.getItem('csrfToken');
        try {
            setLoading(true);
            const data = await apiFetch<{ devices: IDevice[] }>(`/api/device/?csrf=${csrfToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if(data && typeof data === "object" && 'devices' in data) {
                const raw = data.devices as IDevice[];
                const devices = raw.map((device) => ({ ...device, addedAt: new Date(device.addedAt) }));
                setDevices(devices);
            } else {
                setDevices([]);
                toast.error("Failed to fetch devices.");
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
            fetchDevices();
        }else if(!authLoading) {
            setLoading(false);
        }
    }, [authLoading, loggedIn, fetchDevices]);

    return ({ devices, setDevices, loading });
}
