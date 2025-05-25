export enum DeviceType {
    ESP32 = "ESP32",
    Arduino = "Arduino"
}
export interface IDevice {
    id: string,
    name: string,
    type: DeviceType,
    addedAt: Date,
    userId: string
}
