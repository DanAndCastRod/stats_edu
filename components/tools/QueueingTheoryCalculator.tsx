"use client"

import React, { useState, useMemo } from "react"
import {
    Activity,
    Sliders,
    Layers,
    DollarSign,
    Clock,
    Users,
    AlertTriangle,
    CheckCircle2,
    BarChart3,
    Bookmark,
    TrendingDown,
    Download,
    Copy,
    Check
} from "lucide-react"
import { solveQueueingModel, QueueingResults } from "@/lib/tools-math"
import { downloadCsvFile, copyToClipboard, getExportTimestamp } from "@/lib/export-utils"
import { MathFormula } from "./MathFormula"

export function QueueingTheoryCalculator() {
    const [model, setModel] = useState<"M/M/1" | "M/M/s" | "M/M/s/K">("M/M/s")
    const [lambda, setLambda] = useState<number>(8.0) // llegadas por hora
    const [mu, setMu] = useState<number>(5.0) // servicio por servidor por hora
    const [servers, setServers] = useState<number>(2)
    const [capacityK, setCapacityK] = useState<number>(6)
    const [costServer, setCostServer] = useState<number>(25.0) // $/hr por servidor
    const [costWait, setCostWait] = useState<number>(50.0) // $/hr por cliente en cola

    const results: QueueingResults = useMemo(() => {
        return solveQueueingModel(
            model,
            lambda,
            mu,
            model === "M/M/1" ? 1 : servers,
            capacityK,
            costServer,
            costWait
        )
    }, [model, lambda, mu, servers, capacityK, costServer, costWait])

    // Server optimization comparison table (evaluates s from 1 to 5)
    const serverComparison = useMemo(() => {
        if (model === "M/M/1") return []
        const list: { s: number; rho: number; isStable: boolean; Lq: number; totalCost: number }[] = []
        for (let sCandidate = 1; sCandidate <= 6; sCandidate++) {
            const res = solveQueueingModel(
                model === "M/M/s/K" ? "M/M/s/K" : "M/M/s",
                lambda,
                mu,
                sCandidate,
                Math.max(sCandidate, capacityK),
                costServer,
                costWait
            )
            list.push({
                s: sCandidate,
                rho: res.rho,
                isStable: res.isStable,
                Lq: res.Lq,
                totalCost: res.totalCost
            })
        }
        return list
    }, [model, lambda, mu, capacityK, costServer, costWait])

    const optimalServers = useMemo(() => {
        if (serverComparison.length === 0) return 1
        const stableList = serverComparison.filter((x) => x.isStable && Number.isFinite(x.totalCost))
        if (stableList.length === 0) return 1
        let minCost = Infinity
        let bestS = 1
        stableList.forEach((c) => {
            if (c.totalCost < minCost) {
                minCost = c.totalCost
                bestS = c.s
            }
        })
        return bestS
    }, [serverComparison])

    // Presets
    const applyPreset = (preset: string) => {
        if (preset === "banco") {
            setModel("M/M/s")
            setLambda(15)
            setMu(6)
            setServers(3)
            setCostServer(30)
            setCostWait(60)
        } else if (preset === "taller_mecanico") {
            setModel("M/M/1")
            setLambda(3.5)
            setMu(5.0)
            setCostServer(45)
            setCostWait(90)
        } else if (preset === "servidor_buffer") {
            setModel("M/M/s/K")
            setLambda(12)
            setMu(5)
            setServers(2)
            setCapacityK(5)
            setCostServer(20)
            setCostWait(80)
        }
    }

    const [copied, setCopied] = useState(false)

    const handleExportCsv = () => {
        const rows: (string | number)[][] = [
            ["# STATSEDU UTP - REPORTE DE TEORIA DE COLAS Y MODELOS DE ESPERA"],
            ["# Facultad de Ingenieria Industrial - Universidad Tecnologica de Pereira"],
            ["# Fecha de Generacion", new Date().toLocaleString("es-CO")],
            [""],
            ["SECCION: CONFIGURACION DEL MODELO"],
            ["Modelo", model],
            ["Tasa de llegada (lambda)", lambda, "clientes/hora"],
            ["Tasa de servicio por servidor (mu)", mu, "clientes/hora"],
            ["Servidores en paralelo (s)", model === "M/M/1" ? 1 : servers, "servidores"],
            ["Capacidad maxima del sistema (K)", model === "M/M/s/K" ? capacityK : "Infinita", "clientes"],
            ["Costo unitario por servidor (Cs)", costServer, "$/h"],
            ["Costo unitario por espera en cola (Cw)", costWait, "$/h por cliente"],
            [""],
            ["SECCION: METRICAS DE RENDIMIENTO DE LITTLE"],
            ["Metrica", "Simbolo", "Valor", "Unidad"],
            ["Factor de utilizacion del sistema", "rho", (results.rho * 100).toFixed(2), "%"],
            ["Estado del sistema", "Condicion", results.isStable ? "Estable (rho < 1)" : "Cola Infinita / Inestable", "-"],
            ["Probabilidad de sistema vacio / ocioso", "P0", (results.P0 * 100).toFixed(4), "%"],
            ["Numero esperado de clientes en el sistema", "L", results.isStable ? results.L.toFixed(4) : "Infinito", "clientes"],
            ["Numero esperado de clientes en cola", "Lq", results.isStable ? results.Lq.toFixed(4) : "Infinito", "clientes"],
            ["Tiempo promedio de permanencia en sistema (horas)", "W", results.isStable ? results.W.toFixed(4) : "Infinito", "horas"],
            ["Tiempo promedio de permanencia en sistema (minutos)", "W_min", results.isStable ? (results.W * 60).toFixed(2) : "Infinito", "minutos"],
            ["Tiempo promedio de espera en cola (horas)", "Wq", results.isStable ? results.Wq.toFixed(4) : "Infinito", "horas"],
            ["Tiempo promedio de espera en cola (minutos)", "Wq_min", results.isStable ? (results.Wq * 60).toFixed(2) : "Infinito", "minutos"],
            [
                model === "M/M/s/K" ? "Probabilidad de bloqueo / perdida de clientes" : "Probabilidad de que un cliente deba esperar",
                model === "M/M/s/K" ? "P_K" : "P(W > 0)",
                model === "M/M/s/K" ? ((results.pLoss ?? 0) * 100).toFixed(4) : ((results.pWait ?? 0) * 100).toFixed(4),
                "%"
            ],
            [""],
            ["SECCION: ESTRUCTURA DE COSTOS ECONOMICOS"],
            ["Concepto", "Costo ($/h)"],
            ["Costo de Operacion de Servidores", results.serverCost.toFixed(2)],
            ["Costo de Espera de Clientes en Cola", results.waitingCost.toFixed(2)],
            ["Costo Total Esperado del Sistema", results.totalCost.toFixed(2)],
            [""],
            ["SECCION: DISTRIBUCION DE PROBABILIDAD DE ESTADO ESTACIONARIO (P_n)"],
            ["n (Clientes en Sistema)", "Probabilidad P_n", "Porcentaje (%)"]
        ]

        results.Pn.forEach((p, n) => {
            rows.push([n, p.toFixed(5), (p * 100).toFixed(3)])
        })

        if (model !== "M/M/1" && serverComparison.length > 0) {
            rows.push([""])
            rows.push(["SECCION: SENSIBILIDAD ECONOMICA Y OPTIMIZACION DE SERVIDORES"])
            rows.push(["Servidores (s)", "Utilizacion rho (%)", "Clientes en Cola (Lq)", "Costo Total ($/h)", "Dictamen", "Es Optimo"])
            serverComparison.forEach((sc) => {
                rows.push([
                    sc.s,
                    (sc.rho * 100).toFixed(1),
                    sc.isStable ? sc.Lq.toFixed(2) : "Infinito",
                    sc.isStable && Number.isFinite(sc.totalCost) ? sc.totalCost.toFixed(2) : "Inestable",
                    sc.isStable ? "Factible" : "Sobrecarga",
                    sc.s === optimalServers ? "SI - COSTO MINIMO" : "NO"
                ])
            })
        }

        const filename = `teoria_colas_${model.replace(/\//g, "_")}_${getExportTimestamp()}`
        downloadCsvFile(filename, rows)
    }

    const handleCopySummary = async () => {
        const markdown = `### Reporte de Simulación: Teoría de Colas (StatsEdu UTP)
**Modelo Analizado:** ${model}  
**Parámetros:** $\\lambda = ${lambda}$ clientes/h, $\\mu = ${mu}$ clientes/h/servidor, $s = ${model === "M/M/1" ? 1 : servers}${model === "M/M/s/K" ? `, K = ${capacityK}` : ""}  
**Costos:** Servidor = $${costServer}/h, Espera = $${costWait}/h/cliente  

| Métrica de Desempeño | Símbolo | Valor Calculado | Unidad |
| :--- | :--- | :--- | :--- |
| **Factor de Utilización** | $\\rho$ | ${(results.rho * 100).toFixed(2)}% | % |
| **Estado del Sistema** | — | ${results.isStable ? "Estable (\\rho < 1)" : "Inestable (\\rho \\ge 1)"} | — |
| **Probabilidad de Ocio** | $P_0$ | ${(results.P0 * 100).toFixed(2)}% | % |
| **Clientes en Sistema** | $L$ | ${results.isStable ? results.L.toFixed(3) : "∞"} | clientes |
| **Clientes en Cola** | $L_q$ | ${results.isStable ? results.Lq.toFixed(3) : "∞"} | clientes |
| **Tiempo en Sistema** | $W$ | ${results.isStable ? `${(results.W * 60).toFixed(1)} min (${results.W.toFixed(3)} h)` : "∞"} | tiempo |
| **Tiempo en Cola** | $W_q$ | ${results.isStable ? `${(results.Wq * 60).toFixed(1)} min (${results.Wq.toFixed(3)} h)` : "∞"} | tiempo |
| **${model === "M/M/s/K" ? "Probabilidad Bloqueo (P_K)" : "Probabilidad de Esperar"}** | ${model === "M/M/s/K" ? "$P_K$" : "$P(W > 0)$"} | ${model === "M/M/s/K" ? `${((results.pLoss ?? 0) * 100).toFixed(2)}%` : `${((results.pWait ?? 0) * 100).toFixed(2)}%`} | % |
| **Costo Total por Hora** | $TC$ | $${results.totalCost.toFixed(2)}/h | USD/h |

*Generado por la Suite de Computación e Investigación Operativa — Universidad Tecnológica de Pereira.*`

        const ok = await copyToClipboard(markdown)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300 mb-2">
                            <Users className="h-3.5 w-3.5" />
                            Investigación de Operaciones II (II8B3) & MIOE
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Calculadora de Teoría de Colas y Modelos de Espera
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Análisis estocástico de procesos de nacimiento y muerte bajo modelos M/M/1, M/M/s y M/M/s/K con optimización de costos de servicio y espera.
                        </p>
                    </div>

                    {/* Presets and Export Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                            <Bookmark className="h-3 w-3" /> Casos UTP:
                        </span>
                        <button
                            onClick={() => applyPreset("banco")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                        >
                            Cajeros Bancarios M/M/3
                        </button>
                        <button
                            onClick={() => applyPreset("taller_mecanico")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                        >
                            Taller Mecánico M/M/1
                        </button>
                        <button
                            onClick={() => applyPreset("servidor_buffer")}
                            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                        >
                            Buffer Finito M/M/s/K
                        </button>

                        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1" />

                        {/* Export Buttons */}
                        <button
                            onClick={handleExportCsv}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Descargar archivo estructurado en formato CSV para Excel/Calc"
                        >
                            <Download className="h-3.5 w-3.5" /> Exportar a CSV
                        </button>
                        <button
                            onClick={handleCopySummary}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
                            title="Copiar tabla de resultados en formato Markdown para informes"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Copiado!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3.5 w-3.5 text-slate-500" /> Copiar Resumen
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Model Selector Tabs */}
                <div className="flex gap-2 mt-5">
                    {(["M/M/1", "M/M/s", "M/M/s/K"] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => setModel(m)}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                                model === m
                                    ? "bg-indigo-900 text-white border-indigo-900 shadow-sm"
                                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                        >
                            Modelo {m}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Interactive Body */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Parameters Input (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                    {/* Operational Rates Card */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mb-3">
                            <Sliders className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                            Parámetros Operacionales
                        </h3>

                        <div className="space-y-4">
                            {/* Lambda */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Tasa media de llegadas (λ): {lambda} clientes/h</span>
                                    <span className="text-slate-400">1 a 40</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="40"
                                    step="0.5"
                                    value={lambda}
                                    onChange={(e) => setLambda(parseFloat(e.target.value))}
                                    className="w-full accent-indigo-700 cursor-pointer"
                                />
                            </div>

                            {/* Mu */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Tasa media de servicio (μ): {mu} clientes/h</span>
                                    <span className="text-slate-400">0.5 a 30</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="30"
                                    step="0.5"
                                    value={mu}
                                    onChange={(e) => setMu(parseFloat(e.target.value))}
                                    className="w-full accent-indigo-700 cursor-pointer"
                                />
                            </div>

                            {/* Servers (s) */}
                            {model !== "M/M/1" && (
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span>Número de Servidores en paralelo (s): {servers}</span>
                                        <span className="text-slate-400">1 a 8</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="8"
                                        step="1"
                                        value={servers}
                                        onChange={(e) => {
                                            const newS = parseInt(e.target.value)
                                            setServers(newS)
                                            if (capacityK < newS) setCapacityK(newS + 2)
                                        }}
                                        className="w-full accent-indigo-700 cursor-pointer"
                                    />
                                </div>
                            )}

                            {/* Capacity (K) */}
                            {model === "M/M/s/K" && (
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span>Capacidad Máxima del Sistema (K): {capacityK}</span>
                                        <span className="text-slate-400">≥ {servers}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={servers}
                                        max="20"
                                        step="1"
                                        value={capacityK}
                                        onChange={(e) => setCapacityK(parseInt(e.target.value))}
                                        className="w-full accent-indigo-700 cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cost Structure Card */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mb-3">
                            <DollarSign className="h-4 w-4 text-emerald-600" />
                            Estructura de Costos del Sistema
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-slate-500">
                                    Costo por Servidor ($/h):
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        type="number"
                                        min="0"
                                        step="5"
                                        value={costServer}
                                        onChange={(e) => setCostServer(parseFloat(e.target.value) || 0)}
                                        className="w-full pl-6 pr-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                    />
                                    <span className="absolute left-2.5 top-1.5 text-xs text-slate-400">$</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-slate-500">
                                    Costo Espera en Cola ($/h):
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        type="number"
                                        min="0"
                                        step="5"
                                        value={costWait}
                                        onChange={(e) => setCostWait(parseFloat(e.target.value) || 0)}
                                        className="w-full pl-6 pr-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                                    />
                                    <span className="absolute left-2.5 top-1.5 text-xs text-slate-400">$</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stability Badge & Intensity Card */}
                    <div
                        className={`p-4 rounded-xl border ${
                            results.isStable
                                ? "bg-indigo-50/60 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/40"
                                : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                Factor de Utilización del Sistema (ρ)
                            </span>
                            <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                    results.isStable
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                        : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                }`}
                            >
                                {results.isStable ? "Sistema Estable (ρ < 1)" : "Cola Infinita / Inestable"}
                            </span>
                        </div>
                        <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                            {(results.rho * 100).toFixed(2)}%
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                            {model === "M/M/1"
                                ? "ρ = λ / μ"
                                : model === "M/M/s"
                                ? "ρ = λ / (s · μ)"
                                : "ρ = λ / (s · μ) con truncamiento de llegadas"}
                        </div>
                    </div>
                </div>

                {/* Right Column: Performance Metrics & Visual Distribution (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                    {/* Performance Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {/* L */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Clientes en Sistema (L)
                            </span>
                            <div className="text-xl font-black text-indigo-900 dark:text-indigo-400 mt-1 font-mono">
                                {results.isStable ? results.L.toFixed(3) : "∞"}
                            </div>
                            <span className="text-[10px] text-slate-500">Promedio total</span>
                        </div>

                        {/* Lq */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Clientes en Cola (Lq)
                            </span>
                            <div className="text-xl font-black text-blue-800 dark:text-blue-400 mt-1 font-mono">
                                {results.isStable ? results.Lq.toFixed(3) : "∞"}
                            </div>
                            <span className="text-[10px] text-slate-500">Esperando servicio</span>
                        </div>

                        {/* W */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Tiempo en Sistema (W)
                            </span>
                            <div className="text-xl font-black text-purple-800 dark:text-purple-400 mt-1 font-mono">
                                {results.isStable ? `${(results.W * 60).toFixed(1)} min` : "∞"}
                            </div>
                            <span className="text-[10px] text-slate-500">
                                {results.isStable ? `${results.W.toFixed(3)} h` : ""}
                            </span>
                        </div>

                        {/* Wq */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Tiempo en Cola (Wq)
                            </span>
                            <div className="text-xl font-black text-rose-700 dark:text-rose-400 mt-1 font-mono">
                                {results.isStable ? `${(results.Wq * 60).toFixed(1)} min` : "∞"}
                            </div>
                            <span className="text-[10px] text-slate-500">
                                {results.isStable ? `${results.Wq.toFixed(3)} h` : ""}
                            </span>
                        </div>
                    </div>

                    {/* Secondary Metrics: P0, Prob Wait, Loss */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Servidor Ocioso (P₀)
                            </span>
                            <div className="text-lg font-black font-mono text-emerald-600 mt-1">
                                {(results.P0 * 100).toFixed(2)}%
                            </div>
                            <span className="text-[10px] text-slate-500">Sin clientes en sistema</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                {model === "M/M/s/K" ? "Prob. Bloqueo (P_K)" : "Prob. Esperar P(W > 0)"}
                            </span>
                            <div className="text-lg font-black font-mono text-amber-600 mt-1">
                                {model === "M/M/s/K"
                                    ? `${((results.pLoss ?? 0) * 100).toFixed(2)}%`
                                    : `${((results.pWait ?? 0) * 100).toFixed(2)}%`}
                            </div>
                            <span className="text-[10px] text-slate-500">
                                {model === "M/M/s/K" ? "Clientes rechazados" : "Fórmula Erlang-C"}
                            </span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Costo Total por Hora
                            </span>
                            <div className="text-lg font-black font-mono text-slate-900 dark:text-white mt-1">
                                {Number.isFinite(results.totalCost)
                                    ? `$${results.totalCost.toFixed(2)}/h`
                                    : "Inviable"}
                            </div>
                            <span className="text-[10px] text-slate-500">
                                Servidor: ${results.serverCost} + Cola: ${results.waitingCost.toFixed(1)}
                            </span>
                        </div>
                    </div>

                    {/* Interactive Steady-State Distribution Bar Chart */}
                    <div className="p-4 rounded-xl bg-slate-950 text-white border border-slate-800">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                <BarChart3 className="h-4 w-4 text-indigo-400" />
                                Distribución de Probabilidades de Estado P_n (n = 0..15)
                            </span>
                            <span className="text-[11px] font-mono text-indigo-300">
                                Σ P_n = 100%
                            </span>
                        </div>

                        {/* Chart Grid */}
                        <div className="h-40 flex items-end gap-1.5 pt-4 pb-2 border-b border-slate-800">
                            {results.Pn.map((prob, n) => {
                                const maxP = Math.max(...results.Pn, 0.01)
                                const heightPct = (prob / maxP) * 100
                                const isServerIdle = n === 0
                                const isBusyServers = n > 0 && n <= (model === "M/M/1" ? 1 : servers)
                                const isQueue = n > (model === "M/M/1" ? 1 : servers)

                                return (
                                    <div
                                        key={n}
                                        className="flex-1 flex flex-col items-center h-full justify-end group relative"
                                    >
                                        <div
                                            style={{ height: `${Math.max(4, heightPct)}%` }}
                                            className={`w-full rounded-t transition-all ${
                                                isServerIdle
                                                    ? "bg-emerald-500"
                                                    : isBusyServers
                                                    ? "bg-indigo-500"
                                                    : isQueue
                                                    ? "bg-rose-500"
                                                    : "bg-slate-700"
                                            } hover:brightness-125`}
                                        />
                                        {/* Tooltip on hover */}
                                        <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-10 bg-slate-900 text-white text-[10px] font-mono p-1 rounded border border-slate-700 pointer-events-none whitespace-nowrap shadow-lg">
                                            <span>P_{n} = {(prob * 100).toFixed(2)}%</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* X-axis labels */}
                        <div className="flex gap-1.5 pt-1 text-[10px] font-mono text-slate-400">
                            {results.Pn.map((_, n) => (
                                <div key={n} className="flex-1 text-center">
                                    {n}
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded bg-emerald-500" /> Sistema Ocioso (n=0)
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded bg-indigo-500" /> Servidores Ocupados (n ≤ s)
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded bg-rose-500" /> Clientes en Espera (n &gt; s)
                            </span>
                        </div>
                    </div>

                    {/* Server Trade-Off Analysis Table */}
                    {model !== "M/M/1" && (
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                                    Optimización Económica: Sensibilidad vs Número de Servidores
                                </span>
                                <span className="text-xs font-bold text-emerald-600">
                                    Recomendado: s* = {optimalServers} servidores
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                                            <th className="py-1.5 px-2">Servidores (s)</th>
                                            <th className="py-1.5 px-2">Utilización (ρ)</th>
                                            <th className="py-1.5 px-2">Cola (Lq)</th>
                                            <th className="py-1.5 px-2">Costo Total ($/h)</th>
                                            <th className="py-1.5 px-2 text-right">Veredicto</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                                        {serverComparison.map((row) => {
                                            const isBest = row.s === optimalServers
                                            return (
                                                <tr
                                                    key={row.s}
                                                    className={isBest ? "bg-emerald-50/80 dark:bg-emerald-950/30 font-bold" : ""}
                                                >
                                                    <td className="py-1.5 px-2">s = {row.s}</td>
                                                    <td className="py-1.5 px-2">
                                                        {(row.rho * 100).toFixed(1)}%
                                                    </td>
                                                    <td className="py-1.5 px-2">
                                                        {row.isStable ? row.Lq.toFixed(2) : "∞"}
                                                    </td>
                                                    <td className="py-1.5 px-2">
                                                        {row.isStable && Number.isFinite(row.totalCost)
                                                            ? `$${row.totalCost.toFixed(2)}`
                                                            : "Inestable"}
                                                    </td>
                                                    <td className="py-1.5 px-2 text-right">
                                                        {isBest ? (
                                                            <span className="text-emerald-600 font-sans font-bold">
                                                                ★ Mínimo Costo
                                                            </span>
                                                        ) : !row.isStable ? (
                                                            <span className="text-rose-500 font-sans">
                                                                Sobrecarga
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-400 font-sans">
                                                                Factible
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default QueueingTheoryCalculator
