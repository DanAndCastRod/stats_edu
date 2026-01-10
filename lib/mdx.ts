import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"

// Plugins
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm" // Installed for Tables support
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"

// Custom Components (to be imported in the page/component that uses this)
// import { components } from "@/components/mdx/MDXComponents"

const CONTENT_DIR = path.join(process.cwd(), "content")

export async function getTopicContent(courseSlug: string, topicSlug: string) {
    const coursePath = path.join(CONTENT_DIR, "courses", courseSlug)

    // Robustness: Handle if course dir doesn't exist
    if (!fs.existsSync(coursePath)) return null

    // Search recursively because new structure is: courses/slug/01-module/01-topic.mdx
    // We only know 'topicSlug' (e.g. '01-tipos-de-variables'), so we need to find it.

    // Helper to find file recursively
    function findFile(dir: string, filename: string): string | null {
        const files = fs.readdirSync(dir)
        for (const file of files) {
            const fullPath = path.join(dir, file)
            const stat = fs.statSync(fullPath)

            if (stat.isDirectory()) {
                const found = findFile(fullPath, filename)
                if (found) return found
            } else if (file === filename) {
                return fullPath
            }
        }
        return null
    }

    // Try finding exact match or starting with topicSlug (if order prefix exists in filename but not in slug)
    // Actually, our slug in DB is '01-tipos-de-variables' which MATCHES the filename '01-tipos-de-variables.mdx'
    // So simple search for specific filename
    const targetFilename = `${topicSlug}.mdx`
    const foundPath = findFile(coursePath, targetFilename)

    if (!foundPath) return null

    const fileContent = fs.readFileSync(foundPath, "utf8")

    // Parse frontmatter
    const { content, data } = matter(fileContent)

    return {
        source: content,
        frontmatter: data
    }
}

export const mdxOptions = {
    mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
            rehypeKatex,
            [rehypeHighlight, { ignoreMissing: true }]
        ],
    },
}
