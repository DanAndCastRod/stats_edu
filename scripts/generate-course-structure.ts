import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import slugify from 'slugify';
import { CurriculumMapSchema } from '../lib/curriculum/schema';

// Configuration
const CURRICULUM_DIR = path.join(process.cwd(), '..', 'curriculum');
const CONTENT_DIR = path.join(process.cwd(), 'content', 'courses');

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.error("❌ Error: Please provide the JSON filename (e.g., estadistica_1.json)");
        process.exit(1);
    }

    const inputPath = path.join(CURRICULUM_DIR, filename);
    console.log(`📖 Reading blueprint from: ${inputPath}`);

    try {
        if (!fs.existsSync(inputPath)) {
            throw new Error(`File not found: ${inputPath}`);
        }

        const rawData = fs.readFileSync(inputPath, 'utf-8');
        const json = JSON.parse(rawData);

        // 1. Validate against Schema (Rigor check)
        console.log("🔍 Validating strict schema...");
        const curriculum = CurriculumMapSchema.parse(json);
        console.log("✅ Schema validated successfully.");

        // 2. Prepare Target Directory
        const courseSlug = slugify(curriculum.title, { lower: true });
        const coursePath = path.join(CONTENT_DIR, courseSlug);

        console.log(`🔨 Scaffolding course at: ${coursePath}`);
        if (fs.existsSync(coursePath)) {
            console.warn("⚠️  Warning: Target directory exists. Overwriting/Merging...");
        } else {
            fs.mkdirSync(coursePath, { recursive: true });
        }

        // 3. Create Course Metadata
        const courseMeta = {
            title: curriculum.title,
            description: curriculum.description,
            code: curriculum.courseCode,
            isMock: false // Real content
        };
        fs.writeFileSync(path.join(coursePath, 'metadata.json'), JSON.stringify(courseMeta, null, 2));

        // 4. Loop Modules
        for (const module of curriculum.modules) {
            const moduleSlug = `${String(module.order).padStart(2, '0')}-${module.slug}`;
            const modulePath = path.join(coursePath, moduleSlug);

            if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath);

            // Create Module Metadata
            const moduleMeta = {
                title: module.title,
                order: module.order
            };
            fs.writeFileSync(path.join(modulePath, 'metadata.json'), JSON.stringify(moduleMeta, null, 2));
            console.log(`  📂 Created Module: ${moduleSlug}`);

            // 5. Loop Weeks -> Topics
            let topicGlobalIndex = 1;

            // Flatten topics to handle them globally in order within the module if needed, 
            // but usually topics are organized by files inside the module folder.
            // We'll prefix them with order to keep file system sorted.

            for (const week of module.weeks) {
                for (const topic of week.topics) {
                    const topicSlug = topic.slug;
                    // Naming convention: 01-slug.mdx
                    const filename = `${String(topicGlobalIndex).padStart(2, '0')}-${topicSlug}.mdx`;
                    const filePath = path.join(modulePath, filename);

                    // Template Construction
                    const frontmatter = [
                        `---`,
                        `title: "${topic.title}"`,
                        `description: "${week.description}"`, // Using week description as topic desc fallback or we should use topic specific
                        `bloomLevel: "${topic.bloomLevel}"`,
                        `estimatedMinutes: ${topic.estimatedMinutes}`,
                        `order: ${topicGlobalIndex}`,
                        `---`
                    ].join('\n');

                    const content = [
                        frontmatter,
                        ``,
                        `# Introducción`,
                        `> ${topic.hook}`,
                        ``,
                        `<Callout type="info">`,
                        `**Por qué importa esto:** ${topic.importance}`,
                        `</Callout>`,
                        ``,
                        `## Objetivos de Aprendizaje`,
                        topic.learningObjectives.map(obj => `- ${obj}`).join('\n'),
                        ``,
                        `---`,
                        ``,
                        `# Desarrollo del Tema`,
                        `*Contenido generado automáticamente desde el Syllabus. Pendiente de redacción.*`,
                        ``,
                        topic.relevantPythonFunctions ? [
                            `## Herramientas Python`,
                            `Funciones clave para este tema:`,
                            topic.relevantPythonFunctions.map(fn => `- \`${fn}\``).join('\n')
                        ].join('\n') : '',
                    ].join('\n');

                    fs.writeFileSync(filePath, content);
                    console.log(`    📄 Generated Topic: ${filename}`);
                    topicGlobalIndex++;
                }
            }
        }

        console.log("\n✨ Course Scaffolding Complete! 🚀");

    } catch (error) {
        console.error("\n❌ FATAL ERROR:");
        if (error instanceof z.ZodError) {
            console.error("Schema Validation Failed:");
            console.error(JSON.stringify((error as any).errors, null, 2));
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}

main();
