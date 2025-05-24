"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { KeyRound, MonitorCog } from "lucide-react";
import { IDevice } from "@/types/device";
import { useDevices } from "@/hooks/use-devices";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components//ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useKey } from "@/hooks/use-key";
import { useState } from "react";
import { Label } from "./ui/label";
import { IAPIKey } from "@/types/apikey";

export const DeviceList = () => {
    const { devices } = useDevices();
    const handleRemove = (id: string) => {
        console.log(`Remove device with ID: ${id}`);
        // Add removal logic here
    };

    const handleEdit = (id: string) => {
        console.log(`Edit device with ID: ${id}`);
        // Add editing logic here
    };

    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {devices.map((device) => (
            <DeviceCard
                key={device.id}
                device={device}
                onRemove={() => handleRemove(device.id)}
                onEdit={() => handleEdit(device.id)}
            />
        ))}
    </div>;
};

const DeviceCard = ({ device }: {
    device: IDevice,
    onRemove: () => void,
    onEdit: () => void
}) => {
    const [keyValue] = useState<string|null>(null);
    const { key, loading } = useKey(device.id);
    return <Card key={device.id} className="gap-4">
        <CardHeader className="flex justify-between items-center">
            <CardTitle className="font-bold truncate max-w-[200px]">{device.name}</CardTitle>
            <div className="flex items-center gap-2">
                <APIKeySheet apiKey={key} loading={loading} keyValue={keyValue}/>
                <Button variant="outline" size="sm">
                    <MonitorCog className="w-4 h-4" />
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Type: {device.type}</p>
            <p className="text-sm text-muted-foreground">Added: {device.addedAt.toLocaleString()}</p>
        </CardContent>
    </Card>
}

const APIKeySheet = ({ apiKey, loading, keyValue }: {
    apiKey: null|IAPIKey,
    loading: boolean,
    keyValue: null|string
}) => {
    return <Sheet>
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
                <SheetTitle className="text-lg">API key</SheetTitle>
                <SheetDescription className="font-light">Create new API key or delete existing one.</SheetDescription>
            </SheetHeader>
            { loading
            ? <p>Loading...</p>
            : <div className="flex flex-col gap-8 mx-4 py-2">
                { apiKey == null
                ? <>
                    <p className="text-sm font-thin">There is no registered key for selected device.</p>
                    <SheetFooter className="mt-0">
                        <Button className="ml-auto" type="button">Register</Button>
                    </SheetFooter>
                </>
                : <>
                    <KeyContent apiKey={apiKey} keyValue={keyValue}/>
                    <SheetFooter className="mt-0">
                        <SheetClose asChild className="ml-auto">
                            <Button type="button">Delete</Button>
                        </SheetClose>
                    </SheetFooter>
                </> }
            </div> }
        </SheetContent>
    </Sheet>
}

const KeyContent = ({ apiKey, keyValue }: {
    apiKey: IAPIKey,
    keyValue: string|null
}) => {
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
            <Input id="key" value={keyValue ?? "****************"} disabled={keyValue === null} onKeyDown={(e) => e.preventDefault()}/>
        </div>
    </>
}
