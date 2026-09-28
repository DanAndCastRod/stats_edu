import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { db } from "@/lib/db"

export interface TopicInfo {
    id: string
    title: string
    slug: string
    order: number
    contentMdx?: string
}

export interface WeekInfo {
    id: string
    title: string
    number: number
    topics: TopicInfo[]
}

export interface ModuleInfo {
    id: string
    title: string
    order: number
    weeks: WeekInfo[]
}

export interface CourseWithNavigation {
    id: string
    title: string
    code: string
    slug: string
    description: string
    modules: ModuleInfo[]
}

const CONTENT_DIR = path.join(process.cwd(), "content", "courses")

export async function getCourseData(slug: string): Promise<CourseWithNavigation | null> {
    // 1. Try DB first
    try {
        const dbCourse = await db.course.findUnique({
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

        if (dbCourse) {
            return dbCourse as unknown as CourseWithNavigation
        }
    } catch {
        // Fallback to filesystem
    }

    // 2. Filesystem Fallback
    const courseDir = path.join(CONTENT_DIR, slug)
    const metaPath = path.join(courseDir, "metadata.json")

    if (!fs.existsSync(metaPath)) return null

    try {
        const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"))

        const moduleDirs = fs.readdirSync(courseDir).filter(f => {
            const p = path.join(courseDir, f)
            return fs.statSync(p).isDirectory()
        })

        const rawModules: {
            modDir: string
            modTitle: string
            modOrder: number
            topics: TopicInfo[]
        }[] = []

        for (const modDir of moduleDirs) {
            const modPath = path.join(courseDir, modDir)
            const modMetaPath = path.join(modPath, "metadata.json")

            let modTitle = modDir
            let modOrder = 0

            if (fs.existsSync(modMetaPath)) {
                try {
                    const modMeta = JSON.parse(fs.readFileSync(modMetaPath, "utf-8"))
                    modTitle = modMeta.title || modDir
                    modOrder = modMeta.order || 0
                } catch {
                    // ignore
                }
            }

            const mdxFiles = fs.readdirSync(modPath).filter(f => f.endsWith(".mdx"))
            const topics: TopicInfo[] = []

            for (const file of mdxFiles) {
                const filePath = path.join(modPath, file)
                const fileContent = fs.readFileSync(filePath, "utf-8")
                const { data } = matter(fileContent)
                const topicSlug = file.replace(".mdx", "")

                topics.push({
                    id: `${slug}-${modDir}-${topicSlug}`,
                    title: data.title || topicSlug,
                    slug: topicSlug,
                    order: typeof data.order === "number" ? data.order : 0
                })
            }

            topics.sort((a, b) => a.order - b.order)

            rawModules.push({
                modDir,
                modTitle,
                modOrder,
                topics
            })
        }

        // Sort modules by order before computing chronological weeks
        rawModules.sort((a, b) => a.modOrder - b.modOrder)

        const modules: ModuleInfo[] = []
        let currentWeekNumber = 1

        for (const rawMod of rawModules) {
            const weeks: WeekInfo[] = []

            if (rawMod.topics.length === 0) {
                weeks.push({
                    id: `${slug}-${rawMod.modDir}-w${currentWeekNumber}`,
                    title: `Semana ${currentWeekNumber}`,
                    number: currentWeekNumber++,
                    topics: []
                })
            } else if (rawMod.topics.length <= 2) {
                // Modules with 1 or 2 topics allocate 1 week per topic
                for (const topic of rawMod.topics) {
                    weeks.push({
                        id: `${slug}-${rawMod.modDir}-w${currentWeekNumber}`,
                        title: `Semana ${currentWeekNumber}`,
                        number: currentWeekNumber++,
                        topics: [topic]
                    })
                }
            } else {
                // Modules with >2 topics group topics into weeks (2 topics per week)
                const chunkSize = 2
                for (let i = 0; i < rawMod.topics.length; i += chunkSize) {
                    const chunk = rawMod.topics.slice(i, i + chunkSize)
                    weeks.push({
                        id: `${slug}-${rawMod.modDir}-w${currentWeekNumber}`,
                        title: `Semana ${currentWeekNumber}`,
                        number: currentWeekNumber++,
                        topics: chunk
                    })
                }
            }

            modules.push({
                id: `${slug}-${rawMod.modDir}`,
                title: rawMod.modTitle,
                order: rawMod.modOrder,
                weeks
            })
        }

        return {
            id: slug,
            title: meta.title || slug,
            code: meta.code || "UTP",
            slug,
            description: meta.description || "",
            modules
        }
    } catch {
        return null
    }
}

export async function getAllCourseSlugs(): Promise<string[]> {
    try {
        if (fs.existsSync(CONTENT_DIR)) {
            const dirs = fs.readdirSync(CONTENT_DIR).filter(f => {
                const p = path.join(CONTENT_DIR, f)
                const metaFile = path.join(p, "metadata.json")
                if (!fs.statSync(p).isDirectory() || !fs.existsSync(metaFile)) return false
                try {
                    const meta = JSON.parse(fs.readFileSync(metaFile, "utf-8"))
                    return !meta.isMock
                } catch {
                    return true
                }
            })
            if (dirs.length > 0) return dirs
        }
    } catch {
        // ignore
    }
    return [
        "estadistica-i",
        "estadistica-ii",
        "investigacion-operaciones-i",
        "investigacion-operaciones-ii"
    ]
}


export async function getAllCourses(): Promise<CourseWithNavigation[]> {
    const slugs = await getAllCourseSlugs()
    const courses: CourseWithNavigation[] = []
    for (const slug of slugs) {
        const course = await getCourseData(slug)
        if (course) courses.push(course)
    }
    return courses
}

export async function getAllCourseTopicParams(): Promise<{ slug: string; topicSlug: string }[]> {
    const courses = await getAllCourses()
    const params: { slug: string; topicSlug: string }[] = []
    for (const course of courses) {
        for (const mod of course.modules) {
            for (const week of mod.weeks) {
                for (const topic of week.topics) {
                    params.push({ slug: course.slug, topicSlug: topic.slug })
                }
            }
        }
    }
    return params
}

