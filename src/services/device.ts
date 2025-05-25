import { apiFetch } from "@/lib/api";
import { DeviceType, IDevice } from "@/types/device";

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
