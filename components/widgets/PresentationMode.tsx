"use client"

import React, { useState, useEffect } from "react"
import { Minimize2, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

export function PresentationMode() {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (isActive) {
            document.body.classList.add("presentation-mode")
        } else {
            document.body.classList.remove("presentation-mode")
        }
    }, [isActive])

    const toggleMode = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
            setIsActive(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsActive(false)
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsActive(!!document.fullscreenElement)
        }
        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }, [])

    return (
        <button
            onClick={toggleMode}
            className={cn(
                "fixed bottom-4 right-20 z-50 p-3 rounded-full shadow-xl transition-all duration-300",
                // Right-20 to avoid overlap with other potential buttons or chat widgets
                isActive
                    ? "bg-brand-orange text-white hover:bg-brand-orange/90 scale-110"
                    : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            )}
            title={isActive ? "Salir de Modo Presentación" : "Modo Presentación"}
        >
            {isActive ? <Minimize2 className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
        </button>
    )
}
