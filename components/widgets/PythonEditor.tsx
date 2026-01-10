"use client"

import React, { useState, useCallback } from "react"
import Editor, { type OnMount } from "@monaco-editor/react"
import { Play, RotateCcw, Terminal } from "lucide-react"
import { usePyodide } from "@/components/providers/PyodideProvider"

const MIN_HEIGHT = 120
const LINE_HEIGHT = 20
const PADDING = 32

export function PythonEditor({ initialCode = "" }: { initialCode?: string }) {
    const [code, setCode] = useState(initialCode)
    const [output, setOutput] = useState<string[]>([])
    const [isRunning, setIsRunning] = useState(false)
    const [editorHeight, setEditorHeight] = useState(MIN_HEIGHT)
    const { isReady, runCode: runGlobalCode } = usePyodide()

    const execute = useCallback(() => {
        setIsRunning(true)
        setOutput([])

        runGlobalCode(code, {
            onStdout: (text) => setOutput(prev => [...prev, text]),
            onError: (err) => {
                setOutput(prev => [...prev, `❌ Error: ${err}`])
                setIsRunning(false)
            },
            onResult: (res) => {
                if (res !== undefined && res !== null) {
                    setOutput(prev => [...prev, String(res)])
                }
                setIsRunning(false)
            }
        })
    }, [code, runGlobalCode])

    const resetOutput = () => {
        setOutput([])
    }

    const handleEditorMount: OnMount = (editor, monaco) => {
        // Ctrl+Enter to execute
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            if (!isRunning && isReady) execute()
        })

        // Update height when content changes
        const updateHeight = () => {
            const lineCount = editor.getModel()?.getLineCount() || 1
            const newHeight = Math.max(MIN_HEIGHT, lineCount * LINE_HEIGHT + PADDING)
            setEditorHeight(newHeight)
        }

        editor.onDidChangeModelContent(updateHeight)
        updateHeight()
    }

    const handleEditorChange = (value: string | undefined) => {
        setCode(value || "")
    }

    return (
        <div className="my-6 rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden text-slate-900">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    <span className="ml-2 text-xs font-mono text-slate-500">Python 3.11</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={resetOutput}
                        className="p-1 hover:bg-slate-100 rounded-md transition-colors"
                        title="Limpiar consola"
                    >
                        <RotateCcw className="h-4 w-4 text-slate-500" />
                    </button>
                    <button
                        onClick={execute}
                        disabled={isRunning || !isReady}
                        className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isRunning ? 'Ejecutando...' : (
                            <>
                                <Play className="h-3 w-3 fill-current" /> Ejecutar
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Editor Area & Output */}
            <div className="flex flex-col divide-y divide-slate-200">
                {/* Monaco Editor */}
                <div style={{ height: editorHeight }}>
                    <Editor
                        height="100%"
                        defaultLanguage="python"
                        value={code}
                        onChange={handleEditorChange}
                        onMount={handleEditorMount}
                        theme="vs"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: "on",
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabCompletion: "on",
                            quickSuggestions: true,
                            suggestOnTriggerCharacters: true,
                            wordBasedSuggestions: "currentDocument",
                            padding: { top: 16, bottom: 16 },
                            scrollbar: { vertical: "hidden", horizontal: "auto" },
                            folding: false,
                            lineDecorationsWidth: 0,
                            lineNumbersMinChars: 3,
                            renderLineHighlight: "line",
                        }}
                        loading={
                            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                                Cargando editor...
                            </div>
                        }
                    />
                </div>

                {/* Output Console */}
                <div className="flex flex-col bg-slate-50/50 w-full">
                    {output.length > 0 && (
                        <div className="flex items-center px-4 py-2 border-b border-slate-200 bg-slate-50">
                            <Terminal className="h-3 w-3 mr-2 text-slate-500" />
                            <span className="text-xs uppercase tracking-wider text-slate-500">Resultado</span>
                        </div>
                    )}
                    <div className={`p-4 font-mono text-sm overflow-y-auto max-h-[500px] w-full ${output.length === 0 ? 'hidden' : 'block'}`}>
                        {output.map((line, i) => {
                            if (line.startsWith("__IMAGE_DATA__:")) {
                                const base64 = line.split("__IMAGE_DATA__:")[1]
                                return (
                                    <div key={i} className="my-2 p-2 bg-white border border-slate-200 rounded-lg w-fit shadow-sm">
                                        <img
                                            src={`data:image/png;base64,${base64}`}
                                            alt="Graph Output"
                                            className="max-w-full h-auto rounded"
                                        />
                                    </div>
                                )
                            }
                            return (
                                <div key={i} className="mb-1 text-slate-700 break-all whitespace-pre-wrap">
                                    {line}
                                </div>
                            )
                        })}
                        {isRunning && (
                            <div className="text-slate-500 mt-2 flex items-center gap-2">
                                <span className="animate-pulse">●</span> Ejecutando...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
