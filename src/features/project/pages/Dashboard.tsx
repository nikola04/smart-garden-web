import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radio } from "lucide-react"
import DashboardChart from "../components/DashboardChart"

const chartData = [
    { month: "January", moisture: 68 },
    { month: "February", moisture: 82 },
    { month: "March", moisture: 75 },
    { month: "April", moisture: 69 },
    { month: "May", moisture: 55 },
    { month: "June", moisture: 33 },
]

function Dashboard() {
    const devices = 11
    const totalDevices = 12
    const temperature = 24.6
    const humidity = 58
    const moisture = 48

    return <div className="flex flex-col p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <Card>
                <CardContent className="px-6">
                    <p className="text-sm text-muted-foreground mb-1">Devices</p>
                    <div className="text-2xl font-semibold">{ devices } / { totalDevices }</div>
                    <div className="flex items-center gap-1 mt-1">
                        <Radio size={16} color={"#4CBB17"} />
                        <p className="text-xs text-[#4CBB17]">Online</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="px-6">
                    <p className="text-sm text-muted-foreground mb-1">Temperature & Humidity</p>
                    <div className="flex gap-2 items-end font-semibold">
                        <p className="text-2xl">{ temperature }°C</p>
                        <p className="text-sm font-medium opacity-80">{ humidity }% humidity</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                        <Radio size={16} color={"#4CBB17"} />
                        <p className="text-xs text-[#4CBB17]">Live</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="px-6">
                    <p className="text-sm text-muted-foreground mb-1">Soild Moisture</p>
                    <div className="text-2xl font-semibold">{ moisture }%</div>
                    <div className="flex items-center gap-1 mt-1">
                        <Radio size={16} color={"#4CBB17"} />
                        <p className="text-xs text-[#4CBB17]">Live</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Soil Moisture</CardTitle>
                    <CardDescription>Showing average moisture for the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                    <DashboardChart data={chartData} />
                </CardContent>
                
            </Card>
        </div>
    </div>
}

export default Dashboard
