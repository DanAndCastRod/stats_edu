"use client"

import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, AreaChart, Area } from "recharts"

type ChartProps = {
    type: "distribution" | "bar" | "trend"
    data: any[]
    xKey: string
    yKey: string
    color?: string
    mean?: number
    median?: number
}

export function StatsChart({ type, data, xKey, yKey, color = "#2563EB", mean, median }: ChartProps) {
    if (type === "bar") {
        return (
            <div className="w-full h-[300px] my-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
                        {mean && <ReferenceLine y={mean} stroke="#EF4444" strokeDasharray="3 3" label="Promedio" />}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }

    if (type === "distribution") {
        return (
            <div className="w-full h-[300px] my-8">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey={xKey} type="number" domain={['dataMin', 'dataMax']} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <Tooltip />
                        <Area type="monotone" dataKey={yKey} stroke={color} fill={color} fillOpacity={0.2} />
                        {mean && <ReferenceLine x={mean} stroke="#EF4444" strokeDasharray="3 3" label="Promedio" />}
                        {median && <ReferenceLine x={median} stroke="#10B981" strokeDasharray="3 3" label="Mediana" />}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        )
    }

    return null
}
