import { Button } from "@/components/ui/button";
import { DeviceType, type IDevice } from "@/types/device";
import { Plus, Save } from "lucide-react";
import { useCallback, useMemo, useState, type PropsWithChildren } from "react";
import { useParams } from "react-router";
import { useDevices } from "../hooks/useDevices";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidDeviceName } from "@/validators/device";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeviceList } from "../components/devices/DeviceList";
import { createDevice } from "../services/device";

function Devices() {
    const { projectId } = useParams<{ projectId: string }>();
    const { devices, setDevices, loading } = useDevices(projectId);

    const updateDevice = useCallback((deviceId: string, name: string, type: DeviceType) => setDevices((prev) => 
        prev.map((device) => device.id === deviceId ?  ({ ...device, name, type }) : device )
    ), [setDevices]);
    const deleteDevice = useCallback((deviceId: string) => setDevices(prev => 
        prev.filter(device => device.id !== deviceId)
    ), [setDevices])
    const addDevice = useCallback((device: IDevice) => setDevices(prev => [...prev, device]), [setDevices]);

    return <div className="flex flex-col p-4">
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-foreground/90">My Devices</p>
                    <p className="font-light text-sm text-foreground/60">All devices that you have added.</p>
                </div>
                <CreateDeviceDialog onCreate={addDevice} projectId={projectId}>
                    <Button><Plus />New</Button>
                </CreateDeviceDialog>
            </div>
            <DeviceList devices={devices} loading={loading} updateDevice={updateDevice} deleteDevice={deleteDevice} />
            { !loading && devices.length == 0 && <div className="flex items-center gap-2 font-light text-md">
                <span>You have no devices. Add new one by clicking on </span>
                <CreateDeviceDialog onCreate={addDevice} projectId={projectId}>
                    <Button className="flex items-center" size="sm"><Plus/></Button>
                </CreateDeviceDialog>
                <span>button.</span>
            </div>}
        </div>
    </div>
}

export default Devices


const CreateDeviceDialog = ({ children, onCreate, projectId }: {
    onCreate: (device: IDevice) => void;
    projectId?: string;
} & PropsWithChildren) => {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<DeviceType>(DeviceType.ESP32);
    const isValid = useMemo(() => isValidDeviceName(name), [name]);

    const handleCreate = useCallback(async () => {
        if(!isValid || !projectId) return;
        const device = await createDevice(name.trim(), type, projectId);
        if(!device)
            return;
        onCreate(device);
        setOpen(false);
        toast("Device created successfully.");
        setName("");
    }, [name, type, isValid, onCreate, projectId]);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            { children }
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>New Device</DialogTitle>
                <DialogDescription>Add new device. Click Create when you&apos;re done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" className="col-span-3" placeholder="My controller" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">Type</Label>
                    <Select value={type} onValueChange={(value) => setType(value as DeviceType)}>
                        <SelectTrigger id="device-type">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            { Object.values(DeviceType).map((value, key) => <SelectItem key={key} value={value}>{value}</SelectItem> )}
                        </SelectContent>
                    </Select>                
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" onClick={handleCreate} disabled={!isValid}><Save/>Create</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
