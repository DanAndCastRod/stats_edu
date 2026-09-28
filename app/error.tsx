"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                Error en el Portal Académico
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mb-6">
                Ha ocurrido un error inesperado al procesar este recurso formativo.
            </p>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors cursor-pointer"
                >
                    Reintentar
                </button>
                <Link
                    href="/"
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    )
}
