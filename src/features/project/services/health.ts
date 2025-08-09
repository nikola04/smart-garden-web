import { apiFetch } from "@/lib/api";
import type { IHealth } from "@/types/project";

export const getHealth = async (projectId: string): Promise<IHealth|null> => {
    const data = await apiFetch<{ health: IHealth }>(`/project/${projectId}/health`, {
        method: 'GET',
    });
    if(data && typeof data === "object" && 'health' in data) {
        return data.health;
    }

    return null;
}
