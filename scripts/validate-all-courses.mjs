import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'courses');

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.mdx')) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

const bloomLevels = ['REMEMBER', 'UNDERSTAND', 'APPLY', 'ANALYZE', 'EVALUATE', 'CREATE'];

function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return null;
    const lines = match[1].split('\n');
    const data = {};
    for (const line of lines) {
        const colon = line.indexOf(':');
        if (colon > 0) {
            const key = line.slice(0, colon).trim();
            let val = line.slice(colon + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            } else if (!isNaN(Number(val)) && val !== '') {
                val = Number(val);
            }
            data[key] = val;
        }
    }
    return data;
}

console.log("🔍 Validating all courses and MDX files...\n");

// 1. Check Courses
const courseDirs = fs.readdirSync(CONTENT_DIR).filter(f => fs.statSync(path.join(CONTENT_DIR, f)).isDirectory());
console.log(`Found ${courseDirs.length} courses: ${courseDirs.join(', ')}`);

let totalErrors = 0;

for (const courseSlug of courseDirs) {
    const coursePath = path.join(CONTENT_DIR, courseSlug);
    const metaPath = path.join(coursePath, 'metadata.json');
    if (!fs.existsSync(metaPath)) {
        console.error(`❌ Course ${courseSlug} missing metadata.json`);
        totalErrors++;
    } else {
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        if (!meta.title || !meta.code) {
            console.error(`❌ Course ${courseSlug} metadata missing title or code`);
            totalErrors++;
        }
    }

    const moduleDirs = fs.readdirSync(coursePath).filter(f => fs.statSync(path.join(coursePath, f)).isDirectory());
    for (const mod of moduleDirs) {
        const modMeta = path.join(coursePath, mod, 'metadata.json');
        if (!fs.existsSync(modMeta)) {
            console.error(`❌ Module ${courseSlug}/${mod} missing metadata.json`);
            totalErrors++;
        }
    }
}

// 2. Check MDX Files
const mdxFiles = getAllFiles(CONTENT_DIR);
console.log(`Found ${mdxFiles.length} MDX topic files across all courses.`);

for (const file of mdxFiles) {
    const relative = path.relative(CONTENT_DIR, file);
    const content = fs.readFileSync(file, 'utf8');
    const fm = parseFrontmatter(content);

    if (!fm) {
        console.error(`❌ ${relative}: Missing frontmatter`);
        totalErrors++;
        continue;
    }

    if (!fm.title || typeof fm.title !== 'string' || fm.title.length < 5) {
        console.error(`❌ ${relative}: Invalid or missing title`);
        totalErrors++;
    }
    if (!fm.description || typeof fm.description !== 'string' || fm.description.length < 10) {
        console.error(`❌ ${relative}: Invalid or missing description`);
        totalErrors++;
    }
    if (!fm.bloomLevel || !bloomLevels.includes(fm.bloomLevel)) {
        console.error(`❌ ${relative}: Invalid bloomLevel (${fm.bloomLevel})`);
        totalErrors++;
    }
    if (typeof fm.estimatedMinutes !== 'number' || fm.estimatedMinutes <= 0) {
        console.error(`❌ ${relative}: Invalid estimatedMinutes`);
        totalErrors++;
    }
    if (typeof fm.order !== 'number' || fm.order < 0) {
        console.error(`❌ ${relative}: Invalid order`);
        totalErrors++;
    }
    if (content.length < 100) {
        console.error(`❌ ${relative}: Content too short (< 100 chars)`);
        totalErrors++;
    }
}

if (totalErrors === 0) {
    console.log(`\n✅ ALL ${courseDirs.length} COURSES AND ${mdxFiles.length} LESSONS PASSED 100% VALIDATION!`);
    process.exit(0);
} else {
    console.error(`\n❌ Validation failed with ${totalErrors} errors.`);
    process.exit(1);
}
