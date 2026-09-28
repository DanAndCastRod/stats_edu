"use client"

import { useState, useEffect, useRef } from "react"
import { getStudentProfile, saveStudentProfile, exportProgressBackup, importProgressBackup, type StudentProfile } from "@/lib/progress"
import { User, Download, Upload, Check, Edit2, ShieldCheck, GraduationCap } from "lucide-react"

export function DashboardHeader() {
    const [profile, setProfile] = useState<StudentProfile>({
        name: "Estudiante UTP",
        email: "estudiante@utp.edu.co",
        studentCode: "",
        career: "Ingeniería Industrial",
        semester: "4"
    })
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState("")
    const [editCode, setEditCode] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [statusMsg, setStatusMsg] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const p = getStudentProfile()
        setProfile(p)
        setEditName(p.name)
        setEditCode(p.studentCode)
        setEditEmail(p.email)
    }, [])

    const handleSave = () => {
        const updated = saveStudentProfile({
            name: editName.trim() || "Estudiante UTP",
            studentCode: editCode.trim(),
            email: editEmail.trim() || "estudiante@utp.edu.co"
        })
        setProfile(updated)
        setIsEditing(false)
        setStatusMsg("Perfil actualizado correctamente")
        setTimeout(() => setStatusMsg(null), 3000)
    }

    const handleExport = () => {
        const json = exportProgressBackup()
        const blob = new Blob([json], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `stats_edu_avance_${profile.studentCode || "estudiante"}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setStatusMsg("Archivo de avance descargado")
        setTimeout(() => setStatusMsg(null), 3000)
    }

    const handleImportClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (event) => {
            const content = event.target?.result as string
            const ok = importProgressBackup(content)
            if (ok) {
                const p = getStudentProfile()
                setProfile(p)
                setEditName(p.name)
                setEditCode(p.studentCode)
                setEditEmail(p.email)
                setStatusMsg("Avance importado con éxito. Recargando...")
                setTimeout(() => window.location.reload(), 1200)
            } else {
                setStatusMsg("Error: Archivo de avance no válido")
                setTimeout(() => setStatusMsg(null), 4000)
            }
        }
        reader.readAsText(file)
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Buenos días"
        if (hour < 18) return "Buenas tardes"
        return "Buenas noches"
    }

    return (
        <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            <GraduationCap className="w-3.5 h-3.5" />
                            Facultad de Ingeniería Industrial • UTP
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <ShieldCheck className="w-3 h-3" />
                            Avance Individual Seguro
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {getGreeting()},{" "}
                        <span className="text-blue-700 dark:text-blue-400">
                            {profile.name}
                        </span>
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {profile.studentCode ? `Código: ${profile.studentCode} • ` : ""}
                        {profile.career} • Seguimiento de progreso en tiempo real
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Editar nombre y código estudiantil"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                        {isEditing ? "Cancelar" : "Editar Perfil"}
                    </button>

                    <button
                        onClick={handleExport}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors"
                        title="Descargar copia de seguridad de tu progreso"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Exportar Avance
                    </button>

                    <button
                        onClick={handleImportClick}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors"
                        title="Restaurar progreso desde un archivo JSON"
                    >
                        <Upload className="w-3.5 h-3.5" />
                        Importar
                    </button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".json"
                        className="hidden"
                    />
                </div>
            </div>

            {isEditing && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Ej. Juan Pérez"
                            className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                            Código Estudiantil UTP
                        </label>
                        <input
                            type="text"
                            value={editCode}
                            onChange={(e) => setEditCode(e.target.value)}
                            placeholder="Ej. 1088123456"
                            className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                            Correo Institucional
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                placeholder="estudiante@utp.edu.co"
                                className="w-full text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSave}
                                className="inline-flex items-center gap-1 px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors"
                            >
                                <Check className="w-3.5 h-3.5" />
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {statusMsg && (
                <div className="text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
                    {statusMsg}
                </div>
            )}
        </div>
    )
}
