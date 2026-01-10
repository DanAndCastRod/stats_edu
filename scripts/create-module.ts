import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

if (args.length < 3) {
    console.error('Usage: npx tsx scripts/create-module.ts <course-slug> <module-folder> <topic-filename>');
    console.error('Example: npx tsx scripts/create-module.ts estadistica-i 07-anova 01-intro-anova');
    process.exit(1);
}

const [courseSlug, moduleName, topicName] = args;

// Adjust baseDir considering we run from 'app' (project root)
// 'content' is a sibling of 'scripts' in the project structure 'app/content'
const contentDir = path.join(process.cwd(), 'content', 'courses', courseSlug);
const moduleDir = path.join(contentDir, moduleName);

// Ensure topic ends with .mdx
const fileName = topicName.endsWith('.mdx') ? topicName : `${topicName}.mdx`;
const topicPath = path.join(moduleDir, fileName);

if (!fs.existsSync(contentDir)) {
    console.error(`Course directory not found: ${contentDir}`);
    console.log('Available courses:', fs.readdirSync(path.join(process.cwd(), 'content', 'courses')));
    process.exit(1);
}

if (!fs.existsSync(moduleDir)) {
    console.log(`Creating module directory: ${moduleDir}`);
    fs.mkdirSync(moduleDir, { recursive: true });

    // Create metadata.json for module
    const metadataPath = path.join(moduleDir, 'metadata.json');
    const cleanTitle = moduleName.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const order = parseInt(moduleName.split('-')[0]) || 99;

    const metadata = {
        title: cleanTitle,
        order: order
    };
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`✅ Created module metadata: ${metadataPath}`);
}

if (fs.existsSync(topicPath)) {
    console.error(`Topic file already exists: ${topicPath}`);
    process.exit(1);
}

const cleanTopicTitle = fileName.replace('.mdx', '').replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const order = parseInt(fileName.split('-')[0]) || 1;

const template = `---
title: "${cleanTopicTitle}"
description: "Descripción breve del tema."
bloomLevel: "UNDERSTAND"
estimatedMinutes: 45
order: ${order}
---

# Introducción

Contenido aquí...

<Callout type="info">
**Nota:** Agrega interactividad.
</Callout>

---

# 1. Concepto Principal

...
`;

fs.writeFileSync(topicPath, template);
console.log(`✅ Created topic: ${topicPath}`);
