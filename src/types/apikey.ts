export interface IAPIKey {
    id: string;
    key: string;
    expiresAt: Date | null;
    createdAt: Date;
}
