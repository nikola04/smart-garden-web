"use client"
import { DeviceList } from "@/components/device-list";
import { Button } from "@/components/ui/button";
import { useDevices } from "@/hooks/use-devices";
import { DeviceType, IDevice } from "@/types/device";
import { Plus, Save } from "lucide-react";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Select } from "@radix-ui/react-select";
import { isValidDeviceName } from "@/validators/device";
import { createDevice } from "@/services/device";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export const DevicesWrapper = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { devices, setDevices } = useDevices(projectId);

    const updateDevice = useCallback((deviceId: string, name: string, type: DeviceType) => setDevices((prev) => 
        prev.map((device) => device.id === deviceId ?  ({ ...device, name, type }) : device )
    ), [setDevices]);
    const deleteDevice = useCallback((deviceId: string) => setDevices(prev => 
        prev.filter(device => device.id !== deviceId)
    ), [setDevices])
    const addDevice = useCallback((device: IDevice) => setDevices(prev => [...prev, device]), [setDevices]);

    return <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-lg font-bold">My Devices</h1>
                <p className="font-thin">All devices that you have added.</p>
            </div>
            <CreateDeviceDialog onCreate={addDevice} projectId={projectId}>
                <Button><Plus />New</Button>
            </CreateDeviceDialog>
        </div>
        <DeviceList devices={devices} updateDevice={updateDevice} deleteDevice={deleteDevice} />
    </div>
}

const CreateDeviceDialog = ({ children, onCreate, projectId }: {
    children: ReactNode;
    onCreate: (device: IDevice) => void;
    projectId: string;
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<DeviceType>(DeviceType.ESP32);
    const isValid = useMemo(() => isValidDeviceName(name), [name]);

    const handleCreate = useCallback(async () => {
        if(!isValid) return;
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
