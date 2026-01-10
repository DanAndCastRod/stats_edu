import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const CONTENT_DIR = path.join(process.cwd(), 'content/courses');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// 1. Define Standard Schema
const FrontmatterSchema = z.object({
    title: z.string().min(5, "Title too short"),
    description: z.string().min(10, "Description too short"),
    bloomLevel: z.enum(['REMEMBER', 'UNDERSTAND', 'APPLY', 'ANALYZE', 'EVALUATE', 'CREATE']),
    estimatedMinutes: z.number().int().positive(),
    order: z.number().int().nonnegative(),
});

type ValidationResult = {
    file: string;
    errors: string[];
};

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.mdx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

function validateFile(filePath: string): ValidationResult {
    const relativePath = path.relative(CONTENT_DIR, filePath);
    const errors: string[] = [];

    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data, content: body } = matter(content);

        // A. Validate Frontmatter
        const result = FrontmatterSchema.safeParse(data);
        if (!result.success) {
            const zodError = (result as any).error;
            if (zodError && zodError.errors) {
                zodError.errors.forEach((err: any) => {
                    errors.push(`[Frontmatter] ${err.path.join('.')}: ${err.message}`);
                });
            } else {
                errors.push(`[Frontmatter] Invalid structure: ${JSON.stringify(result)}`);
            }
        }

        // B. Validate Image Links
        // Regex for Markdown images: ![alt](url)
        const imageRegex = /!\[.*?\]\((.*?)\)/g;
        let match;
        while ((match = imageRegex.exec(body)) !== null) {
            const imgPath = match[1];
            // Only validate local images starting with /
            if (imgPath.startsWith('/')) {
                const fullPath = path.join(PUBLIC_DIR, imgPath);
                if (!fs.existsSync(fullPath)) {
                    errors.push(`[Broken Link] Image not found: ${imgPath}`);
                }
            }
        }

        // C. Basic Content Checks
        if (body.trim().length < 50) {
            errors.push(`[Content] Content seems too short (< 50 chars).`);
        }

    } catch (e: any) {
        errors.push(`[Critical] Failed to parse file: ${e.message}`);
    }

    return { file: relativePath, errors };
}

async function main() {
    console.log("🔍 Starting Content Validation Rigorous Check...\n");

    if (!fs.existsSync(CONTENT_DIR)) {
        console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
        process.exit(1);
    }

    const files = getAllFiles(CONTENT_DIR);
    console.log(`Found ${files.length} MDX files.`);

    let totalErrors = 0;
    let filesWithErrors = 0;

    files.forEach(file => {
        const result = validateFile(file);
        if (result.errors.length > 0) {
            console.log(`\n❌ ${result.file}`);
            result.errors.forEach(err => console.log(`   - ${err}`));
            totalErrors += result.errors.length;
            filesWithErrors++;
        }
    });

    if (totalErrors > 0) {
        console.log(`\n\n💥 Validation FAILED. ${totalErrors} errors in ${filesWithErrors} files.`);
        process.exit(1);
    } else {
        console.log(`\n✅ All ${files.length} files passed rigorous validation.`);
    }
}

main();
