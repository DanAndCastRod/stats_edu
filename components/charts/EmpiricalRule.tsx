"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import { SliderControl } from "./SliderControl"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer, ReferenceLine, ReferenceArea
} from "recharts"

interface EmpiricalRuleProps {
    initialMean?: number
    initialStd?: number
}

// Normal PDF
function normalPDF(x: number, mean: number, std: number): number {
    const coefficient = 1 / (std * Math.sqrt(2 * Math.PI))
    const exponent = -0.5 * Math.pow((x - mean) / std, 2)
    return coefficient * Math.exp(exponent)
}

export function EmpiricalRule({
    initialMean = 100,
    initialStd = 15
}: EmpiricalRuleProps) {
    const [mean, setMean] = useState(initialMean)
    const [std, setStd] = useState(initialStd)
    const [showLevel, setShowLevel] = useState<1 | 2 | 3>(1)

    const { curveData, intervals } = useMemo(() => {
        const minX = mean - 4 * std
        const maxX = mean + 4 * std
        const step = (maxX - minX) / 200

        const data = []
        for (let x = minX; x <= maxX; x += step) {
            data.push({ x, y: normalPDF(x, mean, std) })
        }

        return {
            curveData: data,
            intervals: {
                one: { low: mean - std, high: mean + std, percent: 68.27 },
                two: { low: mean - 2 * std, high: mean + 2 * std, percent: 95.45 },
                three: { low: mean - 3 * std, high: mean + 3 * std, percent: 99.73 }
            }
        }
    }, [mean, std])

    const currentInterval = showLevel === 1 ? intervals.one : showLevel === 2 ? intervals.two : intervals.three
    const colors = {
        1: { fill: "#3b82f6", stroke: "#2563eb", bg: "bg-blue-500" },
        2: { fill: "#8b5cf6", stroke: "#7c3aed", bg: "bg-violet-500" },
        3: { fill: "#ec4899", stroke: "#db2777", bg: "bg-pink-500" }
    }

    return (
        <ChartContainer
            title="Regla Empírica (68-95-99.7)"
            description="Visualiza cómo la desviación estándar determina la dispersión de los datos"
        >
            <div className="space-y-6">
                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SliderControl
                        label="Media (μ)"
                        value={mean}
                        min={50}
                        max={150}
                        onChange={setMean}
                    />
                    <SliderControl
                        label="Desviación Estándar (σ)"
                        value={std}
                        min={5}
                        max={30}
                        onChange={setStd}
                    />
                </div>

                {/* Level Selector */}
                <div className="flex gap-2 justify-center">
                    {[1, 2, 3].map((level) => (
                        <motion.button
                            key={level}
                            onClick={() => setShowLevel(level as 1 | 2 | 3)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 rounded-xl font-bold text-white transition-all ${showLevel === level
                                    ? colors[level as 1 | 2 | 3].bg + " shadow-lg"
                                    : "bg-slate-300 dark:bg-slate-600"
                                }`}
                        >
                            ±{level}σ ({level === 1 ? "68%" : level === 2 ? "95%" : "99.7%"})
                        </motion.button>
                    ))}
                </div>

                {/* Chart */}
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={curveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="normalGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors[showLevel].fill} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors[showLevel].fill} stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="x"
                                type="number"
                                domain={[mean - 4 * std, mean + 4 * std]}
                                tickFormatter={(v) => v.toFixed(0)}
                                stroke="#94a3b8"
                            />
                            <YAxis stroke="#94a3b8" hide />

                            {/* Shaded region for selected interval */}
                            <ReferenceArea
                                x1={currentInterval.low}
                                x2={currentInterval.high}
                                fill={colors[showLevel].fill}
                                fillOpacity={0.3}
                            />

                            {/* Main curve */}
                            <Area
                                type="monotone"
                                dataKey="y"
                                stroke={colors[showLevel].stroke}
                                strokeWidth={2}
                                fill="url(#normalGradient)"
                            />

                            {/* Reference lines */}
                            <ReferenceLine x={mean} stroke="#10b981" strokeWidth={2} label={{ value: "μ", fill: "#10b981", fontSize: 14, fontWeight: "bold" }} />
                            <ReferenceLine x={currentInterval.low} stroke={colors[showLevel].stroke} strokeDasharray="5 5" />
                            <ReferenceLine x={currentInterval.high} stroke={colors[showLevel].stroke} strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Stats */}
                <motion.div
                    key={`${mean}-${std}-${showLevel}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-3 gap-4 text-center"
                >
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Límite Inferior</div>
                        <div className="text-xl font-mono">{currentInterval.low.toFixed(1)}</div>
                    </div>
                    <div className={`p-3 rounded-xl ${colors[showLevel].bg} text-white`}>
                        <div className="text-xs uppercase tracking-wider opacity-80">Porcentaje</div>
                        <div className="text-2xl font-black">{currentInterval.percent}%</div>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Límite Superior</div>
                        <div className="text-xl font-mono">{currentInterval.high.toFixed(1)}</div>
                    </div>
                </motion.div>

                {/* Insight */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-sm text-emerald-800 dark:text-emerald-200">
                    <strong>💡 Recuerda:</strong> En cualquier distribución Normal, aproximadamente el {currentInterval.percent}%
                    de los datos cae entre μ ± {showLevel}σ = [{currentInterval.low.toFixed(1)}, {currentInterval.high.toFixed(1)}].
                </div>
            </div>
        </ChartContainer>
    )
}
