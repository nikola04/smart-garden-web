import { Card, CardContent } from "@/components/ui/card";
import { CircleProgress } from "@/components/ui/CircleProgress";
import type { IHealth } from "@/types/project";
import { TriangleAlert } from "lucide-react";
import { useMemo } from "react";

export default function HealthCard({ health, loading }: {
    health: IHealth|null;
    loading: boolean;
}) {
    if(loading)
        return null;

    if(!health) 
        return null;

    const healthString = Number(health.overallHealth).toFixed(0);

    const statusColor = useMemo(() => {
        if(health.status === "critical") return "var(--danger)";
        if(health.status === "degraded") return "var(--warning)";
        return "var(--success)"
    }, [health.status])

    const warnings: Warnings[] = useMemo(() => [{
        title: "Devices",
        messages: health.devices.messages,
    }, {
        title: "Sensors",
        messages: health.sensors.messages,
    }], [health]);

    return <Card className="">
        <CardContent className="flex gap-8 px-6">
            <div className="flex flex-col justify-center gap-4">
                <CircleProgress 
                    strokeWidth={14}
                    bgColor="var(--background-alt)"
                    color="var(--primary)"
                    progress={health.overallHealth}
                    className="flex items-center justify-center" >
                    <p className="font-semibold">{healthString}</p>
                </CircleProgress>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xs text-center uppercase font-medium" style={{ color: statusColor }}>{ health.status }</p>
                    <p className="text-xs text-center text-muted-foreground">overall score</p>
                </div>
            </div>
            <div className="flex flex-col">
                <WarnMessages warnings={warnings} />
            </div>
        </CardContent>
    </Card>
}

type Warnings = {
    title: string,
    messages: {
        name: string,
        state: string
    }[]
}

function WarnMessages({ warnings }: {
    warnings: Warnings[]
}){
    if(warnings.length === 0 || warnings.every(warns => warns.messages.length === 0))
        return <p className="text-sm text-muted-foreground">No warnings.</p>;

    return <div className="flex gap-4">
        { warnings.map((warns, ind) => <WarnMessage key={ind} title={warns.title} messages={warns.messages} />) }
    </div>
}

function WarnMessage({ title, messages }: {
    title: string,
    messages: {
        name: string,
        state: string
    }[]
}){
    if(messages.length == 0)
        return null;

    const messagesPreview = [...messages];
    const oversize = messages.length > 2
    
    if(oversize) messagesPreview.length = 2;

    return <div className="flex flex-col gap-2 p-2">
        <div className="flex gap-1 items-center">
            <TriangleAlert size={14} color="var(--warning)" />
            <p className="text-sm" style={{ color: 'var(--warning)'}}>{ title }</p>
        </div>
        <div>
            { messagesPreview.map((message, ind) => <div key={ind}>
                <p className="flex items-center gap-2 text-muted-foreground text-sm">
                    <span>{ message.name } is { message.state }!</span>
                </p>
            </div>)}
            { oversize && <button className="py-2 text-sm cursor-pointer" style={{ color: 'var(--warning)'}}>show all</button>}
        </div>
    </div>
}
