import { DevicesWrapper } from "@/components/wrappers/devices.wrapper";

export const metadata = {
    title: "Devices",
};

export default function Devices() {
    return <div className="flex flex-col p-4">
        <DevicesWrapper />
    </div>
}
