import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import * as glob from 'glob' // Note: You might need to install glob or just use fs.readdirSync recursively if simpler
// Using fs recursion to avoid extra deps if possible, or just assume consistent structure

const prisma = new PrismaClient()
const CONTENT_DIR = path.join(process.cwd(), 'content', 'courses')

// Types based on our file structure (not just DB types)
interface CourseMeta {
    title: string;
    description: string;
    code: string;
    isMock: boolean;
}

interface ModuleMeta {
    title: string;
    order: number;
}

async function main() {
    console.log('🔄 Starting Content Sync (File System -> Database)...')

    if (!fs.existsSync(CONTENT_DIR)) {
        console.warn('⚠️ No content directory found at:', CONTENT_DIR)
        return
    }

    const courseDirs = fs.readdirSync(CONTENT_DIR).filter(f => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory())

    for (const courseSlug of courseDirs) {
        const coursePath = path.join(CONTENT_DIR, courseSlug)
        const metaPath = path.join(coursePath, 'metadata.json')

        if (!fs.existsSync(metaPath)) {
            console.warn(`⚠️ Skipping ${courseSlug}: No metadata.json found`)
            continue
        }

        const meta: CourseMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))

        console.log(`📘 Syncing Course: ${meta.title} (${courseSlug})`)

        // 1. Upsert Course
        const course = await prisma.course.upsert({
            where: { slug: courseSlug },
            update: {
                title: meta.title,
                code: meta.code,
                description: meta.description,
                isMock: meta.isMock
            },
            create: {
                slug: courseSlug,
                title: meta.title,
                code: meta.code,
                description: meta.description,
                isMock: meta.isMock
            }
        })

        // 2. Scan Modules
        const moduleDirs = fs.readdirSync(coursePath).filter(f => fs.statSync(path.join(coursePath, f)).isDirectory())

        for (const moduleDirName of moduleDirs) {
            // Expecting "01-module-slug"
            const modulePath = path.join(coursePath, moduleDirName)
            const moduleMetaPath = path.join(modulePath, 'metadata.json')

            if (!fs.existsSync(moduleMetaPath)) continue

            const modMeta: ModuleMeta = JSON.parse(fs.readFileSync(moduleMetaPath, 'utf-8'))

            // Extract pure slug if needed, or use dir name as slug. 
            // In generate script we used: "01-eda" -> slug "eda"? No, simpler to use full dirname as slug or parse it.
            // Let's use the dir name as the slug for uniqueness within course.
            const moduleSlug = moduleDirName

            const moduleDB = await prisma.module.upsert({
                where: {
                    courseId_slug: {
                        courseId: course.id,
                        slug: moduleSlug
                    }
                },
                update: {
                    title: modMeta.title,
                    order: modMeta.order
                },
                create: {
                    courseId: course.id,
                    slug: moduleSlug,
                    title: modMeta.title,
                    order: modMeta.order
                }
            })

            console.log(`  📂 Module: ${modMeta.title}`)

            // 3. Scan Topics (MDX files)
            // Just flat scanning for now, assuming weeks are virtual or mapped via order.
            // In our current schema week is a parent. 
            // WAIT: Our Schema.prisma has Weeks? 
            // Let's check the Schema.prisma in a second tool call or assume based on previous seed.
            // Previous seed had: Module -> Weeks -> Topics.
            // But our Scaffolder generated content assumes Topics directly in Module folders?
            // "01-eda/01-tipos.mdx"
            // The Scaffolder flattened weeks: "Loop Weeks -> Topics". 
            // So physically we have topics inside modules. 
            // We need to either:
            // A) Create a "Virtual Week" (Week 1, Week 2...) based on some metadata?
            // B) Or simplify the DB Schema to remove Weeks if they are just logical grouping?
            // Let's check Schema.prisma. If Weeks exist, we need to create them.

            // APPROACH: Check if we have Week metadata in MDX? 
            // Scaffolder didn't put "week" in frontmatter. It put "order".
            // Let's assume for now 1 "Default Week" per module, OR group by every 2-3 topics?
            // BETTER: Create a "General Week" for the module to hold the topics for now until we refine folder structure to support weeks.
            // Ideally: content/course/module/week/topic.mdx. 
            // But we have: content/course/module/topic.mdx.

            // Let's just create ONE big "Exhaustive Week" for the module, or map logical weeks.
            // Let's create a Week 1 for the module and dump everything there for this iteration.

            const week = await prisma.week.upsert({
                where: {
                    moduleId_number: {
                        moduleId: moduleDB.id,
                        number: 1
                    }
                },
                update: { title: "Contenido del Módulo" },
                create: {
                    moduleId: moduleDB.id,
                    number: 1,
                    title: "Contenido del Módulo"
                }
            })

            const topicFiles = fs.readdirSync(modulePath).filter(f => f.endsWith('.mdx'))

            for (const topicFile of topicFiles) {
                const topicContent = fs.readFileSync(path.join(modulePath, topicFile), 'utf-8')

                // Parse simple frontmatter manually to avoid dependencies or use gray-matter
                const frontmatterRegex = /---\n([\s\S]*?)\n---/
                const match = frontmatterRegex.exec(topicContent)

                let title = topicFile.replace('.mdx', '')
                let order = 0
                let bloomLevel = "REMEMBER"

                if (match) {
                    const fm = match[1]
                    const titleMatch = fm.match(/title:\s*"(.*)"/)
                    const orderMatch = fm.match(/order:\s*(\d+)/)
                    const bloomMatch = fm.match(/bloomLevel:\s*"(.*)"/)

                    if (titleMatch) title = titleMatch[1]
                    if (orderMatch) order = parseInt(orderMatch[1])
                    if (bloomMatch) bloomLevel = bloomMatch[1]
                }

                const topicSlug = topicFile.replace('.mdx', '')

                await prisma.topic.upsert({
                    where: {
                        weekId_slug: {
                            weekId: week.id,
                            slug: topicSlug
                        }
                    },
                    update: {
                        title: title,
                        order: order,
                        type: 'THEORY', // Default
                        contentMdx: topicContent // Saving full content to DB for search/fallback? Or just path?
                        // Our previous seed put contentMdx in DB.
                        // Ideally we read from file at runtime (MDX Remote), but DB can store it too.
                        // Let's store it for simplicity in current architecture.
                    },
                    create: {
                        weekId: week.id,
                        slug: topicSlug,
                        title: title,
                        order: order,
                        type: 'THEORY',
                        contentMdx: topicContent
                    }
                })
                console.log(`    📄 Topic: ${title}`)
            }
        }
    }

    // 4. Auto-enroll ALL users in ALL courses (Dev Mode Convenience)
    console.log('👥 enrolling users in new courses...')
    const allUsers = await prisma.user.findMany()
    const allCourses = await prisma.course.findMany()

    for (const user of allUsers) {
        for (const course of allCourses) {
            await prisma.enrollment.upsert({
                where: {
                    userId_courseId: {
                        userId: user.id,
                        courseId: course.id
                    }
                },
                update: {}, // No change if exists
                create: {
                    userId: user.id,
                    courseId: course.id,
                    progress: 0
                }
            })
        }
        console.log(`  👤 Enrolled user ${user.email || user.name} in ${allCourses.length} courses`)
    }

    console.log('✅ Content Sync & Enrollment Complete.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
