export enum DeviceType {
    ESP32 = "ESP32"
}
export interface IDevice {
    id: string,
    name: string,
    type: DeviceType,
    addedAt: Date,
    userId: string
}
