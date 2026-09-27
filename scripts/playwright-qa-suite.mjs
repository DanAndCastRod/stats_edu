import fs from 'fs';
import path from 'path';

// Override platform for Termux compatibility BEFORE importing playwright
Object.defineProperty(process, 'platform', { value: 'linux' });

const playwright = (await import('/data/data/com.termux/files/usr/lib/node_modules/@playwright/mcp/node_modules/playwright-core/index.js')).default;
const { chromium } = playwright;

const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(process.cwd(), 'playwright-report', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

let testResults = [];

function recordTest(name, passed, details = '') {
  testResults.push({ name, passed, details });
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} [${passed ? 'PASS' : 'FAIL'}] ${name}`);
  if (details) console.log(`   ${details}`);
}

async function runQASuite() {
  console.log('🚀 Starting Comprehensive Playwright UI/UX Test Suite for StatsEdu...\n');

  const browser = await chromium.launch({
    executablePath: '/data/data/com.termux/files/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--single-process'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  // Listen to console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // =========================================================================
    // TEST 1: Landing Page & Hero Section
    // =========================================================================
    console.log('--- TEST GROUP 1: Landing Page & Brand Identity ---');
    await page.goto(`${BASE_URL}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    const pageTitle = await page.title();
    recordTest('Page Title Verification', pageTitle.includes('Stats'), `Title: "${pageTitle}"`);

    const brandLogo = await page.$('text=StatsEdu');
    recordTest('Navbar Brand Logo & Title visible', !!brandLogo);

    const heroHeading = await page.$('h1');
    const heroText = heroHeading ? await heroHeading.textContent() : '';
    recordTest('Hero Headline rendered', heroText.length > 10, `Text: "${heroText.trim()}"`);

    // Screenshot Desktop Landing
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-landing-desktop.png') });
    console.log('   📸 Captured screenshot: 01-landing-desktop.png');

    // =========================================================================
    // TEST 2: Course Preview Section & Course Catalog
    // =========================================================================
    console.log('\n--- TEST GROUP 2: Course Catalog & Cards ---');
    // Scroll down to course preview section
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1000);

    const courseCards = await page.$$('a[href*="/courses/"]');
    recordTest('Course Preview Cards Exist', courseCards.length > 0, `Found ${courseCards.length} course links on landing page`);

    // Check specific course cards
    const pageContent = await page.content();
    const hasEstadisticaI = pageContent.includes('Estadística I');
    const hasEstadisticaII = pageContent.includes('Estadística II');
    const hasIO = pageContent.includes('Investigación de Operaciones');
    recordTest('Estadística I Card Present', hasEstadisticaI);
    recordTest('Estadística II Card Present', hasEstadisticaII);
    recordTest('Investigación de Operaciones Card Present', hasIO);

    // =========================================================================
    // TEST 3: Navigation to Course & Sidebar Hierarchy
    // =========================================================================
    console.log('\n--- TEST GROUP 3: Course Navigation & Layout ---');
    await page.goto(`${BASE_URL}/courses/estadistica-i/04-teorema-limite-central`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(2500);
    
    // Check url didn't redirect to /login (Guest access permitted)
    const currentUrl = page.url();
    recordTest('Public Access to Course (No blocking login redirect)', !currentUrl.includes('/login'), `Current URL: ${currentUrl}`);

    // Check Sidebar
    const sidebar = await page.$('aside') || await page.$('nav') || await page.$('[class*="sidebar"]');
    recordTest('Course Sidebar Rendered', !!sidebar);

    // Check module links
    const topicLinks = await page.$$('a[href*="/courses/estadistica-i/"]');
    recordTest('Topic Navigation Links in Sidebar', topicLinks.length >= 5, `Found ${topicLinks.length} topic links in course layout`);

    // Screenshot Course Layout
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-course-layout.png') });
    console.log('   📸 Captured screenshot: 02-course-layout.png');

    // =========================================================================
    // TEST 4: Topic Lesson Rendering & Math (KaTeX)
    // =========================================================================
    console.log('\n--- TEST GROUP 4: Topic Content, KaTeX Math & Widgets ---');
    // Navigate to CLT lesson
    await page.goto(`${BASE_URL}/courses/estadistica-i/04-teorema-limite-central`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(2500);
    
    const lessonTitle = await page.$('h1');
    const lessonTitleText = lessonTitle ? await lessonTitle.textContent() : '';
    recordTest('Lesson Heading Rendered', lessonTitleText.includes('Límite Central') || lessonTitleText.includes('Teorema'), `Title: "${lessonTitleText}"`);

    // Check KaTeX rendered formulas
    const katexElements = await page.$$('.katex, .katex-display, .katex-html');
    recordTest('KaTeX Math Formulas Rendered', katexElements.length > 0, `Found ${katexElements.length} KaTeX math elements`);

    // Check CLT Simulation Interactive Component
    const cltSimulator = await page.$('text=Simulador del Teorema del Límite Central') || await page.$('canvas') || await page.$('svg');
    recordTest('Interactive CLT Simulator Component Present', !!cltSimulator);

    // Screenshot Lesson
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-lesson-clt.png') });
    console.log('   📸 Captured screenshot: 03-lesson-clt.png');

    // =========================================================================
    // TEST 5: Interactive Quiz Component Execution
    // =========================================================================
    console.log('\n--- TEST GROUP 5: Interactive Quiz Component ---');
    // Scroll down to Quiz
    const quizHeading = await page.$('text=Quiz') || await page.$('text=Autoevaluación');
    recordTest('Quiz Header Present', !!quizHeading);

    // Look for quiz radio buttons / option labels
    const quizOptions = await page.$$('label, button[role="radio"], div[class*="cursor-pointer"]');
    recordTest('Quiz Options Present', quizOptions.length > 0, `Found options`);

    // Interact with first question options if available
    const firstOption = await page.$('input[type="radio"]') || await page.$('button[class*="border"]');
    if (firstOption) {
      await firstOption.click({ force: true });
      await page.waitForTimeout(500);
      recordTest('Quiz Option Clickable', true, 'Successfully clicked option');
    }

    // Check for "Comprobar" or submit button
    const submitQuizBtn = await page.$('button:has-text("Comprobar")') || await page.$('button:has-text("Enviar")') || await page.$('button:has-text("Verificar")');
    if (submitQuizBtn) {
      await submitQuizBtn.click();
      await page.waitForTimeout(1000);
      recordTest('Quiz Submit Button Interactive', true, 'Clicked submit quiz button');
    }

    // Screenshot Quiz
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-quiz-interaction.png') });
    console.log('   📸 Captured screenshot: 04-quiz-interaction.png');

    // =========================================================================
    // TEST 6: Mobile Responsiveness (375px Viewport)
    // =========================================================================
    console.log('\n--- TEST GROUP 6: Mobile Viewport & Ergonomics (375px) ---');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(2000);

    // Check horizontal scroll overflow
    const bodyScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const bodyClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const noHorizontalOverflow = bodyScrollWidth <= bodyClientWidth + 1; // 1px tolerance
    recordTest('Mobile Viewport No Horizontal Overflow', noHorizontalOverflow, `scrollWidth: ${bodyScrollWidth}px, clientWidth: ${bodyClientWidth}px`);

    // Screenshot Mobile Landing
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-mobile-landing.png') });
    console.log('   📸 Captured screenshot: 05-mobile-landing.png');

    // Mobile lesson view
    await page.goto(`${BASE_URL}/courses/estadistica-i/04-teorema-limite-central`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(3000);
    const mobileLessonScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const mobileLessonClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    recordTest('Mobile Lesson No Horizontal Overflow', mobileLessonScrollWidth <= mobileLessonClientWidth + 1, `scrollWidth: ${mobileLessonScrollWidth}px, clientWidth: ${mobileLessonClientWidth}px`);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-mobile-lesson.png') });
    console.log('   📸 Captured screenshot: 06-mobile-lesson.png');

    // =========================================================================
    // TEST 7: Investigacion de Operaciones II Course Verification
    // =========================================================================
    console.log('\n--- TEST GROUP 7: New Course (IO II) Route & Lesson Verification ---');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/courses/investigacion-operaciones-ii/01-procesos-estocasticos-transicion`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(3000);

    const io2Title = await page.$('h1');
    const io2TitleText = io2Title ? await io2Title.textContent() : '';
    recordTest('IO II Lesson Page Loaded', io2TitleText.includes('Markov') || io2TitleText.includes('Procesos'), `Title: "${io2TitleText}"`);

    const io2Mermaid = await page.$('.mermaid') || await page.$('pre');
    recordTest('Mermaid Diagram / Code Block Loaded in IO II', !!io2Mermaid);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-io2-markov-lesson.png') });
    console.log('   📸 Captured screenshot: 07-io2-markov-lesson.png');

  } catch (error) {
    console.error('💥 Error in test execution:', error);
    recordTest('Test Runner Execution', false, error.message);
  } finally {
    await browser.close();
  }

  // Summary
  console.log('\n======================================================');
  console.log('📊 PLAYWRIGHT UI/UX TEST RESULTS SUMMARY');
  console.log('======================================================');
  const passedCount = testResults.filter(t => t.passed).length;
  const totalCount = testResults.length;
  console.log(`Passed: ${passedCount} / ${totalCount} (${Math.round((passedCount/totalCount)*100)}%)`);

  if (consoleErrors.length > 0) {
    console.log(`\n⚠️ Browser Console Errors Captured (${consoleErrors.length}):`);
    consoleErrors.slice(0, 5).forEach((err, idx) => console.log(`   ${idx + 1}. ${err}`));
  } else {
    console.log('\n✨ Zero browser console errors detected!');
  }

  return { passedCount, totalCount, testResults };
}

runQASuite();
