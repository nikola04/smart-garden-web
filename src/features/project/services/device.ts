import { apiFetch } from "@/lib/api";
import type { DeviceType, IDevice } from "@/types/device";

export const getDevices = async (projectId: string): Promise<IDevice[]|null> => {
    const data = await apiFetch<{ devices: IDevice[] }>(`/project/${projectId}/device`, {
        method: 'GET',
    });
    if(data && typeof data === "object" && 'devices' in data) {
        const raw = data.devices as IDevice[];
        const devices = raw.map((device) => ({ ...device, addedAt: new Date(device.addedAt) }));
        return devices;
    }

    return null;
}

export const createDevice = async (name: string, type: DeviceType, projectId: string): Promise<IDevice|null> => {
        const data = await apiFetch<{ device: IDevice }>(`/project/${projectId}/device`, { 
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
    const data = await apiFetch<{ device: IDevice }>(`/device/${deviceId}`, { 
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
        const data = await apiFetch<true>(`/device/${deviceId}`, { 
        method: "DELETE"
    });
    return data != null;
}
