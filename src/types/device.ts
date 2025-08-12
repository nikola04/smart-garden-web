export const DeviceType = {
    ESP32: "ESP32",
    Arduino: "Arduino",
} as const

export type DeviceType = keyof typeof DeviceType

export interface IDevice {
    id: string,
    userId: string,
    name: string,
    type: DeviceType,
    isActive: boolean,
    lastActive: Date,
    addedAt: Date
}
