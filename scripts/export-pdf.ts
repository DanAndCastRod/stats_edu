
import path from 'path';
import fs from 'fs';

async function exportPdf() {
    console.log("📄 PDF Export Tool for Stats.edu");

    let puppeteer;
    try {
        // dynamic require to avoid build errors if not installed
        puppeteer = require('puppeteer');
    } catch (e) {
        console.error("❌ Puppeteer dependency missing.");
        console.error("To enable PDF export, run:");
        console.error("npm install -D puppeteer");
        process.exit(1);
    }

    const args = process.argv.slice(2);
    const targetUrl = args[0] || 'http://localhost:3000/courses/estadistica-i/01-eda/01-intro-estadistica';
    const outputName = args[1] || 'lesson.pdf';

    console.log(`🌐 Launching browser to print: ${targetUrl}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({ width: 1200, height: 1024 });

    try {
        await page.goto(targetUrl, { waitUntil: 'networkidle0' });

        // Add PDF specific CSS overrides if needed
        await page.addStyleTag({
            content: `
                nav, aside, footer, header { display: none !important; }
                main { margin: 0 !important; width: 100% !important; max-width: none !important; }
                .prose { max-width: 100% !important; }
            `
        });

        const outputPath = path.join(process.cwd(), outputName);
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
        });

        console.log(`✅ PDF Saved to: ${outputPath}`);
    } catch (error) {
        console.error("❌ Error generating PDF:", error);
    } finally {
        await browser.close();
    }
}

exportPdf();
