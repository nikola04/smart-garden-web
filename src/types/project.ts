export interface IProject {
    id: string;
    name: string;
    description?: string;
    updatedAt: Date;
    createdAt: Date;    
}

export type HealthStatus = "excellent"|"healthy"|"degraded"|"critical";
export interface IHealth {
    devices: {
        health: number,
        messages: string[]
    },
    sensors: {
        health: number,
        messages: string[]
    },
    overallHealth: number,
    status: HealthStatus
};
