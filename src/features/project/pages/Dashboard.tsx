import { Droplets, HeartPulse, Info, ThermometerSun } from "lucide-react"
import { useParams } from "react-router"
import { useAggregatedSnapshot } from "../hooks/useData"
import { useHealth } from "../hooks/useHealth"
import type { IHealth } from "@/types/project"
import { useMemo } from "react"
import { DashboardCard } from "../components/DashboardCard"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function Dashboard() {
    const { projectId } = useParams<{ projectId: string }>()
    const { health, loading: healthLoading } = useHealth(projectId)
    const { snapshot, loading: snapshotLoading } = useAggregatedSnapshot(projectId)

    return <div className="flex flex-col p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <HealthCard health={health} loading={healthLoading} />
            <DashboardCard 
                name="Temperature"
                Icon={ThermometerSun}
                value={ snapshot?.air.temperature ?? 0 }
                unit={"°C"}
                lastUpdated={snapshot?.updatedAt}
                loading={snapshotLoading}
            />
            <DashboardCard 
                name="Soil Moisture"
                Icon={Droplets}
                value={ snapshot?.soil.moisture ?? 0 }
                unit={"%"}
                lastUpdated={snapshot?.updatedAt}
                loading={snapshotLoading}
            />
        </div>

    </div>
}

export default Dashboard

function HealthCard({ health, loading }: {
    health: IHealth|null,
    loading: boolean
}){

    if(!health) return null;

    const statusColor = useMemo(() => {
        if(health.status === "critical") return "#f33131";
        if(health.status === "degraded") return "#ff4d00";
        return "#4cbb17"
    }, [health.status])

    return <DashboardCard 
            value={ health.overallHealth ?? 0 }
            unit={"/ 100"}
            loading={loading}
            Header={<div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1">
                    <HeartPulse size={18} />
                    <p>Health</p>
                </div>
                <Tooltip>
                    <TooltipTrigger><Info size={16} /></TooltipTrigger>
                    <TooltipContent>Show health</TooltipContent>
                </Tooltip>
            </div>}
            Footer={<p className={`text-xs uppercase font-medium text-[${statusColor}]`}>{ health.status }</p>}
        />
}
