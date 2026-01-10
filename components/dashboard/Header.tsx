"use client"

import { useSession } from "next-auth/react"

export function DashboardHeader() {
    const { data: session } = useSession()
    const user = session?.user

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Buenos días"
        if (hour < 18) return "Buenas tardes"
        return "Buenas noches"
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
                {getGreeting()}, <span className="font-semibold text-slate-700 dark:text-slate-200">{user?.name || "Estudiante"}</span>.
                Aquí tienes tu resumen académico de hoy.
            </p>
        </div>
    )
}
