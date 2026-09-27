import { getCourseData } from "@/lib/courses"
import { notFound, redirect } from "next/navigation"

export default async function CourseRootPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const course = await getCourseData(slug)

    if (!course) notFound()

    const firstModule = course.modules[0]
    const firstWeek = firstModule?.weeks[0]
    const firstTopic = firstWeek?.topics[0]

    if (firstTopic) {
        redirect(`/courses/${slug}/${firstTopic.slug}`)
    }

    // fallback if course has no content yet
    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground mt-4">Este curso aún no tiene contenido publicado.</p>
        </div>
    )
}
