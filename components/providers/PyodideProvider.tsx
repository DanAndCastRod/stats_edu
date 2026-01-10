"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from "react"

type WorkerMessage =
    | { id: number, type: 'stdout', content: string }
    | { id: number, type: 'result', results: any }
    | { id: number, type: 'error', error: string }
    | { type: 'status', content?: string, text?: string }

interface PyodideContextType {
    isReady: boolean
    runCode: (code: string, callbacks: {
        onStdout: (text: string) => void
        onResult: (result: any) => void
        onError: (error: string) => void
    }) => void
    terminate: () => void
}

const PyodideContext = createContext<PyodideContextType | null>(null)

export function PyodideProvider({ children }: { children: React.ReactNode }) {
    const [isReady, setIsReady] = useState(false)
    const workerRef = useRef<Worker | null>(null)
    const callbacksRef = useRef<Map<number, any>>(new Map())

    useEffect(() => {
        // Initialize the single shared worker (cache-busting with version)
        workerRef.current = new Worker("/pyodide.worker.js?v=2")

        workerRef.current.onmessage = (event) => {
            const msg = event.data as WorkerMessage

            // If the message has an ID, it's a response to a specific execution
            if ('id' in msg && msg.id) {
                const callbacks = callbacksRef.current.get(msg.id)
                if (callbacks) {
                    if (msg.type === 'stdout') callbacks.onStdout(msg.content)
                    if (msg.type === 'error') callbacks.onError(msg.error)
                    if (msg.type === 'result') {
                        callbacks.onResult(msg.results)
                        callbacksRef.current.delete(msg.id)
                    }
                }
            } else if (msg.type === 'status') {
                console.log("[Pyodide Status]", msg.content || msg.text)
            }
        }

        // We assume ready after init (or could handle explicit ready message)
        setIsReady(true)

        return () => {
            workerRef.current?.terminate()
        }
    }, [])

    const runCode = (code: string, callbacks: {
        onStdout: (text: string) => void
        onResult: (result: any) => void
        onError: (error: string) => void
    }) => {
        if (!workerRef.current) return

        const id = Date.now() + Math.random() // Unique ID
        callbacksRef.current.set(id, callbacks)

        workerRef.current.postMessage({
            id,
            python: code
        })
    }

    const terminate = () => {
        workerRef.current?.terminate()
        setIsReady(false)
    }

    return (
        <PyodideContext.Provider value={{ isReady, runCode, terminate }}>
            {children}
        </PyodideContext.Provider>
    )
}

export function usePyodide() {
    const context = useContext(PyodideContext)
    if (!context) {
        throw new Error("usePyodide must be used within a PyodideProvider")
    }
    return context
}
