"use client"

import React, { useState } from "react"
import { useQuizStore } from "@/lib/store/useQuizStore"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, RefreshCcw, HelpCircle, Trophy } from "lucide-react"

interface Option {
    id: string
    text: string
    isCorrect: boolean
    explanation?: string
}

interface Question {
    id: string
    text: string
    options: Option[]
}

interface QuizProps {
    title: string
    questions: Question[]
}

export function Quiz({ title, questions }: QuizProps) {
    const {
        currentStep,
        answers,
        isSubmitted,
        score,
        setAnswer,
        nextStep,
        backStep,
        submitQuiz,
        reset,
        startQuiz
    } = useQuizStore()

    const currentQuestion = questions[currentStep]
    const isFirst = currentStep === 0
    const isLast = currentStep === questions.length - 1
    // Fix: Ensure progress is calculated safely
    const progress = questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0

    // Effect: Reset quiz when questions change (new unit)
    // We use title as a key dependency to know it's a different quiz
    React.useEffect(() => {
        reset()
    }, [title, questions.length, reset]) // Dependency on title ensures reset on unit change

    const handleAnswerSelect = (optionId: string) => {
        if (isSubmitted) return
        setAnswer(currentQuestion.id, optionId)
    }

    const handleSubmit = () => {
        const correctAnswers: Record<string, string> = {}
        questions.forEach(q => {
            const correctOpt = q.options.find(o => o.isCorrect)
            if (correctOpt) correctAnswers[q.id] = correctOpt.id
        })
        submitQuiz(correctAnswers)
    }

    if (isSubmitted) {
        return (
            <div className="my-10 p-8 rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl animate-in zoom-in-95 duration-500">
                <div className="flex flex-col items-center text-center">
                    <div className={cn(
                        "h-20 w-20 rounded-full flex items-center justify-center mb-6 shadow-lg",
                        score >= 60 ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                        <Trophy className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-2">¡Desafío Completado!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
                        Has terminado {title}. Aquí tienes tus resultados detallados.
                    </p>

                    <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Puntaje</span>
                            <span className={cn("text-2xl font-black", score >= 60 ? "text-emerald-500" : "text-amber-500")}>
                                {score.toFixed(0)}%
                            </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Estado</span>
                            <span className={cn("text-2xl font-black", score >= 60 ? "text-emerald-500" : "text-amber-500")}>
                                {score >= 60 ? "Aprobado" : "Repasar"}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-xl"
                    >
                        <RefreshCcw className="h-4 w-4" /> Reintentar Quiz
                    </button>
                </div>

                <div className="mt-12 space-y-6 pt-12 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Revisión de respuestas</h3>
                    {questions.map((q, idx) => {
                        const userAnswerId = answers[q.id]
                        const correctOption = q.options.find(o => o.isCorrect)
                        const isUserCorrect = userAnswerId === correctOption?.id

                        return (
                            <div key={q.id} className={cn(
                                "p-6 rounded-2xl border transition-all",
                                isUserCorrect ? "border-emerald-100 bg-emerald-50/30 dark:border-emerald-900/30 dark:bg-emerald-900/10" : "border-rose-100 bg-rose-50/30 dark:border-rose-900/30 dark:bg-rose-900/10"
                            )}>
                                <div className="flex gap-4">
                                    <div className="mt-1">
                                        {isUserCorrect ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-rose-500" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800 dark:text-slate-200 mb-3">{idx + 1}. {q.text}</p>
                                        <div className="text-sm space-y-2">
                                            <p className="flex items-center gap-2">
                                                <span className="text-slate-400">Tu respuesta:</span>
                                                <span className={cn("font-medium", isUserCorrect ? "text-emerald-600" : "text-rose-600")}>
                                                    {q.options.find(o => o.id === userAnswerId)?.text || "No respondida"}
                                                </span>
                                            </p>
                                            {!isUserCorrect && (
                                                <p className="flex items-center gap-2">
                                                    <span className="text-slate-400">Correcta:</span>
                                                    <span className="text-emerald-600 font-medium">{correctOption?.text}</span>
                                                </p>
                                            )}
                                            {correctOption?.explanation && (
                                                <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-500 italic">
                                                    {correctOption.explanation}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="my-10 p-1 rounded-3xl bg-gradient-to-br from-brand-blue/20 via-brand-blue/5 to-brand-orange/10 shadow-xl overflow-hidden animate-in fade-in duration-700">
            <div className="bg-white dark:bg-slate-950 rounded-[22px] p-6 sm:p-10 border border-white/50 dark:border-slate-800/50">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-brand-blue mb-1 block">Quick Quiz</span>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{title}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-1">
                            {questions.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "h-1.5 w-6 rounded-full transition-all duration-300",
                                        idx < currentStep ? "bg-brand-blue" : idx === currentStep ? "bg-brand-blue w-10" : "bg-slate-100 dark:bg-slate-800"
                                    )}
                                />
                            ))}
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{currentStep + 1} / {questions.length}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-50 dark:bg-slate-900 rounded-full mb-10 overflow-hidden">
                    <div
                        className="h-full bg-brand-blue transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Question */}
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                    <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/20">
                            <HelpCircle className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug pt-1">
                            {currentQuestion.text}
                        </h3>
                    </div>

                    <div className="grid gap-3">
                        {currentQuestion.options.map((option) => {
                            const isSelected = answers[currentQuestion.id] === option.id
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswerSelect(option.id)}
                                    className={cn(
                                        "group relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4",
                                        isSelected
                                            ? "border-brand-blue bg-brand-blue/5 text-slate-900 dark:text-slate-50 shadow-md translate-x-1"
                                            : "border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900 p-5"
                                    )}
                                >
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        isSelected ? "border-brand-blue bg-brand-blue scale-110" : "border-slate-200 dark:border-slate-700 group-hover:border-brand-blue/50"
                                    )}>
                                        {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                                    </div>
                                    <span className="font-semibold text-[0.95em]">{option.text}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-900">
                    <button
                        onClick={backStep}
                        disabled={isFirst}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-0 transition-all uppercase tracking-widest"
                    >
                        <ChevronLeft className="h-4 w-4" /> Anterior
                    </button>

                    {!isLast ? (
                        <button
                            onClick={nextStep}
                            disabled={!answers[currentQuestion.id]}
                            className="flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-brand-blue/20 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                        >
                            Siguiente <ChevronRight className="h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={!answers[currentQuestion.id]}
                            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-3 rounded-xl font-black shadow-lg shadow-brand-orange/20 transition-all active:scale-95 disabled:opacity-50 tracking-wide uppercase text-sm"
                        >
                            Finalizar y Calificar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
