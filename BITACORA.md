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

---

### Sesión 3: 2026-09-28 — `/goal`: Expansión Curricular Integral (Pregrado UTP + Posgrado MIOE) y Suite de Herramientas Interactivas
- **Objetivo**:
  1. Poblar el 100% de los cursos del Área de Investigación de Operaciones y Estadística de Pregrado (Estadística I, II, III, IO I, II, Procesos Estocásticos, Simulación).
  2. Implementar los bloques formativos de la carrera de Ingeniería Industrial: Administración Industrial, Finanzas / Ingeniería Económica, Gestión de Producción y Logística, y Métodos Cuantitativos / Álgebra Matricial.
  3. Implementar el 100% de la malla de Posgrado (Maestría en Investigación Operativa y Estadística - MIOE): S0 (Nivelatorio MATLAB y Nivelatorio IO), S1 (Programación Lineal Avanzada, Análisis Multivariado, Diseño de Experimentos, Simulación Dinámica) y S2 (Programación No Lineal, Metaheurísticas, Optimización Financiera, Análisis Envolvente de Datos - DEA).
  4. Diseñar e implementar un Pool de Herramientas Interactivas Esenciales (`/tools`) con calculadoras para: Distribuciones Estadísticas, Teoría de Colas ($M/M/1$, $M/M/s$), Cadenas de Markov, Ingeniería Económica (VPN, TIR), Eficiencia DEA y Solver Simplex interactivo.
  5. Asegurar cobertura profunda con KaTeX formal, código Python reproducible y quizzes en el 100% de las lecciones.
- **Orquestación de Subagentes**:
  - **Subagente A (`Undergraduate Courses Developer`)**:
    - **Estado:** ✅ Completado al 100%.
    - **Asignaturas de Pregrado Implementadas (7 cursos oficiales, 19 módulos, 38 lecciones MDX completas con rigor matemático en KaTeX, código Python ejecutable con NumPy/SciPy/Pandas y Quizzes interactivos)**:
      1. `estadistica-iii` (Código: II6A2, 6º Semestre, 2 créditos / 6 ECTS):
         - Módulo 1: `01-regresion-multiple-correlacion` (2 lecciones: modelo lineal múltiple en notación matricial $Y = X\beta + \epsilon$, estimador MCO $\hat{\beta} = (X^T X)^{-1} X^T Y$, matriz sombrero $H$, multicolinealidad con VIF, diagnósticos $R^2$, $R^2_{adj}$, Durbin-Watson y distancia de Cook).
         - Módulo 2: `02-diseno-experimentos-anova` (2 lecciones: ANOVA de un factor con partición $SST = SSTr + SSE$, prueba $F$ de Snedecor, pruebas post-hoc de Tukey HSD, diseño de bloques completos al azar DBCA y factoriales $2^k$ con algoritmo de Yates).
         - Módulo 3: `03-control-estadistico-calidad` (2 lecciones: cartas Shewhart por variables $\bar{X}-R$ y $\bar{X}-S$, atributos $p/c/u$, reglas Western Electric, y capacidad de proceso $C_p, C_{pk}, C_{pm}$, PPM y nivel Sigma).
      2. `procesos-estocasticos` (Código: II713, 7º Semestre, 3 créditos / 6 ECTS):
         - Módulo 1: `01-cadenas-markov-discretas` (2 lecciones: propiedad de Markov, matrices estocásticas de transición $P$, Chapman-Kolmogorov $P^n$, estados recurrentes/transitorios/absorbentes, y distribución estacionaria $\pi = \pi P$).
         - Módulo 2: `02-procesos-poisson-continuos` (2 lecciones: proceso de Poisson homogéneo con tasa $\lambda$, inter-arribos exponenciales con falta de memoria, matriz generadora infinitesimal $Q$, y cadenas continuas CTMC con ecuaciones de Kolmogorov).
         - Módulo 3: `03-teoria-colas-lineas-espera` (2 lecciones: notación de Kendall, sistemas $M/M/1$ y multicanal $M/M/s$, fórmulas de Little $L = \lambda W$, probabilidad Erlang-C, y función de costo total esperado $E[TC(s)]$ con balance servicio vs espera).
         - Módulo 4: `04-confiabilidad-sistemas` (2 lecciones: función $R(t)$, configuraciones serie $R_s = \prod R_i$, paralelo activo $R_p = 1 - \prod (1 - R_i)$, redundancia $k$-de-$n$, tasa de fallas $h(t)$, curva de la bañera, distribución de Weibull y métricas MTBF/MTTR).
      3. `simulacion` (Código: II863, 8º Semestre, 3 créditos / 6 ECTS):
         - Módulo 1: `01-eventos-discretos` (2 lecciones: reloj de simulación Next-Event vs Time-Slicing, Lista de Eventos Futuros FEL con min-heaps, y arquitectura orientada a objetos con entidades, atributos y recursos).
         - Módulo 2: `02-generacion-pseudoaleatorios` (2 lecciones: generadores congruenciales lineales GCL con Teorema de Hull-Dobell, y pruebas de uniformidad e independencia serial: Chi-cuadrado, Kolmogorov-Smirnov y Rachas).
         - Módulo 3: `03-variables-aleatorias-montecarlo` (2 lecciones: método de la transformada inversa $X = F^{-1}(U)$, método de aceptación-rechazo de von Neumann, y simulación Monte Carlo para análisis de riesgo con VaR y CVaR).
         - Módulo 4: `04-analisis-salida-validacion` (2 lecciones: bondad de ajuste con MLE, K-S y AIC, y análisis de salida: eliminación del transitorio con la regla de Welch e intervalos de confianza por réplicas independientes).
      4. `administracion-industrial` (Código: II143, 3 créditos / 6 ECTS):
         - Módulo 1: `01-teoria-organizacional-procesos` (2 lecciones: evolución de Taylor y Fayol al Sistema de Producción Toyota TPS, Takt Time, eliminación de los 7 desperdicios Muda, y modelamiento formal BPMN 2.0 con diagramas SIPOC).
         - Módulo 2: `02-gestion-estrategica-productividad` (2 lecciones: Balanced Scorecard de Kaplan-Norton con 4 perspectivas, formulación de KPIs leading/lagging con semaforización, y modelo de productividad total de Sumanth / Craig-Harris).
      5. `ingenieria-economica-finanzas` (Código: II543, 3 créditos / 6 ECTS):
         - Módulo 1: `01-matematicas-financieras` (2 lecciones: valor del dinero en el tiempo TVM, interés compuesto, conversión entre tasas nominales y TEA, ecuación de Fisher para inflación, y series uniformes/anualidades con gradientes aritméticos y geométricos).
         - Módulo 2: `02-evaluacion-proyectos-inversion` (2 lecciones: Valor Presente Neto VPN, Tasa Interna de Retorno TIR, paradoja de tasas múltiples y TIRM, relación Beneficio/Costo B/C, Costo Anual Uniforme Equivalente CAUE y vida económica de reemplazo).
      6. `gestion-produccion-logistica` (Código: II723, 3 créditos / 6 ECTS):
         - Módulo 1: `01-pronosticos-demanda` (2 lecciones: componentes de series temporales, Suavizamiento Exponencial Simple SES con optimización de $\alpha$, modelo Holt-Winters para tendencia y estacionalidad, y métricas MAD, MSE, MAPE y Tracking Signal).
         - Módulo 2: `02-control-inventarios-cadena-suministro` (2 lecciones: modelo de lote económico de pedido EOQ clásico y con descuentos por volumen, y punto de reorden ROP bajo demanda estocástica y Lead Time variable con Stock de Seguridad SS).
      7. `metodos-cuantitativos-algebra` (Código: CB213, 3 créditos / 6 ECTS):
         - Módulo 1: `01-algebra-lineal-matricial` (2 lecciones: álgebra de matrices en $\mathbb{R}^{m \times n}$, propiedades de determinantes, número de condición $\kappa(A)$, Teorema de Rouché-Capelli, eliminación de Gauss-Jordan, factorización LU y descomposición de Cholesky).
         - Módulo 2: `02-autovalores-optimizacion-cuantitativa` (2 lecciones: ecuación característica $\det(A - \lambda I) = 0$, teorema espectral, diagonalización $A = P D P^{-1}$, cálculo multivariado: gradiente $\nabla f(x)$, matriz Hessiana $H(x)$, condiciones de optimalidad y descenso de gradiente).
    - **Verificación Técnica**:
      * `node scripts/generate-all-pregrado.mjs`: Ejecución determinística y generación de las 38 lecciones.
      * `node scripts/validate-all-courses.mjs`: Validación de 22 cursos y 137 lecciones con 0 errores (100% aprobado).
      * `node ./node_modules/typescript/bin/tsc --noEmit`: 0 errores de tipado TypeScript.
      * `node ./node_modules/next/dist/bin/next build`: 165/165 rutas prerenderizadas exitosamente para exportación estática Cloudflare Pages (`output: 'export'`) en `out/`.
- **Estado General de la Sesión**:
  - Subagente A (Pregrado): ✅ 100% Completado.
  - Subagente B (Posgrado MIOE): ✅ 100% Completado.
  - Subagente C (Suite de Herramientas `/tools`): ✅ 100% Completado.
  - Plataforma completamente funcional, validada y compilada estáticamente para despliegue en Cloudflare Pages.

  - **Subagente B (`Graduate MIOE Courses Developer`)**:
    - **Estado:** ✅ Completado al 100%.
    - **Asignaturas implementadas (10 cursos, 20 módulos, 40 lecciones MDX con KaTeX riguroso, Python Wasm/SciPy y Quizzes interactivos)**:
      1. `mioe-s0-nivelatorio-matlab-python` (Código: IOD10)
         - Módulo 1: Álgebra Matricial y Computación Numérica (Vectorización, BLAS/LAPACK, Factorizaciones LU, Cholesky, QR, Condicionamiento numérico).
         - Módulo 2: Estructuras Matriciales, Visualización y Algoritmos (Matrices esparsas CSR/CSC, Optimización univariada: Sección Dorada, Newton 1D).
      2. `mioe-s0-nivelatorio-investigacion-operaciones` (Código: IOA10)
         - Módulo 1: Modelado Matemático y Dualidad (Poliedros convexos, Teoremas de dualidad débil/fuerte, holgura complementaria, precios sombra).
         - Módulo 2: Algoritmos y Solvers Computacionales (Simplex matricial, solvers HiGHS, PuLP, CVXPY).
      3. `mioe-s1-programacion-lineal-avanzada` (Código: IO113)
         - Módulo 1: Teoría Poliédrica y Simplex Revisado (Minkowski-Weyl, conos de recesión, matrices elementales Eta, factorización de base).
         - Módulo 2: Descomposición y Generación de Columnas (Dantzig-Wolfe, Problema Maestro RMP, Cutting Stock Problem de Gilmore-Gomory con subproblema de mochila).
      4. `mioe-s1-analisis-multivariado` (Código: IO123)
         - Módulo 1: Normal Multivariada y Test de Hotelling (Densidad en $\mathbb{R}^p$, distancia de Mahalanobis, distribución de Wishart, test $T^2$ de Hotelling, MANOVA).
         - Módulo 2: Reducción de Dimensionalidad y Clasificación (PCA espectral, Análisis Factorial Exploratorio EFA con rotación Varimax, LDA de Fisher con cociente de Rayleigh).
      5. `mioe-s1-diseno-experimentos` (Código: IO133)
         - Módulo 1: Factoriales Completos y Fraccionados (Factoriales $2^k$, contrastes de Yates, fraccionados $2^{k-p}$, generadores, relaciones definidoras y resoluciones III, IV, V).
         - Módulo 2: Metodología de Superficie de Respuesta (RSM) (Modelos de segundo orden, CCD rotatable, Box-Behnken, análisis canónico de curvatura, deseabilidad multirespuesta de Derringer-Suich).
      6. `mioe-s1-simulacion-dinamica-sistemas` (Código: IO143)
         - Módulo 1: Pensamiento Sistémico y Ciclos Causales (Diagramas CLD, polaridad, bucles $R$ y $B$, dominancia de bucles, arquetipos sistémicos de Senge y Meadows).
         - Módulo 2: Diagramas de Niveles, Flujos y Ecuaciones (Diagramas de Forrester Stock & Flow, formulación diferencial, integración Euler/RK4, retrasos de información y material, Efecto Látigo / Bullwhip).
      7. `mioe-s2-programacion-no-lineal` (Código: IO213)
         - Módulo 1: Optimización Sin Restricciones (Funciones convexas, gradiente descendente con condición de Armijo, métodos Cuasi-Newton y actualización de rango 2 BFGS).
         - Módulo 2: Optimización con Restricciones y KKT (Condiciones KKT de 1er y 2do orden, cualificación LICQ, multiplicadores de Lagrange, métodos de penalización exterior y barrera logarítmica interior SUMT).
      8. `mioe-s2-metaheuristicas` (Código: IO223)
         - Módulo 1: Metaheurísticas de Trayectoria (Recocido Simulado con criterio de aceptación de Metrópolis y enfriamiento geométrico, Búsqueda Tabú con memoria de corto, mediano y largo plazo y criterio de aspiración).
         - Módulo 2: Metaheurísticas Poblacionales (Algoritmos Genéticos con operadores de cruce para permutaciones OX y PMX aplicados a TSP, PSO continuo y discreto con regla SPV para Flow Shop y VRP).
      9. `mioe-s2-optimizacion-financiera` (Código: IO233)
         - Módulo 1: Teoría Clásica de Portafolio y Markowitz (Deducción lagrangiana matricial de la frontera eficiente media-varianza, portafolio GMVP, modelo CAPM, portafolio tangente, ratio de Sharpe, beta y CML/SML).
         - Módulo 2: Medidas de Riesgo Coherente y CVaR (Axiomas de Artzner, no subaditividad del VaR, formulación lineal convexa de Rockafellar-Uryasev para CVaR, optimización estocástica con apalancamiento en CVXPY).
      10. `mioe-s2-analisis-envolvente-datos-dea` (Código: IO243)
          - Módulo 1: Fundamentos de Eficiencia y Modelos CCR y BCC (Conjunto PPS, modelo CCR con rendimientos constantes CRS en forma envolvente y multiplicadora, modelo BCC con restricción de convexidad VRS, descomposición $TE = PTE \times SE$).
          - Módulo 2: Slacks, Benchmarking y Modelos en Red (Fase II de holguras de Pareto-Koopmans, identificación de peer groups y metas de proyección, Network DEA multietapa con variables de enlace y eficiencia multiplicativa).
    - **Verificación**: Validación completa con `node scripts/validate-all-courses.mjs` (100% de cursos y lecciones aprobadas) y `node ./node_modules/typescript/bin/tsc --noEmit` (0 errores).
  - **Subagente C (`Interactive Tools Suite Developer`)**:
    - **Estado:** ✅ Completado al 100%.
    - **Página Principal de la Suite (`/tools` — `app/tools/page.tsx`)**:
      * Encabezado institucional formal: *'Pool de Herramientas Computacionales e Interactivas — Área de Investigación de Operaciones y Estadística UTP'*.
      * Selector reactivo de 5 categorías: *Todas*, *Estadística & Probabilidad*, *Investigación de Operaciones*, *Finanzas & Producción*, *Modelos Avanzados de Posgrado*.
      * Barra de búsqueda reactiva por tema, sigla oficial o modelo matemático.
      * Panel de simulación activo integrado (Workspace) y catálogo de tarjetas con acceso directo, metadatos curriculares (`II4D3`, `II8B3`, `II6A2`, `II713`, `II7D3`, `MIOE S1/S2`), nivel y etiquetas.
    - **Colección de Herramientas Interactivas (`components/tools/`)**:
      1. `MathFormula.tsx`: Componente de renderizado KaTeX client-side de alta tolerancia a fallos.
      2. `DistributionWorkbench.tsx`: Workbench de distribuciones paramétricas continuas (Normal, t-Student, Chi-cuadrado, F-Fisher, Exponencial) y discretas (Binomial, Poisson) con sliders de parámetros, cálculo reactivo de PDF/PMF, CDF $P(X \le x)$, probabilidad en intervalo $P(a \le X \le b)$, quantiles críticos $x_\alpha$, y gráfico SVG interactivo con sombreado de área.
      3. `QueueingTheoryCalculator.tsx`: Calculadora de modelos de colas markovianos ($M/M/1$, $M/M/s$, $M/M/s/K$) con fórmulas de Little ($L, L_q, W, W_q$), probabilidad de espera Erlang-C, probabilidad de bloqueo $P_K$, optimización de servidores $s^*$ por costo total horario ($C_s, C_w$) y gráfico de barras de estado estacionario $P_n$ ($n = 0\dots 15$).
      4. `MarkovChainAnalyzer.tsx`: Analizador de Cadenas de Markov en tiempo discreto (DTMC) con matriz estocástica editable $2\times 2$ y $3\times 3$, auto-normalización de filas, cálculo de matriz $n$-pasos $P^n$, resolución analítica del vector estacionario $\pi = \pi P$ mediante eliminación gaussiana, y grafo topológico SVG interactivo con paso a paso Monte Carlo.
      5. `EngineeringEconomicsCalculator.tsx`: Calculadora de Ingeniería Económica con inversión inicial $I_0$, tasa de oportunidad TIO y horizonte temporal $N$, tabla dinámica de flujos de caja netos $FNC_t$, cálculo reactivo de VPN/VAN, TIR por aproximación de raíces, relación B/C, Payback simple y descontado (PRI), dictamen de viabilidad de ingeniería y perfil gráfico del VPN vs tasa de descuento.
      6. `DeaEfficiencyCalculator.tsx`: Calculadora de Análisis Envolvente de Datos (DEA) bajo modelo CCR orientado a insumos con múltiples DMUs (plantas industriales), resolución de programación lineal dual por DMU, score de eficiencia técnica relativa $\theta \in (0, 100\%)$, benchmarking de insumos proyectados y trazado de frontera convexa envolvente (iso-cuanta) en SVG.
      7. `SimplexSolverTool.tsx`: Resolutor pedagógico de Programación Lineal por el Método Simplex Primal con soporte para Max/Min, hasta 4 restricciones $(\le, \ge, =)$, navegación paso a paso entre tablas simplex, resaltado de elemento, fila y columna pivote, prueba de la razón mínima, detalle de operaciones elementales de Gauss-Jordan y reporte de precios sombra (valores duales) y costos reducidos.
    - **Motor Matemático y Tipos (`lib/tools-math.ts` y `types/jstat.d.ts`)**:
      * Implementación de algoritmos numéricos matriciales, exponenciación rápida, optimización lineal two-phase simplex y rutinas analíticas puras sin dependencias de servidor.
    - **Navegación e Integración (`PublicNavbar.tsx` y `Navbar.tsx`)**:
      * Incorporación del enlace a `/tools` ("Herramientas") con icono representativo en la barra superior de escritorio y en el cajón de navegación móvil.
    - **Verificación Técnica**:
      * `node ./node_modules/typescript/bin/tsc --noEmit`: 0 errores.
- **Estado Consolidado**: Subagente A (Pregrado), Subagente B (Posgrado MIOE) y Subagente C (Herramientas `/tools`) completados al 100% con éxito y verificados en build estático.

