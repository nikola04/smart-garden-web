import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTimeElapsedString } from "@/utils/date";
import { Radio, type LucideIcon } from "lucide-react";

export function SensorCard({ name, Icon, value, unit, lastUpdated, loading }: {
    name?: string;
    Icon?: LucideIcon;
    value: number;
    unit: string;
    lastUpdated?: Date|undefined;
    loading: boolean;
}){
    if(loading)
        return <Card>
            <CardContent className="flex flex-col gap-2 px-6">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-8 w-24" />
                <div className="flex items-center gap-1 mt-1">
                    <Skeleton className="h-4 w-24" />
                </div>
            </CardContent>
        </Card>

    return <Card>
        <CardContent className="flex flex-col gap-2 px-6">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                { Icon && <Icon size={18} /> }
                <p>{ name }</p>
            </div>
            <div className="flex gap-2 items-end font-semibold">
                <p className="text-2xl">
                    <span>{ value }</span>
                    <span> { unit }</span>
                </p>
            </div>
            <div className="flex items-center gap-1 mt-1">
            { lastUpdated && <LiveStatusIndicator lastUpdated={lastUpdated} /> }
            </div>
        </CardContent>
    </Card>
}

function LiveStatusIndicator({ lastUpdated }: {
    lastUpdated: Date
}){
    const liveWindowM = 10
    if(lastUpdated >= new Date(Date.now() - liveWindowM * 60_000))
        return <>
            <Radio size={16} color={"#4CBB17"} />
            <p className="text-xs text-[#4CBB17]">Live</p>
        </>
    
    return <>
        <Radio size={16} color={"#f33131"} />
        <p className="text-xs text-muted-foreground">{ formatTimeElapsedString(lastUpdated) }</p>
    </>
}
