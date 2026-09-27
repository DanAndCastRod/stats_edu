import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { db } from "@/lib/db"

export interface TopicInfo {
    id: string
    title: string
    slug: string
    order: number
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

        const modules: ModuleInfo[] = []

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

            modules.push({
                id: `${slug}-${modDir}`,
                title: modTitle,
                order: modOrder,
                weeks: [
                    {
                        id: `${slug}-${modDir}-w1`,
                        title: "Contenido del Módulo",
                        number: 1,
                        topics
                    }
                ]
            })
        }

        modules.sort((a, b) => a.order - b.order)

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
