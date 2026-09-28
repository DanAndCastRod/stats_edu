"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import {
    Play,
    RotateCcw,
    Copy,
    Check,
    Terminal,
    Sparkles,
    AlertCircle,
    Download,
    CheckCircle2,
    Clock,
    Cpu
} from "lucide-react"
import { usePyodideSafe } from "@/components/providers/PyodideProvider"
import { copyToClipboard } from "@/lib/export-utils"

export interface PyodideRunnerProps {
    initialCode?: string
    children?: string | React.ReactNode
    title?: string
    description?: string
    autoRun?: boolean
    height?: number | string
    className?: string
}

const DEFAULT_PYTHON_CODE = `# Cómputo Científico con NumPy y SciPy (StatsEdu UTP)
import numpy as np
from scipy import stats
from scipy.optimize import linprog

# 1. Simulación de datos normales
np.random.seed(42)
mu_teorica = 70.0
sigma_teorica = 10.0
muestra = np.random.normal(loc=mu_teorica, scale=sigma_teorica, size=100)

media_muestral = np.mean(muestra)
desv_muestral = np.std(muestra, ddof=1)

print("=== 1. ANALISIS ESTADISTICO DESCRIPTIVO ===")
print(f"Muestra (n=100): Media = {media_muestral:.2f}, Desv = {desv_muestral:.2f}")

# 2. Inferencia con SciPy
ic = stats.t.interval(0.95, df=len(muestra)-1, loc=media_muestral, scale=stats.sem(muestra))
print(f"IC 95% para mu: [{ic[0]:.2f}, {ic[1]:.2f}]")

# 3. Resolucion Simplex con SciPy
# Maximizar Z = 3*x1 + 5*x2 (Minimizar -3*x1 - 5*x2)
c = [-3, -5]
A = [[1, 0], [0, 2], [3, 2]]
b = [4, 12, 18]
res = linprog(c, A_ub=A, b_ub=b, method='highs')

print("\\n=== 2. OPTIMIZACION LINEAL (SOLVER HIGHS/SIMPLEX) ===")
print(f"Estado: {res.message}")
print(f"Solucion optima: x1 = {res.x[0]:.2f}, x2 = {res.x[1]:.2f}")
print(f"Valor optimo Z* = {-res.fun:.2f}")
`

export function PyodideRunner({
    initialCode,
    children,
    title = "Ejecutor de Código Python Científico (NumPy & SciPy)",
    description = "Modifica y ejecuta scripts directamente en tu navegador mediante WebAssembly sin instalar software adicional.",
    autoRun = false,
    height = 240,
    className = ""
}: PyodideRunnerProps) {
    // Determine the raw code from props or children
    const baseCode = (typeof children === "string" && children.trim() ? children : initialCode) || DEFAULT_PYTHON_CODE
    const [code, setCode] = useState<string>(baseCode)
    const [output, setOutput] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [executionTimeMs, setExecutionTimeMs] = useState<number | null>(null)
    const [copied, setCopied] = useState<boolean>(false)
    const [workerStatus, setWorkerStatus] = useState<string>("Listo")

    // Context from PyodideProvider (if available in parent tree)
    const pyodideContext = usePyodideSafe()

    // Fallback standalone worker for isolated environments
    const standaloneWorkerRef = useRef<Worker | null>(null)
    const fallbackCallbacksRef = useRef<Map<number, any>>(new Map())

    // Initialize standalone worker only if not wrapped in PyodideProvider
    useEffect(() => {
        if (!pyodideContext && typeof window !== "undefined") {
            try {
                const worker = new Worker("/pyodide.worker.js?v=2")
                standaloneWorkerRef.current = worker

                worker.onmessage = (event) => {
                    const msg = event.data
                    if ("id" in msg && msg.id) {
                        const callbacks = fallbackCallbacksRef.current.get(msg.id)
                        if (callbacks) {
                            if (msg.type === "stdout") callbacks.onStdout(msg.content)
                            if (msg.type === "error") callbacks.onError(msg.error)
                            if (msg.type === "result") {
                                callbacks.onResult(msg.results)
                                fallbackCallbacksRef.current.delete(msg.id)
                            }
                        }
                    } else if (msg.type === "status") {
                        setWorkerStatus(msg.text || msg.content || "Inicializando...")
                    }
                }
            } catch (err) {
                console.warn("[PyodideRunner] No fue posible inicializar worker local:", err)
            }

            return () => {
                standaloneWorkerRef.current?.terminate()
            }
        }
    }, [pyodideContext])

    // Code execution handler
    const handleRunCode = useCallback(() => {
        setIsRunning(true)
        setOutput([])
        setWorkerStatus("Ejecutando en WebAssembly...")
        const startTime = performance.now()

        const callbacks = {
            onStdout: (text: string) => {
                setOutput((prev) => [...prev, text])
            },
            onError: (err: string) => {
                setOutput((prev) => [...prev, `❌ Error de Ejecución: ${err}`])
                setIsRunning(false)
                setWorkerStatus("Error")
                setExecutionTimeMs(Math.round(performance.now() - startTime))
            },
            onResult: (res: any) => {
                if (res !== undefined && res !== null && res !== "") {
                    setOutput((prev) => {
                        // Avoid duplicate if output is already in stdout
                        const last = prev[prev.length - 1]
                        const strRes = String(res)
                        if (last !== strRes) return [...prev, strRes]
                        return prev
                    })
                }
                setIsRunning(false)
                setWorkerStatus("Completado")
                setExecutionTimeMs(Math.round(performance.now() - startTime))
            }
        }

        // Use context worker if available
        if (pyodideContext?.runCode) {
            pyodideContext.runCode(code, callbacks)
            return
        }

        // Otherwise use standalone fallback worker
        if (standaloneWorkerRef.current) {
            const id = Date.now() + Math.random()
            fallbackCallbacksRef.current.set(id, callbacks)
            standaloneWorkerRef.current.postMessage({ id, python: code })
            return
        }

        // If neither worker is available
        setOutput(["⚠️ Entorno WebAssembly no disponible en este dispositivo."])
        setIsRunning(false)
    }, [code, pyodideContext])

    // Auto-run if requested
    useEffect(() => {
        if (autoRun && code) {
            const t = setTimeout(() => {
                handleRunCode()
            }, 500)
            return () => clearTimeout(t)
        }
    }, [autoRun, handleRunCode, code])

    // Reset code
    const handleResetCode = () => {
        setCode(baseCode)
        setOutput([])
        setExecutionTimeMs(null)
    }

    // Copy code
    const handleCopyCode = async () => {
        const ok = await copyToClipboard(code)
        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    // Clear output
    const handleClearOutput = () => {
        setOutput([])
        setExecutionTimeMs(null)
    }

    // Keydown listener for Ctrl+Enter / Cmd+Enter inside textarea
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault()
            if (!isRunning) handleRunCode()
            return
        }

        // Support Tab key indentation (4 spaces)
        if (e.key === "Tab") {
            e.preventDefault()
            const textarea = e.currentTarget
            const start = textarea.selectionStart
            const end = textarea.selectionEnd
            const value = textarea.value
            const nextValue = value.substring(0, start) + "    " + value.substring(end)
            setCode(nextValue)
            // Restore cursor position
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 4
            }, 0)
        }
    }

    // Compute line numbers
    const lineCount = Math.max(1, code.split("\n").length)
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1)

    return (
        <div
            className={`my-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden text-slate-900 dark:text-slate-100 ${className}`}
        >
            {/* Header / Title Bar */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                            <Cpu className="h-3 w-3" />
                            Pyodide WebAssembly
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">Python 3.11 • NumPy & SciPy</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                    <button
                        onClick={handleCopyCode}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
                        title="Copiar código al portapapeles"
                    >
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copiado" : "Copiar"}
                    </button>

                    <button
                        onClick={handleResetCode}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
                        title="Restablecer al código original del ejercicio"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Restablecer
                    </button>

                    <button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white flex items-center gap-2 shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Ejecutar script en WebAssembly (Ctrl+Enter)"
                    >
                        {isRunning ? (
                            <>
                                <span className="animate-spin text-sm">⏳</span> Ejecutando...
                            </>
                        ) : (
                            <>
                                <Play className="h-3.5 w-3.5 fill-current" /> ▶ Ejecutar Código
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Editor Body */}
            <div className="relative flex border-b border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs">
                {/* Line Numbers Column */}
                <div
                    aria-hidden="true"
                    className="select-none py-3 pl-3 pr-2 text-right text-slate-600 bg-slate-950/80 border-r border-slate-800/80 font-mono text-xs leading-5"
                >
                    {lineNumbers.map((num) => (
                        <div key={num} className="h-5">
                            {num}
                        </div>
                    ))}
                </div>

                {/* Editable Textarea */}
                <div className="flex-1 relative">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                        autoCapitalize="off"
                        autoComplete="off"
                        rows={Math.max(8, lineCount)}
                        style={{ minHeight: typeof height === "number" ? `${height}px` : height }}
                        className="w-full bg-transparent text-slate-200 p-3 leading-5 outline-none resize-y font-mono text-xs selection:bg-emerald-900 selection:text-white"
                        placeholder="# Escribe o edita tu código Python aquí..."
                    />
                </div>
            </div>

            {/* Editor Footer Help / Shortcut */}
            <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-950 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-emerald-600" />
                    Atajo: Presiona <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Ctrl + Enter</kbd> para ejecutar
                </span>
                <span className="font-mono text-[10px]">
                    {isRunning ? "Calculando en Wasm..." : `Estado: ${workerStatus}`}
                </span>
            </div>

            {/* Console Output Area */}
            <div className="bg-slate-900 dark:bg-black text-slate-100 flex flex-col">
                {/* Terminal Toolbar */}
                <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                            Terminal de Salida (stdout)
                        </span>
                        {executionTimeMs !== null && (
                            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                                <Clock className="h-2.5 w-2.5" /> {executionTimeMs} ms
                            </span>
                        )}
                    </div>

                    {output.length > 0 && (
                        <button
                            onClick={handleClearOutput}
                            className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            Limpiar Consola
                        </button>
                    )}
                </div>

                {/* Output Log or Empty State */}
                <div className="p-4 font-mono text-xs overflow-y-auto max-h-80 leading-relaxed space-y-1">
                    {output.length === 0 && !isRunning && (
                        <div className="py-4 text-center text-slate-500 italic">
                            Haz clic en &quot;▶ Ejecutar Código&quot; (o presiona Ctrl+Enter) para ejecutar este script directamente en tu navegador vía WebAssembly.
                        </div>
                    )}

                    {isRunning && output.length === 0 && (
                        <div className="flex items-center gap-2 text-emerald-400 py-2">
                            <span className="animate-pulse">●</span> Ejecutando algoritmo en WebAssembly...
                        </div>
                    )}

                    {output.map((line, idx) => {
                        // Plot images generated by Matplotlib
                        if (line.startsWith("__IMAGE_DATA__:")) {
                            const base64 = line.split("__IMAGE_DATA__:")[1]
                            return (
                                <div key={idx} className="my-3 p-3 bg-white rounded-xl border border-slate-700 w-fit shadow-md">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`data:image/png;base64,${base64}`}
                                        alt="Gráfico generado por Python"
                                        className="max-w-full h-auto rounded"
                                    />
                                    <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-sans">
                                        <span>Gráfico Matplotlib renderizado en Wasm</span>
                                        <a
                                            href={`data:image/png;base64,${base64}`}
                                            download="grafico_statsedu.png"
                                            className="text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                                        >
                                            <Download className="h-3 w-3" /> Descargar PNG
                                        </a>
                                    </div>
                                </div>
                            )
                        }

                        // Error formatting
                        if (line.includes("Error:") || line.includes("Traceback") || line.startsWith("❌")) {
                            return (
                                <div key={idx} className="text-rose-400 whitespace-pre-wrap break-all py-0.5">
                                    {line}
                                </div>
                            )
                        }

                        // Standard output
                        return (
                            <div key={idx} className="text-slate-300 whitespace-pre-wrap break-all">
                                {line}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PyodideRunner
