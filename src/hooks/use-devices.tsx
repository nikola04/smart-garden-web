import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./use-auth"
import { IDevice } from "@/types/device";
import { toast } from "sonner";

export const useDevices = () => {
    const { loggedIn, loading: authLoading, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [devices, setDevices] = useState<IDevice[]>([]);

    const fetchDevices = useCallback(async () => {
        if(user == null) return;
        const csrfToken = localStorage.getItem('csrfToken');
        try {
            setLoading(true);
            const response = await fetch(`/api/device/?csrf=${csrfToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            console.log(response)
            if (response.ok) {
                const json = await response.json();
                if(json?.data?.devices) {
                    const raw = json.data.devices as IDevice[];
                    const devices = raw.map((device) => ({ ...device, addedAt: new Date(device.addedAt) }));
                    setDevices(devices);
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

    return ({ devices, loading });
}
