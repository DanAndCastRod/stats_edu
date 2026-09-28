"use client"

import { useState, useMemo } from "react"
import { type OfficialCourse } from "@/lib/curriculum-catalog"
import { type StudentProfile } from "@/lib/progress"
import {
    Award,
    FileText,
    Printer,
    X,
    CheckCircle2,
    Clock,
    ShieldCheck,
    GraduationCap,
    Download
} from "lucide-react"

export interface CourseProgressRecord {
    course: OfficialCourse
    completedTopics: number
    progress: number
    averageScore: number | null
}

interface AcademicCertificateModalProps {
    isOpen: boolean
    onClose: () => void
    courses: CourseProgressRecord[]
    studentProfile: StudentProfile
}

function generateVerificationHash(studentCode: string, name: string): string {
    const raw = `${studentCode || "UTP"}-${name}-STATSEDU-IOE-2026`
    let hash = 0
    for (let i = 0; i < raw.length; i++) {
        hash = (hash << 5) - hash + raw.charCodeAt(i)
        hash |= 0
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, "0")
    return `UTP-IOE-${hex.slice(0, 4)}-${hex.slice(4, 8)}-2026`
}

export function AcademicCertificateModal({
    isOpen,
    onClose,
    courses,
    studentProfile
}: AcademicCertificateModalProps) {
    const [activeTab, setActiveTab] = useState<"certificate" | "transcript">("transcript")

    const verificationCode = useMemo(() => {
        return generateVerificationHash(studentProfile.studentCode, studentProfile.name)
    }, [studentProfile.studentCode, studentProfile.name])

    const currentDateStr = useMemo(() => {
        return new Date().toLocaleDateString("es-CO", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }, [])

    // Global summary statistics
    const stats = useMemo(() => {
        const startedCourses = courses.filter(c => c.completedTopics > 0)
        const completedCourses = courses.filter(c => c.progress >= 100)
        const totalCompletedLessons = courses.reduce((acc, c) => acc + c.completedTopics, 0)
        const totalLessons = courses.reduce((acc, c) => acc + c.course.totalTopics, 0)

        const coursesWithScore = courses.filter(c => c.averageScore !== null && c.averageScore > 0)
        const avgScore100 =
            coursesWithScore.length > 0
                ? coursesWithScore.reduce((acc, c) => acc + (c.averageScore || 0), 0) / coursesWithScore.length
                : 0
        const avgScore50 = (avgScore100 / 100) * 5.0

        const totalEarnedCredits = completedCourses.reduce((acc, c) => acc + c.course.credits, 0)
        const totalEarnedEcts = completedCourses.reduce((acc, c) => acc + c.course.ects, 0)

        return {
            startedCourses: startedCourses.length,
            completedCourses: completedCourses.length,
            totalCompletedLessons,
            totalLessons,
            avgScore100,
            avgScore50,
            totalEarnedCredits,
            totalEarnedEcts
        }
    }, [courses])

    if (!isOpen) return null

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
            {/* Modal Container */}
            <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
                {/* Modal Controls (Hidden in Print) */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800 print:hidden bg-slate-50/80 dark:bg-slate-850/80 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setActiveTab("transcript")}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    activeTab === "transcript"
                                        ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                            >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Reporte de Calificaciones y Avance</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("certificate")}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    activeTab === "certificate"
                                        ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                            >
                                <Award className="w-3.5 h-3.5" />
                                <span>Certificado Oficial de Culminación</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                        >
                            <Printer className="w-4 h-4" />
                            <span>Imprimir / Guardar en PDF</span>
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
                            title="Cerrar modal"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Printable Content Area */}
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 print:p-0 print:overflow-visible">
                    {/* PRINT CSS STYLES */}
                    <style jsx global>{`
                        @media print {
                            body * {
                                visibility: hidden;
                            }
                            #printable-academic-document,
                            #printable-academic-document * {
                                visibility: visible;
                            }
                            #printable-academic-document {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 100%;
                                margin: 0;
                                padding: 0;
                                background: white !important;
                                color: black !important;
                            }
                            @page {
                                size: portrait;
                                margin: 15mm 15mm 15mm 15mm;
                            }
                        }
                    `}</style>

                    <div id="printable-academic-document" className="space-y-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-2 md:p-4 rounded-xl print:p-0 print:dark:bg-white print:dark:text-black">
                        {/* ========================================================= */}
                        {/* VIEW 1: REPORTE DE CALIFICACIONES (TRANSCRIPT)            */}
                        {/* ========================================================= */}
                        {activeTab === "transcript" && (
                            <div className="space-y-6">
                                {/* Official Header */}
                                <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-left font-serif">
                                            <span className="text-xs uppercase tracking-widest text-slate-600 font-bold block">
                                                República de Colombia
                                            </span>
                                            <span className="text-sm font-bold text-slate-900">
                                                Universidad Tecnológica de Pereira
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-300 bg-slate-50 font-bold text-slate-700">
                                                CÓDIGO SNIES: 1404
                                            </span>
                                        </div>
                                    </div>

                                    <h1 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide text-slate-900">
                                        Facultad de Ingeniería Industrial
                                    </h1>
                                    <h2 className="text-sm md:text-base font-bold text-blue-900 uppercase tracking-wider">
                                        Área de Investigación de Operaciones y Estadística
                                    </h2>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest pt-1">
                                        Reporte y Registro Oficial de Avance Curricular • Plataforma StatsEdu UTP
                                    </p>
                                </div>

                                {/* Student Identification Card */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs">
                                    <div>
                                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Estudiante</span>
                                        <span className="font-bold text-slate-900 text-sm">{studentProfile.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Código UTP</span>
                                        <span className="font-mono font-bold text-slate-900 text-sm">
                                            {studentProfile.studentCode || "No registrado"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Programa Académico</span>
                                        <span className="font-semibold text-slate-800">{studentProfile.career}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Semestre / Fecha</span>
                                        <span className="font-semibold text-slate-800">
                                            Semestre {studentProfile.semester} • {currentDateStr}
                                        </span>
                                    </div>
                                </div>

                                {/* Summary Stats Banner */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                                    <div className="p-3 rounded-lg border border-slate-200 bg-white">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Asignaturas Cursadas</span>
                                        <span className="text-xl font-extrabold text-blue-900">
                                            {stats.startedCourses} / {courses.length}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-lg border border-slate-200 bg-white">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Lecciones Aprobadas</span>
                                        <span className="text-xl font-extrabold text-emerald-700">
                                            {stats.totalCompletedLessons} / {stats.totalLessons}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-lg border border-slate-200 bg-white">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Promedio Escala UTP</span>
                                        <span className="text-xl font-extrabold text-slate-900">
                                            {stats.avgScore50 > 0 ? stats.avgScore50.toFixed(2) : "0.00"} / 5.0
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-lg border border-slate-200 bg-white">
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Promedio Porcentual</span>
                                        <span className="text-xl font-extrabold text-blue-800">
                                            {stats.avgScore100 > 0 ? stats.avgScore100.toFixed(1) : "0.0"}%
                                        </span>
                                    </div>
                                </div>

                                {/* Detailed Academic Table */}
                                <div className="overflow-x-auto rounded-xl border border-slate-200">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                                            <tr>
                                                <th className="py-2.5 px-3">Código</th>
                                                <th className="py-2.5 px-3">Asignatura Oficial</th>
                                                <th className="py-2.5 px-2 text-center">Créditos</th>
                                                <th className="py-2.5 px-2 text-center">Lecciones</th>
                                                <th className="py-2.5 px-2 text-center">Avance</th>
                                                <th className="py-2.5 px-3 text-center">Nota (0 - 5.0)</th>
                                                <th className="py-2.5 px-3 text-center">Nota (0 - 100)</th>
                                                <th className="py-2.5 px-3 text-center">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-medium">
                                            {courses.map(({ course, completedTopics, progress, averageScore }) => {
                                                const score5 = averageScore ? ((averageScore / 100) * 5.0).toFixed(2) : "—"
                                                const score100 = averageScore ? `${Math.round(averageScore)}%` : "—"
                                                const isCompleted = progress >= 100
                                                const isStarted = completedTopics > 0

                                                return (
                                                    <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                                                        <td className="py-2 px-3 font-mono font-bold text-blue-900">
                                                            {course.code}
                                                        </td>
                                                        <td className="py-2 px-3 font-semibold text-slate-900">
                                                            <div>{course.title}</div>
                                                            <div className="text-[10px] text-slate-400 font-normal">
                                                                {course.program === "pregrado" ? "Pregrado" : "Posgrado MIOE"} • {course.cycle || course.area}
                                                            </div>
                                                        </td>
                                                        <td className="py-2 px-2 text-center text-slate-600">
                                                            {course.credits} ({course.ects})
                                                        </td>
                                                        <td className="py-2 px-2 text-center text-slate-700 font-mono">
                                                            {completedTopics} / {course.totalTopics}
                                                        </td>
                                                        <td className="py-2 px-2 text-center font-bold text-slate-800">
                                                            {progress}%
                                                        </td>
                                                        <td className="py-2 px-3 text-center font-bold text-slate-900">
                                                            {score5}
                                                        </td>
                                                        <td className="py-2 px-3 text-center font-semibold text-slate-600 font-mono">
                                                            {score100}
                                                        </td>
                                                        <td className="py-2 px-3 text-center">
                                                            {isCompleted ? (
                                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                                                    Culminada
                                                                </span>
                                                            ) : isStarted ? (
                                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                                                                    <Clock className="w-2.5 h-2.5" />
                                                                    En Curso
                                                                </span>
                                                            ) : (
                                                                <span className="text-[10px] text-slate-400 font-medium">
                                                                    Pendiente
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Security Footer and Verification Sello */}
                                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 font-bold text-slate-700">
                                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                            Certificación y Firma Digital de Autenticidad
                                        </div>
                                        <p className="font-mono text-[10px] text-slate-600">
                                            Hash de Verificación: <strong className="text-slate-900">{verificationCode}</strong>
                                        </p>
                                        <p className="text-[10px] text-slate-400">
                                            Área de Investigación de Operaciones y Estadística • Facultad de Ingeniería Industrial • UTP
                                        </p>
                                    </div>

                                    <div className="text-right text-[10px] text-slate-400">
                                        <p>Expedido el {currentDateStr}</p>
                                        <p className="font-medium">Documento generado electrónicamente sin enmiendas</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ========================================================= */}
                        {/* VIEW 2: CERTIFICADO DE CULMINACIÓN OFICIAL (DIPLOMA)       */}
                        {/* ========================================================= */}
                        {activeTab === "certificate" && (
                            <div className="relative border-4 border-double border-blue-900 p-8 md:p-12 rounded-2xl bg-gradient-to-b from-white via-blue-50/20 to-white text-center space-y-6">
                                {/* Watermark Background Decoration */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                                    <GraduationCap className="w-96 h-96 text-blue-950" />
                                </div>

                                {/* Header Institucional */}
                                <div className="space-y-1 relative z-10">
                                    <p className="text-xs font-serif uppercase tracking-[0.25em] text-slate-600 font-bold">
                                        República de Colombia • Ministerio de Educación Nacional
                                    </p>
                                    <h2 className="text-xl md:text-3xl font-serif font-extrabold uppercase tracking-wider text-slate-900">
                                        Universidad Tecnológica de Pereira
                                    </h2>
                                    <p className="text-xs md:text-sm font-semibold text-blue-950 uppercase tracking-widest">
                                        Facultad de Ingeniería Industrial
                                    </p>
                                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        Área de Investigación de Operaciones y Estadística
                                    </p>
                                </div>

                                <div className="h-0.5 w-32 bg-blue-800 mx-auto my-4" />

                                {/* Certificate Title */}
                                <div className="space-y-2 relative z-10">
                                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-blue-950 tracking-tight">
                                        Certificado de Culminación Académica
                                    </h3>
                                    <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto italic font-serif">
                                        El Área de Investigación de Operaciones y Estadística de la Facultad de Ingeniería Industrial hace constar que:
                                    </p>
                                </div>

                                {/* Student Name */}
                                <div className="py-4 relative z-10">
                                    <h4 className="text-2xl md:text-4xl font-extrabold text-slate-900 border-b-2 border-slate-300 pb-2 inline-block px-8 font-serif">
                                        {studentProfile.name}
                                    </h4>
                                    <p className="text-xs md:text-sm text-slate-600 mt-2 font-medium">
                                        Código Estudiantil UTP:{" "}
                                        <strong className="font-mono text-slate-900">
                                            {studentProfile.studentCode || "No Registrado"}
                                        </strong>{" "}
                                        • Carrera: <strong>{studentProfile.career}</strong>
                                    </p>
                                </div>

                                {/* Declaration Body */}
                                <div className="max-w-3xl mx-auto text-xs md:text-sm text-slate-700 leading-relaxed space-y-3 relative z-10 text-justify sm:text-center">
                                    <p>
                                        Ha cursado y demostrado suficiencia académica, rigor en modelamiento matemático,
                                        análisis probabilístico e implementación computacional de algoritmos en Python
                                        conforme a las directrices de los programas curriculares de la Universidad Tecnológica de Pereira.
                                    </p>
                                    <p className="font-semibold text-blue-950">
                                        Avance Registrado: {stats.totalCompletedLessons} lecciones completadas • Promedio General:{" "}
                                        {stats.avgScore50 > 0 ? stats.avgScore50.toFixed(2) : "0.00"} / 5.0 (
                                        {stats.avgScore100 > 0 ? stats.avgScore100.toFixed(1) : "0.0"}%)
                                    </p>
                                </div>

                                {/* Signatures Section */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 max-w-2xl mx-auto relative z-10">
                                    <div className="border-t border-slate-400 pt-2 text-center">
                                        <p className="font-bold text-xs text-slate-900">Ing. Wilson Arenas Valencia</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                            Director Programa de Pregrado
                                        </p>
                                        <p className="text-[9px] text-slate-400">Facultad de Ingeniería Industrial • UTP</p>
                                    </div>
                                    <div className="border-t border-slate-400 pt-2 text-center">
                                        <p className="font-bold text-xs text-slate-900">Dr. José A. Soto Mejía</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                                            Director Posgrados MIOE / Coordinador Área IO
                                        </p>
                                        <p className="text-[9px] text-slate-400">Laboratorio GEIO • UTP</p>
                                    </div>
                                </div>

                                {/* Certificate Digital Seal */}
                                <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 relative z-10">
                                    <div className="text-left font-mono">
                                        <span>Código Hash: </span>
                                        <strong className="text-slate-900">{verificationCode}</strong>
                                    </div>
                                    <div className="text-right">
                                        <span>Pereira, Risaralda • Expedido el {currentDateStr}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
