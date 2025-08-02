import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart"

const config = {
    moisture: {
        label: "Moisture %",
        color: "var(--primary)",
    }
} satisfies ChartConfig

function DashboardChart({ data }: CategoricalChartProps) {
    return <ChartContainer config={config} className="min-h-[100px] max-h-[400px] w-full">
        <AreaChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
              domain={[0, 100]}
              unit="%"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="moisture"
              type="natural"
              fill="var(--primary)"
              fillOpacity={0.4}
              stroke="var(--primary)"
            />
        </AreaChart>
    </ChartContainer>
}

export default DashboardChart
