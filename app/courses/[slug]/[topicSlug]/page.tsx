import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { getTopicContent, mdxOptions } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { components } from "@/components/mdx/MDXComponents"
import { TopicNavigator } from "../components/TopicNavigator"
// Provider for shared Python execution context across the lesson
import { PyodideProvider } from "@/components/providers/PyodideProvider"
import { TopicProvider } from "@/components/providers/TopicProvider"

export default async function LessonPage({
    params
}: {
    params: Promise<{ slug: string; topicSlug: string }>
}) {
    const { slug, topicSlug } = await params

    // 1. Get Course and all Topics for Navigation
    const course = await db.course.findUnique({
        where: { slug },
        include: {
            modules: {
                orderBy: { order: 'asc' },
                include: {
                    weeks: {
                        orderBy: { number: 'asc' },
                        include: {
                            topics: {
                                orderBy: { order: 'asc' }
                            }
                        }
                    }
                }
            }
        }
    })

    if (!course) notFound()

    // Flatten all topics to find current, prev, and next
    const allTopics = course.modules.flatMap(m =>
        m.weeks.flatMap(w => w.topics)
    )
    const currentIndex = allTopics.findIndex(t => t.slug === topicSlug)
    if (currentIndex === -1) notFound()

    const currentTopic = allTopics[currentIndex]
    const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : undefined
    const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : undefined

    // 2. Get MDX Content from File System
    const content = await getTopicContent(slug, topicSlug)

    return (
        <PyodideProvider>
            <TopicProvider topicId={currentTopic.id}>
                <article className="pb-20">
                    {/* Header section with breadcrumbs-like info */}
                <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Semana {course.modules.find(m => m.weeks.some(w => w.topics.some(t => t.id === currentTopic.id)))?.weeks.find(w => w.topics.some(t => t.id === currentTopic.id))?.number}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">
                            {course.modules.find(m => m.weeks.some(w => w.topics.some(t => t.id === currentTopic.id)))?.title}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
                        {currentTopic.title}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Aprende los fundamentos y aplicaciones prácticas de este tema en el contexto de {course.title}.
                    </p>
                </div>

                {/* Content Rendering */}
                <div className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
                    {content ? (
                        <MDXRemote
                            source={content.source}
                            components={components}
                            options={mdxOptions as any}
                        />
                    ) : (
                        <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-center">
                            <h3 className="text-xl font-bold text-slate-400 mb-2">Contenido no disponible</h3>
                            <p className="text-slate-500 mb-6">Estamos trabajando para habilitar esta lección pronto.</p>
                            {currentTopic.contentMdx && (
                                <div className="text-left bg-white dark:bg-slate-950 p-6 rounded-xl shadow-inner border">
                                    <p className="font-mono text-sm leading-relaxed">{currentTopic.contentMdx}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                    {/* Navigation Buttons */}
                    <TopicNavigator
                        courseSlug={slug}
                        currentTopicId={currentTopic.id}
                        prevTopic={prevTopic ? { title: prevTopic.title, slug: prevTopic.slug } : undefined}
                        nextTopic={nextTopic ? { title: nextTopic.title, slug: nextTopic.slug } : undefined}
                    />
                </article>
            </TopicProvider>
        </PyodideProvider>
    )
}
