import { apiFetch } from "@/lib/api";
import { DeviceType, IDevice } from "@/types/device";

export const createDevice = async (name: string, type: DeviceType, projectId: string): Promise<IDevice|null> => {
        const data = await apiFetch<{ device: IDevice }>(`/api/project/${projectId}/device`, { 
        method: "POST",
        body: JSON.stringify({ name, type })
    });
    if(data && data.device) {
        const raw = data.device;
        const device = ({ ...raw, addedAt: new Date(raw.addedAt) });
        return device;
    }
    return null;
}

export const updateDevice = async (deviceId: string, name: string, type: DeviceType): Promise<IDevice|null> => {
    const data = await apiFetch<{ device: IDevice }>(`/api/device/${deviceId}`, { 
        method: "PATCH",
        body: JSON.stringify({ name, type })
    });
    if(data && data.device) {
        const raw = data.device;
        const device = ({ ...raw, addedAt: new Date(raw.addedAt) });
        return device;
    }
    return null;
}

export const deleteDevice = async (deviceId: string): Promise<boolean> => {
        const data = await apiFetch<true>(`/api/device/${deviceId}`, { 
        method: "DELETE"
    });
    return data != null;
}
