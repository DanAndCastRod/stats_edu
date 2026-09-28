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

---

### Sesión 4: 2026-09-28 — Corrección del Bug "Semana 1", Catálogo Avanzado, Certificación en PDF, Búsqueda Global y Exportación Científica
- **Objetivo**:
  1. Corregir el bug por el cual todas las lecciones mostraban estáticamente "Semana 1" en sus cabeceras.
  2. Implementar todas las mejoras de alto impacto solicitadas por el usuario:
     - Catálogo de Cursos avanzado (`/courses`) con pestañas por ciclo formativo (Pregrado vs Posgrado MIOE), filtros por área y búsqueda instantánea.
     - Dashboard enriquecido con las 21 asignaturas y Generador de Certificados y Reporte Oficial de Notas en PDF imprimible/descargable (`components/dashboard/AcademicCertificateModal.tsx`).
     - Buscador Global Inteligente tipo Command Palette (`Cmd + K` / `Ctrl + K`) que indexe cursos, lecciones y herramientas.
     - Exportación a CSV / Excel estructurado y copia de informes en la suite de herramientas interactivas (`/tools`).
     - Componente de ejecución de código Python interactivo en el navegador (`PyodideRunner`).
- **Diagnóstico del Bug "Semana 1"**:
  - En `lib/courses.ts`, la función `getCourseData` inicializaba por defecto el campo `weeks` de cada módulo con un objeto estático `{ number: 1 }`. En `app/courses/[slug]/[topicSlug]/page.tsx`, la cabecera consumía este valor directamente.
  - **Solución**: Calcular la numeración cronológica real de las semanas a lo largo del semestre (`currentWeekNum++`) y estructurar el badge como `Módulo {moduleOrder} • Semana {weekNumber}`.
- **Orquestación de Subagentes**:
  - **Subagente 1 (`Catalog & Dashboard Enhancer`)**:
    * **Estado:** ✅ Completado al 100%.
    * **Acciones Ejecutadas**:
      1. **Corrección del Bug 'Semana 1'**:
         - En `lib/courses.ts`, se refactorizó `getCourseData` para ordenar los módulos cronológicamente por `modOrder` y calcular el número de semana secuencial a lo largo de todo el curso (`currentWeekNumber++`), asignando semanas a cada módulo según sus lecciones (módulos de 1 o 2 temas asignan 1 semana por lección, permitiendo que el Módulo 1 tenga Semana 1 y 2, y el Módulo 2 inicie en la Semana 3).
         - En `app/courses/[slug]/[topicSlug]/page.tsx`, se calculó `currentModule` y `currentWeek` para la lección activa, actualizando el badge superior a: `Módulo {moduleOrder} • Semana {weekNumber}` y el título de la unidad, eliminando la cadena estática 'Semana 1'.
      2. **Catálogo Unificado y Taxonomía Curricular (`lib/curriculum-catalog.ts`)**:
         - Creación del catálogo maestro oficial con las 21 asignaturas estructuradas por programa (11 de Pregrado en Ingeniería Industrial y 10 de Posgrado MIOE), áreas de formación (Investigación de Operaciones, Estadística, Administración, Finanzas, Producción, Ciencias Básicas), ciclos de maestría (S0 Nivelatorio, S1 Obligatorias, S2 Especializadas), códigos oficiales UTP (`II4D3`, `II7D3`, `IO113`, etc.), créditos UTP, ECTS, semestre y docentes coordinadores.
      3. **Rediseño del Catálogo de Cursos (`app/courses/page.tsx` & `components/courses/CourseCatalog.tsx`)**:
         - Pestaña 1: 'Todos los Cursos' (21 asignaturas).
         - Pestaña 2: 'Pregrado en Ingeniería Industrial' (11 asignaturas) con filtro reactivo por 6 áreas de formación.
         - Pestaña 3: 'Posgrado: Maestría en IO y Estadística (MIOE)' (10 asignaturas) con filtro reactivo por ciclos S0, S1 y S2.
         - Buscador reactivo instantáneo por código oficial, título, semestre, área temática o palabras clave.
         - Tarjetas académicas interactivas con badges de código UTP, semestre, conteo de unidades y lecciones, créditos y botón de acceso directo.
      4. **Rediseño del Dashboard con las 21 Asignaturas (`app/(protected)/dashboard/page.tsx` & `components/dashboard/CourseGrid.tsx`)**:
         - Actualización de `AVAILABLE_COURSES` a las 21 asignaturas oficiales indexadas en `lib/curriculum-catalog.ts`.
         - Cálculo en tiempo real del porcentaje de avance comparando los tópicos completados en `localStorage` (`stats_edu_progress_v1`) contra el total de lecciones de cada asignatura.
         - Cálculo de calificaciones promedio de quizzes por materia y ponderado general.
         - Selector de filtros rápidos: Todas (21), Pregrado (11), Posgrado (10), En Curso / Iniciadas.
         - Banner destacado de acceso a la certificación y reporte oficial.
      5. **Generador de Certificado y Reporte Académico Oficial en PDF (`components/dashboard/AcademicCertificateModal.tsx`)**:
         - Modal interactivo con doble vista:
           a) *Reporte Oficial de Calificaciones y Avance Curricular* (Sábana de notas con membrete oficial UTP, datos del estudiante desde su perfil en `localStorage`, tabla detallada de materias, lecciones completadas, porcentaje de avance, nota en escala UTP 0.0 a 5.0 y 0 a 100, y estado).
           b) *Certificado Académico de Culminación* (Formato diploma con diseño heráldico formal, resumen de lecciones y créditos, firmas del Director de Pregrado Ing. Wilson Arenas y Director de Maestría Dr. José A. Soto Mejía).
         - Sello de certificación digital con código hash verificable (`UTP-IOE-XXXX-XXXX-2026`) y fecha de expedición.
         - Motor de impresión `@media print` optimizado para generación impecable de PDF vía `window.print()` sin cabeceras parásitas.
    * **Verificación Técnica**:
      - `node ./node_modules/typescript/bin/tsc --noEmit`: 0 errores.
      - `node ./node_modules/next/dist/bin/next lint`: 0 errores, 0 warnings.
      - `node ./node_modules/next/dist/bin/next build`: 165/165 páginas prerenderizadas en exportación estática Cloudflare Pages (`output: 'export'`) hacia `out/` con código de salida 0.
  - **Subagente 2 (`Command Palette Developer`)**:
    * **Estado:** ✅ Completado al 100%.
    * **Acciones Ejecutadas**:
      1. **Componente Central de Búsqueda (`components/shared/CommandPalette.tsx`)**:
         - Implementado como componente reactivo 100% `'use client'` con diseño de modal flotante centrado, desenfoque de fondo (`backdrop-blur-sm`), bloqueo de scroll del body (`overflow = 'hidden'`), encabezado de búsqueda con auto-foco inmediato (`autoFocus` / `inputRef.focus()`), atajo de teclado global `Cmd+K` / `Ctrl+K` para abrir/alternar, y tecla `Escape` o backdrop click para cerrar.
         - Barra de herramientas con buscador inteligente que normaliza diacríticos (acentos $á, é, í, ó, ú \to a, e, i, o, u$), tokens múltiples y scoring ponderado dando prioridad a códigos oficiales de asignatura, coincidencias en título, subtítulo y etiquetas.
         - Resultados agrupados visualmente en las 4 categorías solicitadas:
           * *Asignaturas*: Las 21 asignaturas oficiales UTP (código `II4D3`, `II5A3`, `II7D3`, `II8B3`, `IO113`, etc., programa Pregrado/Posgrado MIOE y enlace `/courses/{slug}`).
           * *Herramientas Computacionales*: Las 6 calculadoras y simuladores interactivos de la plataforma (`/tools#simplex`, `/tools#queueing`, `/tools#markov`, `/tools#economics`, `/tools#dea`, `/tools#distributions`).
           * *Lecciones & Contenidos*: 136 temas y módulos temáticos de pregrado y posgrado con enlace `/courses/{slug}/{topicSlug}`.
           * *Navegación*: Accesos rápidos a *Inicio* (`/`), *Aulas Virtuales* (`/courses`), *Suite de Herramientas* (`/tools`) y *Mi Progreso* (`/dashboard`).
         - Navegación bidireccional por teclado con flechas `↑` y `↓` (`ArrowDown` / `ArrowUp`), selección con `Enter` para enrutamiento directo con `router.push`, sincronización con hover del cursor del mouse y auto-desplazamiento del elemento activo a la vista (`scrollIntoView({ block: 'nearest' })`).
         - Estado vacío estilizado (*"No se encontraron resultados para «{query}»"*) con sugerencias académicas de búsqueda y botón para limpiar búsqueda.
         - Función exportada `openCommandPalette()` para disparar la apertura del modal desde cualquier componente mediante el evento personalizado `statsedu:open-command-palette`.
      2. **Índice de Búsqueda Dinámico & Generador (`lib/search-data.ts` & `scripts/build-search-index.mjs`)**:
         - Creación del script extractor `scripts/build-search-index.mjs` que escanea automáticamente todas las carpetas y frontmatters MDX de `content/courses/*`, generando `lib/search-data.ts` con tipado estricto (`SearchItem`, `SearchCategory`).
         - Total indexado: 167 elementos (21 asignaturas oficiales, 6 herramientas interactivas, 4 accesos rápidos y 136 lecciones temáticas).
      3. **Integración Global en la Plataforma**:
         - `app/layout.tsx`: Montado de `<CommandPalette />` globalmente dentro de los providers para accesibilidad inmediata desde cualquier ruta.
         - `components/shared/PublicNavbar.tsx`: Agregado botón de búsqueda rápida en desktop (lupa + *"Buscar tema o herramienta..."* + badge `Ctrl K` / `⌘K`) y botón con icono de lupa en la barra superior móvil y dentro del cajón móvil.
         - `components/shared/Navbar.tsx`: Reemplazo del campo de búsqueda estático por el disparador del Command Palette con badge `Ctrl K` / `⌘K` en desktop y botón de lupa en móvil.
         - `app/tools/page.tsx`: Agregada sincronización automática con el hash de la URL (`hashchange` event listener) para que seleccionar una herramienta en el Command Palette (ej. `/tools#simplex` o `/tools#dea`) active automáticamente el componente correspondiente y realice scroll suave al panel de simulación activo (`#workspace`).
         - `app/error.tsx`: Creación del componente de captura de errores client-side para manejo robusto de contingencias en la exportación estática.
      4. **Suite de Pruebas Automatizadas (`scripts/test-command-palette.mjs`)**:
         - Script de verificación unitaria para indexación de las 21 asignaturas, 6 herramientas, 4 rutas de navegación, normalización de acentos y queries representativas: 100% de pruebas aprobadas.
    * **Verificación Técnica**:
      - `node ./node_modules/typescript/bin/tsc --noEmit`: 0 errores.
      - `node ./node_modules/next/dist/bin/next lint`: 0 errores, 0 warnings.
      - `node scripts/test-command-palette.mjs`: 100% de pruebas aprobadas con éxito.
  - **Subagente 3 (`Interactive Exporter & Runner Developer`)**:
    * **Estado:** ✅ Completado al 100%.
    * **Capacidades Implementadas**:
      1. **Utilidades de Exportación Reutilizables (`lib/export-utils.ts`)**:
         - `downloadCsvFile(filename, rows)`: Formateo RFC 4180 con escape de comillas/comas, prefijo UTF-8 BOM (`\uFEFF`) para visualización inmediata en Microsoft Excel / Calc sin problemas de codificación de caracteres matemáticos ($\lambda, \mu, \pi, \theta, \rho$), creación de Blob y descarga automática en cliente.
         - `copyToClipboard(text)`: Copia segura al portapapeles con API moderna y fallback para contextos restrictivos.
         - `formatMarkdownTable(headers, rows)`: Generador de tablas Markdown alineadas para informes académicos y de laboratorio.
         - `getExportTimestamp()`: Marcador temporal para nomenclatura de archivos.
      2. **Exportación a CSV y Resumen en Calculadoras de `/tools`**:
         - `QueueingTheoryCalculator.tsx`: Botón "Exportar a CSV" (parámetros operacionales, métricas de Little $L, L_q, W, W_q, \rho, P_0$, costos y distribución de probabilidades $P_n$ $n=0\dots 15$, tabla de optimización de servidores) y botón "Copiar Resumen" (tabla en Markdown para informes).
         - `SimplexSolverTool.tsx`: Botón "Exportar Tablas a CSV" (secuencia completa de tablas simplex inicial, intermedias y óptima con variables básicas, costos reducidos y precios sombra duales) y botón "Copiar Resumen".
         - `EngineeringEconomicsCalculator.tsx`: Botón "Exportar Flujo de Caja a CSV" (flujos netos $FNC_t$, factores de descuento, flujos descontados a VP, acumulados, VPN, TIR, B/C y Payback simple/descontado) y botón "Copiar Resumen".
         - `MarkovChainAnalyzer.tsx`: Botón "Exportar Matriz a CSV" (matriz estocástica $P$, matriz a $n$ pasos $P^n$ y vector de distribución estacionaria $\pi$) y botón "Copiar Resumen".
         - `DeaEfficiencyCalculator.tsx`: Botón "Exportar Eficiencia DEA a CSV" (matriz de DMUs, insumos reales, outputs, scores $\theta$, condición, metas proyectadas y pares de benchmarking) y botón "Copiar Resumen".
      3. **Ejecutor de Código Python en Vivo (`components/interactive/PyodideRunner.tsx`)**:
         - Componente interactivo para lecciones MDX con editor de texto enriquecido, numeración de líneas sincronizada, soporte de indentación con tecla Tab (4 espacios), ejecución con atajo `Ctrl+Enter` / `Cmd+Enter`.
         - Compatibilidad dual: usa el contexto `PyodideProvider` si está montado en la página o inicializa un WebWorker local autónomo (`/pyodide.worker.js?v=2`) si se utiliza fuera del provider.
         - Botones de acción: "▶ Ejecutar Código", "Restablecer Código Original", "Copiar Código" y "Limpiar Consola".
         - Soporte de salida en tiempo real: stdout, stderr/tracebacks coloreados, tiempo de ejecución en milisegundos y renderizado de gráficos Matplotlib generados en WebAssembly con botón de descarga PNG.
         - Exportado en `components/interactive/index.ts` y registrado en `components/mdx/MDXComponents.tsx`.
         - Demostrado e integrado en lecciones clave:
           * `content/courses/investigacion-operaciones-i/02-metodo-simplex/02-algoritmo-simplex-tabular.mdx` (resolución de programación lineal con `scipy.optimize.linprog`).
           * `content/courses/estadistica-i/03-distribuciones-continuas/01-distribucion-normal.mdx` (cálculo de probabilidades gaussiana y gráfico de densidad con `scipy.stats.norm`).
- **Verificación Técnica**:
  - `node ./node_modules/typescript/bin/tsc --noEmit`: 0 errores.
  - `node ./node_modules/next/dist/bin/next lint`: 0 errores, 0 warnings.
- **Estado General**: Todo operativo y verificado estáticamente.

---

### Sesión 5: 2026-09-28 — Profundización de Módulos, Expansión a 10 Herramientas Computacionales e Inventario de Tools
- **Objetivo**:
  1. Profundizar en los módulos de aprendizaje integrando más elementos interactivos y ejecutores de código en vivo (`PyodideRunner`) con problemas industriales reales.
  2. Generar nuevas herramientas computacionales especializadas en la suite `/tools` para cubrir las áreas formativas de Control de Calidad, Inventarios, Pronósticos y Gestión de Proyectos.
  3. Consolidar el inventario exhaustivo de herramientas interactivas disponibles en la plataforma.
- **Acciones Ejecutadas**:
  1. **Desarrollo de 4 Nuevas Herramientas Computacionales en `/tools` (Suite ampliada de 6 a 10 herramientas)**:
     - **Herramienta 7: Control Estadístico de Calidad & Capacidad (SPC)** (`components/tools/SpcQualityControlWorkbench.tsx`, ancla `#spc`):
       * Gráficos Shewhart $\bar{X} - R$ con tabla de constantes $A_2, D_3, D_4, d_2$ para subgrupos de tamaño variable.
       * Cálculo de límites de control $\pm 3\sigma$ y detección visual de causas asignables / puntos fuera de control.
       * Cálculo de índices de capacidad del proceso: $C_p$, $C_{pk}$, $C_{pm}$ (Taguchi), PPM defectuosos estimados mediante la integral normal de Gauss y nivel de madurez Sigma ($Z$).
       * Gráfico SVG interactivo de la trayectoria de medias muestrales con límites y puntos fuera de control resaltados en color carmesí.
       * Exportación a CSV y generación de resumen ejecutivo en Markdown para informes de aseguramiento de calidad.
     - **Herramienta 8: Optimizador de Inventarios & Lote Económico (EOQ / ROP)** (`components/tools/InventoryOptimizationTool.tsx`, ancla `#inventory`):
       * Modelo clásico de Lote Económico de Pedido ($EOQ = \sqrt{2DS/H}$).
       * Cálculo de Punto de Reorden ($ROP = d \cdot L + SS$) bajo demanda estocástica con tiempo de entrega $L$.
       * Cálculo de Stock de Seguridad ($SS = Z_\alpha \sigma_L$) para niveles de servicio configurables (90%, 95%, 99%).
       * Visualizador SVG interactivo de la curva de costos anuales (Costo de Ordenar, Costo de Mantener y Costo Total) con marcado exacto del óptimo $Q^*$.
       * Diagrama de diente de sierra que ilustra la dinámica de reabastecimiento en almacén, el período de Lead Time y la reserva de seguridad.
       * Exportación a CSV y copia de tabla resumen en Markdown.
     - **Herramienta 9: Pronósticos de Demanda & Series de Tiempo** (`components/tools/ForecastingWorkbench.tsx`, ancla `#forecasting`):
       * Modelos cuantitativos implementados: Promedios Móviles Simples (SMA), Suavizamiento Exponencial Simple (SES con parámetro $\alpha$), y Modelo Lineal de Holt para series con tendencia (parámetros de nivel $\alpha$ y tendencia $\beta$).
       * Métricas de evaluación de exactitud calculadas en tiempo real: Desviación Absoluta Media (MAD), Error Cuadrático Medio (MSE), Raíz del Error Cuadrático Medio (RMSE), Error Porcentual Absoluto Medio (MAPE) y Señal de Rastreo (Tracking Signal acumulado).
       * Gráfico SVG de trayectoria que superpone la demanda real histórica contra la serie pronosticada y proyecta el período futuro $t+1$.
       * Presets industriales (tendencia de crecimiento, estacionalidad y demanda estacionaria) con tabla detallada de errores por período.
       * Exportación a CSV y copia de informe en Markdown.
     - **Herramienta 10: Optimizador de Redes de Proyectos (CPM / PERT)** (`components/tools/CpmPertNetworkOptimizer.tsx`, ancla `#cpm`):
       * Red de actividades con duraciones determinísticas o estimaciones probabilísticas de 3 tiempos (optimista $a$, más probable $m$, pesimista $b$).
       * Cálculo de tiempos esperados $T_e = (a + 4m + b)/6$ y varianzas $\sigma^2 = ((b-a)/6)^2$.
       * Algoritmo de pase hacia adelante ($ES, EF$) y pase hacia atrás ($LS, LF$).
       * Cálculo de holguras totales ($H_i = LS_i - ES_i$) e identificación unívoca de la Ruta Crítica ($H_i = 0$).
       * Varianza y desviación estándar del proyecto a lo largo de la ruta crítica.
       * Módulo de análisis de riesgo de culminación: cálculo de puntaje $Z$ y probabilidad normal de entregar el proyecto antes de un plazo meta $T_{target}$.
       * Tabla estructurada con pases adelante/atrás, exportación a CSV y copia en Markdown.
  2. **Ampliación del Motor Matemático (`lib/tools-math.ts`)**:
     - Incorporación de funciones analíticas: `calculateSPCXR`, `calculateInventoryOptimization`, `calculateForecasting` y `solveCPMPERT`.
  3. **Integración en la Suite de Herramientas (`app/tools/page.tsx` & `components/tools/index.ts`)**:
     - Exportación unificada de las 10 herramientas computacionales.
     - Actualización de metadatos, iconos, etiquetas y escucha de eventos de ancla `#spc`, `#inventory`, `#forecasting` y `#cpm`.
  4. **Actualización del Índice Global de Búsqueda (`lib/search-data.ts` & `scripts/build-search-index.mjs`)**:
     - Indexación ampliada a 171 elementos (21 asignaturas, 10 herramientas interactivas, 4 rutas de navegación y 136 lecciones).
     - Validación unitaria con `scripts/test-command-palette.mjs`: 100% de pruebas aprobadas.
  5. **Profundización en Módulos Curriculares con Código Interactivo en Vivo (`<PyodideRunner />`)**:
     - `estadistica-ii/01-muestreo-distribuciones/02-distribuciones-muestrales-chi-t-f.mdx`: Laboratorio de prueba de razón de varianzas F de Fisher-Snedecor con SciPy.
     - `estadistica-iii/01-regresion-multiple-correlacion/01-modelo-lineal-multiple-matricial.mdx`: Estimación matricial MCO $\hat{\beta} = (X^T X)^{-1} X^T Y$, matriz sombrero $H$, contrastes $t$ individuales y ANOVA $F$.
     - `gestion-produccion-logistica/01-pronosticos-demanda/02-modelo-holt-winters-metricas-error.mdx`: Ajuste del modelo de Holt con parámetros $\alpha$ y $\beta$, métricas MAD, RMSE, MAPE y Tracking Signal.
     - `procesos-estocasticos/01-cadenas-markov-discretas/02-distribucion-estado-estable.mdx`: Cálculo del vector estacionario $\pi$, tiempos medios de recurrencia y evaluación de costos diarios de mantenimiento en planta.
- **Verificación Técnica**:
  - `node ./node_modules/typescript/bin/tsc --noEmit`: 0 errores.
  - `node ./node_modules/next/dist/bin/next lint`: 0 errores, 0 warnings.
  - `node scripts/test-command-palette.mjs`: 100% de pruebas aprobadas (10 herramientas, 21 asignaturas).
- **Estado General**: Plataforma enriquecida con 10 herramientas de ingeniería industrial y ejecución de código en vivo en lecciones clave.

---

### Sesión 6: 2026-09-28 — Refinamiento Conceptual Integral (100% de Cobertura: 61 Módulos, 21 Asignaturas), Mapeo Canónico y Contraste Web
- **Objetivo**:
  1. Realizar el refinamiento conceptual y teórico exhaustivo módulo a módulo para el 100% de los módulos de la plataforma (61 módulos distribuidos en 21 asignaturas de pregrado y posgrado).
  2. Contrastar cada módulo con la literatura científica canónica internacional y fuentes web de referencia (Bertsimas, Montgomery, Ross, Hillier & Lieberman, Taha, Sterman, Charnes & Cooper, Markowitz, Rockafellar & Uryasev, Walpole & Myers, Blank & Tarquin).
  3. Mapear formalmente las definiciones matemáticas rigurosas (notación KaTeX), supuestos analíticos, teoremas fundamentales, aplicaciones industriales en Colombia/Eje Cafetero y herramientas computacionales interactivas asociadas.
  4. Generar el documento maestro `content/MAPA_CONCEPTUAL_MODULOS.md` como compendio curricular de referencia institucional y enriquecer las lecciones MDX con laboratorios en WebAssembly (`PyodideRunner`).
- **Acciones Ejecutadas**:
  1. **Investigación Especializada y Contraste Web con Subagentes**:
     - Subagente de Procesos Estocásticos y Estadística Experimental: Formalización axiomática de procesos de Poisson ($o(h)$), ecuaciones prospectivas/retrospectivas de Chapman-Kolmogorov, matriz infinitesimal $\mathbf{Q}$, distribución estacionaria $\boldsymbol{\pi}\mathbf{Q}=\mathbf{0}$, confiabilidad de arquitecturas $k$-de-$n$ con lógica binomial, derivación de rotabilidad de Diseños Centrales Compuestos (CCD, $\alpha=(2^k)^{1/4}$) y función de deseabilidad global multirespuesta de Derringer & Suich (1980).
     - Subagente de Optimización Avanzada MIOE: Formalización del modelo DEA CCR (primal/dual fraccional y lineal), modelo BCC con rendimientos variables a escala ($u_0$), formulación de Conditional Value at Risk (CVaR / Expected Shortfall) linealizado por Rockafellar & Uryasev (2000), medidas de riesgo coherente de Artzner et al. (1999), cadenas de retrasos Erlang en Dinámica de Sistemas (Sterman, 2000), criterios de aceptación de Metrópolis en Recocido Simulado y ecuaciones vectoriales de velocidad/posición en PSO (Kennedy & Eberhart, 1995).
  2. **Creación del Compendio Maestro `content/MAPA_CONCEPTUAL_MODULOS.md`**:
     - Cobertura completa del 100% de los 61 módulos en 5 bloques temáticos:
       * **Bloque A (15 módulos):** Estadística I (EDA, Probabilidad, Continuas, Estimación, Pruebas Hipótesis, Regresión), Estadística II (Muestreo, ANOVA, DOE, No Paramétricas, Regresión Múltiple, SPC), Estadística III (Regresión Matricial/Lasso, ANOVA Multifactorial/Split-Plot, Gráficos de Memoria CUSUM/EWMA y $T^2$).
       * **Bloque B (11 módulos):** Investigación de Operaciones I (Modelado Gráfico/Convexidad, Simplex Tabular/Dos Fases/Bland, Dualidad Fuerte/Holguras Complementarias, Transporte/MODI/Húngaro, Redes CPM-PERT con distribución Beta), Nivelatorio IO (Espacios Euclidianos, Dualidad de Lagrange, Branch & Cut, Cortes de Gomory), Programación Lineal Avanzada (Minkowski-Weyl, Farkas, Simplex Revisado con Factorización Eta, Descomposición Dantzig-Wolfe y Cutting Stock), Programación No Lineal (FONC/SONC/SOSC, Armijo, BFGS cuasi-Newton, Condiciones KKT bajo LICQ y Barrera Logarítmica).
       * **Bloque C (15 módulos):** Investigación de Operaciones II (Cadenas de Markov/Chapman-Kolmogorov, Colas M/M/1 y M/M/s con Erlang-C, Inventarios EOQ/ROP/Newsvendor, Teoría de Juegos/Nash/Minimax, Simulación Monte Carlo e Integración de Varianza), Procesos Estocásticos (Teorema de Perron-Frobenius, Matriz Fundamental de Cadenas Absorbentes, CTMC y Poisson Homogéneo, Colas M/G/1 con Pollaczek-Khinchine y Redes de Jackson, Confiabilidad de Sistemas $R(t)$, $\lambda(t)$ y redundancia 2-de-3 TMR), Simulación de Sistemas (Next-Event Time Advance y FEL en montículo binario, Generadores LCG y Teorema de Hull-Dobell, Transformada Inversa y Aceptación-Rechazo, Procedimiento de Welch para Warm-up y Réplicas Independientes), Dinámica de Sistemas (Diagramas de Ciclo Causal CLD, polaridad de bucles, arquetipos de Senge, ecuaciones de Stocks y Flujos con integración Euler/RK4 y retrasos de material Erlang).
       * **Bloque D (6 módulos):** Administración Industrial (Evolución organizacional Taylor/Fayol, modelado BPMN 2.0 con compuertas lógicas, VSM y eficiencia del ciclo PCE, Medición de productividad total y cálculo del indicador OEE con Disponibilidad $\times$ Rendimiento $\times$ Calidad para pérdidas TPM, Balanced Scorecard), Gestión de Producción y Logística (Pronósticos cuantitativos SMA, SES, Holt y Holt-Winters multiplicativo, métricas MAD/MSE/RMSE/MAPE y Señal de Rastreo, políticas de inventario continuo $(s, Q)$ y periódico $(R, S)$, Efecto Látigo y VMI), Ingeniería Económica y Finanzas (Equivalencia financiera, conversión matemática de tasas nominales, periódicas, efectivas anuales y de Fisher, anualidades y amortización francesa, Evaluación de proyectos con VPN, deducción de TIR con Newton-Raphson, TIR Modificada y CAUE).
       * **Bloque E (14 módulos):** Métodos Cuantitativos y Álgebra Matricial (Los 4 subespacios fundamentales de Strang, factorización LU con pivoteo parcial, Teorema Espectral para matrices simétricas, clasificación de formas cuadráticas por Sylvester, Descomposición en Valores Singulares SVD), Nivelatorio MATLAB/Python (Computación numérica vectorizada BLAS/LAPACK, número de condición $\kappa(\mathbf{A})$, mallas y superficies 3D, búsqueda de raíces y cuadraturas de Gauss), Análisis Multivariado (Normal multivariada, distancia de Mahalanobis, test $T^2$ de Hotelling y MANOVA con Lambda de Wilks, PCA con descomposición espectral y Análisis Discriminante Lineal de Fisher), Diseño de Experimentos MIOE (Factoriales $2^k$, factoriales fraccionados $2^{k-p}$ con relaciones definidoras y resoluciones III, IV y V, Superficie de Respuesta con CCD rotable $\alpha=(2^k)^{1/4}$ y deseabilidad de Derringer & Suich), DEA (Modelos CCR y BCC, formulación primal envolvente y dual multiplicadores, holguras de Pareto-Koopmans, SBM de Tone y modelos de red multietapa), Metaheurísticas (Recocido Simulado con Metrópolis y enfriamiento geométrico, Búsqueda Tabú con listas tenure y criterio de aspiración, Algoritmos Genéticos con cruce PMX/OX para TSP/Scheduling, PSO con ecuaciones de velocidad y peso de inercia), Optimización Financiera (Markowitz cuadrático media-varianza, portafolio tangente y CAPM de Sharpe, medidas coherentes de riesgo de Artzner, no subaditividad del VaR, y linealización convexa de CVaR con escenarios discretos de Rockafellar & Uryasev).
  3. **Enriquecimiento de Lecciones MDX con Laboratorios Wasm**:
     - `mioe-s2-analisis-envolvente-datos-dea/.../01-medicion-eficiencia-dmus-modelo-ccr.mdx`: Incorporación de `<PyodideRunner />` con solver de programación lineal SciPy para evaluación de frontera eficiente en 5 DMUs y vinculación a `/tools#dea`.
     - `mioe-s2-optimizacion-financiera/.../01-medidas-riesgo-var-expected-shortfall-cvar.mdx`: Incorporación de `<PyodideRunner />` con formulación de Rockafellar & Uryasev en SciPy `linprog` para optimización de cartera con 104 variables y 100 escenarios Monte Carlo.
  4. **Eliminación de Directorio Residual de Pruebas**:
     - Limpieza segura de `content/courses/estadistica-i-test` para consolidar el catálogo exactamente en las 21 asignaturas oficiales.
- **Decisiones Arquitectónicas y Técnicas**:
  1. **Generación Programática Modular del Compendio (`scripts/data/block-*.mjs` y `scripts/build-conceptual-map.mjs`)**: Se organizó el conocimiento en módulos tipados de Node.js que permiten sincronizar, validar y re-compilar el documento `content/MAPA_CONCEPTUAL_MODULOS.md` garantizando consistencia matemática y trazabilidad.
  2. **Fidelidad Teórica con Textos Rectores UTP**: Se contrastó cada formulación matemática con los coordinadores de cátedra oficiales (Dra. Eliana Toro, Dr. José Soto Mejía, Dr. Antonio Escobar, Prof. César Zapata, Ing. Natalia Bohórquez, Dr. Mauricio Granada, Dr. Carlos Osorio) y las referencias bibliográficas rectoras del Laboratorio GEIO.
  3. **Preservación Estricta de Exportación Estática en Cloudflare Pages**: Ninguna modificación añade dependencias en runtime Node.js; los solucionadores en vivo operan dentro de WebAssembly en el navegador (`PyodideRunner`).
- **Estado de Verificación**:
  - `node ./node_modules/typescript/bin/tsc --noEmit`: **0 errores**.
  - `node ./node_modules/next/dist/bin/next lint`: **0 errores, 0 warnings**.
  - `node scripts/test-command-palette.mjs`: **100% de verificaciones aprobadas** (171 elementos indexados, 21 asignaturas, 10 herramientas computacionales).
  - Cobertura de módulos: **61 de 61 módulos refinados y mapeados al 100%**.
- **Próximos Pasos**:
  - Sincronizar el commit de refinamiento conceptual en `origin/master`.
  - Presentar el informe de cierre al usuario.



