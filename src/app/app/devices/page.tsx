import { DeviceList } from "@/components/device-list";

export const metadata = {
    title: "Devices",
};

export default function Devices(){
    return <div className="flex flex-col p-4 gap-4">
        <div>
            <h1 className="text-lg font-bold">My Devices</h1>
            <p className="font-thin">All devices that you have added.</p>
        </div>
        <DeviceList/>
    </div>
}
