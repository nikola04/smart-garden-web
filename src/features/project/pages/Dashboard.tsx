import { Droplets, Sun, ThermometerSun } from "lucide-react"
import { useParams } from "react-router"
import { useAggregatedSnapshot } from "../hooks/useData"
import { useHealth } from "../hooks/useHealth"
import { SensorCard } from "../components/dashboard/SensorCard"
import HealthCard from "../components/dashboard/HealthCard"
import ProjectSection from "../components/ProjectSection"

function Dashboard() {
    const { projectId } = useParams<{ projectId: string }>()
    const { health, loading: healthLoading } = useHealth(projectId)
    const { snapshot, loading: snapshotLoading } = useAggregatedSnapshot(projectId)

    return <div className="flex flex-col gap-8 p-4">
        <ProjectSection title="Sensors" description="Latest readings from all active sensors." className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </ProjectSection>
        <ProjectSection title="Health" description="Device & sensors health status.">
            <HealthCard health={health} loading={healthLoading} />
        </ProjectSection>
    </div>
}

export default Dashboard
