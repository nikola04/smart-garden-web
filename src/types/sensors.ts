export interface IAir{
    temperature: number;
    humidity: number;
}

export interface ISoil{
    moisture: number; // float
    sensors_used: number;
}

export interface IAggregatedSensorSnapshot {
    air: IAir;
    soil: ISoil;
    basedOnReports: number;
    timeWindowMinutes: number;
    updatedAt: Date;
}
