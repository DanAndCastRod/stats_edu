import { BarChart3, BookOpen, Clock, Trophy } from "lucide-react"

interface StatCardProps {
    title: string
    value: string | number
    description: string
    icon: React.ElementType
    trend?: "up" | "down" | "neutral"
}

function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</h3>
                <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>
        </div>
    )
}

export function StatsCards({
    totalCourses = 0,
    averageScore = 0,
    completedModules = 0
}: {
    totalCourses: number
    averageScore: number
    completedModules: number
}) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Cursos Activos"
                value={totalCourses}
                description="Asignaturas inscritas actualmente"
                icon={BookOpen}
            />
            <StatCard
                title="Promedio General"
                value={averageScore.toFixed(1)}
                description="Basado en tus últimos quises"
                icon={BarChart3}
            />
            <StatCard
                title="Módulos Completados"
                value={completedModules}
                description="Avance total de contenido"
                icon={Trophy}
            />
            <StatCard
                title="Tiempo de Estudio"
                value="12.5h"
                description="Esta semana (Simulado)"
                icon={Clock}
            />
        </div>
    )
}
