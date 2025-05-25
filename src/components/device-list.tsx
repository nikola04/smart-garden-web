"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Check, Copy, KeyRound, MonitorCog } from "lucide-react";
import { DeviceType, IDevice } from "@/types/device";
import { useDevices } from "@/hooks/use-devices";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components//ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Label } from "./ui/label";
import { IAPIKey } from "@/types/apikey";
import { formatDate } from "@/utils/date";
import { deleteAPIKey, getAPIKey, registerAPIKey } from "@/services/apikey";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Skeleton } from "./ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { updateDevice } from "@/services/device";

export const DeviceList = () => {
    const { devices, setDevices } = useDevices();

    const handleRemove = (id: string) => {
        console.log(`Remove device with ID: ${id}`);
        // Add removal logic here
    };
    const handleEdit = (id: string) => {
        console.log(`Edit device with ID: ${id}`);
        // Add editing logic here
    };
    const updateDevice = useCallback((deviceId: string, name: string, type: DeviceType) => {
        setDevices((prev) => prev.map((device) => {
            if(device.id === deviceId) return ({ ...device, name, type });
            return device;
        }));
    }, [setDevices]);

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {devices.map((device) => (
            <DeviceCard
                key={device.id}
                device={device}
                onRemove={() => handleRemove(device.id)}
                onEdit={() => handleEdit(device.id)}
                onUpdate={(name: string, type: DeviceType) => updateDevice(device.id, name, type)}
            />
        ))}
    </div>;
};

const DeviceCard = ({ device, onUpdate }: {
    device: IDevice;
    onRemove: () => void;
    onEdit: () => void;
    onUpdate: (name: string, type: DeviceType) => void;
}) => {
    return <Card key={device.id} className="gap-4">
        <CardHeader className="flex justify-between items-center">
            <CardTitle className="font-medium truncate max-w-[200px]">{device.name}</CardTitle>
            <div className="flex items-center gap-2">
                <APIKeySheet device={device} />
                <DeviceSheet device={device} onUpdate={onUpdate} />
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Type: {device.type}</p>
            <p className="text-sm text-muted-foreground">Added: {formatDate(device.addedAt)}</p>
        </CardContent>
    </Card>
}

const isValidDeviceName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z0-9_.\-\s]{2,50}$/;
    return nameRegex.test(name);
};

const DeviceSheet = ({ device, onUpdate }: {
    device: IDevice;
    onUpdate: (name: string, type: DeviceType) => void;
}) => {
    const [open, _setOpen] = useState(false);
    const [name, setName] = useState(device.name);
    const [type, setType] = useState(device.type);

    const hasChanges = useMemo(() => name !== device.name || type !== device.type, [device, name, type]);

    const setOpen = useCallback((state: boolean) => {
        setName(device.name);
        setType(device.type);
        _setOpen(state);
    }, [device]);
    const handleSave = useCallback(async () => {
        if(!hasChanges || !isValidDeviceName(name)) return;
        const updated = await updateDevice(device.id, name, type);
        if(updated == null) return;
        onUpdate(name, type);
        toast("Device saved successfully.");
    }, [device, name, type, hasChanges, onUpdate]);

    return <Sheet open={open} onOpenChange={setOpen}>
        <Tooltip delayDuration={1000}>
            <SheetTrigger asChild>
                <TooltipTrigger  asChild>
                    <Button variant="outline" size="sm">
                        <MonitorCog className="w-4 h-4" />
                    </Button>
                </TooltipTrigger>
            </SheetTrigger>
            <TooltipContent>
                <p>Manage Device</p>
            </TooltipContent>
        </Tooltip>
        <SheetContent className="p-2">
            <SheetHeader>
                <SheetTitle className="text-lg">Modify Device</SheetTitle>
                <SheetDescription className="font-thin"></SheetDescription>
                <div className="space-y-6 mt-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">ID</p>
                        <p className="text-sm font-thin">{device.id}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="device-name" className="text-sm font-medium">Device Name</label>
                        <Input id="device-name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="device-type" className="text-sm font-medium">Device Type</label>
                        <Select value={type} onValueChange={(value) => setType(value as typeof device.type)}>
                            <SelectTrigger id="device-type">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                { Object.values(DeviceType).map((value, key) => <SelectItem key={key} value={value}>{value}</SelectItem> )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Added</p>
                        <p className="text-sm font-thin">{device.addedAt.toDateString()}</p>
                    </div>
                </div>
                <div className="flex justify-end mt-6 gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!hasChanges || !isValidDeviceName(name)}>Save</Button>
                </div>
            </SheetHeader>
        </SheetContent>
    </Sheet>
}

const APIKeySheet = ({ device }: {
    device: IDevice;
}) => {
    const [open, setOpen] = useState(false);
    const [isCopied, setCopied] = useState(false);
    const [keyValue, setKeyValue] = useState<string|null>(null);
    const [key, setKey] = useState<IAPIKey|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fetchKey = useCallback(async () => {
        setLoading(true);
        const keys = await getAPIKey(device.id);
        setKey(keys.length > 0 ? keys[0] : null)
        setLoading(false);
    }, [device]);
    useEffect(() => {
        if(!open) return;
        fetchKey();
    }, [open, fetchKey]);

    const handleRegisterKey = useCallback(async () => {
        const data = await registerAPIKey(device.id);
        if(data == null) return;
        const { raw, key } = data;
        setKeyValue(raw);
        setKey(key);
    }, [device]);
    const handleDeleteKey = useCallback(async () => {
        if(key == null) return;
        setOpen(false);
        setCopied(false);
        await deleteAPIKey(device.id, key.id);
        setKey(null);
        setKeyValue(null);
        toast("API Key deleted successfully.")
    }, [device, key]);

    return <Sheet open={open} onOpenChange={setOpen}>
        <Tooltip delayDuration={1000}>
            <SheetTrigger asChild>
                <TooltipTrigger  asChild>
                    <Button variant="outline" size="sm">
                        <KeyRound className="w-4 h-4" />
                    </Button>
                </TooltipTrigger>
            </SheetTrigger>
            <TooltipContent>
                <p>API key</p>
            </TooltipContent>
        </Tooltip>
        <SheetContent className="p-2">
            <SheetHeader>
                <SheetTitle className="text-lg">Device API Key</SheetTitle>
                <SheetDescription className="font-thin">Create new API key or delete one if exists.</SheetDescription>
            </SheetHeader>
            <div className="mx-4 py-2">{ 
                loading ? <APIKeySkeleton />
                : <div className="flex flex-col gap-8">
                    { key == null
                    ? <>
                        <p className="text-sm font-thin">There is no registered key for selected device.</p>
                        <SheetFooter className="mt-0">
                            <Button className="ml-auto" type="button" onClick={handleRegisterKey}>Register</Button>
                        </SheetFooter>
                    </>
                    : <>
                        <KeyContent apiKey={key} keyValue={keyValue} isCopied={isCopied} onCopy={() => setCopied(true)}/>
                        <SheetFooter className="mt-0">
                            <KeyDeleteContent onDelete={handleDeleteKey}/>
                        </SheetFooter>
                    </> }
                </div> }
            </div>
        </SheetContent>
    </Sheet>
}

const APIKeySkeleton = () => {
    return <div className="flex flex-col gap-7">
        <div className="grid grid-cols-2">
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Created</p>
                <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Expires</p>
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Key</p>
            <div className="flex gap-2">
                <Skeleton className="h-9 w-full" />
            </div>
        </div>
    </div>;
}

const KeyContent = ({ apiKey, keyValue, isCopied, onCopy }: {
    apiKey: IAPIKey,
    keyValue: string|null,
    isCopied: boolean,
    onCopy: () => void;
}) => {
    const handleCopy = useCallback(async () => {
        if(keyValue == null) return;
        await navigator.clipboard.writeText(keyValue);
        onCopy();
        toast("Copied to clipboard.");
    }, [keyValue, onCopy])
    return <>
        <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm font-thin">{apiKey?.createdAt.toDateString()}</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Expires</p>
                <p className="text-sm font-thin">{!apiKey?.expiresAt ? "No" : apiKey?.expiresAt.toDateString()}</p>
            </div>
        </div>
        <div className="flex flex-col gap-3">
            <Label htmlFor="key">Key</Label>
            <div className="flex gap-2">
                <Input id="key" className="font-thin" value={keyValue ?? "****************"} disabled={keyValue === null} readOnly={true} onKeyDown={(e) => e.preventDefault()}/>
                { keyValue !== null && <Button variant="outline" size="icon" className="active:opacity-60" onClick={handleCopy}>
                    { isCopied ? 
                    <Check/>
                    : <Copy/> }
                </Button> }
            </div>
            { keyValue !== null && !isCopied && <p className="text-sm text-primary font-light">Please save it before closing!</p> }
        </div>
    </>
}

const KeyDeleteContent = ({ onDelete }: {
    onDelete: () => void
}) => {
    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className="ml-auto" type="button" variant="secondary">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. This will permanently delete your key.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
