export const DeviceType = {
    ESP32: "ESP32",
    Arduino: "Arduino",
} as const

export type DeviceType = keyof typeof DeviceType

export interface IDevice {
    id: string,
    name: string,
    type: DeviceType,
    addedAt: Date,
    userId: string
}
