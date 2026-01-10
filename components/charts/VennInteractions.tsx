"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChartContainer } from "./ChartContainer"

interface VennProps {
    mode?: "union" | "intersection" | "complement" | "conditional"
}

export function VennInteractions({ mode = "union" }: VennProps) {
    const [activeMode, setActiveMode] = useState<"union" | "intersection" | "complement" | "conditional">(mode)
    const [hoveredSet, setHoveredSet] = useState<"A" | "B" | "Both" | "None">("None")

    // Circle config
    const cx1 = 120, cy = 150, r = 80
    const cx2 = 200

    // Handlers
    const isActive = (region: "A" | "B" | "Both") => {
        switch (activeMode) {
            case "union":
                return true
            case "intersection":
                return region === "Both"
            case "complement":
                return region === "B" // Complement of A (assuming we show A')
            case "conditional":
                return region === "Both" // P(A|B) highlights intersection within B
        }
    }

    const getOpacity = (region: "A" | "B" | "Both") => {
        if (activeMode === "union") return 0.5
        if (activeMode === "intersection") return region === "Both" ? 0.6 : 0.1
        if (activeMode === "complement") return region === "A" || region === "Both" ? 0.1 : 0.5 // A' is outside A
        if (activeMode === "conditional") return region === "Both" ? 0.8 : (region === "B" ? 0.3 : 0.1)
        return 0.3
    }

    // For complement of A, we actually want to highlight everything outside A. 
    // Simplified: Highlight B only? Or Universe? 
    // Let's stick to standard set operations visualization.

    return (
        <ChartContainer
            title="Operaciones de Conjuntos"
            description="Visualiza Unión, Intersección y Probabilidad Condicional"
        >
            <div className="space-y-6">
                {/* Tabs */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto">
                    {[
                        { id: "union", label: "A ∪ B" },
                        { id: "intersection", label: "A ∩ B" },
                        { id: "conditional", label: "P(A | B)" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveMode(tab.id as any)}
                            className={`flex-1 min-w-[80px] py-1.5 text-sm font-medium rounded-md transition-all ${activeMode === tab.id
                                ? "bg-white dark:bg-slate-700 shadow text-brand-blue"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* SVG */}
                <div className="flex justify-center">
                    <svg width="320" height="260" viewBox="0 0 320 260" className="overflow-visible">
                        {/* Definitions for clippaths */}
                        <defs>
                            <circle id="circleA" cx={cx1} cy={cy} r={r} />
                            <circle id="circleB" cx={cx2} cy={cy} r={r} />
                            <clipPath id="clipA">
                                <use href="#circleA" />
                            </clipPath>
                            <clipPath id="clipB">
                                <use href="#circleB" />
                            </clipPath>
                        </defs>

                        {/* Universe Box */}
                        <rect x="0" y="0" width="320" height="260" rx="15" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                        <text x="10" y="25" fill="#94a3b8" fontSize="14" fontWeight="bold">Ω (Universo)</text>

                        {/* Set A (Left) */}
                        <motion.circle
                            cx={cx1} cy={cy} r={r}
                            fill="#3b82f6"
                            fillOpacity={getOpacity("A")}
                            stroke="#1d4ed8"
                            strokeWidth="2"
                            animate={{ fillOpacity: getOpacity("A") }}
                            onMouseEnter={() => setHoveredSet("A")}
                            onMouseLeave={() => setHoveredSet("None")}
                        />

                        {/* Set B (Right) */}
                        <motion.circle
                            cx={cx2} cy={cy} r={r}
                            fill="#ef4444"
                            fillOpacity={getOpacity("B")}
                            stroke="#b91c1c"
                            strokeWidth="2"
                            animate={{ fillOpacity: getOpacity("B") }}
                            onMouseEnter={() => setHoveredSet("B")}
                            onMouseLeave={() => setHoveredSet("None")}
                        />

                        {/* Intersection Highlight */}
                        <motion.g clipPath="url(#clipA)">
                            <motion.circle
                                cx={cx2} cy={cy} r={r}
                                fill="#8b5cf6" // Purple for intersection
                                fillOpacity={getOpacity("Both")}
                                animate={{ fillOpacity: getOpacity("Both") }}
                                pointerEvents="none"
                            />
                        </motion.g>

                        {/* Labels */}
                        <text x={cx1 - 50} y={cy} textAnchor="middle" fill="white" fontWeight="bold">A</text>
                        <text x={cx2 + 50} y={cy} textAnchor="middle" fill="white" fontWeight="bold">B</text>
                        <text x={(cx1 + cx2) / 2} y={cy} textAnchor="middle" fill="white" fontSize="12">A∩B</text>

                    </svg>
                </div>

                {/* Explanation */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl min-h-[100px] flex items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMode}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {activeMode === "union" && (
                                <div>
                                    <div className="text-lg font-bold text-slate-800 dark:text-slate-200">A ∪ B (Unión)</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Ocurre A, ocurre B, o ambos. "O" lógico.</div>
                                    <div className="font-mono text-xs mt-2 bg-slate-200 dark:bg-slate-800 p-1 rounded">P(A∪B) = P(A) + P(B) - P(A∩B)</div>
                                </div>
                            )}
                            {activeMode === "intersection" && (
                                <div>
                                    <div className="text-lg font-bold text-slate-800 dark:text-slate-200">A ∩ B (Intersección)</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Ocurre A Y ocurre B simultáneamente. "Y" lógico.</div>
                                    {/* <div className="font-mono text-xs mt-2 bg-slate-200 dark:bg-slate-800 p-1 rounded">P(A∩B) = P(A) * P(B|A)</div> */}
                                </div>
                            )}
                            {activeMode === "conditional" && (
                                <div>
                                    <div className="text-lg font-bold text-slate-800 dark:text-slate-200">P(A | B) (Condicional)</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        Probabilidad de A dado que <span className="text-red-500 font-bold">YA estamos en B</span>.
                                    </div>
                                    <div className="text-xs mt-2">
                                        El universo se reduce al círculo rojo (B). La probabilidad es la porción púrpura (Intersección) dividida por el área roja.
                                    </div>
                                    <div className="font-mono text-xs mt-2 bg-slate-200 dark:bg-slate-800 p-1 rounded">P(A|B) = P(A∩B) / P(B)</div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </ChartContainer>
    )
}
