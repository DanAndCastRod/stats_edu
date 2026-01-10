"use client"

import React, { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"

export function Mermaid({ chart }: { chart: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    useEffect(() => {
        if (hasMounted && ref.current) {
            try {
                mermaid.initialize({
                    startOnLoad: true,
                    theme: 'neutral',
                    securityLevel: 'loose'
                })
                mermaid.contentLoaded()
            } catch (err) {
                console.error("Mermaid error:", err)
            }
        }
    }, [hasMounted, chart])

    if (!hasMounted) {
        return (
            <div className="mermaid opacity-0" aria-hidden="true">
                {chart}
            </div>
        )
    }

    return (
        <div
            className="mermaid my-8 flex justify-center bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 shadow-inner overflow-x-auto"
            ref={ref}
        >
            {chart}
        </div>
    )
}
