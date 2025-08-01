import { apiFetch } from "@/lib/api";
import type { IAPIKey } from "@/types/apikey";

export const getAPIKey = async (deviceId: string): Promise<IAPIKey[]> => {
    const data = await apiFetch<{ keys: IAPIKey[] }>(`/device/${deviceId}/key`);
    if(data && data.keys) {
        const rawKeys = data.keys;
        const keys = rawKeys.map(raw => ({ ...raw, expiresAt: raw.expiresAt != null ? new Date(raw.expiresAt) : null, createdAt: new Date(raw.createdAt) }));
        return keys;
    }
    return [];
}

export const registerAPIKey = async (deviceId: string): Promise<{ raw: string, key: IAPIKey }|null> => {
    const data = await apiFetch<{ raw: string, key: IAPIKey }>(`/device/${deviceId}/key`, { method: "POST" });
    if(data && data.key) {
        const raw = data.key;
        const rawKey = data.raw;
        const key = ({ ...raw, expiresAt: raw.expiresAt != null ? new Date(raw.expiresAt) : null, createdAt: new Date(raw.createdAt) });
        return ({ key, raw: rawKey });
    }
    return null;
}

export const deleteAPIKey = async (deviceId: string, keyId: string): Promise<void> => {
    await apiFetch(`/device/${deviceId}/key/${keyId}`, { method: "DELETE" });
}
