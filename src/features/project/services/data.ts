import { apiFetch } from "@/lib/api";
import type { IAggregatedSensorSnapshot } from "@/types/sensors";

export const getSnapshot = async (projectId: string): Promise<IAggregatedSensorSnapshot|null> => {
    const data = await apiFetch<{ aggregatedSnapshot: IAggregatedSensorSnapshot }>(`/project/${projectId}/data/snapshot`);
    if(data && data.aggregatedSnapshot) {
        const raw = data.aggregatedSnapshot;
        return ({ ...raw, updatedAt: new Date(raw.updatedAt) })
    }
    return null;
}
