import { Droplets, Sun, ThermometerSun } from "lucide-react"
import { useParams } from "react-router"
import { useAggregatedSnapshot } from "../hooks/useData"
import { useHealth } from "../hooks/useHealth"
import { SensorCard } from "../components/dashboard/SensorCard"
import HealthCard from "../components/dashboard/HealthCard"
import type { HTMLAttributes, PropsWithChildren } from "react"

function Dashboard() {
    const { projectId } = useParams<{ projectId: string }>()
    const { health, loading: healthLoading } = useHealth(projectId)
    const { snapshot, loading: snapshotLoading } = useAggregatedSnapshot(projectId)

    return <div className="flex flex-col gap-8 p-4">
        <DashboardSection title="Sensors" description="Latest sensors data." className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SensorCard 
                name="Temperature"
                Icon={ThermometerSun}
                value={ snapshot?.air.temperature ?? 0 }
                unit={"°C"}
                lastUpdated={snapshot?.updatedAt}
                loading={snapshotLoading}
            />
            <SensorCard 
                name="Soil Moisture"
                Icon={Droplets}
                value={ snapshot?.soil.moisture ?? 0 }
                unit={"%"}
                lastUpdated={snapshot?.updatedAt}
                loading={snapshotLoading}
            />
            <SensorCard 
                name="Light"
                Icon={Sun}
                value={ snapshot?.light.value ?? 0 }
                unit={"lx"}
                lastUpdated={snapshot?.updatedAt}
                loading={snapshotLoading}
            />
        </DashboardSection>
        <DashboardSection title="Health" description="Device & sensors health status.">
            <HealthCard health={health} loading={healthLoading} />
        </DashboardSection>
    </div>
}

export default Dashboard

function DashboardSection({ title, description, children, ...props }: {
    title: string;
    description?: string;
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    return <div className="flex flex-col gap-3">
        <div>
            <p className="font-semibold text-foreground/90">{ title }</p>
            <p className="font-light text-sm text-foreground/60">{ description }</p>
        </div>
        <div {...props}>
            { children }
        </div>
    </div>
}

// function HealthCard({ health, loading }: {
//     health: IHealth|null,
//     loading: boolean
// }){

//     if(!health) return null;

//     const statusColor = useMemo(() => {
//         if(health.status === "critical") return "#f33131";
//         if(health.status === "degraded") return "#ff4d00";
//         return "#4cbb17"
//     }, [health.status])

//     return <SensorCard 
//             value={ health.overallHealth ?? 0 }
//             unit={"/ 100"}
//             loading={loading}
//             Header={<div className="flex w-full items-center justify-between">
//                 <div className="flex items-center gap-1">
//                     <HeartPulse size={18} />
//                     <p>Health</p>
//                 </div>
//                 <Tooltip>
//                     <TooltipTrigger><Info size={16} /></TooltipTrigger>
//                     <TooltipContent>Show health</TooltipContent>
//                 </Tooltip>
//             </div>}
//             Footer={<p className={`text-xs uppercase font-medium text-[${statusColor}]`}>{ health.status }</p>}
//         />
// }
