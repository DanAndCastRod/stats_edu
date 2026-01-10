"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./ChartContainer"
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    ResponsiveContainer
} from "recharts"

export function CorrelationGame() {
    const [targetR, setTargetR] = useState(0)
    const [data, setData] = useState<{ x: number, y: number }[]>([])
    const [userGuess, setUserGuess] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [round, setRound] = useState(1)

    // Generate random correlation data
    const generateData = () => {
        // Pick a random r between -1 and 1
        const r = Math.round((Math.random() * 2 - 1) * 100) / 100
        setTargetR(r)

        // Generate points
        const n = 50
        const points = []
        for (let i = 0; i < n; i++) {
            const x = Math.random() * 10
            // y = r*x + noise
            // To control correlation precisely is hard with simple noise, 
            // but for a game, approximating the visual is enough.
            // Better method: standard normal transformation
            const z1 = boxMuller()
            const z2 = boxMuller()

            // Correlated variables
            // Y = rho * X + sqrt(1 - rho^2) * Z
            // Here we want scatter, assuming standard normals
            // Let's just create typical shapes
            const x_val = z1
            const y_val = r * z1 + Math.sqrt(1 - r * r) * z2

            points.push({ x: x_val, y: y_val })
        }
        setData(points)
        setShowResult(false)
        setUserGuess(0)
    }

    const boxMuller = () => {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    useEffect(() => {
        generateData()
    }, [])

    const checkGuess = () => {
        setShowResult(true)
        const diff = Math.abs(targetR - userGuess)
        if (diff < 0.1) setScore(s => s + 10)
        else if (diff < 0.2) setScore(s => s + 5)
        else setScore(s => Math.max(0, s - 1))
    }

    const nextRound = () => {
        setRound(r => r + 1)
        generateData()
    }

    return (
        <ChartContainer
            title="Desafío de Correlación"
            description="Entrena tu ojo: Adivina el coeficiente r"
        >
            <div className="space-y-6">
                {/* Score Header */}
                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
                    <div className="text-sm font-bold text-slate-500">Ronda: {round}</div>
                    <div className="text-xl font-bold text-brand-blue">Puntaje: {score}</div>
                </div>

                {/* Plot Area - Without Axes labels to make it abstract */}
                <div className="h-64 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" type="number" hide domain={["auto", "auto"]} />
                            <YAxis dataKey="y" type="number" hide domain={["auto", "auto"]} />
                            <Scatter data={data} fill="#3b82f6" fillOpacity={0.6} />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-center">Tu estimación de r: {userGuess.toFixed(2)}</label>
                        <input
                            type="range"
                            min="-1"
                            max="1"
                            step="0.05"
                            value={userGuess}
                            disabled={showResult}
                            onChange={(e) => setUserGuess(parseFloat(e.target.value))}
                            className="w-full accent-brand-blue h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>-1 (Negativa)</span>
                            <span>0 (Nula)</span>
                            <span>+1 (Positiva)</span>
                        </div>
                    </div>

                    {!showResult ? (
                        <button
                            onClick={checkGuess}
                            className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold shadow-lg hover:bg-brand-blue/90 transition-all active:scale-95"
                        >
                            ¡Adivinar!
                        </button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                        >
                            <div className="flex justify-center gap-8 text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <div>
                                    <div className="text-xs uppercase text-slate-500">Real</div>
                                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{targetR}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-slate-500">Tuya</div>
                                    <div className={`text-2xl font-bold ${Math.abs(targetR - userGuess) < 0.1 ? "text-emerald-500" : "text-amber-500"
                                        }`}>
                                        {userGuess.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={nextRound}
                                className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold shadow-lg hover:bg-emerald-600 transition-all active:scale-95"
                            >
                                Siguiente Ronda →
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </ChartContainer>
    )
}
