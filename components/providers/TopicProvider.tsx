"use client"

import React, { createContext, useContext } from "react"

interface TopicContextType {
    topicId: string
}

const TopicContext = createContext<TopicContextType | undefined>(undefined)

export function TopicProvider({
    topicId,
    children
}: {
    topicId: string
    children: React.ReactNode
}) {
    return (
        <TopicContext.Provider value={{ topicId }}>
            {children}
        </TopicContext.Provider>
    )
}

export function useTopicContext() {
    const context = useContext(TopicContext)
    if (context === undefined) {
        throw new Error("useTopicContext must be used within a TopicProvider")
    }
    return context
}
