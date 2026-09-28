# Bitácora de Desarrollo del Proyecto: Stats Edu
*Plataforma Interactiva para la Enseñanza de Estadística e Investigación de Operaciones*  
*Facultad de Ingeniería Industrial — Universidad Tecnológica de Pereira (UTP)*

---

## Registro de Sesiones

### Sesión 1: 2026-09-28 — Migración a Cloudflare Pages y Verificación E2E Inicial
- **Objetivo**: Migrar el despliegue de Vercel a Cloudflare Pages mediante Static Export, desacoplando dependencias dinámicas del servidor para eliminar caídas por bases de datos inexistentes en el CDN.
- **Acciones Ejecutadas**:
  - Configuración de `output: 'export'` y `images: { unoptimized: true }` en `next.config.ts`.
  - Implementación de `generateStaticParams()` para todas las rutas dinámicas de cursos y lecciones.
  - Creación de almacén cliente en `lib/progress.ts` (`stats_edu_progress_v1` en `localStorage`) para permitir seguimiento individual de lecciones y quizzes sin servidor.
  - Rediseño de dashboard con métricas reales leídas desde el cliente.
  - Configuración de `wrangler.jsonc` y guía `CLOUDFLARE_DEPLOY.md`.
  - Creación de suite E2E Playwright en `scripts/playwright-prod-suite.mjs` y ejecución contra `https://statsedu.urit.services`: 24/24 pruebas aprobadas (100%).
  - Auditoría curricular: Confirmación de 4 asignaturas oficiales completadas al 100% (22 módulos, 58 lecciones MDX).
- **Commits**: `a131155`, `2622457`, `879b437`.

---

### Sesión 2: 2026-09-28 — Incorporación de Planes de Estudio Oficiales (ZIPs), Enfoque Académico en Light Mode y Auditoría de Autenticación
- **Objetivo**:
  1. Integrar y procesar los dos archivos ZIP cargados al repositorio remoto con los planes oficiales de estudio de Pregrado (Ingeniería Industrial) y Posgrado (Maestría en IO y Estadística).
  2. Rediseñar la landing page con estética sobria y académica universitaria, predeterminando el **Light Mode** y destacando la identidad institucional UTP.
  3. Auditar el funcionamiento de la autenticación OAuth frente al modelo de despliegue estático de Cloudflare Pages y proponer una solución viable para el avance individual multidispositivo.
  4. Expandir y enriquecer los cursos con más componentes gráficos e interactivos basados en los temarios oficiales extraídos.
  5. Establecer la regla de comportamiento mandatoria de bitácora para el agente (`AGENTS.md`, `GEMINI.md`, `BITACORA.md`).
- **Estado de Tareas en Curso**:
  - [x] Regla de bitácora establecida en `AGENTS.md` y `GEMINI.md`.
  - [x] Bitácora inicial creada en `BITACORA.md`.
  - [x] Descompresión y estructuración de los programas curriculares de los 2 archivos ZIP en `content/syllabi/`.
  - [x] Creación del documento maestro `content/PLANES_DE_ESTUDIO_UTP.md` que indexa la malla oficial completa de Pregrado (II4D3, II5A3, II6A2, II7D3, II8B3, II713, II863, II152, II212) y Posgrado MIOE (S0, S1, S2), con directores (Wilson Arenas, José Soto Mejía), coordinadores (Eliana Toro, Antonio Escobar, César Zapata, Natalia Bohórquez, María Elena Bernal), laboratorio GEIO y bibliografía clásica (Hillier, Taha, Walpole, Gallego Rendón-Escobar Zuluaga-Toro Ocampo).
  - [x] Rediseño integral de la landing page hacia estética académica universitaria en modo claro (Light Mode por defecto):
    * `app/layout.tsx`: Configuración de `defaultTheme="light"` y metadata institucional formal de la Universidad Tecnológica de Pereira.
    * `components/shared/PublicNavbar.tsx`: Barra superior institucional formal con logo sobrio, insignia académica UTP, enlaces a Asignaturas, Malla Curricular, Metodología, Laboratorio GEIO, Guía del Estudiante y acceso al Dashboard / Mi Progreso.
    * `components/landing/HeroSection.tsx`: Cátedra digital formal, selector dinámico de ruta de aprendizaje (Pregrado en Ingeniería Industrial vs Maestría en IO y Estadística), credenciales académicas y métricas institucionales.
    * `components/landing/InteractiveLabDemo.tsx`: Demostrador científico en vivo con KaTeX y Python Wasm (Inferencia de intervalos de confianza Z/t y Algoritmo Simplex Primal interactivo con tabla dinámica).
    * `components/landing/CurriculumSection.tsx`: Estructura curricular completa de Pregrado (II4D3, II5A3, II6A2, II7D3, II8B3, II713, II863) y Posgrado MIOE (DOE, Programación Lineal Avanzada, Multivariado, Simulación Dinámica, Metaheurísticas, No Lineal, DEA, Optimización Financiera).
    * `components/landing/FeaturesSection.tsx`: Los 4 pilares metodológicos de la ingeniería (Modelado Matemático, Computación Científica Wasm, Visualización Gráfica y Evaluación Formativa).
    * `components/landing/CoursePreviewSection.tsx`: Catálogo oficial con códigos UTP oficiales (`II4D3`, `II5A3`, `II7D3`, `II8B3`), créditos ECTS, semestre, coordinación de área y unidades temáticas.
    * `components/landing/GraduateProgramBanner.tsx`: Enlace formal a la Maestría en Investigación Operativa y Estadística.
    * `components/landing/GeioLabSection.tsx`: Presentación institucional del Laboratorio GEIO (Gestión de la Producción e Investigación de Operaciones).
    * `components/landing/StudentGuideSection.tsx`: Guía metodológica en 5 pasos para el estudiante.
    * `app/page.tsx`: Ensamblado armónico de todas las secciones académicas y footer institucional con datos de la UTP, Facultad de Ingeniería Industrial y enlaces de biblioteca y código.
    * Actualización de códigos oficiales en `content/courses/*/metadata.json` y `app/(protected)/dashboard/page.tsx` a `II4D3`, `II5A3`, `II7D3`, `II8B3`.
  - [x] Verificación técnica completa:
    * `node ./node_modules/typescript/bin/tsc --noEmit`: 0 errores.
    * `node ./node_modules/next/dist/bin/next lint`: 0 errores, 0 warnings.
    * `node ./node_modules/next/dist/bin/next build`: 69/69 páginas prerenderizadas en exportación estática (`output: 'export'`) hacia `out/` con código de salida 0.

- **Decisiones Arquitectónicas y Técnicas**:
  1. **Modo Claro (Light Mode) como estándar visual predeterminado**: Se configuró `defaultTheme="light"` en `app/layout.tsx` y se priorizaron fondos nítidos (`bg-white`, `bg-slate-50`, `bg-slate-100`), textos con alto contraste (`text-slate-900`, `text-slate-800`), y acentos de azul universitario institucional (`#1E3A8A` / `blue-900`), manteniendo total compatibilidad con modo oscuro vía `dark:` variants para los usuarios que deseen alternar mediante `ThemeToggle`.
  2. **Demostrador Científico Client-Side con KaTeX y Computación Wasm**: Se implementó `InteractiveLabDemo.tsx` con soporte para cálculo reactivo de intervalos de confianza e iteración paso a paso de tablas Simplex, renderizando fórmulas matemáticas formalmente mediante `katex.renderToString` sin incurrir en dependencias de servidor.
  3. **Compatibilidad Estricta con Cloudflare Pages Static Export**: Ninguno de los componentes hace uso de APIs de servidor dinámicas ni directivas `'use server'`, garantizando que las 69 rutas se generen 100% como HTML/JS estático listo para el CDN de Cloudflare Pages.

- **Próximos Pasos**:
  - Extender la integración de visualizadores a lecciones de Programación Entera (Branch and Bound interactivo) y Cadenas de Markov (simulador de estados estables).
  - Ejecutar suite E2E de Playwright sobre la nueva landing page y los componentes interactivos en entorno de staging/producción.

