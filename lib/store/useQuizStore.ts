"use client"

import { create } from "zustand"

interface Answer {
    questionId: string
    optionId: string
}

interface QuizState {
    // Navigation
    currentStep: number

    // Answers
    answers: Record<string, string> // questionId -> optionId

    // Stats
    isSubmitted: boolean
    score: number
    startTime: number | null

    // Actions
    setAnswer: (questionId: string, optionId: string) => void
    nextStep: () => void
    backStep: () => void
    submitQuiz: (correctAnswers: Record<string, string>) => void
    reset: () => void
    startQuiz: () => void
}

export const useQuizStore = create<QuizState>((set, get) => ({
    currentStep: 0,
    answers: {},
    isSubmitted: false,
    score: 0,
    startTime: null,

    setAnswer: (questionId, optionId) =>
        set((state) => ({
            answers: { ...state.answers, [questionId]: optionId }
        })),

    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),

    backStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

    submitQuiz: (correctAnswers) => {
        const { answers } = get()
        let correctCount = 0
        let totalQuestions = Object.keys(correctAnswers).length

        Object.entries(correctAnswers).forEach(([qId, correctOptId]) => {
            if (answers[qId] === correctOptId) {
                correctCount++
            }
        })

        const finalScore = (correctCount / totalQuestions) * 100
        set({ isSubmitted: true, score: finalScore })
    },

    startQuiz: () => set({ startTime: Date.now(), isSubmitted: false, score: 0, answers: {}, currentStep: 0 }),

    reset: () => set({ currentStep: 0, answers: {}, isSubmitted: false, score: 0, startTime: null })
}))
