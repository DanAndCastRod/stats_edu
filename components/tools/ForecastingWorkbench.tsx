"use client"

import React, { useState, useMemo } from "react"
import {
    TrendingUp,
    Sliders,
    BarChart2,
    Download,
    Copy,
    Check,
    RotateCcw,
    Layers,
    Target,
    Activity
} from "lucide-react"
import { calculateForecasting, ForecastingMethod, ForecastingResult } from "@/lib/tools-math"
import { downloadCsvFile, copyToClipboard, getExportTimestamp, formatMarkdownTable } from "@/lib/export-utils"
import { MathFormula } from "./MathFormula"

const PRESETS = {
    trending: {
        name: "Tendencia de Crecimiento Industrial",
        data: [120, 135, 148, 160, 175, 190, 205, 222, 238, 255, 270, 290]
    },
    seasonal: {
        name: "Demanda con Variaciones de Temporada",
        data: [180, 220, 290, 150, 195, 240, 310, 165, 210, 260, 335, 180]
    },
    stationary: {
        name: "Demanda Estacionaria con Ruido",
        data: [205, 198, 215, 202, 195, 210, 208, 199, 214, 203, 197, 212]
    }
}

export function ForecastingWorkbench() {
    const [selectedPreset, setSelectedPreset] = useState<keyof typeof PRESETS>("trending")
    const [actuals, setActuals] = useState<number[]>(PRESETS.trending.data)
    const [method, setMethod] = useState<ForecastingMethod>("holt")
    const [alpha, setAlpha] = useState<number>(0.35)
    const [beta, setBeta] = useState<number>(0.25)
    const [windowK, setWindowK] = useState<number>(3)
    const [copied, setCopied] = useState<boolean>(false)

    const results: ForecastingResult = useMemo(() => {
        return calculateForecasting(actuals, method, { alpha, beta, window: windowK })
    }, [actuals, method, alpha, beta, windowK])

    const handlePresetChange = (key: keyof typeof PRESETS) => {
        setSelectedPreset(key)
        setActuals(PRESETS[key].data)
    }

    const handleExportCSV = () => {
        const rows: (string | number)[][] = [
            ["=== PRONÓSTICO DE SERIES DE TIEMPO Y ANÁLISIS DE DEMANDA ==="],
            ["Fecha de Exportación", new Date().toLocaleString("es-CO")],
            ["Universidad", "Universidad Tecnológica de Pereira - Ingeniería Industrial"],
            [],
            ["1. PARÁMETROS DEL MODELO"],
            ["Método Utilizado", results.methodLabel],
            ["Parámetro Alfa (Nivel)", method !== "sma" ? alpha : "N/A"],
            ["Parámetro Beta (Tendencia)", method === "holt" ? beta : "N/A"],
            ["Ventana de Períodos (k)", method === "sma" ? windowK : "N/A"],
            ["Pronóstico Período Siguiente (t+1)", results.nextForecast],
            [],
            ["2. MÉTRICAS DE PRECISIÓN Y ERROR DE PRONÓSTICO"],
            ["Desviación Absoluta Media (MAD)", results.metrics.mad, "unidades"],
            ["Error Cuadrático Medio (MSE)", results.metrics.mse],
            ["Raíz del Error Cuadrático Medio (RMSE)", results.metrics.rmse, "unidades"],
            ["Error Porcentual Absoluto Medio (MAPE)", `${results.metrics.mape}%`],
            ["Señal de Rastreo (Tracking Signal)", results.metrics.trackingSignal],
            [],
            ["3. SERIE HISTÓRICA Y PRONÓSTICO DETALLADO"],
            ["Período (t)", "Demanda Real (At)", "Pronóstico (Ft)", "Error (et)", "|Error|", "Error²", "% Error"],
            ...results.series.map((p) => [
                p.period,
                p.actual,
                p.forecast ?? "-",
                p.error ?? "-",
                p.absError ?? "-",
                p.sqError ?? "-",
                p.pctError ? `${p.pctError}%` : "-"
            ]),
            ["t + 1 (Proyección)", "-", results.nextForecast, "-", "-", "-", "-"]
        ]

        downloadCsvFile(`Pronostico_Demanda_${getExportTimestamp()}.csv`, rows)
    }

    const handleCopySummary = async () => {
        const headers = ["Métrica de Pronóstico", "Valor Calculado", "Interpretación"]
        const rows = [
            ["Método", results.methodLabel, "Modelo matemático de ajuste"],
            ["Pronóstico Período t+1", `${results.nextForecast} unidades`, "Demanda esperada para el siguiente ciclo"],
            ["Error MAD", `${results.metrics.mad} u`, "Magnitud promedio del error en unidades"],
            ["Error RMSE", `${results.metrics.rmse} u`, "Penalización cuadrática de desvíos grandes"],
            ["Error MAPE", `${results.metrics.mape}%`, "Porcentaje de desvío relativo"],
            ["Señal de Rastreo", `${results.metrics.trackingSignal}`, "Sesgo del modelo (Aceptable si está entre -4 y +4)"]
        ]

        const text = `# Reporte Ejecutivo: Pronóstico Cuantitativo de Demanda\n**Universidad Tecnológica de Pereira — Facultad de Ingeniería Industrial**\n\n` +
            formatMarkdownTable(headers, rows)

        const ok = await copyToClipboard(text)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2500)
        }
    }

    // SVG Plot Setup
    const svgWidth = 650
    const svgHeight = 230
    const padX = 45
    const padY = 25
    const graphW = svgWidth - padX * 2
    const graphH = svgHeight - padY * 2

    const allValues = [
        ...actuals,
        ...results.series.map((p) => p.forecast).filter((f): f is number => typeof f === "number"),
        results.nextForecast
    ]
    const minVal = Math.floor(Math.min(...allValues) * 0.9)
    const maxVal = Math.ceil(Math.max(...allValues) * 1.08)
    const rangeVal = maxVal - minVal || 100

    const totalPeriods = actuals.length + 1
    const getX = (tIndex: number) => padX + (tIndex / (totalPeriods - 1)) * graphW
    const getY = (val: number) => padY + graphH - ((val - minVal) / rangeVal) * graphH

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                            <TrendingUp className="w-5 h-5" />
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Workbench de Pronósticos de Demanda & Series de Tiempo
                        </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Métodos cuantitativos de Suavizamiento Exponencial Simple, Holt (Tendencia) y Promedios Móviles con diagnóstico MAD/MAPE.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Exportar CSV
                    </button>
                    <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "¡Copiado!" : "Copiar Resumen"}
                    </button>
                </div>
            </div>

            {/* Error Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Pronóstico Próximo ($t+1$)</span>
                    <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {results.nextForecast}
                    </div>
                    <span className="text-[10px] text-slate-500">unidades proyectadas</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Error MAD</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        {results.metrics.mad}
                    </div>
                    <span className="text-[10px] text-slate-500">Desviación Media Absoluta</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Error MAPE</span>
                    <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {results.metrics.mape}%
                    </div>
                    <span className="text-[10px] text-slate-500">Porcentaje de desvío</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Error RMSE</span>
                    <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        {results.metrics.rmse}
                    </div>
                    <span className="text-[10px] text-slate-500">Raíz de error cuadrático</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Tracking Signal</span>
                    <div className={`text-xl font-black mt-0.5 ${Math.abs(results.metrics.trackingSignal) <= 4 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {results.metrics.trackingSignal}
                    </div>
                    <span className="text-[10px] text-slate-500">Control [−4, +4]</span>
                </div>
            </div>

            {/* Layout: Controls + Graphic */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Method Configuration */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                            <Sliders className="w-4 h-4 text-indigo-600" />
                            Configuración del Modelo
                        </div>

                        {/* Presets */}
                        <div>
                            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                Escenario de Demanda:
                            </label>
                            <div className="flex flex-col gap-1.5">
                                {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((key) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => handlePresetChange(key)}
                                        className={`px-3 py-2 rounded-lg text-left text-xs font-semibold border transition-all ${selectedPreset === key
                                            ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-200"
                                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                                            }`}
                                    >
                                        {PRESETS[key].name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Method Selector */}
                        <div>
                            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">
                                Algoritmo de Pronóstico:
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                                {[
                                    { id: "sma", label: "Móvil (SMA)" },
                                    { id: "ses", label: "Exponencial (SES)" },
                                    { id: "holt", label: "Holt (Tendencia)" }
                                ].map((m) => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setMethod(m.id as ForecastingMethod)}
                                        className={`py-1.5 text-center font-bold rounded-lg border transition-all ${method === m.id
                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                                            }`}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Param Sliders */}
                        {method === "sma" && (
                            <div>
                                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    <span>Ventana Móvil ($k$):</span>
                                    <span className="font-mono text-indigo-600 font-bold">{windowK} períodos</span>
                                </div>
                                <input
                                    type="range"
                                    min="2"
                                    max="6"
                                    value={windowK}
                                    onChange={(e) => setWindowK(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                                />
                            </div>
                        )}

                        {method !== "sma" && (
                            <div>
                                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    <span>Parámetro de Nivel ($\alpha$):</span>
                                    <span className="font-mono text-indigo-600 font-bold">{alpha}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="0.95"
                                    step="0.05"
                                    value={alpha}
                                    onChange={(e) => setAlpha(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                                />
                            </div>
                        )}

                        {method === "holt" && (
                            <div>
                                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                    <span>Parámetro de Tendencia ($\beta$):</span>
                                    <span className="font-mono text-indigo-600 font-bold">{beta}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.05"
                                    max="0.95"
                                    step="0.05"
                                    value={beta}
                                    onChange={(e) => setBeta(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                                />
                            </div>
                        )}
                    </div>

                    {/* Formula reference */}
                    <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-indigo-600" />
                            Ecuaciones del Pronóstico
                        </div>
                        <div className="space-y-1.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                            <div><MathFormula formula="SES: \quad F_{t+1} = \alpha A_t + (1-\alpha) F_t" /></div>
                            <div><MathFormula formula="Holt: \quad L_t = \alpha A_t + (1-\alpha)(L_{t-1}+T_{t-1})" /></div>
                            <div><MathFormula formula="T_t = \beta(L_t - L_{t-1}) + (1-\beta)T_{t-1}" /></div>
                            <div><MathFormula formula="MAD = \frac{1}{n} \sum |A_t - F_t|" /></div>
                        </div>
                    </div>
                </div>

                {/* SVG Forecasting Line Chart */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-indigo-600" />
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                Trayectoria de la Demanda Real vs Pronóstico Ajustado
                            </h4>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-mono">
                            <span className="flex items-center gap-1 text-slate-900 dark:text-slate-200 font-bold">
                                <span className="w-2.5 h-0.5 bg-slate-900 dark:bg-slate-200 inline-block"></span> Demanda Real ($A_t$)
                            </span>
                            <span className="flex items-center gap-1 text-indigo-600 font-bold">
                                <span className="w-2.5 h-0.5 bg-indigo-500 inline-block"></span> Pronóstico ($F_t$)
                            </span>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto bg-slate-50 dark:bg-slate-950/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                            {/* Horizontal grid lines */}
                            <line x1={padX} y1={padY + graphH} x2={padX + graphW} y2={padY + graphH} stroke="#cbd5e1" strokeWidth="1" />
                            <line x1={padX} y1={padY} x2={padX + graphW} y2={padY} stroke="#cbd5e1" strokeDasharray="3 3" />

                            {/* Real demand line */}
                            <polyline
                                fill="none"
                                stroke="#0f172a"
                                className="dark:stroke-slate-300"
                                strokeWidth="2.2"
                                points={actuals.map((val, idx) => `${getX(idx)},${getY(val)}`).join(" ")}
                            />

                            {/* Real demand circles */}
                            {actuals.map((val, idx) => (
                                <circle
                                    key={idx}
                                    cx={getX(idx)}
                                    cy={getY(val)}
                                    r="3.5"
                                    fill="#0f172a"
                                    className="dark:fill-slate-300"
                                />
                            ))}

                            {/* Forecast line */}
                            <polyline
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="2"
                                strokeDasharray="4 2"
                                points={results.series
                                    .filter((p) => typeof p.forecast === "number")
                                    .map((p) => `${getX(p.period - 1)},${getY(p.forecast!)}`)
                                    .join(" ")}
                            />

                            {/* Forecast circles */}
                            {results.series
                                .filter((p) => typeof p.forecast === "number")
                                .map((p, idx) => (
                                    <circle
                                        key={idx}
                                        cx={getX(p.period - 1)}
                                        cy={getY(p.forecast!)}
                                        r="3.5"
                                        fill="#6366f1"
                                    />
                                ))}

                            {/* Projected Next Period Dot */}
                            <line
                                x1={getX(actuals.length - 1)}
                                y1={getY(results.series[actuals.length - 1]?.forecast ?? actuals[actuals.length - 1])}
                                x2={getX(actuals.length)}
                                y2={getY(results.nextForecast)}
                                stroke="#6366f1"
                                strokeWidth="1.5"
                                strokeDasharray="2 2"
                            />
                            <circle
                                cx={getX(actuals.length)}
                                cy={getY(results.nextForecast)}
                                r="5.5"
                                fill="#4f46e5"
                                stroke="#ffffff"
                                strokeWidth="2"
                            />
                            <text
                                x={getX(actuals.length)}
                                y={getY(results.nextForecast) - 9}
                                textAnchor="middle"
                                fontSize="9"
                                fontFamily="monospace"
                                fill="#4f46e5"
                                fontWeight="bold"
                            >
                                F(t+1): {results.nextForecast}
                            </text>

                            {/* Period Labels */}
                            {actuals.map((_, idx) => (
                                <text
                                    key={idx}
                                    x={getX(idx)}
                                    y={padY + graphH + 15}
                                    textAnchor="middle"
                                    fontSize="9"
                                    fill="#94a3b8"
                                >
                                    t{idx + 1}
                                </text>
                            ))}
                            <text
                                x={getX(actuals.length)}
                                y={padY + graphH + 15}
                                textAnchor="middle"
                                fontSize="9"
                                fill="#4f46e5"
                                fontWeight="bold"
                            >
                                t{actuals.length + 1}
                            </text>
                        </svg>
                    </div>

                    {/* Table of Periods */}
                    <div className="overflow-x-auto max-h-[140px] overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                        <table className="w-full text-left font-mono">
                            <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 text-[10px] text-slate-500 uppercase">
                                <tr>
                                    <th className="p-2">Período</th>
                                    <th className="p-2 text-right">Real ($A_t$)</th>
                                    <th className="p-2 text-right">Pronóstico ($F_t$)</th>
                                    <th className="p-2 text-right">Error ($e_t$)</th>
                                    <th className="p-2 text-right">% Error</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {results.series.map((p, idx) => (
                                    <tr key={idx}>
                                        <td className="p-2 font-bold">t{p.period}</td>
                                        <td className="p-2 text-right font-bold text-slate-900 dark:text-white">{p.actual}</td>
                                        <td className="p-2 text-right text-indigo-600 dark:text-indigo-400 font-bold">{p.forecast ?? "-"}</td>
                                        <td className="p-2 text-right text-slate-600 dark:text-slate-400">{p.error ?? "-"}</td>
                                        <td className="p-2 text-right text-slate-600 dark:text-slate-400">{p.pctError ? `${p.pctError}%` : "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
