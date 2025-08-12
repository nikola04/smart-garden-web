export interface IAir{
    temperature: number;
    humidity: number;
}

export interface ISoil{
    moisture: number; // float
    sensors_used: number;
}

export interface ILight{
    value: number;
    night: boolean;
}

export interface IAggregatedSensorSnapshot {
    air: IAir;
    soil: ISoil;
    light: ILight;
    basedOnReports: number;
    timeWindowMinutes: number;
    updatedAt: Date;
}
