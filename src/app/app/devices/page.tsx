import { DeviceList } from "@/components/device-list";

export const metadata = {
    title: "Devices",
};

export default function Devices(){
    return <div className="flex flex-col p-4">
        <h1 className="text-lg font-bold">My Devices</h1>
        <p className="font-thin">Your registered devices.</p>
        <DeviceList/>
    </div>
}
