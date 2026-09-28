# Mapa Conceptual y Refinamiento Teórico de Módulos Curriculares
> **Facultad de Ingeniería Industrial — Universidad Tecnológica de Pereira (UTP)**  
> **Área Académica:** Investigación de Operaciones y Estadística  
> **Laboratorio Asociado:** Laboratorio GEIO (Gestión y Estudios en Investigación de Operaciones)  
> **Documento Maestro de Cobertura Integral (100% de los 61 Módulos Curriculares - 21 Asignaturas)**

---

## 1. Presentación y Propósito Formativo

El presente documento constituye el **compendio canónico de refinamiento conceptual y matemático** de la totalidad de asignaturas del Área de Investigación de Operaciones y Estadística de la Facultad de Ingeniería Industrial de la Universidad Tecnológica de Pereira (UTP). 

Cada módulo curricular ha sido analizado, formalizado y contrastado con la literatura científica internacional más prestigiosa y las fuentes académicas canónicas (Bertsimas, Montgomery, Ross, Hillier & Lieberman, Taha, Sterman, Charnes & Cooper, Markowitz, Rockafellar & Uryasev, Walpole & Myers, Blank & Tarquin).

### Estructura Estándar de Refinamiento por Módulo:
1. **Identificación Institucional:** Código oficial UTP, nombre de la asignatura, número de módulo, título y coordinación académica responsable.
2. **Competencias y Resultados de Aprendizaje:** Capacidades específicas del ingeniero industrial o magíster en IO y Estadística.
3. **Fundamentación Teórica y Formulación Matemática:** Definiciones rigurosas, deducción analítica de teoremas, supuestos formales y formulación KaTeX.
4. **Literatura Canónica & Contraste Web:** Obras rectoras, aportes teóricos de los autores y discusión de validez.
5. **Aplicación Práctica en Ingeniería Industrial:** Casos concretos de optimización de planta, calidad, logística o finanzas en el contexto de Colombia y el Eje Cafetero.
6. **Mapeo de Herramienta Computacional:** Vinculación directa con la suite de herramientas interactivas (`/tools#...`) o laboratorios de código en vivo en WebAssembly (`<PyodideRunner />`).

---

## 2. Índice General de Asignaturas y Módulos (61 Módulos)

### Bloque A: Probabilidad, Inferencia y Estadística Aplicada (15 Módulos)

- **Estadística I [II4D3]**:
  * [Módulo 1: Análisis Exploratorio de Datos (EDA)](#ii4d3-m1)
  * [Módulo 2: Probabilidad y Variables Aleatorias Discretas](#ii4d3-m2)
  * [Módulo 3: Distribuciones de Probabilidad Continuas](#ii4d3-m3)
  * [Módulo 4: Inferencia Estadística y Estimación Paramétrica](#ii4d3-m4)
  * [Módulo 5: Pruebas de Hipótesis Paramétricas](#ii4d3-m5)
  * [Módulo 6: Regresión Lineal Simple y Correlación](#ii4d3-m6)

- **Estadística II [II5A3]**:
  * [Módulo 1: Métodos de Muestreo y Distribuciones Muestrales](#ii5a3-m1)
  * [Módulo 2: Análisis de Varianza (ANOVA)](#ii5a3-m2)
  * [Módulo 3: Principios de Diseño de Experimentos (DOE)](#ii5a3-m3)
  * [Módulo 4: Pruebas No Paramétricas y Bondad de Ajuste](#ii5a3-m4)
  * [Módulo 5: Regresión Lineal Múltiple y Diagnóstico](#ii5a3-m5)
  * [Módulo 6: Control Estadístico de la Calidad (SPC)](#ii5a3-m6)

- **Estadística III [II6A2]**:
  * [Módulo 1: Regresión Múltiple Matricial y Selección de Variables](#ii6a2-m1)
  * [Módulo 2: Diseño de Experimentos y ANOVA Multifactorial](#ii6a2-m2)
  * [Módulo 3: Control Estadístico de Calidad Avanzado](#ii6a2-m3)

### Bloque B: Optimización Determinística e Investigación de Operaciones (11 Módulos)

- **Investigación de Operaciones I [II7D3]**:
  * [Módulo 1: Modelación Matemática y Método Gráfico](#ii7d3-m1)
  * [Módulo 2: El Algoritmo Simplex Tabular y Dos Fases](#ii7d3-m2)
  * [Módulo 3: Teoría de la Dualidad y Análisis de Sensibilidad](#ii7d3-m3)
  * [Módulo 4: Modelos de Transporte y Asignación](#ii7d3-m4)
  * [Módulo 5: Optimización de Redes y Gestión de Proyectos (PERT/CPM)](#ii7d3-m5)

- **Fundamentos de Investigación de Operaciones (Nivelatorio MIOE) [IOA10]**:
  * [Módulo 1: Modelado Matemático y Dualidad Rigurosa](#ioa10-m1)
  * [Módulo 2: Algoritmos y Solvers Computacionales](#ioa10-m2)

- **Programación Lineal Avanzada [IO113]**:
  * [Módulo 1: Teoría Poliédrica y Simplex Revisado](#io113-m1)
  * [Módulo 2: Descomposición de Dantzig-Wolfe y Generación de Columnas](#io113-m2)

- **Programación No Lineal [IO213]**:
  * [Módulo 1: Optimización Sin Restricciones y Métodos Cuasi-Newton](#io213-m1)
  * [Módulo 2: Optimización con Restricciones y Condiciones KKT](#io213-m2)

### Bloque C: Procesos Estocásticos, Colas y Simulación (15 Módulos)

- **Investigación de Operaciones II [II8B3]**:
  * [Módulo 1: Procesos Estocásticos y Cadenas de Markov](#ii8b3-m1)
  * [Módulo 2: Teoría de Líneas de Espera (Colas)](#ii8b3-m2)
  * [Módulo 3: Teoría y Modelos de Inventarios](#ii8b3-m3)
  * [Módulo 4: Teoría de Juegos y Decisiones Estratégicas](#ii8b3-m4)
  * [Módulo 5: Simulación de Eventos Discretos y Monte Carlo](#ii8b3-m5)

- **Procesos Estocásticos [II713]**:
  * [Módulo 1: Cadenas de Markov Discretas (DTMC)](#ii713-m1)
  * [Módulo 2: Procesos de Poisson y Cadenas de Tiempo Continuo (CTMC)](#ii713-m2)
  * [Módulo 3: Teoría de Colas y Líneas de Espera Avanzada](#ii713-m3)
  * [Módulo 4: Confiabilidad de Sistemas Industriales](#ii713-m4)

- **Simulación de Sistemas [II863]**:
  * [Módulo 1: Simulación de Eventos Discretos y Mecanismo de Reloj](#ii863-m1)
  * [Módulo 2: Generación y Pruebas de Números Pseudoaleatorios](#ii863-m2)
  * [Módulo 3: Generación de Variables Aleatorias y Monte Carlo](#ii863-m3)
  * [Módulo 4: Análisis de Salida, Transitorio y Validación](#ii863-m4)

- **Simulación de Dinámica de Sistemas [IO143]**:
  * [Módulo 1: Pensamiento Sistémico y Diagramas de Ciclo Causal](#io143-m1)
  * [Módulo 2: Modelado de Niveles, Flujos y Retrasos de Información](#io143-m2)

### Bloque D: Producción, Logística, Economía y Gestión (6 Módulos)

- **Administración Industrial [II152]**:
  * [Módulo 1: Teoría Organizacional y Modelado de Procesos](#ii152-m1)
  * [Módulo 2: Gestión Estratégica, Productividad y OEE](#ii152-m2)

- **Gestión de la Producción y Logística [II723]**:
  * [Módulo 1: Pronósticos Cuantitativos de Demanda](#ii723-m1)
  * [Módulo 2: Gestión de Inventarios y Cadena de Suministro](#ii723-m2)

- **Ingeniería Económica y Finanzas [II543]**:
  * [Módulo 1: Matemáticas Financieras y Valor del Dinero en el Tiempo](#ii543-m1)
  * [Módulo 2: Evaluación de Proyectos de Inversión (VPN / TIR)](#ii543-m2)

### Bloque E: Posgrado Avanzado MIOE y Métodos Cuantitativos (14 Módulos)

- **Métodos Cuantitativos y Álgebra Matricial [CB213]**:
  * [Módulo 1: Álgebra Lineal Matricial y Sistemas de Ecuaciones](#cb213-m1)
  * [Módulo 2: Autovalores, Formas Cuadráticas y Optimización](#cb213-m2)

- **Computación Científica y Álgebra Matricial: MATLAB y Python [IOD10]**:
  * [Módulo 1: Álgebra Matricial y Computación Numérica Vectorizada](#iod10-m1)
  * [Módulo 2: Estructuras de Datos, Visualización y Algoritmos](#iod10-m2)

- **Análisis Multivariado [IO123]**:
  * [Módulo 1: Distribución Normal Multivariada y Test T² de Hotelling](#io123-m1)
  * [Módulo 2: Reducción de Dimensionalidad (PCA) y Clasificación](#io123-m2)

- **Diseño de Experimentos y Superficie de Respuesta [IO133]**:
  * [Módulo 1: Diseños Factoriales Completos y Fraccionados](#io133-m1)
  * [Módulo 2: Metodología de Superficie de Respuesta (RSM) y Deseabilidad](#io133-m2)

- **Análisis Envolvente de Datos (DEA) [IO243]**:
  * [Módulo 1: Fundamentos de Eficiencia y Modelos CCR y BCC](#io243-m1)
  * [Módulo 2: Slacks, Benchmarking y Modelos en Red](#io243-m2)

- **Metaheurísticas y Optimización Combinatoria [IO223]**:
  * [Módulo 1: Metaheurísticas de Trayectoria (SA y Tabú)](#io223-m1)
  * [Módulo 2: Metaheurísticas Poblacionales (GA y PSO)](#io223-m2)

- **Optimización Financiera y Gestión de Riesgo [IO233]**:
  * [Módulo 1: Teoría Clásica de Portafolio y Modelo de Markowitz](#io233-m1)
  * [Módulo 2: Medidas de Riesgo Coherente (CVaR) y Optimización Estocástica](#io233-m2)

---

## 3. Desarrollo Detallado Módulo a Módulo (Refinamiento al 100%)


# Bloque A: Probabilidad, Inferencia y Estadística Aplicada

<a id="ii4d3-m1"></a>
## [II4D3] Estadística I — Módulo 1: Análisis Exploratorio de Datos (EDA)

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Capacidad para sintetizar distribuciones empíricas de datos industriales mediante estadísticos de localización, dispersión y forma, identificando anomalías y asimetrías en procesos productivos.

### Fundamentación Teórica y Formulación Matemática

El Análisis Exploratorio de Datos (EDA) formaliza las propiedades muestrales de un vector aleatorio unidimensional $\mathbf{x} = (x_1, x_2, \dots, x_n) \in \mathbb{R}^n$.

1. **Medidas de Tendencia Central:**
   - Media muestral:
     $$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i$$
   - Mediana ($Me$): Valor que satisface $\mathbb{P}(X \le Me) \ge 0.5$ y $\mathbb{P}(X \ge Me) \ge 0.5$.
   - Media recortada al $\alpha\%$ (Trimmed Mean): Minimiza la influencia de valores extremos en las colas.

2. **Medidas de Dispersión y Escala:**
   - Varianza muestral insesgada ($s^2$):
     $$s^2 = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2$$
   - Desviación estándar: $s = \sqrt{s^2}$.
   - Rango intercuartílico ($IQR$):
     $$IQR = Q_3 - Q_1$$
   - Desviación absoluta respecto a la mediana ($MAD$):
     $$MAD = \text{mediana}(|x_i - \text{mediana}(\mathbf{x})|)$$

3. **Momentos de Orden Superior y Medidas de Forma:**
   - Coeficiente de asimetría de Fisher-Pearson ($g_1$):
     $$g_1 = \frac{m_3}{m_2^{3/2}} = \frac{\frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})^3}{\left( \frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})^2 \right)^{3/2}}$$
   - Coeficiente de curtosis de exceso ($g_2$):
     $$g_2 = \frac{m_4}{m_2^2} - 3 = \frac{\frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})^4}{\left( \frac{1}{n} \sum_{i=1}^n (x_i - \bar{x})^2 \right)^2} - 3$$
   *(Para una distribución Gaussiana pura, $g_1 = 0$ y $g_2 = 0$. Si $g_2 > 0$ es leptocúrtica; si $g_2 < 0$ es platicúrtica).*

4. **Regla de Tukey para Detección de Valores Atípicos (Outliers):**
   $$x \text{ es outlier leve si } x \in [Q_1 - 1.5 \cdot IQR, Q_1) \cup (Q_3, Q_3 + 1.5 \cdot IQR]$$
   $$x \text{ es outlier extremo si } x < Q_1 - 3 \cdot IQR \quad \lor \quad x > Q_3 + 3 \cdot IQR$$

**Literatura Canónica & Contraste Web:**
- **John W. Tukey (1977)** — *Exploratory Data Analysis*: Introducción axiomática del diagrama de caja y bigotes (Box-Plot) y resistencia a valores atípicos.
- **Walpole, Myers & Myers (2012)** — *Probabilidad y Estadística para Ingeniería y Ciencias*: Enfoque de síntesis numérica preliminar para control de calidad.
- **Rousseeuw & Croux (1993)** — Alternativas robustas al estimador de escala: $S_n$ y $Q_n$ con eficiencia del 58% y 82% bajo normalidad y punto de ruptura del 50%.

**Aplicación Industrial UTP:**
Auditoría dimensional de piezas torneadas en el Laboratorio GEIO. Detección de descalibraciones en centros de mecanizado CNC mediante monitoreo continuo del coeficiente de asimetría $g_1$ e identificación de outliers por desgaste de herramienta.

> **Interacción Computacional:** Herramienta: Visualizador Interactivo de Distribuciones y Código Python Wasm `<PyodideRunner />` (cálculo de $s, IQR, g_1, g_2$ con NumPy/SciPy).

---

<a id="ii4d3-m2"></a>
## [II4D3] Estadística I — Módulo 2: Probabilidad y Variables Aleatorias Discretas

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Dominio de la teoría de conjuntos y probabilidad axiomática de Kolmogórov, probabilidad condicional, independencia estocástica y modelación de procesos de conteo discretos.

### Fundamentación Teórica y Formulación Matemática

1. **Axiomas de Kolmogórov (1933):**
   Dado un espacio muestral $\Omega$ y una $\sigma$-álgebra $\mathcal{F}$ de subconjuntos de $\Omega$:
   - Axioma 1: $\mathbb{P}(A) \ge 0, \quad \forall A \in \mathcal{F}$.
   - Axioma 2: $\mathbb{P}(\Omega) = 1$.
   - Axioma 3 ($\sigma$-aditividad): Si $A_1, A_2, \dots$ son eventos disjuntos dos a dos ($A_i \cap A_j = \emptyset, \forall i \ne j$):
     $$\mathbb{P}\left( \bigcup_{i=1}^\infty A_i \right) = \sum_{i=1}^\infty \mathbb{P}(A_i)$$

2. **Probabilidad Condicional y Teorema de Bayes:**
   - Probabilidad condicional: $\mathbb{P}(A \mid B) = \frac{\mathbb{P}(A \cap B)}{\mathbb{P}(B)}$, con $\mathbb{P}(B) > 0$.
   - Teorema de la Probabilidad Total: Si ${B_1, \dots, B_k}$ es una partición de $\Omega$:
     $$\mathbb{P}(A) = \sum_{j=1}^k \mathbb{P}(A \mid B_j) \mathbb{P}(B_j)$$
   - Teorema de Bayes:
     $$\mathbb{P}(B_i \mid A) = \frac{\mathbb{P}(A \mid B_i) \mathbb{P}(B_i)}{\sum_{j=1}^k \mathbb{P}(A \mid B_j) \mathbb{P}(B_j)}$$

3. **Distribuciones Discretas Paramétricas:**
   - **Binomial:** $X \sim \text{Bin}(n, p)$, $p(x) = \binom{n}{x} p^x (1-p)^{n-x}$, $\mathbb{E}[X] = np$, $\text{Var}(X) = np(1-p)$.
   - **Poisson:** $X \sim \text{Poisson}(\lambda)$, $p(x) = \frac{e^{-\lambda} \lambda^x}{x!}$, $\mathbb{E}[X] = \text{Var}(X) = \lambda$.
   - **Hipergeométrica:** $X \sim \text{Hiper}(N, K, n)$, $p(x) = \frac{\binom{K}{x} \binom{N-K}{n-x}}{\binom{N}{n}}$, muestreo sin reemplazo en lotes finitos.
   - **Geométrica y Binomial Negativa:** Ensayos de Bernoulli hasta el $r$-ésimo éxito.

**Literatura Canónica & Contraste Web:**
- **Kolmogórov (1933)** — *Grundbegriffe der Wahrscheinlichkeitsrechnung*: Base axiomática de la teoría moderna de probabilidad.
- **Sheldon Ross (2014)** — *A First Course in Probability*: Modelado riguroso de variables aleatorias discretas y aplicaciones de confiabilidad.
- **William Feller (1968)** — *An Introduction to Probability Theory and Its Applications*: Referencia histórica de procesos discretos y combinatoria.

**Aplicación Industrial UTP:**
Planes de muestreo de aceptación militar (MIL-STD-105E / ANSI/ASQ Z1.4). Modelado de la probabilidad de aceptar un lote defectuoso mediante distribución Hipergeométrica frente a su aproximación Binomial y Poisson en inspección de materias primas.

> **Interacción Computacional:** Herramienta: Calculadora de Probabilidad Discreta e Inferencia de Muestreo en `/tools`.

---

<a id="ii4d3-m3"></a>
## [II4D3] Estadística I — Módulo 3: Distribuciones de Probabilidad Continuas

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Capacidad para caracterizar fenómenos físicos, tiempos de vida y dimensiones continuas en manufactura usando densidades Normal, Exponencial, Gamma y Weibull.

### Fundamentación Teórica y Formulación Matemática

1. **Variables Aleatorias Continuas y Funciones Acumuladas:**
   - Función de densidad de probabilidad (PDF) $f(x) \ge 0$, $\int_{-\infty}^\infty f(x) dx = 1$.
   - Función de distribución acumulada (CDF): $F(x) = \mathbb{P}(X \le x) = \int_{-\infty}^x f(u) du$.
   - Esperanza y Varianza: $\mathbb{E}[X] = \int_{-\infty}^\infty x f(x) dx$, $\text{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$.

2. **Distribución Normal (Gaussiana):**
   - $X \sim \mathcal{N}(\mu, \sigma^2)$, con PDF:
     $$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)$$
   - Estandarización a la normal estándar $Z = \frac{X - \mu}{\sigma} \sim \mathcal{N}(0, 1)$, $\Phi(z) = \int_{-\infty}^z \frac{1}{\sqrt{2\pi}} e^{-u^2/2} du$.
   - Teorema de Gauss-Markov y regla empírica $\mu \pm 1\sigma (68.27\%), \mu \pm 2\sigma (95.45\%), \mu \pm 3\sigma (99.73\%)$.

3. **Distribución Exponencial y Tiempo de Vida:**
   - $X \sim \text{Exp}(\lambda)$, $f(x) = \lambda e^{-\lambda x}$ para $x \ge 0$.
   - Propiedad de falta de memoria: $\mathbb{P}(X > t + s \mid X > s) = \mathbb{P}(X > t) = e^{-\lambda t}$.

4. **Distribución Weibull (Confiabilidad y Fatiga de Materiales):**
   - PDF biparamétrica:
     $$f(t) = \frac{\beta}{\eta} \left( \frac{t}{\eta} \right)^{\beta - 1} \exp\left( -\left( \frac{t}{\eta} \right)^\beta \right), \quad t \ge 0$$
   - $\beta$ (parámetro de forma): $\beta < 1$ mortalidad infantil; $\beta = 1$ tasa constante (exponencial); $\beta > 1$ desgaste y envejecimiento físico.
   - $\eta$ (parámetro de escala o vida característica): $F(\eta) = 1 - e^{-1} \approx 63.2\%$.

**Literatura Canónica & Contraste Web:**
- **Walpole, Myers, Myers & Ye (2012)**: *Probability & Statistics for Engineers & Scientists*.
- **Abernethy (2006)** — *The New Weibull Handbook*: Estándar aeroespacial y automotriz para análisis de supervivencia y fatiga de componentes.
- **Montgomery & Runger (2018)**: *Applied Statistics and Probability for Engineers*.

**Aplicación Industrial UTP:**
Determinación de tiempos de garantía y análisis de falla prematura de motores eléctricos industriales mediante ajuste de parámetros Weibull (estimación por máxima verosimilitud y papel probabilístico Weibull).

> **Interacción Computacional:** Herramienta: Simulador Monte Carlo (`/tools#montecarlo`) y generador de variables continuas vía transformada inversa.

---

<a id="ii4d3-m4"></a>
## [II4D3] Estadística I — Módulo 4: Inferencia Estadística y Estimación Paramétrica

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Capacidad para estimar parámetros poblacionales mediante métodos puntuales y por intervalos de confianza, evaluando propiedades de insesgadez, consistencia y eficiencia mínima.

### Fundamentación Teórica y Formulación Matemática

1. **Propiedades Axiomáticas de los Estimadores Puntuales:**
   Sea $\hat{\theta} = g(X_1, \dots, X_n)$ un estimador de $\theta$:
   - **Insesgadez:** $\text{Sesgo}(\hat{\theta}) = \mathbb{E}[\hat{\theta}] - \theta = 0$.
   - **Error Cuadrático Medio (MSE):**
     $$\text{MSE}(\hat{\theta}) = \mathbb{E}[(\hat{\theta} - \theta)^2] = \text{Var}(\hat{\theta}) + [\text{Sesgo}(\hat{\theta})]^2$$
   - **Cota Inferior de Cramér-Rao (CRLB):**
     $$\text{Var}(\hat{\theta}) \ge \frac{1}{I(\theta)} = \frac{1}{n \mathbb{E}\left[ \left( \frac{\partial \ln f(X; \theta)}{\partial \theta} \right)^2 \right]}$$
     Si $\text{Var}(\hat{\theta}) = 1/I(\theta)$, $\hat{\theta}$ es el Estimador Insesgado de Varianza Mínima Uniforme (UMVUE).

2. **Métodos de Estimación:**
   - **Máxima Verosimilitud (MLE):**
     $$L(\theta; \mathbf{x}) = \prod_{i=1}^n f(x_i; \theta), \qquad \hat{\theta}_{\text{MLE}} = \arg\max_\theta \ln L(\theta; \mathbf{x})$$
   - **Método de los Momentos (MOM):** Igualación de momentos muestrales $\frac{1}{n} \sum x_i^k$ con momentos teóricos $\mathbb{E}[X^k]$.

3. **Intervalos de Confianza (Método del Pivote):**
   - Media $\mu$ con varianza conocida $\sigma^2$:
     $$\bar{x} \pm Z_{\alpha/2} \frac{\sigma}{\sqrt{n}}$$
   - Media $\mu$ con varianza desconocida (Gosset, 1908):
     $$\bar{x} \pm t_{\alpha/2, n-1} \frac{s}{\sqrt{n}}$$
   - Varianza poblacional $\sigma^2$:
     $$\left[ \frac{(n-1)s^2}{\chi^2_{\alpha/2, n-1}}, \frac{(n-1)s^2}{\chi^2_{1-\alpha/2, n-1}} \right]$$

**Literatura Canónica & Contraste Web:**
- **Casella & Berger (2002)** — *Statistical Inference*: Tratamiento riguroso de la información de Fisher, suficiencia (Teorema de Neyman-Fisher) y completitud (Lehmann-Scheffé).
- **Cramér (1946)** — *Mathematical Methods of Statistics*: Cota de varianza asintótica para estimadores MLE.
- **Student (William Sealy Gosset, 1908)** — *The Probable Error of a Mean*: Derivación exacta de la distribución $t$.

**Aplicación Industrial UTP:**
Estimación de la resistencia media a la compresión de probetas de concreto elaboradas en proyectos de infraestructura del Eje Cafetero, estableciendo márgenes de error al 95% y 99% de confianza según la norma NTC/ASTM.

> **Interacción Computacional:** Herramienta: Demostrador interactivo de Intervalos de Confianza en la landing page y banco de cálculo en `/tools`.

---

<a id="ii4d3-m5"></a>
## [II4D3] Estadística I — Módulo 5: Pruebas de Hipótesis Paramétricas

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Diseño y ejecución de contrastes de hipótesis estadísticos, controlando las tasas de error Tipo I ($\alpha$) y Tipo II ($\beta$) y evaluando la potencia analítica de la prueba.

### Fundamentación Teórica y Formulación Matemática

1. **Estructura Formal del Contraste:**
   - Hipótesis Nula $H_0: \theta \in \Theta_0$ frente a Hipótesis Alternativa $H_1: \theta \in \Theta_1$.
   - **Error Tipo I ($\alpha$):** $\mathbb{P}(\text{Rechazar } H_0 \mid H_0 \text{ es verdadera}) = \alpha$ (Nivel de significancia).
   - **Error Tipo II ($\beta$):** $\mathbb{P}(\text{No rechazar } H_0 \mid H_1 \text{ es verdadera}) = \beta$.
   - **Potencia de la prueba:** $1 - \beta = \mathbb{P}(\text{Rechazar } H_0 \mid H_1 \text{ es verdadera})$.

2. **Lema Fundamental de Neyman-Pearson (1933):**
   Para contrastar hipótesis simples $H_0: \theta = \theta_0$ vs $H_1: \theta = \theta_1$, el test más potente de tamaño $\alpha$ rechaza $H_0$ si la razón de verosimilitudes satisface:
   $$\Lambda(\mathbf{x}) = \frac{L(\theta_0; \mathbf{x})}{L(\theta_1; \mathbf{x})} \le k$$

3. **Estadísticos de Contraste Clásicos:**
   - Prueba $Z$ para una media (varianza conocida):
     $$Z_0 = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}} \sim \mathcal{N}(0, 1)$$
   - Prueba $t$ de Student para una media (varianza desconocida):
     $$t_0 = \frac{\bar{x} - \mu_0}{s / \sqrt{n}} \sim t_{n-1}$$
   - Prueba $t$ para dos muestras independientes con varianzas iguales agrupadas ($s_p^2$):
     $$t_0 = \frac{(\bar{x}_1 - \bar{x}_2) - \Delta_0}{s_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}, \qquad s_p^2 = \frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2}$$
   - Prueba $t$ de Welch (varianzas desiguales): Grados de libertad de Satterthwaite.
   - Prueba $F$ de Fisher-Snedecor para igualdad de dos varianzas:
     $$F_0 = \frac{s_1^2}{s_2^2} \sim F_{n_1-1, n_2-1}$$

4. **El Valor $p$ (p-value):**
   Mínimo nivel de significancia $\alpha$ para el cual los datos observados conducen al rechazo de $H_0$. Si $p \le \alpha$, se rechaza $H_0$.

**Literatura Canónica & Contraste Web:**
- **Neyman & Pearson (1933)** — *On the Problem of the Most Efficient Tests of Statistical Hypotheses*: Fundamentación de la teoría de decisión estadística óptima.
- **Lehmann & Romano (2005)** — *Testing Statistical Hypotheses*: Texto avanzado canónico para contrastes UMP (Uniformly Most Powerful).
- **Montgomery & Runger (2018)**: Metodología paso a paso para ingeniería de planta.

**Aplicación Industrial UTP:**
Validación de una nueva formulación polimérica en empaques biodegradables. Contraste de hipótesis bilateral para verificar si la resistencia media a la rotura supera el umbral crítico de 35 MPa con nivel de significancia $\alpha = 0.05$.

> **Interacción Computacional:** Herramienta: Laboratorio interactivo Pyodide con SciPy (`scipy.stats.ttest_ind`, `scipy.stats.f`) en lección oficial.

---

<a id="ii4d3-m6"></a>
## [II4D3] Estadística I — Módulo 6: Regresión Lineal Simple y Correlación

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Capacidad para modelar relaciones funcionales entre variables continuas de ingeniería mediante mínimos cuadrados ordinarios, evaluar bondad de ajuste ($R^2$) y validar supuestos de residuos.

### Fundamentación Teórica y Formulación Matemática

1. **Modelo Poblacional de Regresión Lineal Simple:**
   $$Y_i = \beta_0 + \beta_1 X_i + \epsilon_i, \quad i = 1, \dots, n$$
   **Supuestos de Gauss-Markov:**
   - Linealidad en parámetros: $\mathbb{E}[\epsilon_i] = 0$.
   - Homocedasticidad: $\text{Var}(\epsilon_i) = \sigma^2, \forall i$.
   - No autocorrelación: $\text{Cov}(\epsilon_i, \epsilon_j) = 0, \forall i \ne j$.
   - Normalidad: $\epsilon_i \overset{\text{iid}}{\sim} \mathcal{N}(0, \sigma^2)$.

2. **Deducción de los Estimadores MCO (Mínimos Cuadrados Ordinarios):**
   Minimizando la suma de errores al cuadrado:
   $$S(\beta_0, \beta_1) = \sum_{i=1}^n (Y_i - \beta_0 - \beta_1 X_i)^2$$
   Derivando e igualando a cero:
   $$\hat{\beta}_1 = \frac{S_{xy}}{S_{xx}} = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sum (X_i - \bar{X})^2}, \qquad \hat{\beta}_0 = \bar{Y} - \hat{\beta}_1 \bar{X}$$
   Estimador de la varianza residual:
   $$s^2 = \frac{SS_E}{n - 2} = \frac{\sum (Y_i - \hat{Y}_i)^2}{n - 2}$$

3. **Descomposición de la Variabilidad y Coeficiente de Determinación ($R^2$):**
   $$SS_T = SS_R + SS_E \iff \sum (Y_i - \bar{Y})^2 = \sum (\hat{Y}_i - \bar{Y})^2 + \sum (Y_i - \hat{Y}_i)^2$$
   $$R^2 = \frac{SS_R}{SS_T} = 1 - \frac{SS_E}{SS_T} = r_{xy}^2$$
   donde $r_{xy} = \frac{S_{xy}}{\sqrt{S_{xx} S_{yy}}}$ es el coeficiente de correlación lineal de Pearson.

4. **Inferencia sobre los Parámetros:**
   - Error estándar de $\hat{\beta}_1$: $SE(\hat{\beta}_1) = \frac{s}{\sqrt{S_{xx}}}$.
   - Estadístico $t$: $t_0 = \frac{\hat{\beta}_1 - \beta_{1,0}}{SE(\hat{\beta}_1)} \sim t_{n-2}$.
   - Análisis de Varianza de la Regresión: $F_0 = \frac{MS_R}{MS_E} = \frac{SS_R / 1}{SS_E / (n-2)} = t_0^2$.

**Literatura Canónica & Contraste Web:**
- **Montgomery, Peck & Vining (2012)** — *Introduction to Linear Regression Analysis*: El estándar dorado en econometría e ingeniería para regresión y diagnóstico residual.
- **Draper & Smith (1998)** — *Applied Regression Analysis*.
- **Gauss (1821) & Markov (1900)**: Teorema de Gauss-Markov sobre la optimalidad BLUE (Best Linear Unbiased Estimator).

**Aplicación Industrial UTP:**
Modelado del consumo horario de vapor industrial (kg/h) en función de la temperatura exterior (°C) en calderas de plantas azucareras y papeleras del Valle del Cauca y Risaralda, optimizando la factura energética.

> **Interacción Computacional:** Herramienta: Ajustador de Regresión OLS y Gráficos de Residuos en `/tools`.

---

<a id="ii5a3-m1"></a>
## [II5A3] Estadística II — Módulo 1: Métodos de Muestreo y Distribuciones Muestrales

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Diseño probabilístico de esquemas de muestreo estratificado y por conglomerados, aplicando el Teorema del Límite Central y las distribuciones Ji-cuadrado, t y F.

### Fundamentación Teórica y Formulación Matemática

1. **Teorema del Límite Central (Lindeberg-Lévy):**
   Sean $X_1, X_2, \dots, X_n$ variables aleatorias i.i.d. con $\mathbb{E}[X_i] = \mu$ y $\text{Var}(X_i) = \sigma^2 < \infty$. Cuando $n \to \infty$:
   $$Z_n = \frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \xrightarrow{d} \mathcal{N}(0, 1)$$

2. **Distribución de Formas Cuadráticas y Muestreo Gaussiano:**
   Si $X_i \overset{\text{iid}}{\sim} \mathcal{N}(\mu, \sigma^2)$:
   - $\bar{X} \sim \mathcal{N}(\mu, \sigma^2/n)$.
   - Teorema de Fisher: $\bar{X}$ y $S^2$ son estocásticamente independientes.
   - $\frac{(n-1)S^2}{\sigma^2} = \sum_{i=1}^n \left( \frac{X_i - \bar{X}}{\sigma} \right)^2 \sim \chi^2_{n-1}$.
   - $T = \frac{\bar{X} - \mu}{S / \sqrt{n}} \sim t_{n-1}$.
   - $F = \frac{S_1^2 / \sigma_1^2}{S_2^2 / \sigma_2^2} \sim F_{n_1-1, n_2-1}$.

3. **Muestreo Probabilístico en Poblaciones Finitas ($N$):**
   - Factor de corrección por población finita ($FPC$): $\sqrt{\frac{N - n}{N - 1}}$.
   - **Muestreo Estratificado:** Varianza mínima de Neyman:
     $$n_h = n \frac{N_h \sigma_h}{\sum_{k=1}^L N_k \sigma_k}$$
   - **Muestreo por Conglomerados (Cluster Sampling):** Estimador insesgado de razón y diseño bietápico.

**Literatura Canónica & Contraste Web:**
- **William G. Cochran (1977)** — *Sampling Techniques*: Referencia mundial para teoría y diseño de encuestas por muestreo y optimización de estratos.
- **Kish (1965)** — *Survey Sampling*: Concepto de efecto de diseño (deff) en muestreo complejo.
- **José A. Soto Mejía (UTP)**: Notas de cátedra de muestreo probabilístico para auditoría industrial.

**Aplicación Industrial UTP:**
Diseño de auditorías de inventario físico en bodegas con miles de SKUs mediante muestreo estratificado por regla ABC (Cost-Volume), reduciendo los costos de conteo en un 70% sin perder representatividad estadística.

> **Interacción Computacional:** Herramienta: Laboratorio interactivo Pyodide de distribuciones muestrales $\chi^2, t, F$ con SciPy.

---

<a id="ii5a3-m2"></a>
## [II5A3] Estadística II — Módulo 2: Análisis de Varianza (ANOVA)

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Capacidad para descomponer la varianza total de un experimento en fuentes atribuibles a tratamientos y error aleatorio, validando contrastes post-hoc de Tukey y Scheffé.

### Fundamentación Teórica y Formulación Matemática

1. **ANOVA Unifactorial (Completamente al Azar - CRD):**
   $$y_{ij} = \mu + \tau_i + \epsilon_{ij}, \quad i = 1, \dots, k; \quad j = 1, \dots, n_i$$
   con restricción $\sum_{i=1}^k n_i \tau_i = 0$ y $\epsilon_{ij} \overset{\text{iid}}{\sim} \mathcal{N}(0, \sigma^2)$.

2. **Identidad de Sumas de Cuadrados:**
   $$SS_T = SS_{\text{Trat}} + SS_E$$
   $$\sum_{i=1}^k \sum_{j=1}^{n_i} (y_{ij} - \bar{y}_{\cdot\cdot})^2 = \sum_{i=1}^k n_i (\bar{y}_{i\cdot} - \bar{y}_{\cdot\cdot})^2 + \sum_{i=1}^k \sum_{j=1}^{n_i} (y_{ij} - \bar{y}_{i\cdot})^2$$
   - Grados de libertad: $N - 1 = (k - 1) + (N - k)$, donde $N = \sum n_i$.
   - Cuadrados Medios: $MS_{\text{Trat}} = \frac{SS_{\text{Trat}}}{k - 1}$, $MS_E = \frac{SS_E}{N - k}$.
   - Estadístico de prueba:
     $$F_0 = \frac{MS_{\text{Trat}}}{MS_E} \sim F_{k-1, N-k}$$
     Bajo $H_0: \tau_1 = \dots = \tau_k = 0$, $\mathbb{E}[MS_{\text{Trat}}] = \mathbb{E}[MS_E] = \sigma^2$.

3. **Pruebas de Comparaciones Múltiples Post-Hoc:**
   - **Tukey HSD (Honestly Significant Difference):** Control del Error Rate por Familia (FWER):
     $$HSD = q_{\alpha, k, N-k} \sqrt{\frac{MS_E}{n}}$$
     donde $q$ es la distribución del rango estudentizado.
   - **Scheffé:** Válida para cualquier contraste lineal arbitrario $\sum c_i \mu_i$ con $\sum c_i = 0$.
   - **Bonferroni:** Ajuste conservador $\alpha / \binom{k}{2}$.

**Literatura Canónica & Contraste Web:**
- **Ronald A. Fisher (1925)** — *Statistical Methods for Research Workers*: Invención del ANOVA y la distribución $F$.
- **Douglas C. Montgomery (2017)** — *Design and Analysis of Experiments*: Referencia canónica internacional para ANOVA industrial.
- **Hochberg & Tamhane (1987)** — *Multiple Comparison Procedures*.

**Aplicación Industrial UTP:**
Comparación del rendimiento térmico de 4 tipos de catalizadores en biorrefinerías de bagazo de caña panelera, verificando mediante Tukey qué catalizadores presentan diferencias estadísticamente significativas.

> **Interacción Computacional:** Herramienta: Módulo ANOVA en `/tools` y visualizador de partición de varianzas.

---

<a id="ii5a3-m3"></a>
## [II5A3] Estadística II — Módulo 3: Principios de Diseño de Experimentos (DOE)

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Diseño riguroso de experimentos controlados empleando los tres principios fundamentales: aleatorización, replicación y bloqueo, controlando el sesgo sistemático.

### Fundamentación Teórica y Formulación Matemática

1. **Los Tres Principios Cardinales del DOE:**
   - **Aleatorización:** Garantiza que los errores experimentales $\epsilon_{ij}$ se comporten como variables aleatorias independientes e idénticamente distribuidas, previniendo sesgos por factores no controlados que varíen con el tiempo.
   - **Replicación:** Permite estimar la varianza intrínseca del error experimental $\sigma^2$ y aumenta la precisión y potencia de los contrastes ($SE = s/\sqrt{n}$).
   - **Bloqueo (Blocking):** Técnica para aislar y remover la variabilidad debida a factores perturbadores conocidos pero no de interés directo (ej. lotes de materia prima, turnos de operarios, máquinas).

2. **Diseño en Bloques Completos al Azar (RCBD):**
   $$y_{ij} = \mu + \tau_i + \beta_j + \epsilon_{ij}, \quad i = 1, \dots, a; \quad j = 1, \dots, b$$
   - Partición de varianza: $SS_T = SS_{\text{Trat}} + SS_{\text{Bloques}} + SS_E$.
   - Grados de libertad: $ab - 1 = (a - 1) + (b - 1) + (a - 1)(b - 1)$.
   - $F_{\text{Trat}} = \frac{MS_{\text{Trat}}}{MS_E}$, $F_{\text{Bloque}} = \frac{MS_{\text{Bloques}}}{MS_E}$.

3. **Diseños en Cuadrados Latinos ($p \times p$):**
   Permite controlar dos fuentes de variación perturbadoras simultáneamente (Filas y Columnas) con solo $p^2$ observaciones en lugar de $p^3$:
   $$y_{ijk} = \mu + \alpha_i + \tau_j + \beta_k + \epsilon_{ijk}$$
   $$SS_T = SS_{\text{Filas}} + SS_{\text{Trat}} + SS_{\text{Columnas}} + SS_E$$
   Grados de libertad del error: $(p - 1)(p - 2)$.

**Literatura Canónica & Contraste Web:**
- **Fisher (1935)** — *The Design of Experiments*: Texto fundacional del bloqueo y asignación aleatoria.
- **Box, Hunter & Hunter (2005)** — *Statistics for Experimenters*: Enfoque de ingeniería práctica y aprendizaje iterativo.
- **Montgomery (2017)**: Capítulos 3 y 4 sobre RCBD y Cuadrados Latinos.

**Aplicación Industrial UTP:**
Diseño en bloques para evaluar 3 velocidades de corte en tornos paralelos, usando como factor de bloqueo los 5 lotes de acero recibidos del proveedor metalmecánico, aislando la variabilidad del material del efecto de la máquina.

> **Interacción Computacional:** Herramienta: Generador de Matrices Experimentales DOE y ANOVA en `/tools`.

---

<a id="ii5a3-m4"></a>
## [II5A3] Estadística II — Módulo 4: Pruebas No Paramétricas y Bondad de Ajuste

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Aplicación de pruebas libres de distribución para datos ordinales o muestras con supuestos de normalidad violados, y contrastes de bondad de ajuste Ji-cuadrado y Kolmogorov-Smirnov.

### Fundamentación Teórica y Formulación Matemática

1. **Contrastes No Paramétricos Clásicos:**
   - **Prueba de los Signos:** Basada en la distribución $\text{Binomial}(n, 0.5)$ sobre el signo de las diferencias $x_i - \tilde{\mu}_0$.
   - **Prueba de Rangos con Signo de Wilcoxon (Muestras Pareadas):** Asigna rangos $|R_i|$ a las diferencias absolutas $|D_i| = |X_i - Y_i|$ y suma los rangos positivos $W^+$.
   - **Prueba U de Mann-Whitney (Suma de Rangos de Wilcoxon):** Alternativa no paramétrica a la prueba $t$ de dos muestras independientes:
     $$U_1 = R_1 - \frac{n_1(n_1 + 1)}{2}, \qquad U_2 = R_2 - \frac{n_2(n_2 + 1)}{2}$$
     con $U_1 + U_2 = n_1 n_2$.
   - **Prueba de Kruskal-Wallis:** Alternativa no paramétrica al ANOVA unifactorial:
     $$H = \frac{12}{N(N + 1)} \sum_{i=1}^k \frac{R_i^2}{n_i} - 3(N + 1) \sim \chi^2_{k-1}$$

2. **Pruebas de Bondad de Ajuste:**
   - **Ji-cuadrado de Pearson:**
     $$\chi_0^2 = \sum_{i=1}^k \frac{(O_i - E_i)^2}{E_i} \sim \chi^2_{k - 1 - p}$$
     donde $O_i$ son frecuencias observadas, $E_i = n p_i$ esperadas, y $p$ parámetros estimados por MLE.
   - **Kolmogorov-Smirnov (K-S):** Máxima discrepancia absoluta entre la CDF empírica $F_n(x)$ y la teórica $F_0(x)$:
     $$D_n = \sup_x |F_n(x) - F_0(x)|$$
   - **Anderson-Darling ($A^2$):** Pondera las colas con peso $\frac{1}{F_0(x)(1 - F_0(x))}$, más sensible para distribuciones de confiabilidad.

**Literatura Canónica & Contraste Web:**
- **Siegel & Castellan (1988)** — *Nonparametric Statistics for the Behavioral Sciences*.
- **Conover (1999)** — *Practical Nonparametric Statistics*: Texto de referencia para aplicaciones industriales.
- **Stephens (1974)** — *EDF Statistics for Goodness of Fit and Some Comparisons*.

**Aplicación Industrial UTP:**
Verificación del ajuste de la distribución de tiempos de servicio en las cajas de pago de almacenes de cadena de Pereira mediante prueba K-S y Anderson-Darling, alimentando modelos de colas y simulación.

> **Interacción Computacional:** Herramienta: Módulo de Bondad de Ajuste K-S y $\chi^2$ en `/tools`.

---

<a id="ii5a3-m5"></a>
## [II5A3] Estadística II — Módulo 5: Regresión Lineal Múltiple y Diagnóstico

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Construcción matricial de modelos de regresión con múltiples predictores, diagnóstico de multicolinealidad vía VIF, detección de observaciones influyentes y selección óptima de variables.

### Fundamentación Teórica y Formulación Matemática

1. **Formulación Matricial General:**
   $$\mathbf{y} = \mathbf{X} \boldsymbol{\beta} + \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(\mathbf{0}, \sigma^2 \mathbf{I}_n)$$
   - Solución MCO: $\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$.
   - Matriz de Proyección (Hat Matrix): $\mathbf{H} = \mathbf{X} (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T$, donde $\hat{\mathbf{y}} = \mathbf{H} \mathbf{y}$ y $\mathbf{e} = (\mathbf{I} - \mathbf{H}) \mathbf{y}$.
   - Matriz de covarianzas: $\text{Cov}(\hat{\boldsymbol{\beta}}) = \sigma^2 (\mathbf{X}^T \mathbf{X})^{-1}$.

2. **Diagnóstico de Multicolinealidad:**
   - Factor de Inflación de la Varianza (VIF):
     $$VIF_j = \frac{1}{1 - R_j^2}$$
     donde $R_j^2$ es el coeficiente de determinación al regresar $X_j$ sobre las restantes $k-1$ variables. Si $VIF_j > 10$, existe multicolinealidad severa.
   - Número de Condición del sistema: $\kappa = \sqrt{\frac{\lambda_{\max}}{\lambda_{\min}}}$ de $\mathbf{X}^T \mathbf{X}$.

3. **Diagnóstico de Observaciones Influyentes:**
   - Apalancamiento (Leverage): $h_{ii} = [\mathbf{H}]_{ii}$, con valor medio $\bar{h} = p/n$. Punto con alto leverage si $h_{ii} > 2p/n$.
   - Distancia de Cook ($D_i$): Desplazamiento global del vector de coeficientes si se elimina la observación $i$:
     $$D_i = \frac{(\hat{\boldsymbol{\beta}}_{(i)} - \hat{\boldsymbol{\beta}})^T (\mathbf{X}^T \mathbf{X}) (\hat{\boldsymbol{\beta}}_{(i)} - \hat{\boldsymbol{\beta}})}{p \cdot MS_E} = \frac{r_i^2}{p} \left( \frac{h_{ii}}{1 - h_{ii}} \right)$$
     donde $r_i$ es el residuo estudentizado. Si $D_i > 1$, la observación es altamente influyente.

**Literatura Canónica & Contraste Web:**
- **Belsley, Kuh & Welsch (1980)** — *Regression Diagnostics: Identifying Influential Data and Sources of Collinearity*.
- **Cook & Weisberg (1982)** — *Residuals and Influence in Regression*.
- **Montgomery, Peck & Vining (2012)**: Capítulos 3 y 9 sobre diagnóstico matricial.

**Aplicación Industrial UTP:**
Predicción del consumo de energía eléctrica de la planta de producción en función de toneladas procesadas, horas máquina activas y temperatura ambiental, eliminando predictores colineales mediante VIF.

> **Interacción Computacional:** Herramienta: Laboratorio Pyodide Wasm con NumPy para cálculo de $(\mathbf{X}^T \mathbf{X})^{-1}$, $\mathbf{H}$ y distancias de Cook.

---

<a id="ii5a3-m6"></a>
## [II5A3] Estadística II — Módulo 6: Control Estadístico de la Calidad (SPC)

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Diseño e interpretación de gráficos Shewhart para variables ($\bar{X}-R, \bar{X}-S$), evaluación de causas asignables, y cálculo de índices de capacidad del proceso ($C_p, C_{pk}, C_{pm}$).

### Fundamentación Teórica y Formulación Matemática

1. **Fundamentos de Gráficos de Control de Shewhart:**
   El principio de Walter Shewhart (1924) descompone la variabilidad del proceso en causas comunes (aleatorias) y causas asignables (especiales).
   - Límites generales $\pm 3\sigma$:
     $$UCL = \mathbb{E}[W] + 3 \sigma_W, \qquad CL = \mathbb{E}[W], \qquad LCL = \mathbb{E}[W] - 3 \sigma_W$$

2. **Gráficos $\bar{X} - R$ para Subgrupos Racionales (tamaño $n$):**
   - Para el gráfico de rangos $R$:
     $$UCL_R = D_4 \bar{R}, \qquad CL_R = \bar{R}, \qquad LCL_R = D_3 \bar{R}$$
   - Estimación de la desviación poblacional: $\hat{\sigma} = \frac{\bar{R}}{d_2}$.
   - Para el gráfico de medias $\bar{X}$:
     $$UCL_{\bar{X}} = \bar{\bar{X}} + A_2 \bar{R}, \qquad CL_{\bar{X}} = \bar{\bar{X}}, \qquad LCL_{\bar{X}} = \bar{\bar{X}} - A_2 \bar{R}$$
     donde $A_2 = \frac{3}{d_2 \sqrt{n}}$.

3. **Índices de Capacidad del Proceso:**
   Con especificaciones técnicas $LSL$ (límite inferior) y $USL$ (límite superior):
   - Capacidad Potencial ($C_p$):
     $$C_p = \frac{USL - LSL}{6\sigma}$$
   - Capacidad Real / Centrado ($C_{pk}$):
     $$C_{pk} = \min\left( \frac{USL - \mu}{3\sigma}, \frac{\mu - LSL}{3\sigma} \right) = C_p (1 - k), \quad k = \frac{|m - \mu|}{(USL - LSL)/2}$$
   - Índice de Taguchi ($C_{pm}$): Incorpora la desviación respecto al valor objetivo (Target $T$):
     $$C_{pm} = \frac{USL - LSL}{6 \sqrt{\sigma^2 + (\mu - T)^2}}$$
   - Nivel Sigma: $Z = 3 \cdot C_{pk}$. Nivel 6-Sigma $\implies C_{pk} \ge 1.5$ (3.4 PPM con corrimiento de $1.5\sigma$).

**Literatura Canónica & Contraste Web:**
- **Walter A. Shewhart (1931)** — *Economic Control of Quality of Manufactured Product*.
- **Douglas C. Montgomery (2019)** — *Introduction to Statistical Quality Control*: Texto canónico internacional de SPC.
- **Genichi Taguchi (1986)** — *Introduction to Quality Engineering*: Definición de la función de pérdida cuadrática de Taguchi $L(y) = k(y - T)^2$.

**Aplicación Industrial UTP:**
Control de calidad en línea de llenado de envases de café liofilizado en Risaralda. Monitoreo del peso neto mediante gráficos $\bar{X}-R$ y garantía de cumplimiento de $C_{pk} \ge 1.33$ exigido por normatividad INVIMA.

> **Interacción Computacional:** Herramienta: SPC Quality Control Workbench (`/tools#spc`) con gráficos interactivos Shewhart SVG, cálculo de $C_p, C_{pk}, C_{pm}$ y exportación CSV.

---

<a id="ii6a2-m1"></a>
## [II6A2] Estadística III — Módulo 1: Regresión Múltiple Matricial y Selección de Variables

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Modelado econométrico avanzado, algoritmos de selección automática Stepwise, regularización Ridge y Lasso, y contrastes de autocorrelación de Durbin-Watson.

### Fundamentación Teórica y Formulación Matemática

1. **Estimación por MCO Matricial y Pruebas Generales:**
   - Hipótesis Lineal General: $H_0: \mathbf{L} \boldsymbol{\beta} = \mathbf{c}$ vs $H_1: \mathbf{L} \boldsymbol{\beta} \ne \mathbf{c}$, con $\mathbf{L}$ de rango $q \le p$:
     $$F_0 = \frac{(\mathbf{L} \hat{\boldsymbol{\beta}} - \mathbf{c})^T [\mathbf{L} (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{L}^T]^{-1} (\mathbf{L} \hat{\boldsymbol{\beta}} - \mathbf{c}) / q}{MS_E} \sim F_{q, n-p}$$

2. **Criterios de Información y Selección de Modelos:**
   - Criterio de Información de Akaike (AIC):
     $$AIC = n \ln\left( \frac{SS_E}{n} \right) + 2p$$
   - Criterio de Información Bayesiano de Schwarz (BIC):
     $$BIC = n \ln\left( \frac{SS_E}{n} \right) + p \ln(n)$$
   - Estadístico $C_p$ de Mallows:
     $$C_p = \frac{SS_E(p)}{\sigma^2} - n + 2p$$
     Un modelo sin sesgo satisface $\mathbb{E}[C_p] \approx p$.

3. **Regresión Regularizada:**
   - **Ridge (Tikhonov / $\ell_2$):** Resuelve la singularidad de $\mathbf{X}^T \mathbf{X}$ añadiendo sesgo:
     $$\hat{\boldsymbol{\beta}}_{\text{Ridge}} = (\mathbf{X}^T \mathbf{X} + \lambda \mathbf{I})^{-1} \mathbf{X}^T \mathbf{y}$$
   - **Lasso (Tibshirani, 1996 / $\ell_1$):** Induce dispersión (sparsity) fijando coeficientes exactamente en cero:
     $$\min_{\boldsymbol{\beta}} \| \mathbf{y} - \mathbf{X}\boldsymbol{\beta} \|_2^2 + \lambda \| \boldsymbol{\beta} \|_1$$

4. **Autocorrelación de Residuos:**
   - Estadístico de Durbin-Watson ($d$):
     $$d = \frac{\sum_{t=2}^n (e_t - e_{t-1})^2}{\sum_{t=1}^n e_t^2} \approx 2(1 - \hat{\rho})$$
     $d \approx 2$ ausencia de autocorrelación; $d \to 0$ autocorrelación positiva; $d \to 4$ autocorrelación negativa.

**Literatura Canónica & Contraste Web:**
- **Robert Tibshirani (1996)** — *Regression Shrinkage and Selection via the Lasso*.
- **Hoerl & Kennard (1970)** — *Ridge Regression: Biased Estimation for Nonorthogonal Problems*.
- **Wooldridge (2019)** — *Introductory Econometrics: A Modern Approach*.

**Aplicación Industrial UTP:**
Modelado econométrico del volumen de despacho de carga en terminales logísticos de Pereira usando Lasso para seleccionar las 5 variables más relevantes entre 35 macroindicadores económicos.

> **Interacción Computacional:** Herramienta: Laboratorio Pyodide Wasm con scikit-learn (`Ridge`, `Lasso`, `LinearRegression`).

---

<a id="ii6a2-m2"></a>
## [II6A2] Estadística III — Módulo 2: Diseño de Experimentos y ANOVA Multifactorial

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Diseño y análisis de experimentos factoriales multifactoriales con interacciones de orden superior, modelos jerárquicos y de parcelas divididas (Split-Plot).

### Fundamentación Teórica y Formulación Matemática

1. **Diseño Factorial de Tres Factores ($a \times b \times c$):**
   $$y_{ijkl} = \mu + \tau_i + \beta_j + \gamma_k + (\tau\beta)_{ij} + (\tau\gamma)_{ik} + (\beta\gamma)_{jk} + (\tau\beta\gamma)_{ijk} + \epsilon_{ijkl}$$
   con $i=1..a, j=1..b, k=1..c, l=1..n$.
   - Descomposición de varianza:
     $$SS_T = SS_A + SS_B + SS_C + SS_{AB} + SS_{AC} + SS_{BC} + SS_{ABC} + SS_E$$
   - Cuadrados Medios: Cada efecto se divide por sus respectivos grados de libertad: $(a-1), (b-1), (c-1), (a-1)(b-1), \dots$

2. **Diseños Split-Plot (Parcelas Divididas):**
   Aparecen cuando ciertos factores son difíciles de cambiar (Hard-to-Change, HTC) mientras otros son fáciles de cambiar (Easy-to-Change, ETC).
   - Posee dos errores experimentales independientes:
     * Error de parcela completa: $\text{Whole-Plot Error } \eta_{ij} \sim \mathcal{N}(0, \sigma_{\text{WP}}^2)$.
     * Error de subparcela: $\text{Sub-Plot Error } \epsilon_{ijk} \sim \mathcal{N}(0, \sigma_{\text{SP}}^2)$.
   - Los factores de parcela completa se contrastan contra $MS_{\text{Error(WP)}}$, mientras los de subparcela se contrastan contra $MS_{\text{Error(SP)}}$.

**Literatura Canónica & Contraste Web:**
- **Montgomery (2017)**: Capítulos 5 y 14 sobre experimentos de parcelas divididas y modelos mixtos.
- **Kuehl (2001)** — *Design of Experiments: Statistical Principles of Research Design and Analysis*.
- **Milliken & Johnson (2009)** — *Analysis of Messy Data: Designed Experiments*.

**Aplicación Industrial UTP:**
Optimización de horneado en panificación industrial: la temperatura del horno es un factor difícil de cambiar (Parcela principal), mientras que el tiempo de amasado y dosificación de levadura se varían dentro de cada horneada (Subparcelas).

> **Interacción Computacional:** Herramienta: Matriz interactiva de ANOVA factorial en `/tools`.

---

<a id="ii6a2-m3"></a>
## [II6A2] Estadística III — Módulo 3: Control Estadístico de Calidad Avanzado

- **Coordinación Académica:** Prof. César Augusto Zapata
- **Competencia Formativa:** Diseño de gráficos de control de memoria EWMA y CUSUM para detección ultra-rápida de pequeños corrimientos de la media ($0.5\sigma - 1.5\sigma$) y gráficos multivariados $T^2$ de Hotelling.

### Fundamentación Teórica y Formulación Matemática

1. **Gráfico CUSUM (Sumas Acumuladas Tabular):**
   Diseñado por Page (1954). Acumula desviaciones respecto al valor meta $\mu_0$:
   $$C_i^+ = \max(0, x_i - (\mu_0 + K) + C_{i-1}^+)$$$$C_i^- = \max(0, (\mu_0 - K) - x_i + C_{i-1}^-)$$
   con $C_0^+ = C_0^- = 0$.
   - Parámetro de referencia $K = \frac{\delta \sigma}{2}$ para detectar un corrimiento de magnitud $\delta$.
   - Límite de decisión $H = h \sigma$ (típicamente $h = 4$ o $5$). Si $C_i^+ > H$ o $C_i^- > H$, el proceso está fuera de control.

2. **Gráfico EWMA (Media Móvil Ponderada Exponencialmente):**
   Diseñado por Roberts (1959). Asigna pesos geométricamente decrecientes:
   $$z_i = \lambda x_i + (1 - \lambda) z_{i-1}, \quad 0 < \lambda \le 1, \quad z_0 = \mu_0$$
   - Varianza exacta en el paso $i$: $\sigma_{z_i}^2 = \sigma^2 \left( \frac{\lambda}{2 - \lambda} \right) [1 - (1 - \lambda)^{2i}]$.
   - Límites de control asintóticos ($i \to \infty$):
     $$UCL/LCL = \mu_0 \pm L \sigma \sqrt{\frac{\lambda}{2 - \lambda}}$$
     (Típicamente $\lambda = 0.1$ o $0.2$ y $L = 2.7$ a $3$).

3. **Gráfico Multivariado $T^2$ de Hotelling para Observaciones Individuales:**
   Vector de $p$ características de calidad correlacionadas $\mathbf{x} \in \mathbb{R}^p$:
   $$T^2 = (\mathbf{x} - \bar{\mathbf{x}})^T \mathbf{S}^{-1} (\mathbf{x} - \bar{\mathbf{x}}) \sim \frac{p(n+1)(n-1)}{n(n-p)} F_{p, n-p}$$

**Literatura Canónica & Contraste Web:**
- **E. S. Page (1954)** — *Continuous Inspection Schemes* (Biometrika): Creación del CUSUM.
- **S. W. Roberts (1959)** — *Control Chart Tests Based on Geometric Moving Averages*.
- **Harold Hotelling (1947)** — *Multivariate Quality Control*: Fundamento del control multivariado.

**Aplicación Industrial UTP:**
Monitoreo de pureza química en refinación de bioetanol, donde corrimientos de $0.5\sigma$ no son detectados a tiempo por gráficos de Shewhart convencionales pero son alertados en menos de 3 períodos por CUSUM y EWMA.

> **Interacción Computacional:** Herramienta: Módulo avanzado SPC Workbench (`/tools#spc`) y detector de corrimientos.

---


# Bloque B: Optimización Determinística e Investigación de Operaciones

<a id="ii7d3-m1"></a>
## [II7D3] Investigación de Operaciones I — Módulo 1: Modelación Matemática y Método Gráfico

- **Coordinación Académica:** Ing. Natalia Bohórquez Bedoya
- **Competencia Formativa:** Capacidad para abstraer sistemas productivos complejos en modelos matemáticos de optimización lineal y resolver problemas bidimensionales mediante geometría de conjuntos convexos.

### Fundamentación Teórica y Formulación Matemática

1. **Estructura Canónica de un Programa Lineal (PL):**
   $$\begin{aligned}
   \max \text{ o } \min \quad & z = \mathbf{c}^T \mathbf{x} = \sum_{j=1}^n c_j x_j \\
   \text{sujeto a} \quad & \mathbf{A} \mathbf{x} \le \mathbf{b} \quad (\text{o } =, \ge) \\
   & \mathbf{x} \ge \mathbf{0}
   \end{aligned}$$
   donde $\mathbf{x} \in \mathbb{R}^n$ es el vector de variables de decisión, $\mathbf{c} \in \mathbb{R}^n$ los coeficientes de costo/beneficio, $\mathbf{A} \in \mathbb{R}^{m \times n}$ la matriz de tecnología y $\mathbf{b} \in \mathbb{R}^m$ el vector de recursos disponibles.

2. **Geometría y Conjuntos Convexos en $\mathbb{R}^2$:**
   - La región factible $\mathcal{F} = \{ \mathbf{x} \in \mathbb{R}^n : \mathbf{A}\mathbf{x} \le \mathbf{b}, \mathbf{x} \ge \mathbf{0} \}$ es la intersección finita de semiespacios cerrados, constituyendo un **poliedro convexo**.
   - **Conjunto Convexo:** $\mathcal{S}$ es convexo si $\forall \mathbf{x}_1, \mathbf{x}_2 \in \mathcal{S}$ y $\forall \lambda \in [0, 1]$, $\lambda \mathbf{x}_1 + (1 - \lambda) \mathbf{x}_2 \in \mathcal{S}$.
   - **Punto Extremo (Vértice):** Un punto $\mathbf{x} \in \mathcal{F}$ es extremo si no puede expresarse como combinación convexa estricta de dos puntos distintos de $\mathcal{F}$.

3. **Teorema Fundamental de la Programación Lineal:**
   Si la región factible $\mathcal{F}$ es acotada (politopo) y no vacía, la función objetivo lineal alcanza su valor óptimo en al menos uno de los puntos extremos (vértices) de $\mathcal{F}$. Si el óptimo se alcanza en dos vértices adyacentes, cualquier combinación convexa entre ellos es también una solución óptima (infinitas soluciones óptimas).

4. **Clasificación de Soluciones en el Método Gráfico:**
   - **Solución Única:** La línea de nivel de $z$ intersecta la región factible en un único vértice en su límite de salida.
   - **Soluciones Múltiples:** La línea de nivel es paralela a una de las restricciones activas vinculantes.
   - **Problema No Acotado (Unbounded):** La región factible es abierta en la dirección de mejora y $z \to \infty$.
   - **Infactibilidad:** $\mathcal{F} = \emptyset$, no existe ningún punto común a todas las restricciones.

**Literatura Canónica & Contraste Web:**
- **George B. Dantzig (1963)** — *Linear Programming and Extensions*: Obra fundacional de la optimización lineal.
- **Hillier & Lieberman (2021)** — *Introduction to Operations Research*: Enfoque pedagógico clásico de formulación y geometría 2D.
- **Hamdy A. Taha (2017)** — *Operations Research: An Introduction*: Taxonomía de modelos de asignación de recursos y método gráfico.

**Aplicación Industrial UTP:**
Mezcla óptima de producción en una planta procesadora de derivados de café en Chinchiná y Pereira: asignación de horas de molienda y empaque para maximizar el margen de contribución sujeto a capacidad instalada y disponibilidad de grano pergamino seco.

> **Interacción Computacional:** Herramienta: Demostrador interactivo del Método Gráfico en la landing page y Solucionador Simplex en `/tools#simplex`.

---

<a id="ii7d3-m2"></a>
## [II7D3] Investigación de Operaciones I — Módulo 2: El Algoritmo Simplex Tabular y Dos Fases

- **Coordinación Académica:** Ing. Natalia Bohórquez Bedoya
- **Competencia Formativa:** Dominio algebraico del método Simplex tabular estándar, manejo de variables artificiales mediante los métodos de las Dos Fases y la Gran M, e identificación de degeneración y ciclado.

### Fundamentación Teórica y Formulación Matemática

1. **Forma Estándar y Solución Básica Factible (SBF):**
   $$\mathbf{A} \mathbf{x} = \mathbf{b}, \quad \mathbf{x} \ge \mathbf{0}$$
   Particionando $\mathbf{A} = [\mathbf{B} \mid \mathbf{N}]$ con $\mathbf{B} \in \mathbb{R}^{m \times m}$ no singular:
   $$\mathbf{x}_B = \mathbf{B}^{-1} \mathbf{b}, \qquad \mathbf{x}_N = \mathbf{0}$$
   - Si $\mathbf{x}_B \ge \mathbf{0}$, es una **Solución Básica Factible (SBF)**, correspondiente exactamente a un punto extremo del poliedro.
   - Costos reducidos (Row 0):
     $$z_j - c_j = \mathbf{c}_B^T \mathbf{B}^{-1} \mathbf{A}_j - c_j$$
   - **Criterio de Optimalidad (Maximización):** Si todos los costos reducidos $z_j - c_j \ge 0$, la base actual es óptima.

2. **Álgebra del Paso de Pivoteo Simplex:**
   - **Variable que entra (Regla de Dantzig):** $k = \arg\min_j \{ c_j - z_j : c_j - z_j > 0 \}$.
   - **Variable que sale (Prueba del Cociente Mínimo):**
     $$r = \arg\min_{i : y_{ik} > 0} \left\{ \frac{\bar{b}_i}{y_{ik}} \right\}, \qquad \mathbf{y}_k = \mathbf{B}^{-1} \mathbf{A}_k, \quad \bar{\mathbf{b}} = \mathbf{B}^{-1} \mathbf{b}$$
     Esta regla previene salir de la región factible preservando $\mathbf{x}_B \ge \mathbf{0}$.

3. **Manejo de Restricciones $\ge$ e $=$ (Método de las Dos Fases):**
   - **Fase I:** Se añaden variables artificiales $\mathbf{w} \ge \mathbf{0}$ para obtener una base inicial de identidad:
     $$\min W = \sum_{i=1}^m w_i \quad \text{s.a. } \mathbf{A}\mathbf{x} + \mathbf{w} = \mathbf{b}$$
     * Si $\min W > 0$: El problema original es **infactible**.
     * Si $\min W = 0$: Las variables artificiales salen de la base, logrando una SBF legítima.
   - **Fase II:** Se restablece la función objetivo original $z = \mathbf{c}^T \mathbf{x}$ y se continúa el Simplex estándar hasta la optimalidad.

4. **Degeneración y Ciclado:**
   Una SBF es degenerada si al menos una variable básica vale cero ($x_{Bi} = 0$). Puede provocar ciclado en la base. Solución teórica: Regla del Menor Índice de Bland (1977).

**Literatura Canónica & Contraste Web:**
- **George B. Dantzig (1947, 1951)** — *Maximization of a Linear Function of Variables Subject to Linear Inequalities*.
- **Robert G. Bland (1977)** — *New Finite Pivoting Rules for the Simplex Method*: Demostración formal de prevención de ciclado infinito.
- **Bertsimas & Tsitsiklis (1997)** — *Introduction to Linear Optimization*: Capítulos 2 y 3 sobre geometría y álgebra de bases.

**Aplicación Industrial UTP:**
Planificación agregada de la producción en fábricas de confección textil de Dosquebradas y Pereira: resolución de problemas de asignación de turnos, horas extra y subcontratación con más de 20 restricciones simultáneas.

> **Interacción Computacional:** Herramienta: Resolutor del Método Simplex Primal (`/tools#simplex`) con tablas dinámicas de iteración paso a paso y pivoteo en tiempo real.

---

<a id="ii7d3-m3"></a>
## [II7D3] Investigación de Operaciones I — Módulo 3: Teoría de la Dualidad y Análisis de Sensibilidad

- **Coordinación Académica:** Ing. Natalia Bohórquez Bedoya
- **Competencia Formativa:** Comprensión rigurosa de las relaciones Primal-Dual, precios sombra, holguras complementarias, y análisis de sensibilidad de coeficientes de costos y límites de recursos.

### Fundamentación Teórica y Formulación Matemática

1. **Par de Problemas Primal y Dual Canónicos:**
   $$\begin{aligned}
   \text{(Primal)} \quad & \max \; z = \mathbf{c}^T \mathbf{x} \quad \text{s.a. } \mathbf{A}\mathbf{x} \le \mathbf{b}, \; \mathbf{x} \ge \mathbf{0} \\
   \text{(Dual)} \quad & \min \; w = \mathbf{b}^T \mathbf{y} \quad \text{s.a. } \mathbf{A}^T \mathbf{y} \ge \mathbf{c}, \; \mathbf{y} \ge \mathbf{0}
   \end{aligned}$$
   donde $\mathbf{y} = (\mathbf{c}_B^T \mathbf{B}^{-1})^T$ es el vector de variables duales o **precios sombra**.

2. **Teoremas Fundamentales de Dualidad:**
   - **Dualidad Débil:** Si $\mathbf{x}$ es factible en el Primal e $\mathbf{y}$ es factible en el Dual:
     $$\mathbf{c}^T \mathbf{x} \le \mathbf{b}^T \mathbf{y}$$
   - **Dualidad Fuerte (Von Neumann, 1947):** Si el Primal tiene una solución óptima finita $\mathbf{x}^*$, entonces el Dual también tiene una solución óptima finita $\mathbf{y}^*$ y sus valores objetivos coinciden exactamente:
     $$\mathbf{c}^T \mathbf{x}^* = \mathbf{b}^T \mathbf{y}^*$$
   - **Teorema de las Holguras Complementarias:** Sean $\mathbf{s} = \mathbf{b} - \mathbf{A}\mathbf{x}^* \ge \mathbf{0}$ las holguras primales y $\mathbf{e} = \mathbf{A}^T \mathbf{y}^* - \mathbf{c} \ge \mathbf{0}$ los excedentes duales. En la optimalidad:
     $$y_i^* \cdot s_i = 0, \quad \forall i = 1, \dots, m$$
     $$x_j^* \cdot e_j = 0, \quad \forall j = 1, \dots, n$$
     *(Interpretación económica: Si un recurso no se agota por completo ($s_i > 0$), su precio sombra marginal es estrictamente cero ($y_i^* = 0$)).*

3. **Análisis de Sensibilidad Post-Óptimo:**
   - **Cambios en los recursos ($b_k$):** La base actual permanece factible mientras:
     $$\mathbf{x}_B = \mathbf{B}^{-1} (\mathbf{b} + \Delta b_k \mathbf{e}_k) \ge \mathbf{0}$$
     El valor óptimo cambia a razón de $\frac{\partial z^*}{\partial b_k} = y_k^*$.
   - **Cambios en los coeficientes de la función objetivo ($c_j$):**
     * Para variables no básicas: La base permanece óptima si $\bar{c}_j + \Delta c_j \le 0$.
     * Para variables básicas: La base permanece óptima si $\mathbf{c}_B^T \mathbf{B}^{-1} \mathbf{A}_j - c_j \ge 0, \forall j \in N$.

**Literatura Canónica & Contraste Web:**
- **John von Neumann (1947)** — *On a Theory of Games and Its Applications to Operations Research*: Primera prueba matemática de dualidad lineal.
- **David Gale, Harold Kuhn & Albert Tucker (1951)** — *Linear Programming and the Theory of Games*.
- **Bazaraa, Jarvis & Sherali (2010)** — *Linear Programming and Network Flows*.

**Aplicación Industrial UTP:**
Determinación del valor económico marginal de una hora extra de operario o de máquina en el taller metalmecánico de la UTP: el precio sombra dual indica exactamente el pago máximo admisible por dicha hora extra antes de incurrir en pérdidas.

> **Interacción Computacional:** Herramienta: Módulo Simplex con extracción dual y precios sombra en `/tools#simplex`.

---

<a id="ii7d3-m4"></a>
## [II7D3] Investigación de Operaciones I — Módulo 4: Modelos de Transporte y Asignación

- **Coordinación Académica:** Ing. Natalia Bohórquez Bedoya
- **Competencia Formativa:** Formulación de problemas de redes bipartitas con estructura unimodular total, obtención de soluciones iniciales y optimización con el método de los multiplicadores MODI y el algoritmo Húngaro.

### Fundamentación Teórica y Formulación Matemática

1. **Problema de Transporte Balanceado:**
   $$\min \quad z = \sum_{i=1}^m \sum_{j=1}^n c_{ij} x_{ij}$$
   $$\text{s.a.} \quad \sum_{j=1}^n x_{ij} = a_i, \quad \forall i = 1, \dots, m \quad (\text{Oferta})$$
   $$\sum_{i=1}^m x_{ij} = b_j, \quad \forall j = 1, \dots, n \quad (\text{Demanda})$$
   $$x_{ij} \ge 0$$
   Condición de balance: $\sum_{i=1}^m a_i = \sum_{j=1}^n b_j$.
   - **Propiedad de Unimodularidad Total:** La matriz de coeficientes de restricciones tiene todos sus menores iguales a $0, 1$ o $-1$. Por ende, si los suministros $a_i$ y demandas $b_j$ son enteros, **todas las soluciones básicas son enteras de forma garantizada sin requerir programación entera**.

2. **Métodos de Solución Inicial:**
   - **Esquina Noroeste:** Rápido pero prescinde de los costos unitarios.
   - **Costo Mínimo:** Asignación voraz al costo más bajo disponible.
   - **Aproximación de Vogel (VAM):** Calcula penalizaciones por renglón y columna (diferencia entre los dos costos más bajos) y asigna prioritariamente al costo mínimo de la línea con mayor penalización. Produce SBFs casi óptimas.

3. **Algoritmo de los Multiplicadores (MODI / UV):**
   Para las $m + n - 1$ variables básicas:
   $$u_i + v_j = c_{ij}$$
   Fijando un multiplicador arbitrario (ej. $u_1 = 0$) se calculan los restantes $u_i$ y $v_j$.
   - Para las variables no básicas: Costo reducido $\bar{c}_{ij} = c_{ij} - u_i - v_j$.
   - Si $\bar{c}_{ij} \ge 0, \forall (i, j) \notin B$, la solución es **óptima**. De lo contrario, la celda con el valor más negativo entra a la base, cerrando un circuito rectangular cerrado de redistribución (+ / -).

4. **Problema de Asignación y Algoritmo Húngaro (Kuhn, 1955):**
   Matriz cuadrada $n \times n$ con variables binarias $x_{ij} \in \{0, 1\}$. Basado en el Teorema de König-Egerváry: reducción de filas y columnas, y cobertura mínima de ceros con líneas rectas.

**Literatura Canónica & Contraste Web:**
- **Harold W. Kuhn (1955)** — *The Hungarian Method for the Assignment Problem*: Hito de la optimización combinatoria polinomial.
- **Frank L. Hitchcock (1941)** — *The Distribution of a Product from Several Sources to Numerous Localities*.
- **Koopmans (1949)** — *Optimum Utilization of the Transportation System*.

**Aplicación Industrial UTP:**
Optimización de la distribución física de sacos de azúcar y café desde 3 centrales de acopio en Risaralda hacia 5 centros de distribución mayorista en Bogotá, Medellín y Cali, reduciendo en un 18% los fletes logísticos totales.

> **Interacción Computacional:** Herramienta: Optimizador de Redes y Transporte en `/tools`.

---

<a id="ii7d3-m5"></a>
## [II7D3] Investigación de Operaciones I — Módulo 5: Optimización de Redes y Gestión de Proyectos (PERT/CPM)

- **Coordinación Académica:** Ing. Natalia Bohórquez Bedoya
- **Competencia Formativa:** Modelado de redes de proyectos (AOA/AON), cálculo de holguras totales y libres, identificación de la Ruta Crítica y análisis de probabilidad de culminación bajo duraciones estocásticas.

### Fundamentación Teórica y Formulación Matemática

1. **Topología de Redes de Proyectos (Actividad en Nodo - AON):**
   Grafo dirigido acíclico $G = (V, E)$, donde los nodos representan actividades y los arcos relaciones de precedencia tecnológica.

2. **Algoritmo de Doble Pase CPM:**
   - **Pase hacia Adelante (Tiempos Tempranos):**
     $$ES_j = \max_{i \in \text{Pred}(j)} \{ EF_i \}, \qquad EF_j = ES_j + D_j$$
     con $ES_1 = 0$. La duración del proyecto es $T_P = \max_j EF_j$.
   - **Pase hacia Atrás (Tiempos Tardíos):**
     $$LF_i = \min_{j \in \text{Suc}(i)} \{ LS_j \}, \qquad LS_i = LF_i - D_i$$
     con $LF_{\text{final}} = T_P$.

3. **Holguras y Ruta Crítica:**
   - **Holgura Total ($H_i$):** Margen de tiempo que la actividad $i$ puede retrasarse sin afectar la fecha final del proyecto:
     $$H_i = LS_i - ES_i = LF_i - EF_i$$
   - **Holgura Libre ($HL_i$):** Margen que puede retrasarse sin afectar el inicio temprano de ninguna actividad sucesora:
     $$HL_i = \min_{j \in \text{Suc}(i)} \{ ES_j \} - EF_i$$
   - **Ruta Crítica:** Secuencia continua de actividades con holgura total nula ($H_i = 0$). Cualquier retraso en ellas aplaza la culminación del proyecto.

4. **Metodología PERT (Duraciones Probabilísticas):**
   Aproximación de la duración de cada actividad mediante una distribución Beta con 3 estimaciones de tiempo: optimista ($a$), más probable ($m$), pesimista ($b$):
   - Tiempo esperado de duración:
     $$\mu_i = T_{e, i} = \frac{a_i + 4m_i + b_i}{6}$$
   - Varianza de la actividad:
     $$\sigma_i^2 = \left( \frac{b_i - a_i}{6} \right)^2$$
   - Por el Teorema del Límite Central, la duración total de la ruta crítica $T_{\text{CP}}$ se aproxima a una Normal:
     $$\mu_P = \sum_{i \in \text{Ruta Crítica}} T_{e, i}, \qquad \sigma_P^2 = \sum_{i \in \text{Ruta Crítica}} \sigma_i^2$$
   - Probabilidad de entregar el proyecto antes de una fecha límite $T_D$:
     $$Z = \frac{T_D - \mu_P}{\sigma_P}, \qquad \mathbb{P}(T_{\text{CP}} \le T_D) = \Phi(Z)$$

**Literatura Canónica & Contraste Web:**
- **Kelley & Walker (1959)** — *Critical Path Planning and Scheduling (CPM)* (DuPont & Remington Rand).
- **Malcolm, Roseboom, Clark & Fazar (1959)** — *Application of a Technique for Research and Development Program Evaluation (PERT)* (US Navy Polaris Project).
- **Moder, Phillips & Davis (1983)** — *Project Management with CPM, PERT and Precedence Diagramming*.

**Aplicación Industrial UTP:**
Planificación y control de la parada de planta anual en ingenios azucareros para mantenimiento mayor de calderas y molinos: determinación de la ruta crítica de 45 días y cálculo de la probabilidad del 95% de reiniciar molienda a tiempo.

> **Interacción Computacional:** Herramienta: CPM / PERT Network Optimizer (`/tools#cpm`) con cálculo de pases hacia adelante/atrás, holguras, ruta crítica, varianza acumulada y análisis de riesgo Z.

---

<a id="ioa10-m1"></a>
## [IOA10] Fundamentos de Investigación de Operaciones (Nivelatorio MIOE) — Módulo 1: Modelado Matemático y Dualidad Rigurosa

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Formalización rigurosa de espacios de optimización, dualidad de Lagrange, caracterización del cono recesivo y cotas convexas en espacios vectoriales normados.

### Fundamentación Teórica y Formulación Matemática

1. **Formulación General en Espacios Euclidianos:**
   $$\min_{\mathbf{x} \in \mathcal{X}} f(\mathbf{x}) \quad \text{s.a. } g_i(\mathbf{x}) \le 0 \; (i=1..m), \quad h_j(\mathbf{x}) = 0 \; (j=1..p)$$
   donde $\mathcal{X} \subseteq \mathbb{R}^n$.

2. **Dualidad de Lagrange y Función Dual:**
   - Lagrangiano:
     $$L(\mathbf{x}, \boldsymbol{\lambda}, \boldsymbol{\nu}) = f(\mathbf{x}) + \sum_{i=1}^m \lambda_i g_i(\mathbf{x}) + \sum_{j=1}^p \nu_j h_j(\mathbf{x})$$
   - Función Dual de Lagrange:
     $$g(\boldsymbol{\lambda}, \boldsymbol{\nu}) = \inf_{\mathbf{x} \in \mathcal{X}} L(\mathbf{x}, \boldsymbol{\lambda}, \boldsymbol{\nu})$$
     *Propiedad:* $g(\boldsymbol{\lambda}, \boldsymbol{\nu})$ es **siempre cóncava**, independientemente de si $f$ y $g_i$ son o no convexas.
   - Problema Dual de Lagrange: $\max_{\boldsymbol{\lambda} \ge \mathbf{0}, \boldsymbol{\nu}} g(\boldsymbol{\lambda}, \boldsymbol{\nu})$.
   - Salto de Dualidad (Duality Gap): $\Delta = f(\mathbf{x}^*) - g(\boldsymbol{\lambda}^*, \boldsymbol{\nu}^*) \ge 0$. Bajo la condición de cualificación de Slater y convexidad estricta, $\Delta = 0$ (Dualidad Fuerte).

3. **Geometría de Conos y Teorema de Separación de Hiperplanos:**
   Si $\mathcal{C} \subset \mathbb{R}^n$ es un conjunto convexo cerrado no vacío y $\mathbf{y} \notin \mathcal{C}$, existe un vector normal $\mathbf{a} \in \mathbb{R}^n, \mathbf{a} \ne \mathbf{0}$ y un escalar $b \in \mathbb{R}$ tal que:
   $$\mathbf{a}^T \mathbf{x} \le b < \mathbf{a}^T \mathbf{y}, \quad \forall \mathbf{x} \in \mathcal{C}$$

**Literatura Canónica & Contraste Web:**
- **Stephen Boyd & Lieven Vandenberghe (2004)** — *Convex Optimization*: Texto maestro de referencia en Stanford para dualidad de Lagrange y optimización cónica.
- **Bertsekas (2009)** — *Convex Optimization Theory*.
- **Toro Ocampo & Soto Mejía (UTP)**: Guías de posgrado en modelación matemática avanzada.

**Aplicación Industrial UTP:**
Relajación Lagrangiana para descomponer problemas de ruteo de vehículos con ventanas de tiempo (VRPTW) y despacho hidrotérmico de energía en el Sistema Interconectado Nacional.

> **Interacción Computacional:** Herramienta: Módulo avanzado de descomposición y relajación en `/tools`.

---

<a id="ioa10-m2"></a>
## [IOA10] Fundamentos de Investigación de Operaciones (Nivelatorio MIOE) — Módulo 2: Algoritmos y Solvers Computacionales

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Modelado algebraico formal en lenguajes declarativos (AMPL, Pyomo, PuLP) y comprensión interna de los algoritmos de ramificación y corte (Branch and Cut) en motores CPLEX/Gurobi.

### Fundamentación Teórica y Formulación Matemática

1. **Algoritmo de Branch and Cut (MIP):**
   Para problemas lineales enteros mixtos:
   $$\min \mathbf{c}^T \mathbf{x} + \mathbf{d}^T \mathbf{y} \quad \text{s.a. } \mathbf{A}\mathbf{x} + \mathbf{G}\mathbf{y} \ge \mathbf{b}, \quad \mathbf{x} \ge \mathbf{0}, \; \mathbf{y} \in \mathbb{Z}_+^p$$
   - **Ramificación:** Se selecciona una variable entera fraccionaria $y_j = f \notin \mathbb{Z}$ en la relajación continua y se bifurca en dos subproblemas:
     $$y_j \le \lfloor f \rfloor \quad \lor \quad y_j \ge \lceil f \rceil$$
   - **Acotamiento:** Si el valor óptimo del nodo relajado supera la mejor cota superior conocida ($Z_{\text{relajado}} \ge Z_{\text{best}}$), el nodo se poda por cota.
   - **Cortes Hiperplanares de Gomory:** Adición de desigualdades válidas que recortan la región continua sin eliminar ningún punto entero factible:
     $$\sum_{j \in N} (f_j) x_j \ge f_0, \quad f_j = a_j - \lfloor a_j \rfloor, \; f_0 = \bar{b} - \lfloor \bar{b} \rfloor$$

2. **Medición del Gap de Optimalidad (MIP Gap):**
   $$\text{MIP Gap} = \frac{|Z_{\text{incumbente}} - Z_{\text{cota relajada}}|}{|Z_{\text{incumbente}}| + \epsilon} \times 100\%$$
   El solver detiene la búsqueda cuando $\text{MIP Gap} \le \text{Tolerancia}$ (e.g. $0.01\%$).

**Literatura Canónica & Contraste Web:**
- **Laurence Wolsey (2020)** — *Integer Programming*: Texto canónico mundial sobre teoría de poliedros enteros, cortes de Gomory y Branch and Cut.
- **Ralph Gomory (1958)** — *Outline of an Algorithm for Integer Solutions to Linear Programs*.
- **Gurobi Optimization / CPLEX User Manuals**: Arquitectura de presolve y heurísticas primales internas.

**Aplicación Industrial UTP:**
Localización óptima de plantas y centros de distribución con costos fijos de apertura en el Eje Cafetero, resuelto a través de formulación MILP en Python-PuLP con garantía de GAP $< 0.05\%$.

> **Interacción Computacional:** Herramienta: Laboratorio Pyodide Wasm con solvers lineales integrados y visualizador Branch and Bound.

---

<a id="io113-m1"></a>
## [IO113] Programación Lineal Avanzada — Módulo 1: Teoría Poliédrica y Simplex Revisado

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Análisis algebraico profundo de conos poliédricos, lema de Farkas, representación de Minkowski-Weyl y factorización Eta en el método Simplex Revisado a gran escala.

### Fundamentación Teórica y Formulación Matemática

1. **Teorema de Resolución de Minkowski-Weyl:**
   Todo poliedro $\mathcal{P} = \{ \mathbf{x} \in \mathbb{R}^n : \mathbf{A}\mathbf{x} \le \mathbf{b} \}$ puede expresarse de manera única como la suma de Minkowski de la cápsula convexa de sus puntos extremos $\{\mathbf{v}_1, \dots, \mathbf{v}_k\}$ y el cono cónico generado por sus direcciones extremas $\{\mathbf{d}_1, \dots, \mathbf{d}_r\}$:
   $$\mathcal{P} = \text{conv}(\mathbf{v}_1, \dots, \mathbf{v}_k) + \text{cone}(\mathbf{d}_1, \dots, \mathbf{d}_r)$$
   $$\mathbf{x} = \sum_{i=1}^k \lambda_i \mathbf{v}_i + \sum_{j=1}^r \mu_j \mathbf{d}_j, \quad \sum_{i=1}^k \lambda_i = 1, \; \lambda_i \ge 0, \; \mu_j \ge 0$$

2. **Lema de Farkas (Teorema de Alternativas):**
   Exactamente uno de los dos sistemas siguientes tiene solución:
   - Sistema 1: $\mathbf{A}\mathbf{x} = \mathbf{b}, \; \mathbf{x} \ge \mathbf{0}$.
   - Sistema 2: $\mathbf{A}^T \mathbf{y} \ge \mathbf{0}, \; \mathbf{b}^T \mathbf{y} < 0$.

3. **Álgebra del Simplex Revisado con Factorización Productiva:**
   En lugar de recalcular la inversa $\mathbf{B}^{-1}$ explícitamente en cada paso ($O(m^3)$), se mantiene como un producto ordenado de matrices elementales $\mathbf{E}_k$ (Matrices Eta):
   $$\mathbf{B}_k^{-1} = \mathbf{E}_k \mathbf{E}_{k-1} \dots \mathbf{E}_1 \mathbf{B}_0^{-1}$$
   donde $\mathbf{E}_k$ difiere de la matriz identidad únicamente en la columna que sale del pivoteo, permitiendo multiplicaciones vectoriales ultra-eficientes en matrices dispersas ($O(m)$ por actualización).

**Literatura Canónica & Contraste Web:**
- **Dimitris Bertsimas & John N. Tsitsiklis (1997)** — *Introduction to Linear Optimization* (Athena Scientific): Capítulos 1, 2 y 7.
- **Alexander Schrijver (1986)** — *Theory of Linear and Integer Programming* (Wiley): La enciclopedia matemática de la teoría poliédrica.
- **György Farkas (1902)** — *Theorie der einfachen Ungleichungen*.

**Aplicación Industrial UTP:**
Despacho óptimo horario de 120 generadores eléctricos en el mercado de energía mayorista colombiano, aprovechando la factorización Eta para resolver sistemas de 50.000 restricciones en segundos.

> **Interacción Computacional:** Herramienta: Motor matricial de optimización lineal avanzada en `/tools#simplex`.

---

<a id="io113-m2"></a>
## [IO113] Programación Lineal Avanzada — Módulo 2: Descomposición de Dantzig-Wolfe y Generación de Columnas

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Capacidad para formular y resolver problemas de optimización de gran escala con estructuras diagonales por bloques, aplicando el principio de descomposición y subproblemas de generación de columnas (Cutting Stock).

### Fundamentación Teórica y Formulación Matemática

1. **Estructura Diagonal por Bloques (Coupling Constraints):**
   $$\begin{aligned}
   \min \quad & \sum_{k=1}^K \mathbf{c}_k^T \mathbf{x}_k \\
   \text{s.a.} \quad & \sum_{k=1}^K \mathbf{D}_k \mathbf{x}_k = \mathbf{b}_0 \quad (\text{Restricciones de Acoplamiento}) \\
   & \mathbf{A}_k \mathbf{x}_k = \mathbf{b}_k, \quad \mathbf{x}_k \ge \mathbf{0} \quad (k=1..K)
   \end{aligned}$$

2. **Problema Maestro Restringido (RMP) de Dantzig-Wolfe:**
   Aplicando el Teorema de Minkowski-Weyl a cada poliedro individual $\mathcal{X}_k$:
   $$\min_{\lambda_{k, j}} \quad \sum_{k=1}^K \sum_{j=1}^{P_k} (\mathbf{c}_k^T \mathbf{v}_{k, j}) \lambda_{k, j}$$
   $$\text{s.a.} \quad \sum_{k=1}^K \sum_{j=1}^{P_k} (\mathbf{D}_k \mathbf{v}_{k, j}) \lambda_{k, j} = \mathbf{b}_0 \quad (\boldsymbol{\pi})$$
   $$\sum_{j=1}^{P_k} \lambda_{k, j} = 1 \quad (\mu_k), \qquad \lambda_{k, j} \ge 0$$

3. **Subproblema Esclavo y Generación Dinámica de Columnas:**
   En cada iteración del RMP, se extraen los precios sombra duales $(\boldsymbol{\pi}, \mu_k)$. El subproblema busca el vértice que minimiza el costo reducido:
   $$\min_{\mathbf{x}_k \in \mathcal{X}_k} \bar{c}_{k} = (\mathbf{c}_k^T - \boldsymbol{\pi}^T \mathbf{D}_k) \mathbf{x}_k - \mu_k$$
   - Si $\min \bar{c}_k < 0$, la solución $\mathbf{x}_k^*$ se inserta como una **nueva columna** en el problema maestro y se repite el proceso.
   - Si $\min \bar{c}_k \ge 0, \forall k$, el algoritmo termina: la base actual del RMP es el **óptimo global exacto**.

4. **El Problema del Corte de Existencias (Cutting Stock de Gilmore & Gomory, 1961):**
   Minimizar bobinas maestras usadas: el subproblema de generación de columnas es exactamente un **Problema de la Mochila (Knapsack)** resoluble eficientemente con programación dinámica.

**Literatura Canónica & Contraste Web:**
- **George B. Dantzig & Philip Wolfe (1960)** — *Decomposition Principle for Linear Programs* (Operations Research).
- **P. C. Gilmore & R. E. Gomory (1961)** — *A Linear Programming Approach to the Cutting-Stock Problem*.
- **Desrosiers & Lübbecke (2005)** — *A Primer in Column Generation*.

**Aplicación Industrial UTP:**
Optimización del guillotinado de bobinas de papel en plantas de Cartón de Colombia (Smurfit Kappa) y corte de perfiles de aluminio para ventanería en Pereira, reduciendo el desperdicio de chatarra del 14% al 1.8%.

> **Interacción Computacional:** Herramienta: Módulo avanzado de Generación de Columnas y Descomposición en `/tools`.

---

<a id="io213-m1"></a>
## [IO213] Programación No Lineal — Módulo 1: Optimización Sin Restricciones y Métodos Cuasi-Newton

- **Coordinación Académica:** Dr. Antonio Hernando Escobar Zuluaga
- **Competencia Formativa:** Caracterización analítica de convexidad local y global, cálculo de gradientes y matrices hessianas, métodos de descenso con búsqueda lineal de Armijo, y algoritmo BFGS.

### Fundamentación Teórica y Formulación Matemática

1. **Condiciones de Optimalidad Sin Restricciones:**
   Para $f: \mathbb{R}^n \to \mathbb{R}$ dos veces diferenciable en $\mathbf{x}^*$:
   - **Condición Necesaria de Primer Orden (FONC):** $\nabla f(\mathbf{x}^*) = \mathbf{0}$ (Punto estacionario).
   - **Condición Necesaria de Segundo Orden (SONC):** $\nabla^2 f(\mathbf{x}^*) \succeq 0$ (Hessiano semidefinido positivo).
   - **Condición Suficiente de Segundo Orden (SOSC):** $\nabla f(\mathbf{x}^*) = \mathbf{0}$ y $\nabla^2 f(\mathbf{x}^*) \succ 0$ (Hessiano estrictamente definido positivo $\implies$ mínimo local estricto).

2. **Esquema General de Búsqueda Lineal:**
   $$\mathbf{x}_{k+1} = \mathbf{x}_k + \alpha_k \mathbf{d}_k$$
   donde $\mathbf{d}_k$ es una dirección de descenso ($\nabla f(\mathbf{x}_k)^T \mathbf{d}_k < 0$) y $\alpha_k > 0$ es el tamaño de paso.
   - **Condición de Armijo (Suficiente Descenso):**
     $$f(\mathbf{x}_k + \alpha_k \mathbf{d}_k) \le f(\mathbf{x}_k) + c_1 \alpha_k \nabla f(\mathbf{x}_k)^T \mathbf{d}_k, \quad c_1 \in (0, 1)$$

3. **Método de Newton Puro:**
   $$\mathbf{d}_k = -[\nabla^2 f(\mathbf{x}_k)]^{-1} \nabla f(\mathbf{x}_k)$$
   Posee tasa de convergencia cuadrática local, pero es computacionalmente costoso ($O(n^3)$ para invertir el Hessiano) y diverge si $\nabla^2 f$ no es definida positiva.

4. **Algoritmo Cuasi-Newton BFGS (Broyden-Fletcher-Goldfarb-Shanno):**
   Aproxima directamente la inversa del Hessiano $\mathbf{H}_k \approx [\nabla^2 f(\mathbf{x}_k)]^{-1}$ mediante actualizaciones de rango dos que preservan simetría y definición positiva:
   $$\mathbf{s}_k = \mathbf{x}_{k+1} - \mathbf{x}_k, \qquad \mathbf{y}_k = \nabla f(\mathbf{x}_{k+1}) - \nabla f(\mathbf{x}_k)$$
   Ecuación secante: $\mathbf{H}_{k+1} \mathbf{y}_k = \mathbf{s}_k$.
   Fórmula de actualización BFGS:
   $$\mathbf{H}_{k+1} = (\mathbf{I} - \rho_k \mathbf{s}_k \mathbf{y}_k^T) \mathbf{H}_k (\mathbf{I} - \rho_k \mathbf{y}_k \mathbf{s}_k^T) + \rho_k \mathbf{s}_k \mathbf{s}_k^T, \qquad \rho_k = \frac{1}{\mathbf{y}_k^T \mathbf{s}_k}$$
   Convergencia superlineal global con costo por iteración de solo $O(n^2)$.

**Literatura Canónica & Contraste Web:**
- **Jorge Nocedal & Stephen J. Wright (2006)** — *Numerical Optimization* (Springer): El texto de referencia universal en optimización no lineal.
- **Mokhtar S. Bazaraa, Hanif D. Sherali & C. M. Shetty (2013)** — *Nonlinear Programming: Theory and Algorithms*.
- **Antonio Escobar Zuluaga (UTP)**: Publicaciones en transmisión de energía y flujo de carga óptimo no lineal.

**Aplicación Industrial UTP:**
Ajuste no lineal de parámetros cinéticos de fermentación en producción de levaduras cerveceras y bioinsecticidas, minimizando el error cuadrático mediante BFGS sin cálculo analítico del Hessiano.

> **Interacción Computacional:** Herramienta: Laboratorio Pyodide con `scipy.optimize.minimize(method='BFGS')` en lección interactiva.

---

<a id="io213-m2"></a>
## [IO213] Programación No Lineal — Módulo 2: Optimización con Restricciones y Condiciones KKT

- **Coordinación Académica:** Dr. Antonio Hernando Escobar Zuluaga
- **Competencia Formativa:** Formulación de problemas no lineales con restricciones, calificación de restricciones (LICQ, MFCQ, Slater), condiciones Karush-Kuhn-Tucker (KKT), y métodos de Penalización y Barrera Interior.

### Fundamentación Teórica y Formulación Matemática

1. **Problema No Lineal General:**
   $$\min_{\mathbf{x} \in \mathbb{R}^n} f(\mathbf{x}) \quad \text{s.a. } g_i(\mathbf{x}) \le 0 \; (i=1..m), \quad h_j(\mathbf{x}) = 0 \; (j=1..p)$$

2. **Condiciones de Karush-Kuhn-Tucker (KKT):**
   Bajo una condición de calificación de restricciones (Constraint Qualification, e.g. **LICQ**: los gradientes de las restricciones activas $\{\nabla g_i(\mathbf{x}^*), i \in \mathcal{A}(\mathbf{x}^*)\} \cup \{\nabla h_j(\mathbf{x}^*)\}$ son linealmente independientes), si $\mathbf{x}^*$ es un mínimo local, existen multiplicadores $\boldsymbol{\lambda}^* \in \mathbb{R}^m$ y $\boldsymbol{\mu}^* \in \mathbb{R}^p$ tales que:
   - **Estacionariedad:**
     $$\nabla f(\mathbf{x}^*) + \sum_{i=1}^m \lambda_i^* \nabla g_i(\mathbf{x}^*) + \sum_{j=1}^p \mu_j^* \nabla h_j(\mathbf{x}^*) = \mathbf{0}$$
   - **Factibilidad Primal:**
     $$g_i(\mathbf{x}^*) \le 0, \; \forall i = 1..m; \qquad h_j(\mathbf{x}^*) = 0, \; \forall j = 1..p$$
   - **Factibilidad Dual:**
     $$\lambda_i^* \ge 0, \; \forall i = 1..m$$
   - **Holgura Complementaria:**
     $$\lambda_i^* \cdot g_i(\mathbf{x}^*) = 0, \; \forall i = 1..m$$
   *(Si el problema es convexo —$f$ y $g_i$ convexas, $h_j$ afines— y se cumple la condición de Slater, las condiciones KKT son **necesarias y suficientes para el óptimo global**).*

3. **Métodos de Penalización Externa y Barrera Logarítmica:**
   - **Penalización Cuadrática Externa:**
     $$P(\mathbf{x}; \mu) = f(\mathbf{x}) + \frac{\mu}{2} \sum_{i=1}^m [\max(0, g_i(\mathbf{x}))]^2 + \frac{\mu}{2} \sum_{j=1}^p [h_j(\mathbf{x})]^2, \quad \mu \to \infty$$
   - **Barrera Interior Logarítmica (Puntos Interiores):**
     $$B(\mathbf{x}; \epsilon) = f(\mathbf{x}) - \epsilon \sum_{i=1}^m \ln(-g_i(\mathbf{x})), \quad \epsilon \to 0^+$$
     Mantiene los puntos estrictamente dentro del interior de la región factible, convergiendo a lo largo de la trayectoria central (*Central Path*).

**Literatura Canónica & Contraste Web:**
- **William Karush (1939)** — *Minima of Functions of Several Variables with Inequalities as Side Constraints*.
- **Harold W. Kuhn & Albert W. Tucker (1951)** — *Nonlinear Programming* (Berkeley Symposium).
- **Anthony V. Fiacco & Garth P. McCormick (1968)** — *Nonlinear Programming: Sequential Unconstrained Minimization Techniques*.

**Aplicación Industrial UTP:**
Despacho económico óptimo de plantas hidroeléctricas y térmicas en el sistema de potencia de Pereira y Caldas: optimización de costos no lineales de generación sujetos a límites de transmisión en líneas de alta tensión y balances de potencia reactiva.

> **Interacción Computacional:** Herramienta: Módulo de Puntos Interiores y KKT en `/tools`.

---


# Bloque C: Procesos Estocásticos, Colas y Simulación

<a id="ii8b3-m1"></a>
## [II8B3] Investigación de Operaciones II — Módulo 1: Procesos Estocásticos y Cadenas de Markov

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Capacidad para modelar la evolución dinámica de sistemas probabilísticos con memoria markoviana en tiempo discreto, calculando probabilidades de transición en n pasos y vectores de estado estable.

### Fundamentación Teórica y Formulación Matemática

1. **Definición de Cadena de Markov en Tiempo Discreto (DTMC):**
   Un proceso estocástico ${X_n, n = 0, 1, 2, \dots}$ en un espacio de estados numerable $S$ cumple la **propiedad de Markov** si:
   $$\mathbb{P}(X_{n+1} = j \mid X_n = i, X_{n-1} = i_{n-1}, \dots, X_0 = i_0) = \mathbb{P}(X_{n+1} = j \mid X_n = i) = P_{ij}$$
   - **Matriz de Transición Estocástica ($mathbf{P}$):**
     $$mathbf{P} = [P_{ij}]_{i,j \in S}, \qquad P_{ij} \ge 0, \quad \sum_{j \in S} P_{ij} = 1, \; \forall i \in S$$

2. **Ecuaciones de Chapman-Kolmogorov:**
   $$P_{ij}^{(m+n)} = \sum_{k \in S} P_{ik}^{(m)} P_{kj}^{(n)} \iff mathbf{P}^{(n)} = mathbf{P}^n$$

3. **Clasificación de Estados:**
   - **Accesibilidad y Comunicación:** $i \to j$ si existe $n \ge 0$ tal que $P_{ij}^{(n)} > 0$. Si $i \to j$ y $j \to i$, se dice que $i \leftrightarrow j$ (comunican). La relación $\leftrightarrow$ es de equivalencia y particiona $S$ en clases de comunicación.
   - **Irreducibilidad:** Una cadena es irreducible si todos sus estados se comunican entre sí (una sola clase).
   - **Recurrencia y Transitoriedad:** Sea $f_i = \mathbb{P}(\exists n \ge 1 : X_n = i \mid X_0 = i)$. Si $f_i = 1$, $i$ es recurrente; si $f_i < 1$, es transitorio.
   - **Periodicidad:** Período $d(i) = \gcd\{ n \ge 1 : P_{ii}^{(n)} > 0 \}$. Si $d(i) = 1$, el estado es aperiódico.

4. **Distribución Estacionaria y Ergodicidad:**
   Una cadena irreducible y aperiódica con estados recurrentes positivos (ergódica) posee una única distribución estacionaria $\boldsymbol{\pi} = (\pi_1, \dots, \pi_N)$ tal que:
   $$\boldsymbol{\pi} mathbf{P} = \boldsymbol{\pi}, \qquad \sum_{j \in S} \pi_j = 1, \quad \pi_j > 0$$
   - **Tiempo medio de primer retorno:** $\mu_{ii} = \frac{1}{\pi_i}$.
   - Si existen estados absorbentes ($P_{kk} = 1$), la matriz se particiona en forma canónica $mathbf{P} = \begin{pmatrix} mathbf{I} & mathbf{0} \\ mathbf{R} & mathbf{Q} \end{pmatrix}$, y la matriz fundamental es $mathbf{N} = (\mathbf{I} - mathbf{Q})^{-1}$.

**Literatura Canónica & Contraste Web:**
- **Andrey Markov (1906)** — *Extension of the Law of Large Numbers to Dependent Quantities*.
- **Sheldon M. Ross (2014)** — *Introduction to Probability Models*: Capítulos 4 y 5.
- **Taha & Hillier-Lieberman**: Enfoque aplicado a operaciones y mantenimiento.

**Aplicación Industrial UTP:**
Modelado del estado de degradación de maquinaria pesada en plantas de beneficio de café (Operando Normal, Desgaste Menor, Requiere Calibración, Falla Crítica). Determinación de costos esperados a largo plazo de paradas no programadas.

> **Interacción Computacional:** Herramienta: Analizador de Cadenas de Markov (DTMC) en `/tools#markov` con cálculo de $mathbf{P}^n$, vector estacionario $\boldsymbol{\pi}$, tiempos de recurrencia y gráfico SVG interactivo.

---

<a id="ii8b3-m2"></a>
## [II8B3] Investigación de Operaciones II — Módulo 2: Teoría de Líneas de Espera (Colas)

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Diseño analítico de sistemas de servicio bajo congestión estocástica, formulación de modelos de nacimiento y muerte, cálculo de métricas L, Lq, W, Wq y optimización económica de capacidad.

### Fundamentación Teórica y Formulación Matemática

1. **Notación Canónica de Kendall (1953):**
   $$A / S / c / K / N / D$$
   donde $A$ es la distribución de arribos, $S$ la de servicio, $c$ número de servidores paralelos, $K$ capacidad del sistema, $N$ tamaño de población fuente y $D$ disciplina de servicio (FCFS, LCFS, SIRO, Prioridad).

2. **Proceso de Nacimiento y Muerte en Estado Estable:**
   Tasas de arribo $\lambda_n$ y de servicio $\mu_n$. Ecuaciones de balance detallado:
   $$\lambda_n P_n = \mu_{n+1} P_{n+1} \implies P_n = P_0 \prod_{i=0}^{n-1} \frac{\lambda_i}{\mu_{i+1}}$$

3. **Modelo $M/M/1$:**
   Factor de utilización $\rho = \frac{\lambda}{\mu} < 1$.
   $$P_0 = 1 - \rho, \qquad P_n = (1 - \rho) \rho^n$$
   - Número promedio de clientes en el sistema: $L = \frac{\rho}{1 - \rho} = \frac{\lambda}{\mu - \lambda}$.
   - Número promedio en cola: $L_q = \frac{\lambda^2}{\mu(\mu - \lambda)} = L - \rho$.
   - **Ley de Little (John Little, 1961):**
     $$L = \lambda W, \qquad L_q = \lambda W_q, \qquad W = W_q + \frac{1}{\mu}$$
     donde $W$ es el tiempo medio de permanencia en el sistema y $W_q$ en la cola de espera.

4. **Modelo $M/M/s$ con Múltiples Servidores:**
   $$\rho = \frac{\lambda}{s \mu} < 1$$
   - Probabilidad de sistema vacío:
     $$P_0 = \left[ \sum_{n=0}^{s-1} \frac{(\lambda/\mu)^n}{n!} + \frac{(\lambda/\mu)^s}{s! (1 - \rho)} \right]^{-1}$$
   - Fórmula C de Erlang (Probabilidad de tener que esperar en cola):
     $$P_C = \mathbb{P}(\text{Espera}) = \frac{(\lambda/\mu)^s}{s!(1 - \rho)} P_0$$
   - Longitud media de cola: $L_q = \frac{P_C \cdot \rho}{1 - \rho}$.

**Literatura Canónica & Contraste Web:**
- **Agner Krarup Erlang (1909)** — *The Theory of Probabilities and Telephone Conversations*: Origen de la teoría de colas.
- **John D. C. Little (1961)** — *A Proof for the Queuing Formula: L = lambda W* (Operations Research).
- **Gross, Shortle, Thompson & Harris (2008)** — *Fundamentals of Queueing Theory*.

**Aplicación Industrial UTP:**
Dimensionamiento del número óptimo de muelles de descargue en el centro logístico Eje Cafetero: balance entre el costo horario de camiones ociosos en cola y el costo operativo de apertura de muelles de servicio.

> **Interacción Computacional:** Herramienta: Calculadora de Teoría de Colas (M/M/s) en `/tools#queueing` con curvas de sensibilidad de costo total y factor $\rho$.

---

<a id="ii8b3-m3"></a>
## [II8B3] Investigación de Operaciones II — Módulo 3: Teoría y Modelos de Inventarios

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Formulación de políticas de reabastecimiento determinísticas y probabilísticas, derivación de lotes económicos óptimos y diseño de inventarios de seguridad bajo nivel de servicio.

### Fundamentación Teórica y Formulación Matemática

1. **Modelo EOQ Clásico de Wilson (1913):**
   Demanda anual determinística $D$, costo por ordenar $S$, costo unitario de mantener inventario $H = h \cdot C$.
   - Costo total anual:
     $$TC(Q) = \frac{D}{Q} S + \frac{Q}{2} H$$
   - Minimizando $\frac{d TC}{dQ} = -\frac{DS}{Q^2} + \frac{H}{2} = 0$:
     $$Q^* = \sqrt{\frac{2 D S}{H}}$$
   - Número de pedidos anuales: $N = D/Q^*$; Tiempo de ciclo: $T = Q^*/D$.

2. **Modelo EOQ con Descuentos por Cantidad:**
   Estructura de precios escalonada por tramos $[q_k, q_{k+1})$. Se calcula $Q^*$ para cada tramo y se evalúa si es factible o si se debe forzar al punto de quiebre $q_k$.

3. **Punto de Reorden (ROP) bajo Demanda Estocástica:**
   Demanda diaria $d \sim \mathcal{N}(\mu_d, \sigma_d^2)$ y tiempo de entrega $L$:
   - Demanda durante el tiempo de entrega: $D_L \sim \mathcal{N}(\mu_L = \mu_d L, \; \sigma_L = \sigma_d \sqrt{L})$.
   - **Stock de Seguridad (Safety Stock - $SS$):**
     $$SS = Z_\alpha \cdot \sigma_L = Z_\alpha \cdot \sigma_d \sqrt{L}$$
     donde $Z_\alpha$ es el cuantil normal para el Nivel de Servicio al Ciclo ($CSL = 1 - \alpha$).
   - Punto de Reorden:
     $$ROP = \mu_d \cdot L + SS$$

4. **Modelo del Vendedor de Periódicos (Newsvendor):**
   Un solo período perecedero. Costo de subestimación $C_u = p - c$, costo de sobrestimación $C_o = c - s$.
   - Razón crítica: $\mathbb{P}(D \le Q^*) = \frac{C_u}{C_u + C_o} \implies Q^* = F^{-1}\left( \frac{C_u}{C_u + C_o} \right)$.

**Literatura Canónica & Contraste Web:**
- **Ford W. Harris (1913)** / **R. H. Wilson (1934)**: Deducción original de la fórmula de la raíz cuadrada de inventarios.
- **Silver, Pyke & Peterson (1998)** — *Inventory Management and Production Planning and Scheduling*.
- **Zipkin (2000)** — *Foundations of Inventory Management*.

**Aplicación Industrial UTP:**
Optimización de inventarios de repuestos críticos en el ingenio Risaralda: reducción de quiebres de stock al 1% mediante cálculo dinámico de ROP y stock de seguridad amortiguador.

> **Interacción Computacional:** Herramienta: Optimizador de Inventarios & Lote Económico en `/tools#inventory` con gráfico de diente de sierra y curva de costos anuales.

---

<a id="ii8b3-m4"></a>
## [II8B3] Investigación de Operaciones II — Módulo 4: Teoría de Juegos y Decisiones Estratégicas

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Modelado de interacciones estratégicas entre agentes racionales, resolución de juegos matriciales de suma cero mediante programación lineal y cálculo de equilibrios de Nash en estrategias puras y mixtas.

### Fundamentación Teórica y Formulación Matemática

1. **Juegos en Forma Normal (Estratégica):**
   Tupla $\Gamma = (N, \{S_i\}_{i \in N}, \{u_i\}_{i \in N})$, donde $N = \{1, \dots, n\}$ es el conjunto de jugadores, $S_i$ el espacio de estrategias puras de $i$ y $u_i: S \to \mathbb{R}$ su función de utilidad.

2. **Equilibrio de Nash (Nash, 1950):**
   Un perfil de estrategias $s^* = (s_1^*, \dots, s_n^*) \in S$ es un **Equilibrio de Nash** si ningún jugador tiene incentivos unilaterales para desviarse:
   $$u_i(s_i^*, s_{-i}^*) \ge u_i(s_i, s_{-i}^*), \quad \forall s_i \in S_i, \; \forall i \in N$$

3. **Juegos Matriciales Bi-personales de Suma Cero:**
   Matriz de pagos $mathbf{A} \in \mathbb{R}^{m \times n}$. El Jugador 1 maximiza y el Jugador 2 minimiza:
   - Principio Minimax de Von Neumann (1928):
     $$\max_{\mathbf{p} \in \Delta_m} \min_{\mathbf{q} \in \Delta_n} \mathbf{p}^T mathbf{A} \mathbf{q} = \min_{\mathbf{q} \in \Delta_n} \max_{\mathbf{p} \in \Delta_m} \mathbf{p}^T mathbf{A} \mathbf{q} = V^*$$
     donde $V^*$ es el valor del juego y $\Delta$ los símplices de probabilidad (estrategias mixtas $\mathbf{p}, \mathbf{q}$).

4. **Equivalencia de Juegos de Suma Cero con Programación Lineal:**
   Para el Jugador 1, el problema de maximizar el pago garantizado $v$:
   $$\max \quad v \quad \text{s.a.} \quad \sum_{i=1}^m a_{ij} p_i \ge v \; (j=1..n), \quad \sum_{i=1}^m p_i = 1, \quad p_i \ge 0$$
   El problema dual asociado entrega exactamente la estrategia óptima mixta $\mathbf{q}^*$ del Jugador 2.

**Literatura Canónica & Contraste Web:**
- **John Forbes Nash Jr. (1950)** — *Equilibrium Points in n-Person Games* (PNAS) / (1951) *Non-Cooperative Games* (Annals of Mathematics).
- **John von Neumann & Oskar Morgenstern (1944)** — *Theory of Games and Economic Behavior*.
- **Gibbons (1992)** — *Game Theory for Applied Economists*.

**Aplicación Industrial UTP:**
Estrategia de fijación de precios y promociones entre cadenas de distribución minorista en el Eje Cafetero (Dilema del Prisionero y modelo de duopolio de Bertrand-Nash).

> **Interacción Computacional:** Herramienta: Módulo de Teoría de Juegos y Resolución Simplex en `/tools`.

---

<a id="ii8b3-m5"></a>
## [II8B3] Investigación de Operaciones II — Módulo 5: Simulación de Eventos Discretos y Monte Carlo

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Diseño conceptual de experimentos de simulación estocástica, integración de números pseudoaleatorios, generación de trayectorias muestrales y estimación de intervalos de confianza para variables de desempeño.

### Fundamentación Teórica y Formulación Matemática

1. **Principio de Simulación Monte Carlo:**
   Estimación de una integral definida o valor esperado $\theta = \mathbb{E}[g(\mathbf{X})] = \int_{\mathbb{R}^d} g(\mathbf{x}) f(\mathbf{x}) d\mathbf{x}$.
   - Estimador muestral insesgado:
     $$\hat{\theta}_N = \frac{1}{N} \sum_{i=1}^N g(\mathbf{X}_i), \quad \mathbf{X}_i \overset{\text{iid}}{\sim} f(\mathbf{x})$$
   - Por la Ley Fuerte de los Grandes Números: $\hat{\theta}_N \xrightarrow{a.s.} \theta$.
   - Por el Teorema del Límite Central, el error estándar disminuye a tasa $O(1/\sqrt{N})$:
     $$\text{Var}(\hat{\theta}_N) = \frac{\sigma^2}{N} \implies \hat{\theta}_N \pm Z_{\alpha/2} \frac{s}{\sqrt{N}}$$
     *Propiedad clave:* La convergencia $O(N^{-1/2})$ es **independiente de la dimensión $d$**, superando la maldición de la dimensionalidad de las cuadraturas numéricas clásicas.

2. **Técnicas de Reducción de Varianza:**
   - **Variables Antitéticas:** Utilizar pares correlacionados negativamente $(U, 1-U)$ para cancelar varianza: $\text{Var}\left(\frac{X^{(1)} + X^{(2)}}{2}\right) = \frac{\sigma^2}{2} + \frac{\text{Cov}(X^{(1)}, X^{(2)})}{2} < \frac{\sigma^2}{2}$.
   - **Muestreo por Importancia (Importance Sampling):** Modificar la densidad de muestreo a $h(\mathbf{x})$ para sobre-muestrear eventos raros con pesos de verosimilitud $w(\mathbf{x}) = f(\mathbf{x})/h(\mathbf{x})$.

**Literatura Canónica & Contraste Web:**
- **Metropolis & Ulam (1949)** — *The Monte Carlo Method* (JASA): Publicación fundacional del Proyecto Manhattan.
- **Law & Kelton (2000)** / **Averill M. Law (2015)** — *Simulation Modeling and Analysis*: El manual clásico de referencia en simulación industrial.
- **Fishman (1996)** — *Monte Carlo: Concepts, Algorithms, and Applications*.

**Aplicación Industrial UTP:**
Simulación de la viabilidad financiera y operativa de instalar una planta de cogeneración eléctrica a partir de biomasa de café en Caldas, evaluando el flujo de caja neto ante volatilidades del precio del kilovatio-hora.

> **Interacción Computacional:** Herramienta: Simulador de Métodos Monte Carlo en `/tools#montecarlo` con generación de distribuciones Normal, Uniforme y Triangular.

---

<a id="ii713-m1"></a>
## [II713] Procesos Estocásticos — Módulo 1: Cadenas de Markov Discretas (DTMC)

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Tratamiento matemático riguroso de la matriz de transición estocástica, descomposición espectral de Perron-Frobenius, cálculo de matrices fundamentales para estados absorbentes y tiempos medios de absorción.

### Fundamentación Teórica y Formulación Matemática

1. **Teorema de Perron-Frobenius para Matrices Estocásticas:**
   Toda matriz estocástica $mathbf{P} \in \mathbb{R}^{n \times n}$ satisface:
   - El radio espectral es $\rho(mathbf{P}) = 1$.
   - $\lambda = 1$ es siempre un autovalor de $mathbf{P}$, con autovector derecho $mathbf{e} = (1, 1, \dots, 1)^T$.
   - El autovector izquierdo normalizado asociado a $\lambda = 1$ es el **vector de estado estable** $\boldsymbol{\pi}$: $\boldsymbol{\pi} mathbf{P} = \boldsymbol{\pi}$, con $\sum \pi_i = 1$.

2. **Cadenas Absorbentes y Matriz Fundamental:**
   Partición con $r$ estados absorbentes y $t$ estados transitorios:
   $$mathbf{P} = \begin{pmatrix} mathbf{I}_{r \times r} & \mathbf{0} \\ mathbf{R}_{t \times r} & mathbf{Q}_{t \times t} \end{pmatrix}$$
   - **Matriz Fundamental $mathbf{N}$:**
     $$mathbf{N} = \sum_{k=0}^\infty mathbf{Q}^k = (\mathbf{I} - mathbf{Q})^{-1}$$
     El elemento $n_{ij}$ representa el número esperado de visitas al estado transitorio $j$ partiendo del estado $i$.
   - **Tiempo esperado hasta la absorción:** $\mathbf{t} = \mathbf{N} \mathbf{e}$.
   - **Probabilidades de absorción:** $\mathbf{B} = \mathbf{N} mathbf{R}$, donde $b_{ij}$ es la probabilidad de que la cadena sea absorbida en el estado absorbente $j$ habiendo iniciado en el transitorio $i$.

**Literatura Canónica & Contraste Web:**
- **Kemeny & Snell (1976)** — *Finite Markov Chains*: El texto clásico definitivo para cadenas absorbentes y regulares.
- **E. Seneta (2006)** — *Non-negative Matrices and Markov Chains*.
- **Toro Ocampo (UTP)**: Módulos avanzados de investigación de operaciones estocástica.

**Aplicación Industrial UTP:**
Modelado del riesgo de crédito comercial de distribuidores mayoristas de alimentos (Al Día, Mora 30 días, Mora 60 días, Cartera Castigada / Pérdida): cálculo del tiempo medio hasta la recuperación o castigo y cálculo de reservas monetarias técnicas.

> **Interacción Computacional:** Herramienta: Analizador DTMC en `/tools#markov` y laboratorio Pyodide Wasm.

---

<a id="ii713-m2"></a>
## [II713] Procesos Estocásticos — Módulo 2: Procesos de Poisson y Cadenas de Tiempo Continuo (CTMC)

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Derivación infinitesimal de procesos de Poisson, formulación de ecuaciones diferenciales de Kolmogorov y solución mediante matriz generadora infinitesimal Q.

### Fundamentación Teórica y Formulación Matemática

1. **Axiomas Infinitesimales de Poisson y Derivación:**
   $$\mathbb{P}(N(h) = 1) = \lambda h + o(h), \qquad \mathbb{P}(N(h) \ge 2) = o(h)$$
   Sistema diferencial prospectivo: $\frac{d P_n(t)}{dt} = -\lambda P_n(t) + \lambda P_{n-1}(t)$.
   Solución única con $P_0(0)=1$:
   $$P_n(t) = \frac{(\lambda t)^n e^{-\lambda t}}{n!}, \quad n \in \mathbb{N}_0$$

2. **Matriz Generadora Infinitesimal $mathbf{Q}$ en CTMC:**
   $$q_{ij} = \lim_{h \to 0^+} \frac{P_{ij}(h) - \delta_{ij}}{h}, \qquad q_{ii} = -\sum_{j \ne i} q_{ij}$$
   - Ecuaciones de Kolmogorov:
     * Retrospectiva (Backward): $\mathbf{P}'(t) = mathbf{Q} \mathbf{P}(t)$.
     * Prospectiva (Forward): $\mathbf{P}'(t) = \mathbf{P}(t) mathbf{Q}$.
   - Solución matricial: $\mathbf{P}(t) = e^{mathbf{Q}t} = \sum_{k=0}^\infty \frac{(mathbf{Q}t)^k}{k!}$.

3. **Distribución Límite Estacionaria:**
   $$\boldsymbol{\pi} mathbf{Q} = \mathbf{0}, \qquad \sum_{j \in S} \pi_j = 1$$
   Ecuaciones de balance de flujo global: $\pi_j \sum_{k \ne j} q_{jk} = \sum_{k \ne j} \pi_k q_{kj}$.

**Literatura Canónica & Contraste Web:**
- **Sheldon M. Ross** — *Stochastic Processes* (Wiley): Referencia canónica mundial de CTMC y procesos de Poisson.
- **Taylor & Karlin** — *An Introduction to Stochastic Modeling*.
- **Norris (1998)** — *Markov Chains* (Cambridge University Press).

**Aplicación Industrial UTP:**
Modelado de confiabilidad y disponibilidad de compresores industriales de aire en líneas de ensamblaje continuo, resolviendo la matriz $mathbf{Q}$ para predecir tasas de falla y tiempos de reparación concurrentes.

> **Interacción Computacional:** Herramienta: Demostrador interactivo de procesos estocásticos en `/tools`.

---

<a id="ii713-m3"></a>
## [II713] Procesos Estocásticos — Módulo 3: Teoría de Colas y Líneas de Espera Avanzada

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Análisis de sistemas de espera no markovianos ($M/G/1$), fórmula de Pollaczek-Khinchine, y análisis de redes de colas abiertas de Jackson.

### Fundamentación Teórica y Formulación Matemática

1. **Modelo $M/G/1$ y Fórmula de Pollaczek-Khinchine (P-K):**
   Arribos Poisson ($lambda$) y tiempos de servicio generales con media $1/mu$ y varianza $sigma_S^2$. Coeficiente de variación al cuadrado $C_s^2 = sigma_S^2 / (1/mu)^2 = sigma_S^2 mu^2$:
   - Longitud media de la cola (Fórmula P-K de la media):
     $$L_q = \frac{\lambda^2 \sigma_S^2 + \rho^2}{2(1 - \rho)} = \frac{\rho^2}{2(1 - \rho)} (1 + C_s^2)$$
   - Tiempo medio en cola: $W_q = \frac{L_q}{\lambda} = \frac{\lambda (\sigma_S^2 + 1/\mu^2)}{2(1 - \rho)}$.
   *(Implicación de ingeniería industrial: Si el servicio es perfectamente determinístico ($M/D/1, \sigma_S^2 = 0$), $L_q$ se reduce a la mitad exacta de una cola $M/M/1$).*

2. **Redes de Colas Abiertas de Jackson (1957):**
   Red de $M$ estaciones de servicio independientes donde los clientes transitan según una matriz de enrutamiento $r_{ij}$:
   - Ecuaciones de tráfico de Jackson:
     $$\lambda_j = \gamma_j + \sum_{i=1}^M \lambda_i r_{ij}, \quad j = 1, \dots, M$$
   - **Teorema de Jackson:** En estado estable, la red se comporta como si cada nodo fuera una cola $M/M/c_j$ independiente alimentada por un proceso de Poisson con tasa $\lambda_j$. La distribución conjunta es producto tensorial:
     $$P(n_1, n_2, \dots, n_M) = \prod_{j=1}^M P_j(n_j)$$

**Literatura Canónica & Contraste Web:**
- **Felix Pollaczek (1930)** & **Aleksandr Khinchine (1932)**: Deducción de la fórmula P-K para colas generales.
- **James R. Jackson (1957)** — *Networks of Waiting Lines* (Operations Research).
- **Leonard Kleinrock (1975)** — *Queueing Systems, Volume 1: Theory*.

**Aplicación Industrial UTP:**
Modelado de una celda de manufactura metalmecánica multietapa (Corte $\to$ Torneado $\to$ Fresado $\to$ Inspección) mediante redes de Jackson para balancear capacidades de máquina y erradicar cuellos de botella.

> **Interacción Computacional:** Herramienta: Calculadora de Teoría de Colas en `/tools#queueing`.

---

<a id="ii713-m4"></a>
## [II713] Procesos Estocásticos — Módulo 4: Confiabilidad de Sistemas Industriales

- **Coordinación Académica:** Dra. Eliana Mirledy Toro Ocampo
- **Competencia Formativa:** Modelado matemático de funciones de supervivencia, tasas de falla instantánea (hazard rate), confiabilidad de arquitecturas complejas (serie, paralelo, k-de-n) y cálculo del MTBF.

### Fundamentación Teórica y Formulación Matemática

1. **Funciones Clave de Confiabilidad:**
   - Supervivencia: $R(t) = \mathbb{P}(T > t) = 1 - F(t)$.
   - Densidad: $f(t) = -R'(t)$.
   - Tasa de fallo instantánea (Hazard Rate):
     $$\lambda(t) = \frac{f(t)}{R(t)} = -\frac{d}{dt}[\ln R(t)]$$
   - Identidad integral:
     $$R(t) = \exp\left( -\int_0^t \lambda(u) du \right)$$
   - Tiempo Medio Hasta el Fallo (MTTF):
     $$\text{MTTF} = \int_0^\infty R(t) dt$$

2. **Topologías de Sistemas:**
   - **Sistema Serie (n componentes independientes):**
     $$R_s(t) = \prod_{i=1}^n R_i(t), \qquad \lambda_s(t) = \sum_{i=1}^n \lambda_i(t)$$
   - **Sistema Paralelo (Redundancia activa total):**
     $$R_p(t) = 1 - \prod_{i=1}^n (1 - R_i(t))$$
   - **Sistema $k$-de-$n$ ($k$-out-of-$n:G$) con componentes i.i.d.:**
     $$R_{k/n}(t) = \sum_{j=k}^n \binom{n}{j} [R(t)]^j [1 - R(t)]^{n-j}$$
     *Caso 2-de-3 (Triple Modular Redundancy - TMR):* $R_{2/3}(t) = 3 R(t)^2 - 2 R(t)^3$.

**Literatura Canónica & Contraste Web:**
- **William Q. Meeker & Luis A. Escobar (1998)** — *Statistical Methods for Reliability Data* (Wiley).
- **Richard E. Barlow & Frank Proschan (1975)** — *Statistical Theory of Reliability and Life Testing*.
- **Norma IEC 61508 / ISA-84**: Seguridad funcional de sistemas instrumentados en la industria de procesos.

**Aplicación Industrial UTP:**
Diseño de la arquitectura de instrumentación y válvulas de alivio para calderas pirotubulares en ingenios azucareros, garantizando nivel de integridad de seguridad SIL-3 mediante redundancia 2-de-3 (TMR).

> **Interacción Computacional:** Herramienta: Módulo de Confiabilidad y Confiabilidad $k$-de-$n$ en `/tools`.

---

<a id="ii863-m1"></a>
## [II863] Simulación de Sistemas — Módulo 1: Simulación de Eventos Discretos y Mecanismo de Reloj

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Diseño algorítmico del motor de simulación de eventos discretos, gestión del reloj de avance al evento próximo y arquitectura de la Lista de Eventos Futuros (FEL).

### Fundamentación Teórica y Formulación Matemática

1. **Paradigmas de Avance del Tiempo en Simulación:**
   - **Avance por Intervalo Fijo (Time-Step):** $t_{k+1} = t_k + \Delta t$. Ineficiente cuando no ocurren eventos en muchos intervalos.
   - **Avance al Evento Próximo (Next-Event Time Advance):**
     $$t_{\text{reloj}} \leftarrow \min \{ t_e : e \in \text{FEL} \}$$
     El reloj salta instantáneamente al momento del próximo evento programado, maximizando la velocidad computacional.

2. **Estructura Formal de la Lista de Eventos Futuros (FEL):**
   La FEL es una cola de prioridad ordenada crecientemente por tiempo de ocurrencia $t_e$:
   $$\text{FEL} = \{ (t_1, E_1), (t_2, E_2), \dots, (t_k, E_k) \}, \quad t_1 \le t_2 \le \dots \le t_k$$
   - Complejidad de inserción: $O(\log k)$ mediante montículo binario (Binary Heap).

3. **Variables de Estado y Acumuladores Estadísticos de Área:**
   - Promedio ponderado en el tiempo de entidades en el sistema:
     $$\bar{L} = \frac{1}{T_{\text{sim}}} \int_0^{T_{\text{sim}}} L(t) dt = \frac{1}{T_{\text{sim}}} \sum_{k=1}^M L(t_{k-1}) (t_k - t_{k-1})$$
   - Utilización del servidor:
     $$\bar{B} = \frac{1}{T_{\text{sim}}} \int_0^{T_{\text{sim}}} B(t) dt, \quad B(t) \in \{0, 1\}$$

**Literatura Canónica & Contraste Web:**
- **Averill M. Law (2015)** — *Simulation Modeling and Analysis*: Capítulos 1 y 2 sobre el mecanismo de reloj y la FEL.
- **Banks, Carson, Nelson & Nicol (2010)** — *Discrete-Event System Simulation*.
- **Soto Mejía (UTP)**: Notas de laboratorio de simulación en ProModel y Simio.

**Aplicación Industrial UTP:**
Simulación computacional de la sala de urgencias de un hospital de tercer nivel en Pereira: modelado de la llegada de pacientes con diferentes niveles de triage mediante avance de eventos discretos.

> **Interacción Computacional:** Herramienta: Motor de Simulación Discreta en `/tools` y visualizador de estado del sistema.

---

<a id="ii863-m2"></a>
## [II863] Simulación de Sistemas — Módulo 2: Generación y Pruebas de Números Pseudoaleatorios

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Implementación matemática de Generadores Congruenciales Lineales (LCG), evaluación de período máximo y validación estadística de uniformidad e independencia.

### Fundamentación Teórica y Formulación Matemática

1. **Generadores Congruenciales Lineales (Lehmer, 1951):**
   $$X_{n+1} = (a X_n + c) \pmod m, \qquad R_n = \frac{X_n}{m} \in [0, 1)$$
   donde $m > 0$ es el módulo, $a$ el multiplicador, $c$ el incremento y $X_0$ la semilla.
   - **Teorema de Hull-Dobell (1962) para Período Completo ($m$):**
     El LCG tiene período máximo igual a $m$ si y solo si:
     1. $c$ y $m$ son primos relativos ($gcd(c, m) = 1$).
     2. Todo factor primo de $m$ divide a $a - 1$ ($p \mid m \implies p \mid (a - 1)$).
     3. Si $4$ divide a $m$, entonces $4$ divide a $a - 1$ ($4 \mid m \implies 4 \mid (a - 1)$).

2. **Batería de Pruebas Estadísticas para Pseudoaleatorios:**
   - **Prueba de Uniformidad ($chi^2$ y K-S):** Verifica $R_i \sim U(0, 1)$.
   - **Prueba de Rachas (Runs Test) Arriba y Abajo de la Media:** Verifica la independencia estocástica analizando secuencias de signos $+$ y $-$.
     $$\mu_R = \frac{2n - 1}{3}, \qquad \sigma_R^2 = \frac{16n - 29}{90}, \qquad Z_0 = \frac{R - \mu_R}{\sigma_R} \sim \mathcal{N}(0, 1)$$
   - **Prueba de Autocorrelación:** Evalúa si existe dependencia serial rezagada $k$:
     $$\hat{\rho}_k = \frac{1}{M + 1} \sum_{k=0}^M R_{i + k m} R_{i + (k+1)m} - 0.25$$

**Literatura Canónica & Contraste Web:**
- **Donald E. Knuth (1997)** — *The Art of Computer Programming, Vol. 2: Seminumerical Algorithms*: La referencia matemática definitiva de generadores y pruebas.
- **Matsumoto & Nishimura (1998)** — *Mersenne Twister: A 623-Dimensionally Equidistributed Uniform Pseudo-Random Number Generator* (período $2^{19937}-1$).
- **L'Ecuyer (1999)** — *Good Parameter Sets for Combined Multiple Recursive Random Number Generators*.

**Aplicación Industrial UTP:**
Validación de la semilla y algoritmos de generación estocástica utilizados en las terminales del Laboratorio GEIO para garantizar que los modelos de simulación no introduzcan patrones espurios o sesgos cíclicos.

> **Interacción Computacional:** Herramienta: Generador y Batería de Pruebas Pseudoaleatorias en `/tools`.

---

<a id="ii863-m3"></a>
## [II863] Simulación de Sistemas — Módulo 3: Generación de Variables Aleatorias y Monte Carlo

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Transformación de números $U(0,1)$ en distribuciones teóricas arbitrarias mediante el método de la Transformada Inversa, Aceptación-Rechazo y transformación de Box-Muller.

### Fundamentación Teórica y Formulación Matemática

1. **Método de la Transformada Inversa:**
   Sea $X$ una variable aleatoria continua con CDF estrictamente creciente $F(x)$. Si $U \sim U(0, 1)$, entonces la variable aleatoria $X = F^{-1}(U)$ tiene exactamente la distribución $F(x)$.
   - **Demostración:**
     $$\mathbb{P}(X \le x) = \mathbb{P}(F^{-1}(U) \le x) = \mathbb{P}(U \le F(x)) = F(x)$$
   - Ejemplos analíticos:
     * Exponencial: $X = -\frac{1}{\lambda} \ln(1 - U) \equiv -\frac{1}{\lambda} \ln(U)$.
     * Weibull: $X = \eta [-\ln(1 - U)]^{1/\beta}$.
     * Triangular: Inversa por tramos.

2. **Método de Aceptación y Rechazo (Von Neumann, 1951):**
   Para muestrear de $f(x)$ cuando $F^{-1}$ no tiene forma cerrada, se utiliza una función de soporte $g(x)$ fácil de muestrear y una constante $c \ge 1$ tal que $f(x) \le c \cdot g(x), \forall x$:
   1. Generar $Y \sim g(y)$ y $U \sim U(0, 1)$.
   2. Si $U \le \frac{f(Y)}{c \cdot g(Y)}$, aceptar $X = Y$.
   3. Si no, rechazar y volver al paso 1.
   - Eficiencia del algoritmo: La probabilidad de aceptación es $\frac{1}{c}$.

3. **Transformación de Box-Muller (1958) para la Normal:**
   Genera dos normales estándar independientes $Z_1, Z_2 \sim \mathcal{N}(0, 1)$ a partir de $U_1, U_2 \sim U(0, 1)$:
   $$Z_1 = \sqrt{-2 \ln U_1} \cos(2\pi U_2), \qquad Z_2 = \sqrt{-2 \ln U_1} \sin(2\pi U_2)$$

**Literatura Canónica & Contraste Web:**
- **Luc Devroye (1986)** — *Non-Uniform Random Variate Generation* (Springer): Obra maestra de generación de distribuciones.
- **George Marsaglia (1964)** — *Generating a Variable from the Tail of the Normal Distribution*.
- **Box & Muller (1958)** — *A Note on the Generation of Random Normal Deviates*.

**Aplicación Industrial UTP:**
Generación estocástica de tiempos de atención y reparación en modelos ProModel/Simio para evaluar políticas de mantenimiento predictivo en plantas embotelladoras.

> **Interacción Computacional:** Herramienta: Simulador Monte Carlo en `/tools#montecarlo`.

---

<a id="ii863-m4"></a>
## [II863] Simulación de Sistemas — Módulo 4: Análisis de Salida, Transitorio y Validación

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Detección del estado transitorio (Warm-up Period), método de medias de Welch, diseño de corridas independientes y cálculo de intervalos de confianza por replicación.

### Fundamentación Teórica y Formulación Matemática

1. **El Problema del Sesgo Inicial (Transitorio):**
   Las simulaciones típicamente inician con el sistema vacío e inactivo ($L(0) = 0$), lo cual sesga a la baja la estimación del estado estable a largo plazo.
   - **Procedimiento de Welch (1983):**
     Promediar a través de $R$ réplicas independientes la serie de tiempo observada $Y_{ri}$:
     $$\bar{Y}_i = \frac{1}{R} \sum_{r=1}^R Y_{ri}, \quad i = 1, \dots, m$$
     Calcular una media móvil suavizada de ancho $w$:
     $$\bar{Y}_i(w) = \frac{1}{2w + 1} \sum_{s=-w}^w \bar{Y}_{i+s}$$
     El período de precalentamiento (Warm-up $d$) se fija visualmente donde la curva se aplana horizontalmente. Todos los datos para $i \le d$ se **descartan**.

2. **Método de Réplicas Independientes:**
   Se ejecutan $R$ corridas independientes, cada una con semillas aleatorias no correlacionadas y duración $T$. Sea $\bar{X}_r$ la media muestral de la réplica $r$:
   $$\bar{X} = \frac{1}{R} \sum_{r=1}^R \bar{X}_r, \qquad S^2 = \frac{1}{R-1} \sum_{r=1}^R (\bar{X}_r - \bar{X})^2$$
   Intervalo de confianza del $(1-\alpha)\%$:
   $$\bar{X} \pm t_{\alpha/2, R-1} \frac{S}{\sqrt{R}}$$

3. **Determinación del Número Óptimo de Réplicas ($R^*$):**
   Para garantizar un semiancho de error máximo $\epsilon$:
   $$R^* \ge \left( \frac{t_{\alpha/2, R-1} \cdot S}{\epsilon} \right)^2$$

**Literatura Canónica & Contraste Web:**
- **Peter D. Welch (1983)** — *The Statistical Analysis of Simulation Results*.
- **Law & Kelton (2000)**: Capítulo 9 sobre análisis estadístico de datos de salida de simulación.
- **Kleijnen (1998)** — *Validation of Trace-Driven Simulation Models: A Novel Perspective*.

**Aplicación Industrial UTP:**
Determinación del tiempo de calentamiento de 2 horas y cálculo de 30 réplicas independientes para validar un nuevo diseño de layout de producción en confecciones deportivas de Dosquebradas.

> **Interacción Computacional:** Herramienta: Módulo de Validación de Simulación y Réplicas en `/tools`.

---

<a id="io143-m1"></a>
## [IO143] Simulación de Dinámica de Sistemas — Módulo 1: Pensamiento Sistémico y Diagramas de Ciclo Causal

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Modelado cualitativo de la estructura de retroalimentación de sistemas complejos sociotécnicos mediante Diagramas de Ciclo Causal (CLD), análisis de polaridades y arquetipos sistémicos.

### Fundamentación Teórica y Formulación Matemática

1. **Axiomas de la Dinámica de Sistemas (Forrester, 1961):**
   La conducta en el tiempo de un sistema surge de su **estructura interna de retroalimentación**, caracterizada por bucles cerrados de causalidad, acumulaciones y retrasos temporales.

2. **Polaridad Causal y Reglas de Signos en CLDs:**
   - **Enlace Causal Positivo ($X \xrightarrow{+} Y$):** $\frac{\partial Y}{\partial X} > 0$. Un incremento en $X$ causa un incremento en $Y$ por encima de lo que habría sido (ceteris paribus).
   - **Enlace Causal Negativo ($X \xrightarrow{-} Y$):** $\frac{\partial Y}{\partial X} < 0$. Un incremento en $X$ causa una reducción en $Y$ respecto a su trayectoria base.
   - **Regla de Polaridad del Bucle:**
     Sea un bucle cerrado de retroalimentación con $k$ enlaces con signos $s_i \in \{+1, -1\}$:
     $$\text{Signo del Bucle} = \prod_{i=1}^k s_i$$
     * Si el producto es $+1$: **Bucle de Refuerzo (R)** $\implies$ Genera comportamiento autoamplificador exponencial (crecimiento o colapso acelerado).
     * Si el producto es $-1$: **Bucle de Balance (B)** $\implies$ Genera búsqueda de metas, estabilidad o comportamiento oscilatorio.

3. **Arquetipos Sistémicos Clásicos (Peter Senge, 1990):**
   - **Límites del Crecimiento:** Bucle de refuerzo inicial restringido por un bucle de balance con capacidad portante.
   - **Desplazamiento de la Carga (Shifting the Burden):** Solución sintomática a corto plazo que atrofia la capacidad de solución fundamental.
   - **Tragedia del Terreno Común (Tragedy of the Commons):** Sobreexplotación de un recurso compartido no regulado.

**Literatura Canónica & Contraste Web:**
- **Jay W. Forrester (1961)** — *Industrial Dynamics* (MIT Press): Obra fundacional.
- **John D. Sterman (2000)** — *Business Dynamics: Systems Thinking and Modeling for a Complex World* (McGraw-Hill): La biblia de la dinámica de sistemas moderna.
- **Peter Senge (1990)** — *The Fifth Discipline: The Art and Practice of the Learning Organization*.

**Aplicación Industrial UTP:**
Mapeo sistémico de la cadena de suministro cafetera colombiana: análisis del ciclo de precios internacionales, incentivos de siembra, desfases biológicos de cosecha y colapso de inventarios de reserva.

> **Interacción Computacional:** Herramienta: Visualizador conceptual de Bucles Causales en `/tools`.

---

<a id="io143-m2"></a>
## [IO143] Simulación de Dinámica de Sistemas — Módulo 2: Modelado de Niveles, Flujos y Retrasos de Información

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Formulación de ecuaciones diferenciales de Stocks y Flujos, métodos de integración numérica (Euler, Runge-Kutta 4) y formalización analítica de retrasos de información y materiales.

### Fundamentación Teórica y Formulación Matemática

1. **Ecuación Fundamental de Stocks (Niveles) y Flujos:**
   Un nivel $S(t)$ acumula la diferencia neta entre sus tasas de flujo de entrada $I(t)$ y de salida $O(t)$:
   $$S(t) = S(t_0) + \int_{t_0}^t [I(\tau) - O(\tau)] d\tau \iff \frac{d S(t)}{dt} = I(t) - O(t)$$

2. **Integración Numérica:**
   - **Método de Euler:** $S(t + \Delta t) = S(t) + \Delta t \cdot [I(t) - O(t)]$. Requiere $\Delta t < \frac{1}{2} \tau_{\min}$ para evitar inestabilidad numérica.
   - **Método de Runge-Kutta de 4to Orden (RK4):** Error local $O(\Delta t^5)$ y global $O(\Delta t^4)$.

3. **Formalización Matemática de Retrasos (Delays):**
   - **Retraso de Material de Primer Orden:**
     $$\frac{d O(t)}{dt} = \frac{I(t) - O(t)}{D} \implies O(t) = \frac{1}{D} \int_0^t I(\tau) e^{-(t-\tau)/D} d\tau$$
     donde $D$ es el retraso promedio.
   - **Retrasos de Orden Superior (Erlang):**
     Cascada de $n$ retrasos idénticos de primer orden de constante $D/n$:
     $$\frac{d R_k(t)}{dt} = \frac{n}{D} [R_{k-1}(t) - R_k(t)], \quad k = 1, \dots, n$$
     La distribución de tiempos de tránsito converge a una distribución Gamma/Erlang con media $D$ y varianza $\sigma^2 = D^2/n$. Cuando $n \to \infty$, converge a un retraso de tubería puro (Pipeline Delay) $O(t) = I(t - D)$.

**Literatura Canónica & Contraste Web:**
- **Sterman (2000)**: Capítulos 11 y 12 sobre modelado de stocks, flujos y cadenas de retrasos Erlang.
- **Forrester (1968)** — *Principles of Systems*.
- **Barlas (1996)** — *Formal aspects of model validity and validation in system dynamics*.

**Aplicación Industrial UTP:**
Simulación del Efecto Látigo (Bullwhip Effect) en la distribución de bebidas en Risaralda: demostración cuantitativa de cómo los retrasos de producción e información de pedidos amplifican las oscilaciones de inventario aguas arriba.

> **Interacción Computacional:** Herramienta: Simulador dinámico de stocks y flujos en `/tools`.

---


# Bloque D: Producción, Logística, Economía y Gestión

<a id="ii152-m1"></a>
## [II152] Administración Industrial — Módulo 1: Teoría Organizacional y Modelado de Procesos

- **Coordinación Académica:** Dra. María Elena Bernal Loaiza
- **Competencia Formativa:** Capacidad para analizar y diagramar la arquitectura de procesos organizacionales bajo notación BPMN 2.0, identificar la cadena de valor de Porter y diagnosticar pérdidas operativas.

### Fundamentación Teórica y Formulación Matemática

1. **Evolución Paradigmática de la Teoría Organizacional:**
   - **Administración Científica (Taylor, 1911):** Racionalización del trabajo, estudio de tiempos y movimientos, división de tareas.
   - **Teoría Clásica (Fayol, 1916):** Funciones administrativas cardinales (Planear, Organizar, Dirigir, Coordinar, Controlar) y principios de unidad de mando y jerarquía.
   - **Enfoque Sociotécnico y de Sistemas:** La empresa como sistema abierto termodinámico que intercambia flujos de materia, energía e información con su entorno.

2. **Modelado y Arquitectura de Procesos (BPMN 2.0):**
   Un proceso de negocio se formaliza como una Red de Petri o Grafo de Flujo $G = (E, T, F)$, donde $E$ son eventos (inicio, intermedio, fin), $T$ son tareas o actividades y $F \subseteq (E \times T) \cup (T \times E)$ los flujos de secuencia.
   - **Compuertas Lógicas (Gateways):**
     * Exclusiva (XOR): Bifurcación mutuamente excluyente $\sum p_i = 1$.
     * Paralela (AND): Sincronización obligatoria de flujos concurrentes.
     * Inclusiva (OR): Activación de una o más ramas factibles.

3. **Mapeo de la Cadena de Valor (Value Stream Mapping - VSM):**
   - Tiempo de Ciclo Individual ($C/T$) y Tiempo de Valor Agregado ($VA$).
   - Tiempo de Entrega Total (Lead Time - $LT$):
     $$LT = \sum_{i=1}^k \frac{\text{Inventario en Proceso } (WIP_i)}{\text{Tasa de Consumo}} + \sum_{i=1}^k C/T_i$$
   - Eficiencia del Ciclo del Proceso (PCE):
     $$PCE = \frac{\text{Tiempo de Valor Agregado Total (VA)}}{LT} \times 100\%$$
     *(En manufactura tradicional, $PCE$ suele ser inferior al 5%, revelando que el 95% del tiempo del producto transcurre en esperas e inventarios ociosos).*

**Literatura Canónica & Contraste Web:**
- **Michael E. Porter (1985)** — *Competitive Advantage: Creating and Sustaining Superior Performance*: Concepto de Cadena de Valor (actividades primarias y de soporte).
- **Rother & Shook (2003)** — *Learning to See: Value Stream Mapping to Add Value and Eliminate MUDA* (Lean Enterprise Institute).
- **OMG (Object Management Group)**: Especificación formal internacional de BPMN 2.0.

**Aplicación Industrial UTP:**
Reingeniería y mapeo VSM de la línea de ensamble en una fábrica de transformadores eléctricos de Pereira: reducción del Lead Time de 18 a 6 días mediante eliminación de traslados innecesarios y balanceo de carga.

> **Interacción Computacional:** Herramienta: Módulo de Gestión de Procesos y Métricas de Flujo en `/tools`.

---

<a id="ii152-m2"></a>
## [II152] Administración Industrial — Módulo 2: Gestión Estratégica, Productividad y OEE

- **Coordinación Académica:** Dra. María Elena Bernal Loaiza
- **Competencia Formativa:** Diseño y cálculo riguroso del indicador de Eficiencia Global de Equipos (OEE), análisis de productividad total y multifactorial, y formulación de mapas estratégicos de Balanced Scorecard.

### Fundamentación Teórica y Formulación Matemática

1. **Medición Analítica de Productividad:**
   - Productividad Total de los Factores (PTF):
     $$\text{Productividad} = \frac{\text{Valor de la Producción (Outputs)}}{\text{Costo Total de Recursos Insumidos (Inputs)}} = \frac{\sum P_j Y_j}{\sum W_i X_i}$$
   - Productividad Parcial de la Mano de Obra: $\frac{\text{Unidades Producidas}}{\text{Horas-Hombre trabajadas}}$.

2. **Indicador OEE (Overall Equipment Effectiveness - Nakajima, 1988):**
   El estándar TPM mundial para cuantificar las 6 Grandes Pérdidas en maquinaria:
   $$OEE = A \times P \times Q$$
   donde:
   - **Disponibilidad ($A$):**
     $$A = \frac{\text{Tiempo de Operación Real}}{\text{Tiempo Planificado de Carga}} = \frac{T_{\text{plan}} - T_{\text{paradas}}}{T_{\text{plan}}}$$
     *(Pérdidas: Averías y tiempos de preparación/ajuste - Setup).*
   - **Rendimiento o Desempeño ($P$):**
     $$P = \frac{\text{Tiempo de Ciclo Teórico} \times \text{Total Unidades Producidas}}{\text{Tiempo de Operación Real}} = \frac{C_{\text{ideal}} \times N_{\text{total}}}{T_{\text{operación}}}$$
     *(Pérdidas: Microparadas y reducción de velocidad de diseño).*
   - **Calidad ($Q$):**
     $$Q = \frac{\text{Unidades Conformes (Buenas)}}{\text{Total Unidades Producidas}} = \frac{N_{\text{buenas}}}{N_{\text{total}}}$$
     *(Pérdidas: Defectos de proceso y rechazos en arranque).*
   - Estándar Mundial de Clase Mundial (World-Class OEE): $OEE \ge 85\%$ ($A \ge 90\%, P \ge 95\%, Q \ge 99.9\%$).

3. **Cuadro de Mando Integral (Balanced Scorecard - Kaplan & Norton, 1992):**
   Articulación de metas en 4 perspectivas interrelacionadas mediante relaciones causa-efecto: Financiera $\to$ Clientes $\to$ Procesos Internos $\to$ Aprendizaje y Crecimiento.

**Literatura Canónica & Contraste Web:**
- **Seiichi Nakajima (1988)** — *Introduction to TPM: Total Productive Maintenance* (Productivity Press).
- **Robert S. Kaplan & David P. Norton (1996)** — *The Balanced Scorecard: Translating Strategy into Action*.
- **Goldratt & Cox (1984)** — *The Goal: A Process of Ongoing Improvement* (Teoría de Restricciones - TOC).

**Aplicación Industrial UTP:**
Implementación del OEE en la línea automatizada de empaque y sellado de café en Risaralda: elevación del OEE de 61% a 82% mediante metodología SMED (Single-Minute Exchange of Die) para reducir tiempos de cambio de formato.

> **Interacción Computacional:** Herramienta: Calculador de OEE y Análisis de Pérdidas TPM en `/tools`.

---

<a id="ii723-m1"></a>
## [II723] Gestión de la Producción y Logística — Módulo 1: Pronósticos Cuantitativos de Demanda

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Modelado matemático de series de tiempo para predicción de demanda, ajuste de parámetros en Suavizamiento Exponencial (SES, Holt, Winters) y monitoreo de error con Tracking Signal.

### Fundamentación Teórica y Formulación Matemática

1. **Taxonomía de Métodos Cuantitativos:**
   - **Promedio Móvil Simple ($SMA_k$):**
     $$\hat{Y}_{t+1} = \frac{1}{k} \sum_{i=0}^{k-1} Y_{t-i}$$
   - **Suavizamiento Exponencial Simple (SES - Brown, 1959):**
     $$\hat{Y}_{t+1} = \alpha Y_t + (1 - \alpha) \hat{Y}_t = \hat{Y}_t + \alpha (Y_t - \hat{Y}_t), \quad \alpha \in (0, 1)$$
   - **Modelo Lineal de Holt para Series con Tendencia:**
     * Nivel suavizado: $L_t = \alpha Y_t + (1 - \alpha)(L_{t-1} + T_{t-1})$
     * Tendencia suavizada: $T_t = \beta (L_t - L_{t-1}) + (1 - \beta) T_{t-1}, \quad \beta \in (0, 1)$
     * Pronóstico a $p$ períodos: $\hat{Y}_{t+p} = L_t + p T_t$
   - **Modelo de Holt-Winters (Tendencia y Estacionalidad Multiplicativa con ciclo $s$):**
     * Nivel: $L_t = \alpha \left( \frac{Y_t}{S_{t-s}} \right) + (1 - \alpha)(L_{t-1} + T_{t-1})$
     * Tendencia: $T_t = \beta (L_t - L_{t-1}) + (1 - \beta) T_{t-1}$
     * Factor Estacional: $S_t = \gamma \left( \frac{Y_t}{L_t} \right) + (1 - \gamma) S_{t-s}$
     * Pronóstico: $\hat{Y}_{t+p} = (L_t + p T_t) \cdot S_{t - s + p}$

2. **Métricas de Evaluación de Exactitud del Pronóstico:**
   - Error en el período $t$: $e_t = Y_t - \hat{Y}_t$.
   - Desviación Absoluta Media (MAD): $MAD = \frac{1}{n} \sum_{t=1}^n |e_t|$.
   - Error Cuadrático Medio (MSE): $MSE = \frac{1}{n} \sum_{t=1}^n e_t^2$; $RMSE = \sqrt{MSE}$.
   - Error Porcentual Absoluto Medio (MAPE): $MAPE = \frac{1}{n} \sum_{t=1}^n \left| \frac{e_t}{Y_t} \right| \times 100\%$.
   - **Señal de Rastreo (Tracking Signal - $TS_t$):**
     $$TS_t = \frac{\sum_{i=1}^t e_i}{MAD_t} = \frac{RSFE_t}{MAD_t}$$
     Si $|TS_t| > 4$, el modelo de pronóstico está sesgado sistemáticamente y debe recalibrarse de inmediato.

**Literatura Canónica & Contraste Web:**
- **Robert G. Brown (1959)** — *Statistical Forecasting for Inventory Control*.
- **Charles C. Holt (1957)** / **Peter R. Winters (1960)**: Formulación de los modelos de tendencia y estacionalidad.
- **Makridakis, Wheelwright & Hyndman (1998)** — *Forecasting: Methods and Applications*.

**Aplicación Industrial UTP:**
Pronóstico estacional de la demanda mensual de sacos de fertilizantes en el Comité de Cafeteros de Risaralda: reducción del MAPE del 22% al 7.4% mediante modelo de Holt-Winters con seguimiento de Tracking Signal.

> **Interacción Computacional:** Herramienta: Forecasting Workbench (`/tools#forecasting`) con modelos SMA, SES, Holt, métricas en vivo y gráfico de proyección SVG.

---

<a id="ii723-m2"></a>
## [II723] Gestión de la Producción y Logística — Módulo 2: Gestión de Inventarios y Cadena de Suministro

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Diseño de redes de suministro de alto rendimiento, optimización de políticas continuas (s, Q) y periódicas (R, S), y mitigación del efecto látigo mediante visibilidad de datos.

### Fundamentación Teórica y Formulación Matemática

1. **Políticas de Control de Inventarios Estocásticos:**
   - **Política de Revisión Continua $(s, Q)$:** Cada vez que la posición de inventario cae al punto de reorden $s$, se solicita un lote fijo de tamaño $Q$.
     $$s = \mathbb{E}[D_L] + Z_\alpha \sigma_L$$
   - **Política de Revisión Periódica $(R, S)$:** Cada intervalo fijo de tiempo $R$, se ordena la cantidad necesaria para llevar la posición al nivel meta $S$:
     $$S = \mathbb{E}[D_{R + L}] + Z_\alpha \sigma_{R + L} = \mu_d (R + L) + Z_\alpha \sigma_d \sqrt{R + L}$$

2. **Efecto Látigo (Bullwhip Effect - Lee, Padmanabhan & Whang, 1997):**
   Fenómeno donde la varianza de los pedidos se amplifica progresivamente a medida que se asciende en la cadena de suministro (Minorista $\to$ Mayorista $\to$ Fabricante $\to$ Proveedor):
   $$\frac{\text{Var}(O)}{\text{Var}(D)} = 1 + \frac{2L}{p} + \frac{2L^2}{p^2} > 1$$
   donde $L$ es el tiempo de entrega de reabastecimiento y $p$ el número de períodos observados para actualizar pronósticos.
   - **Cuatro Causas Clave:** Actualización desordenada de pronósticos de demanda, pedidos por lotes (Order Batching), fluctuaciones de precios (descuentos promocionales), y juegos de escasez y racionamiento.

**Literatura Canónica & Contraste Web:**
- **Hau L. Lee, V. Padmanabhan & Seungjin Whang (1997)** — *The Bullwhip Effect in Supply Chains* (Sloan Management Review).
- **Simchi-Levi, Kaminsky & Simchi-Levi (2008)** — *Designing and Managing the Supply Chain*.
- **Chopra & Meindl (2016)** — *Supply Chain Management: Strategy, Planning, and Operation*.

**Aplicación Industrial UTP:**
Implementación de Inventario Administrado por el Proveedor (VMI - Vendor Managed Inventory) entre una planta productora de envases plásticos y embotelladoras de Pereira, reduciendo el efecto látigo y eliminando un 30% del stock inmovilizado.

> **Interacción Computacional:** Herramienta: Inventory Optimization Tool (`/tools#inventory`) y simulador de la cadena de suministro.

---

<a id="ii543-m1"></a>
## [II543] Ingeniería Económica y Finanzas — Módulo 1: Matemáticas Financieras y Valor del Dinero en el Tiempo

- **Coordinación Académica:** Dr. Carlos Osorio Ramírez
- **Competencia Formativa:** Modelación analítica de la equivalencia financiera del dinero en el tiempo, conversión de tasas efectivas, nominales y anticipadas, y diseño de tablas de amortización.

### Fundamentación Teórica y Formulación Matemática

1. **Axioma del Valor del Dinero en el Tiempo:**
   Un peso hoy tiene un valor económico superior a un peso futuro debido a su costo de oportunidad, riesgo e inflación.

2. **Interés Simple vs. Compuesto:**
   - Interés Simple: $F = P(1 + i \cdot n)$.
   - **Interés Compuesto (Capitalización periódica):**
     $$F = P (1 + i)^n \iff P = F (1 + i)^{-n}$$

3. **Conversión Rigurosa de Tasas de Interés:**
   - Tasa Nominal Anual ($j$) capitalizable $m$ veces al año: Tasa periódica $i_p = j/m$.
   - **Tasa Efectiva Anual ($i_e$):**
     $$i_e = (1 + i_p)^m - 1 = \left( 1 + \frac{j}{m} \right)^m - 1$$
   - Tasa Anticipada ($i_a$) a Tasa Vencida ($i_v$):
     $$i_v = \frac{i_a}{1 - i_a}, \qquad i_a = \frac{i_v}{1 + i_v}$$
   - **Ecuación de Fisher (Tasa Real vs. Tasa Inflacionaria $\pi$):**
     $$1 + i_{\text{corriente}} = (1 + i_{\text{real}})(1 + \pi) \implies i_{\text{real}} = \frac{i_{\text{corriente}} - \pi}{1 + \pi}$$

4. **Series Uniformes (Anualidades) y Gradientes:**
   - Valor Presente de una Anualidad Vencida ($A$):
     $$P = A \left[ \frac{1 - (1 + i)^{-n}}{i} \right] = A (P/A, i, n)$$
   - Valor Futuro de una Anualidad: $F = A \left[ \frac{(1 + i)^n - 1}{i} \right] = A (F/A, i, n)$.
   - Cuota de Amortización Francesa (Cuota Fija): $A = P \left[ \frac{i(1 + i)^n}{(1 + i)^n - 1} \right]$.

**Literatura Canónica & Contraste Web:**
- **Leland Blank & Anthony Tarquin (2018)** — *Basics of Engineering Economy* (McGraw-Hill): Texto rector internacional de ingeniería económica.
- **Sullivan, Wicks & Koelling (2014)** — *Engineering Economy* (Pearson).
- **García Santander & Soto Mejía (UTP)**: Guías académicas de matemáticas financieras para ingenieros.

**Aplicación Industrial UTP:**
Estructuración del financiamiento de una línea de extrusión plástica en Dosquebradas mediante leasing financiero: cálculo de la cuota uniforme equivalente frente a amortización con abono constante a capital.

> **Interacción Computacional:** Herramienta: Workbench de Ingeniería Económica y Finanzas en `/tools#economics`.

---

<a id="ii543-m2"></a>
## [II543] Ingeniería Económica y Finanzas — Módulo 2: Evaluación de Proyectos de Inversión (VPN / TIR)

- **Coordinación Académica:** Dr. Carlos Osorio Ramírez
- **Competencia Formativa:** Evaluación financiera rigurosa de flujos de caja de proyectos mediante VPN, TIR, TIR Modificada, relación Beneficio/Costo y análisis de sensibilidad de la Tasa de Descuento (WACC).

### Fundamentación Teórica y Formulación Matemática

1. **Valor Presente Neto (VPN / NPV):**
   Suma descontada de todos los flujos netos de caja $F_t$ a la tasa de descuento $k$ (Costo Promedio Ponderado de Capital - WACC), deduciendo la inversión inicial $I_0$:
   $$VPN(k) = \sum_{t=1}^n \frac{F_t}{(1 + k)^t} - I_0$$
   - **Regla de Decisión:**
     * $VPN > 0$: El proyecto genera riqueza neta por encima del costo de capital $\implies$ **Aceptar**.
     * $VPN = 0$: El proyecto renta exactamente la tasa de oportunidad $k$.
     * $VPN < 0$: El proyecto destruye valor $\implies$ **Rechazar**.

2. **Tasa Interna de Retorno (TIR / IRR):**
   Tasa intrínseca $i^*$ que iguala el VPN exactamente a cero:
   $$\sum_{t=1}^n \frac{F_t}{(1 + TIR)^t} - I_0 = 0$$
   - Solución numérica mediante algoritmo de Newton-Raphson:
     $$k_{m+1} = k_m - \frac{VPN(k_m)}{VPN'(k_m)}$$
   - **Regla de Descartes y Múltiples TIR:** Si el flujo de caja tiene $c$ cambios de signo, pueden existir hasta $c$ tasas internas de retorno reales positivas (proyectos no convencionales).

3. **TIR Modificada (TIRM / MIRR):**
   Resuelve la inconsistencia de la TIR tradicional asumiendo reinversión a la tasa de costo de capital $k$ y financiamiento a la tasa de financiamiento $f$:
   $$TIRM = \left( \frac{\sum_{t=0}^n \max(0, F_t)(1 + k)^{n-t}}{\sum_{t=0}^n \frac{\max(0, -F_t)}{(1 + f)^t}} \right)^{1/n} - 1$$

4. **Criterios Complementarios:**
   - **Costo Anual Uniforme Equivalente (CAUE / EAC):** Para comparar proyectos mutuamente excluyentes con vidas útiles desiguales: $CAUE = VPN(k) \cdot (A/P, k, n)$.
   - **Relación Beneficio / Costo ($B/C$):** $B/C = \frac{\text{VP de Ingresos}}{\text{VP de Egresos}}$. Aceptable si $B/C > 1$.

**Literatura Canónica & Contraste Web:**
- **Irving Fisher (1930)** — *The Theory of Interest*: Fundamento de la equivalencia financiera y selección de inversiones.
- **Blank & Tarquin (2018)**: Capítulos 5 y 6 sobre VPN, TIR y comparación de alternativas.
- **Bierman & Smidt (2012)** — *The Capital Budgeting Decision*.

**Aplicación Industrial UTP:**
Evaluación de la factibilidad económica de reemplazar calderas convencionales de carbón por gas natural y biomasa en Risaralda: cálculo del VPN al WACC del 12.5%, TIR del 24.8% y CAUE para vidas útiles de 15 vs 25 años.

> **Interacción Computacional:** Herramienta: Herramienta de Finanzas VPN / TIR (`/tools#economics`) con cálculo automático de TIR por Newton-Raphson y curva de perfil de VPN frente a la tasa de descuento.

---


# Bloque E: Posgrado Avanzado MIOE y Métodos Cuantitativos

<a id="cb213-m1"></a>
## [CB213] Métodos Cuantitativos y Álgebra Matricial — Módulo 1: Álgebra Lineal Matricial y Sistemas de Ecuaciones

- **Coordinación Académica:** Área de Ciencias Básicas y Matemáticas
- **Competencia Formativa:** Dominio de espacios vectoriales, subespacios fundamentales de una matriz (espacio nulo, rango), eliminación gaussiana y factorización LU.

### Fundamentación Teórica y Formulación Matemática

1. **Los Cuatro Subespacios Fundamentales (Strang, 1993):**
   Dada una matriz $\mathbf{A} \in \mathbb{R}^{m \times n}$ con rango $\text{rank}(\mathbf{A}) = r$:
   - **Espacio Columna $\mathcal{C}(\mathbf{A}) \subseteq \mathbb{R}^m$:** Dimensión $r$.
   - **Espacio Fila $\mathcal{C}(\mathbf{A}^T) \subseteq \mathbb{R}^n$:** Dimensión $r$.
   - **Espacio Nulo o Kernel $\mathcal{N}(\mathbf{A}) \subseteq \mathbb{R}^n$:** Dimensión $n - r$ (Teorema de Rango-Nulidad).
   - **Espacio Nulo Izquierdo $\mathcal{N}(\mathbf{A}^T) \subseteq \mathbb{R}^m$:** Dimensión $m - r$.
   *Ortogonalidad Fundamental:* $\mathcal{C}(\mathbf{A}^T) \perp \mathcal{N}(\mathbf{A})$ y $\mathcal{C}(\mathbf{A}) \perp \mathcal{N}(\mathbf{A}^T)$.

2. **Factorización LU con Pivoteo Parcial:**
   $$\mathbf{P} \mathbf{A} = \mathbf{L} \mathbf{U}$$
   donde $\mathbf{P}$ es una matriz de permutación, $\mathbf{L}$ triangular inferior unitaria y $\mathbf{U}$ triangular superior.
   - Solución del sistema $\mathbf{A}\mathbf{x} = \mathbf{b}$ en dos pasos de sustitución directa y regresiva: $\mathbf{L}\mathbf{y} = \mathbf{P}\mathbf{b}$, luego $\mathbf{U}\mathbf{x} = \mathbf{y}$ en tiempo $O(n^2)$ tras la factorización inicial $O(n^3)$.

**Literatura Canónica & Contraste Web:**
- **Gilbert Strang (2016)** — *Introduction to Linear Algebra* (Wellesley-Cambridge Press): El marco de los 4 subespacios fundamentales.
- **Golub & Van Loan (2013)** — *Matrix Computations* (Johns Hopkins University Press): La biblia del álgebra lineal numérica.
- **Horn & Johnson (2012)** — *Matrix Analysis*.

**Aplicación Industrial UTP:**
Resolución de sistemas de balance de materia y energía en plantas de destilación de alcohol carburante, asegurando estabilidad numérica frente al mal condicionamiento de matrices.

> **Interacción Computacional:** Herramienta: Módulo matricial y operaciones de álgebra lineal en `/tools`.

---

<a id="cb213-m2"></a>
## [CB213] Métodos Cuantitativos y Álgebra Matricial — Módulo 2: Autovalores, Formas Cuadráticas y Optimización

- **Coordinación Académica:** Área de Ciencias Básicas y Matemáticas
- **Competencia Formativa:** Cálculo analítico de autovalores y autovectores, diagonalización espectral de matrices simétricas, clasificación de formas cuadráticas y análisis del Hessiano.

### Fundamentación Teórica y Formulación Matemática

1. **Problema de Autovalores y Teorema Espectral:**
   $$\mathbf{A} \mathbf{v} = \lambda \mathbf{v}, \quad \det(\mathbf{A} - \lambda \mathbf{I}) = 0$$
   - **Teorema Espectral para Matrices Simétricas Reales:** Si $\mathbf{A} = \mathbf{A}^T \in \mathbb{R}^{n \times n}$:
     * Todos sus autovalores $\lambda_1, \dots, \lambda_n$ son números reales.
     * Existe una base ortonormal de autovectores $\mathbf{Q} = [\mathbf{q}_1 \dots \mathbf{q}_n]$ con $\mathbf{Q}^T \mathbf{Q} = \mathbf{I}$.
     * Descomposición espectral: $\mathbf{A} = \mathbf{Q} \boldsymbol{\Lambda} \mathbf{Q}^T = \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T$.

2. **Formas Cuadráticas y Clasificación:**
   $$q(\mathbf{x}) = \mathbf{x}^T \mathbf{A} \mathbf{x} = \sum_{i=1}^n \sum_{j=1}^n a_{ij} x_i x_j$$
   - **Definida Positiva ($\mathbf{A} \succ 0$):** $q(\mathbf{x}) > 0, \forall \mathbf{x} \ne \mathbf{0} \iff \lambda_i > 0, \forall i \iff$ Todos los menores principales dominantes $\Delta_k > 0$ (Criterio de Sylvester).
   - **Semidefinida Positiva ($\mathbf{A} \succeq 0$):** $\lambda_i \ge 0, \forall i$.
   - **Indefinida:** Existen autovalores con signos opuestos $\implies$ Punto de silla (Saddle Point).

3. **Descomposición en Valores Singulares (SVD):**
   Para cualquier matriz rectangular $\mathbf{A} \in \mathbb{R}^{m \times n}$:
   $$\mathbf{A} = \mathbf{U} \boldsymbol{\Sigma} \mathbf{V}^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T$$
   donde $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0$ son los valores singulares. Teorema de Eckart-Young-Mirsky: mejor aproximación de rango bajo en norma de Frobenius.

**Literatura Canónica & Contraste Web:**
- **Strang (2016)**: Capítulo 6 y 7 sobre Teorema Espectral y SVD.
- **Eckart & Young (1936)** — *The Approximation of One Matrix by Another of Lower Rank*.
- **Sylvester (1852)**: Criterio de menores principales para formas cuadráticas.

**Aplicación Industrial UTP:**
Compresión de imágenes térmicas para detección de fallas en transformadores de subestaciones eléctricas mediante truncamiento de valores singulares (SVD).

> **Interacción Computacional:** Herramienta: Laboratorio Pyodide Wasm con NumPy (`np.linalg.eig`, `np.linalg.svd`).

---

<a id="iod10-m1"></a>
## [IOD10] Computación Científica y Álgebra Matricial: MATLAB y Python — Módulo 1: Álgebra Matricial y Computación Numérica Vectorizada

- **Coordinación Académica:** Prof. Oscar Gómez Carmona
- **Competencia Formativa:** Programación científica de alto rendimiento basada en vectorización, eliminación de bucles escalares y álgebra lineal numérica en MATLAB y Python/NumPy.

### Fundamentación Teórica y Formulación Matemática

1. **Vectorización y Localidad Espacial:**
   Reemplazo de bucles escalares $O(n)$ por instrucciones SIMD (Single Instruction, Multiple Data) y librerías BLAS (Basic Linear Algebra Subprograms) y LAPACK optimizadas en C/Fortran:
   - Nivel 1 BLAS: Operaciones vector-vector ($y = \alpha x + y$) $\implies O(n)$.
   - Nivel 2 BLAS: Operaciones matriz-vector ($y = \alpha A x + \beta y$) $\implies O(n^2)$.
   - Nivel 3 BLAS: Operaciones matriz-matriz ($C = \alpha A B + \beta C$) $\implies O(n^3)$ con paralelismo caché-bloque.

2. **Resolución de Sistemas Lineales y Condicionamiento:**
   $$\mathbf{A} \mathbf{x} = \mathbf{b}$$
   - Número de condición en norma espectral:
     $$\kappa(\mathbf{A}) = \|\mathbf{A}\| \cdot \|\mathbf{A}^{-1}\| = \frac{\sigma_{\max}}{\sigma_{\min}}$$
   - Cota de propagación del error relativo en los datos $\frac{\|\delta \mathbf{x}\|}{\|\mathbf{x}\|} \le \kappa(\mathbf{A}) \frac{\|\delta \mathbf{b}\|}{\|\mathbf{b}\|}$.
   - Uso del operador backslash de MATLAB/SciPy (`np.linalg.solve`): Detección automática de estructura (simétrica definida positiva $\implies$ Cholesky; triangular $\implies$ sustitución; general $\implies$ LU con pivoteo parcial).

**Literatura Canónica & Contraste Web:**
- **Cleve Moler (2004)** — *Numerical Computing with MATLAB* (SIAM): Por el creador original de MATLAB.
- **Travis Oliphant (2006)** — *Guide to NumPy*: Creación del motor de ndarrays de Python.
- **Gómez Carmona (UTP)**: Cuadernos de cómputo matricial aplicado a la ingeniería.

**Aplicación Industrial UTP:**
Aceleración de 50x en el cálculo del flujo de potencia eléctrica de Risaralda transformando código iterativo en operaciones vectorizadas matriciales en Python-NumPy.

> **Interacción Computacional:** Herramienta: Entorno Python WebAssembly `<PyodideRunner />` en navegador.

---

<a id="iod10-m2"></a>
## [IOD10] Computación Científica y Álgebra Matricial: MATLAB y Python — Módulo 2: Estructuras de Datos, Visualización y Algoritmos

- **Coordinación Académica:** Prof. Oscar Gómez Carmona
- **Competencia Formativa:** Manipulación estructurada de DataFrames, visualización científica avanzada de funciones multivariadas (superficies 3D, curvas de nivel) e implementación de algoritmos numéricos.

### Fundamentación Teórica y Formulación Matemática

1. **Manipulación de Datos y Álgebra Relacional en Memoria:**
   - Transformaciones split-apply-combine en DataFrames (Pandas): Filtrado booleano, agrupaciones y agregaciones estadísticas matriciales.
   - Manejo de series de tiempo con índices temporales y remuestreo de frecuencias.

2. **Generación de Mallas y Superficies Tridimensionales:**
   - Creación de producto cartesiano en el plano $xy$:
     $$\mathbf{X}, \mathbf{Y} = \text{meshgrid}(\mathbf{x}, \mathbf{y})$$
   - Evaluación tensorial $Z_{ij} = f(X_{ij}, Y_{ij})$.
   - Proyección de curvas de nivel (Contour plots) ortogonales al vector gradiente $\nabla f(x, y)$.

3. **Algoritmos Numéricos de Búsqueda de Raíces y Cuadraturas:**
   - Bisección y Newton-Raphson: $x_{k+1} = x_k - \frac{f(x_k)}{f'(x_k)}$.
   - Cuadratura Gauss-Legendre: $\int_{-1}^1 f(x) dx \approx \sum_{i=1}^n w_i f(x_i)$.

**Literatura Canónica & Contraste Web:**
- **Wes McKinney (2017)** — *Python for Data Analysis* (O'Reilly): Por el creador de Pandas.
- **John D. Hunter (2007)** — *Matplotlib: A 2D Graphics Environment*.
- **Press, Teukolsky, Vetterling & Flannery (2007)** — *Numerical Recipes*.

**Aplicación Industrial UTP:**
Visualización 3D y análisis de contorno de funciones de respuesta de rendimiento de extracción de aceite esencial de cardamomo en laboratorios de agroindustria de la UTP.

> **Interacción Computacional:** Herramienta: Gráficos dinámicos SVG interactivos y Pyodide Wasm.

---

<a id="io123-m1"></a>
## [IO123] Análisis Multivariado — Módulo 1: Distribución Normal Multivariada y Test T² de Hotelling

- **Coordinación Académica:** Mg. Jairo Alfonso Clavijo Méndez
- **Competencia Formativa:** Inferencia estadística para vectores aleatorios multidimensionales, cálculo de la distancia estadística de Mahalanobis, y aplicación del test T² de Hotelling y MANOVA.

### Fundamentación Teórica y Formulación Matemática

1. **Densidad Normal Multivariada $\mathcal{N}_p(\boldsymbol{\mu}, \boldsymbol{\Sigma})$:**
   Vector $\mathbf{X} = (X_1, \dots, X_p)^T \in \mathbb{R}^p$ con vector de medias $\boldsymbol{\mu}$ y matriz de covarianzas simétrica definida positiva $\boldsymbol{\Sigma}$:
   $$f(\mathbf{x}) = \frac{1}{(2\pi)^{p/2} |\boldsymbol{\Sigma}|^{1/2}} \exp\left( -\frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^T \boldsymbol{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu}) \right)$$
   - **Distancia de Mahalanobis:** $D^2 = (\mathbf{x} - \boldsymbol{\mu})^T \boldsymbol{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu}) \sim \chi^2_p$. Define elipsoides de densidad constante en $\mathbb{R}^p$.

2. **Estadístico $T^2$ de Hotelling (1931) para Una Muestra:**
   Contraste $H_0: \boldsymbol{\mu} = \boldsymbol{\mu}_0$ vs $H_1: \boldsymbol{\mu} \ne \boldsymbol{\mu}_0$:
   $$T^2 = n (\bar{\mathbf{x}} - \boldsymbol{\mu}_0)^T \mathbf{S}^{-1} (\bar{\mathbf{x}} - \boldsymbol{\mu}_0)$$
   donde $\mathbf{S} = \frac{1}{n-1} \sum_{i=1}^n (\mathbf{x}_i - \bar{\mathbf{x}})(\mathbf{x}_i - \bar{\mathbf{x}})^T$.
   - Relación exacta con la distribución $F$:
     $$\frac{n - p}{p (n - 1)} T^2 \sim F_{p, n-p}$$
     Se rechaza $H_0$ si $T^2 > \frac{p(n-1)}{n-p} F_{\alpha, p, n-p}$.

3. **Análisis de Varianza Multivariado (MANOVA):**
   Evalúa diferencias en vectores de medias entre $k$ grupos experimentales.
   - Partición matricial: $\mathbf{T} = \mathbf{B} + \mathbf{W}$ (Matriz Total = Matriz Entre Tratamientos + Matriz Dentro / Residual).
   - **Lambda de Wilks:**
     $$\Lambda^* = \frac{|\mathbf{W}|}{|\mathbf{B} + \mathbf{W}|} = \prod_{i=1}^s \frac{1}{1 + \lambda_i}$$
     donde $\lambda_i$ son los autovalores de $\mathbf{W}^{-1} \mathbf{B}$.

**Literatura Canónica & Contraste Web:**
- **Richard A. Johnson & Dean W. Wichern (2007)** — *Applied Multivariate Statistical Analysis* (Pearson): El texto de referencia supremo.
- **Harold Hotelling (1931)** — *The Generalization of Student's Ratio*.
- **T. W. Anderson (2003)** — *An Introduction to Multivariate Statistical Analysis*.

**Aplicación Industrial UTP:**
Control de calidad multivariado simultáneo sobre 4 variables de tensión, elongación, espesor y brillo en películas de polipropileno biorientado (BOPP) en Dosquebradas mediante elipsoides de confianza $T^2$.

> **Interacción Computacional:** Herramienta: Módulo Multivariado en `/tools` y laboratorio Pyodide Wasm.

---

<a id="io123-m2"></a>
## [IO123] Análisis Multivariado — Módulo 2: Reducción de Dimensionalidad (PCA) y Clasificación

- **Coordinación Académica:** Mg. Jairo Alfonso Clavijo Méndez
- **Competencia Formativa:** Extracción y rotación de componentes principales no correlacionadas mediante descomposición espectral, y formulación de la regla de discriminación lineal de Fisher.

### Fundamentación Teórica y Formulación Matemática

1. **Análisis de Componentes Principales (PCA - Pearson, 1901; Hotelling, 1933):**
   Transformación ortogonal del vector $\mathbf{X} \in \mathbb{R}^p$ en variables no correlacionadas $Y_1, \dots, Y_p$:
   $$Y_j = \mathbf{a}_j^T \mathbf{X} = a_{j1} X_1 + \dots + a_{jp} X_p, \quad \|\mathbf{a}_j\|_2 = 1$$
   - Maximización de varianza:
     $$\max_{\|\mathbf{a}_1\|=1} \text{Var}(Y_1) = \max \mathbf{a}_1^T \boldsymbol{\Sigma} \mathbf{a}_1 \implies \boldsymbol{\Sigma} \mathbf{a}_1 = \lambda_1 \mathbf{a}_1$$
     Los vectores de pesos $\mathbf{a}_j$ son los autovectores normalizados de $\boldsymbol{\Sigma}$ y $\text{Var}(Y_j) = \lambda_j$, con $\lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_p \ge 0$.
   - **Proporción de Varianza Explicada:**
     $$PVE_k = \frac{\sum_{j=1}^k \lambda_j}{\sum_{j=1}^p \lambda_j} = \frac{\sum_{j=1}^k \lambda_j}{\text{traza}(\boldsymbol{\Sigma})}$$
   - Regla de Kaiser (autovalores $> 1$ en matriz de correlación) y gráfico de sedimentación (Scree Plot).

2. **Análisis Discriminante Lineal de Fisher (LDA, 1936):**
   Busca el vector de proyección $\mathbf{w}$ que maximiza la separación entre medias de clases normalizada por la dispersión intra-clase (Razón de Rayleigh):
   $$J(\mathbf{w}) = \frac{\mathbf{w}^T \mathbf{S}_B \mathbf{w}}{\mathbf{w}^T \mathbf{S}_W \mathbf{w}} \implies \mathbf{w} \propto \mathbf{S}_W^{-1} (\boldsymbol{\mu}_1 - \boldsymbol{\mu}_2)$$
   donde $\mathbf{S}_B = (\boldsymbol{\mu}_1 - \boldsymbol{\mu}_2)(\boldsymbol{\mu}_1 - \boldsymbol{\mu}_2)^T$ y $\mathbf{S}_W = \mathbf{S}_1 + \mathbf{S}_2$.

**Literatura Canónica & Contraste Web:**
- **Karl Pearson (1901)** — *On Lines and Planes of Closest Fit to Systems of Points in Space*.
- **Ronald A. Fisher (1936)** — *The Use of Multiple Measurements in Taxonomic Problems*.
- **Johnson & Wichern (2007)**: Capítulos 8 y 11 sobre PCA y Discriminante.

**Aplicación Industrial UTP:**
Reducción de 24 parámetros sensoriales y fisicoquímicos del café especial de origen a 3 componentes principales que explican el 86% de la varianza, clasificando lotes para exportación premium mediante LDA.

> **Interacción Computacional:** Herramienta: Módulo PCA y Clustering en `/tools`.

---

<a id="io133-m1"></a>
## [IO133] Diseño de Experimentos y Superficie de Respuesta — Módulo 1: Diseños Factoriales Completos y Fraccionados

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Diseño de factoriales 2^k y fraccionados 2^{k-p}, construcción de relaciones definidoras, cálculo de estructuras de alias y evaluación de Resoluciones III, IV y V.

### Fundamentación Teórica y Formulación Matemática

1. **Diseños Factoriales $2^k$ Codificados:**
   Variables $x_i \in \{-1, +1\}$. Matriz de diseño $\mathbf{X} \in \mathbb{R}^{2^k \times 2^k}$ ortogonal ($\mathbf{X}^T \mathbf{X} = 2^k \mathbf{I}$).
   - Estimador insesgado de efectos principales e interacciones:
     $$\hat{\beta}_i = \frac{1}{2^k} \mathbf{x}_i^T \mathbf{y}, \qquad \text{Efecto}_i = 2 \hat{\beta}_i$$
   - Varianza de cada estimador: $\text{Var}(\hat{\beta}_i) = \frac{\sigma^2}{n \cdot 2^k}$.

2. **Factoriales Fraccionados $2^{k-p}$:**
   Se corre una fracción $1/2^p$ seleccionando $k-p$ factores independientes y generando $p$ generadores de diseño.
   - **Relación Definidora:** $I = W_1 = W_2 = \dots = W_{2^p - 1}$.
   - **Estructura de Alias (Confounding):** Para cualquier factor $L$:
     $$[L] = L \cdot I + L \cdot W_1 + \dots + L \cdot W_{2^p - 1}$$
   - **Resoluciones Canónicas (Montgomery):**
     * **Resolución III ($2^{k-p}_{\text{III}}$):** Principales confundidos con interacciones de 2 factores ($A = BC$).
     * **Resolución IV ($2^{k-p}_{\text{IV}}$):** Principales confundidos con orden 3 ($A = BCD$); interacciones de 2 factores confundidas entre sí ($AB = CD$).
     * **Resolución V ($2^{k-p}_{\text{V}}$):** Principales confundidos con orden 4; interacciones de 2 factores confundidas solo con orden 3 o superior ($AB = CDE$).

**Literatura Canónica & Contraste Web:**
- **Douglas C. Montgomery (2017)** — *Design and Analysis of Experiments* (Wiley): Capítulos 6 y 8.
- **Box, Hunter & Hunter (2005)** — *Statistics for Experimenters: Design, Innovation, and Discovery*.
- **George E. P. Box (1952)** — *Multi-Factor Designs of First Order*.

**Aplicación Industrial UTP:**
Cribado (Screening) de 7 variables operativas en un reactor de pirólisis de residuos agrícolas en Risaralda usando un diseño fraccionado $2^{7-4}_{\text{III}}$ de 8 corridas en lugar de 128 corridas completas.

> **Interacción Computacional:** Herramienta: Generador de Matrices Factoriales en `/tools`.

---

<a id="io133-m2"></a>
## [IO133] Diseño de Experimentos y Superficie de Respuesta — Módulo 2: Metodología de Superficie de Respuesta (RSM) y Deseabilidad

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Ajuste de modelos polinomiales de segundo orden, diseño central compuesto (CCD) rotable, análisis de puntos estacionarios canónicos y optimización multirespuesta de Derringer & Suich.

### Fundamentación Teórica y Formulación Matemática

1. **Modelo de Segundo Orden y Análisis Canónico:**
   $$y = \beta_0 + \sum_{i=1}^k \beta_i x_i + \sum_{i=1}^k \beta_{ii} x_i^2 + \sum_{i < j} \beta_{ij} x_i x_j + \epsilon$$
   En forma matricial: $\hat{y}(\mathbf{x}) = \beta_0 + \mathbf{x}^T \mathbf{b} + \mathbf{x}^T \mathbf{B} \mathbf{x}$.
   - **Punto Estacionario:** $\mathbf{x}_s = -\frac{1}{2} \mathbf{B}^{-1} \mathbf{b}$.
   - Forma canónica: $\hat{y} = y_s + \sum_{i=1}^k \lambda_i w_i^2$, donde $\lambda_i$ son autovalores de $\mathbf{B}$:
     * Si $\lambda_i < 0, \forall i \implies$ Máximo local.
     * Si $\lambda_i > 0, \forall i \implies$ Mínimo local.
     * Si tienen signos mixtos $\implies$ Punto de silla (Saddle Point).

2. **Diseño Central Compuesto (CCD) Rotable:**
   Compuesto por $F = 2^k$ puntos cúbicos $(\pm 1, \dots, \pm 1)$, $2k$ puntos estrella $(\pm \alpha, 0, \dots, 0)$ y $n_c$ centros.
   - Condición de rotabilidad matemática (esfericidad de varianza):
     $$\alpha = (F)^{1/4} = (2^k)^{1/4}$$

3. **Optimización Multirespuesta (Derringer & Suich, 1980):**
   Transforma cada respuesta en $d_i \in [0, 1]$ y calcula la **Deseabilidad Global ($D$)**:
   $$D = \left( \prod_{i=1}^m d_i^{w_i} \right)^{\frac{1}{\sum w_i}}$$
   Si cualquier $d_i = 0 \implies D = 0$.

**Literatura Canónica & Contraste Web:**
- **George E. P. Box & K. B. Wilson (1951)** — *On the Experimental Attainment of Optimum Conditions* (JRSS B): Nacimiento de la RSM.
- **George Derringer & Ronald Suich (1980)** — *Simultaneous Optimization of Several Response Variables* (Journal of Quality Technology).
- **Raymond H. Myers, Douglas C. Montgomery & Christine M. Anderson-Cook (2016)** — *Response Surface Methodology*.

**Aplicación Industrial UTP:**
Optimización de 3 variables (Temperatura, Presión y Concentración de Enzima) en la hidrólisis de almidón de yuca mediante un CCD rotable con $\alpha = 1.682$, maximizando rendimiento y minimizando azúcares residuales.

> **Interacción Computacional:** Herramienta: Módulo RSM y Optimizador de Deseabilidad en `/tools`.

---

<a id="io243-m1"></a>
## [IO243] Análisis Envolvente de Datos (DEA) — Módulo 1: Fundamentos de Eficiencia y Modelos CCR y BCC

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Evaluación de eficiencia técnica relativa de Unidades Tomadoras de Decisión (DMUs), formulación envolvente y de multiplicadores en modelos CCR (CRS) y BCC (VRS).

### Fundamentación Teórica y Formulación Matemática

1. **Modelo CCR Insumo-Orientado (Charnes, Cooper & Rhodes, 1978):**
   Asume Rendimientos Constantes a Escala (CRS). Evalúa $n$ DMUs con $m$ insumos $\mathbf{x}_j$ y $s$ productos $\mathbf{y}_j$:
   - **Formulación de Multiplicadores (Dual):**
     $$\begin{aligned}
     \max \quad & \theta_0 = \sum_{r=1}^s u_r y_{r0} \\
     \text{s.a.} \quad & \sum_{i=1}^m v_i x_{i0} = 1 \\
     & \sum_{r=1}^s u_r y_{rj} - \sum_{i=1}^m v_i x_{ij} \le 0, \quad \forall j = 1, \dots, n \\
     & u_r, v_i \ge \epsilon > 0
     \end{aligned}$$
   - **Formulación de Envolvente (Primal):**
     $$\begin{aligned}
     \min \quad & \theta - \epsilon \left( \sum_{i=1}^m s_i^- + \sum_{r=1}^s s_r^+ \right) \\
     \text{s.a.} \quad & \sum_{j=1}^n \lambda_j x_{ij} + s_i^- = \theta x_{i0}, \quad \forall i = 1, \dots, m \\
     & \sum_{j=1}^n \lambda_j y_{rj} - s_r^+ = y_{r0}, \quad \forall r = 1, \dots, s \\
     & \lambda_j \ge 0, \quad s_i^-, s_r^+ \ge 0
     \end{aligned}$$
   - **Condición de Eficiencia de Pareto-Koopmans:** La $\text{DMU}_0$ es 100% eficiente si $\theta^* = 1$ y todas las holguras son nulas ($s_i^{-*} = 0, s_r^{+*} = 0$).

2. **Modelo BCC (Banker, Charnes & Cooper, 1984):**
   Incorpora Rendimientos Variables a Escala (VRS) añadiendo la restricción de convexidad:
   $$\sum_{j=1}^n \lambda_j = 1$$
   - En la forma de multiplicadores, introduce una variable libre $u_0$:
     * Si $u_0^* < 0 \implies$ Rendimientos crecientes a escala (IRS).
     * Si $u_0^* = 0 \implies$ Rendimientos constantes a escala (CRS).
     * Si $u_0^* > 0 \implies$ Rendimientos decrecientes a escala (DRS).
   - Eficiencia de Escala: $SE = \frac{\theta_{\text{CCR}}^*}{\theta_{\text{BCC}}^*}$.

**Literatura Canónica & Contraste Web:**
- **Charnes, Cooper & Rhodes (1978)** — *Measuring the Efficiency of Decision Making Units* (EJOR).
- **Banker, Charnes & Cooper (1984)** — *Some Models for Estimating Technical and Scale Inefficiencies in Data Envelopment Analysis* (Management Science).
- **Cooper, Seiford & Tone (2007)** — *Data Envelopment Analysis: A Comprehensive Text with Models, Applications, References and DEA-Solver Software*.

**Aplicación Industrial UTP:**
Evaluación de la eficiencia relativa de 14 hospitales y centros de salud de Risaralda: insumos (médicos, camas, presupuesto operativo) vs productos (consultas externas, cirugías, egresos hospitalarios), identificando DMUs de referencia de mejores prácticas.

> **Interacción Computacional:** Herramienta: Eficiencia Técnica DEA (CCR Insumo-Orientado) en `/tools#dea` con cálculo de $\theta^*$, holguras y frontera de producción.

---

<a id="io243-m2"></a>
## [IO243] Análisis Envolvente de Datos (DEA) — Módulo 2: Slacks, Benchmarking y Modelos en Red

- **Coordinación Académica:** Dr. José Soto Mejía
- **Competencia Formativa:** Análisis en dos etapas de Slacks (holguras de insumo y exceso de producto), identificación del conjunto de referencia de benchmarking y modelos DEA de redes multietapa.

### Fundamentación Teórica y Formulación Matemática

1. **Modelo Basado en Holguras (Slacks-Based Measure - SBM de Tone, 2001):**
   Supera las limitaciones del modelo radial CCR midiendo simultáneamente ineficiencias radiales y no radiales:
   $$\rho^* = \min_{\boldsymbol{\lambda}, \mathbf{s}^-, \mathbf{s}^+} \frac{1 - \frac{1}{m} \sum_{i=1}^m \frac{s_i^-}{x_{i0}}}{1 + \frac{1}{s} \sum_{r=1}^s \frac{s_r^+}{y_{r0}}}$$
   sujeto a las restricciones de factibilidad de envolvente. $0 < \rho^* \le 1$. $\text{DMU}_0$ es eficiente si y solo si $\rho^* = 1$.

2. **Benchmarking y Objetivos de Proyección:**
   Para una DMU ineficiente, el punto de proyección en la frontera eficiente es:
   $$\hat{x}_{i0} = \theta^* x_{i0} - s_i^{-*}, \qquad \hat{y}_{r0} = y_{r0} + s_r^{+*}$$
   - **Conjunto de Pares de Referencia (Peer Group):** Las DMUs eficientes con $\lambda_j^* > 0$.
     $$E_0 = \{ j : \lambda_j^* > 0 \}$$
     Los coeficientes $\lambda_j^*$ indican la ponderación de cada DMU referente para fijar metas de mejora.

3. **DEA en Redes Multietapa (Network DEA - Färe & Grosskopf, 2000):**
   Modela procesos internos donde las salidas de una primera etapa (e.g. Producción) se convierten en insumos intermedios ($z$) de una segunda etapa (e.g. Comercialización):
   $$\theta_{\text{Global}} = \theta_{\text{Etapa 1}} \times \theta_{\text{Etapa 2}}$$

**Literatura Canónica & Contraste Web:**
- **Kaoru Tone (2001)** — *A Slacks-Based Measure of Efficiency in Data Envelopment Analysis* (EJOR).
- **Rolf Färe & Shawna Grosskopf (2000)** — *Network DEA* (Socio-Economic Planning Sciences).
- **Cook & Seiford (2009)** — *Data envelopment analysis (DEA) - Thirty years on*.

**Aplicación Industrial UTP:**
Benchmarking de 20 agencias bancarias en Pereira descomponiendo la eficiencia en dos etapas: Etapa de Captación de depósitos $\to$ Etapa de Colocación de créditos comerciales y rentabilidad.

> **Interacción Computacional:** Herramienta: Módulo DEA y Proyección de Slacks en `/tools#dea`.

---

<a id="io223-m1"></a>
## [IO223] Metaheurísticas y Optimización Combinatoria — Módulo 1: Metaheurísticas de Trayectoria (SA y Tabú)

- **Coordinación Académica:** Dr. Mauricio Granada Echeverri
- **Competencia Formativa:** Diseño de metaheurísticas de búsqueda local para problemas NP-hard, control de esquemas de enfriamiento en Recocido Simulado y gestión de listas de memoria en Búsqueda Tabú.

### Fundamentación Teórica y Formulación Matemática

1. **Recocido Simulado (Simulated Annealing - Kirkpatrick, Gelatt & Vecchi, 1983):**
   Inspirado en la termodinámica estadística del enfriamiento lento de metales.
   - **Criterio de Aceptación de Metrópolis (1953):**
     Dada una solución actual $x$ y un vecino $x' \in \mathcal{N}(x)$ con diferencia de costos $\Delta E = f(x') - f(x)$:
     * Si $\Delta E \le 0$: Se acepta $x'$ incondicionalmente ($P = 1$).
     * Si $\Delta E > 0$: Se acepta con probabilidad:
       $$P(\text{Aceptar}) = \exp\left( -\frac{\Delta E}{T_k} \right)$$
   - **Esquema de Enfriamiento:** Geométrico $T_{k+1} = \alpha T_k$ con $\alpha \in [0.80, 0.99]$.
   - A alta temperatura, el algoritmo explora libremente el espacio escapando de óptimos locales; a baja temperatura, converge a búsqueda local voraz. Demostrado formalmente que converge al óptimo global con probabilidad 1 mediante cadenas de Markov homogéneas si el enfriamiento es logarítmico $T_k = c / \ln(k + 1)$.

2. **Búsqueda Tabú (Tabu Search - Fred Glover, 1986, 1989):**
   Utiliza memoria explícita para evitar ciclos y guiar la búsqueda hacia regiones no exploradas:
   - **Memoria a Corto Plazo (Lista Tabú - $TL$):** Registra los últimos atributos de movimientos ejecutados durante una permanencia $\tau$ (Tenure). Dichos movimientos están prohibidos.
   - **Criterio de Aspiración:** El estado tabú se anula si el movimiento propuesto produce una solución estrictamente mejor que la mejor incumbente global encontrada hasta el momento ($f(x') < f(x^*)$).
   - **Memoria a Mediano y Largo Plazo:** Intensificación (frecuencia de atributos buenos) y Diversificación (penalización de atributos sobreutilizados para saltar a valles inexplorados).

**Literatura Canónica & Contraste Web:**
- **Kirkpatrick, Gelatt & Vecchi (1983)** — *Optimization by Simulated Annealing* (Science).
- **Fred Glover (1989, 1990)** — *Tabu Search—Part I & II* (ORSA Journal on Computing).
- **Gendreau & Potvin (2010)** — *Handbook of Metaheuristics*.

**Aplicación Industrial UTP:**
Secuenciamiento óptimo de órdenes en líneas de pintura electrostática de autopartes (Flow Shop Scheduling) para minimizar el Makespan ($C_{\max}$), resolviendo instancias de 50 pedidos y 10 máquinas en segundos.

> **Interacción Computacional:** Herramienta: Módulo de Metaheurísticas de Trayectoria y Scheduling en `/tools`.

---

<a id="io223-m2"></a>
## [IO223] Metaheurísticas y Optimización Combinatoria — Módulo 2: Metaheurísticas Poblacionales (GA y PSO)

- **Coordinación Académica:** Dr. Mauricio Granada Echeverri
- **Competencia Formativa:** Diseño de algoritmos bio-inspirados evolutivos y de inteligencia de enjambre, operadores genéticos para permutaciones (PMX, OX) y dinámica de partículas en enjambre (PSO).

### Fundamentación Teórica y Formulación Matemática

1. **Algoritmos Genéticos (GA - Holland, 1975; Goldberg, 1989):**
   Evolución de una población de $N$ cromosomas a través de generaciones:
   - **Selección:** Ruleta estocástica ($p_i = f_i / \sum f_j$) o Torneo de tamaño $k$.
   - **Operadores de Cruce para Permutaciones (TSP / VRP):**
     * **PMX (Partially Mapped Crossover):** Transfiere un segmento del Padre 1 y resuelve colisiones mediante mapeo uno a uno de las posiciones duplicadas.
     * **OX (Order Crossover):** Preserva el orden relativo de visita de las ciudades.
   - **Mutación:** Swap (intercambio), Inversion (inversión de subsecuencia) o Scramble.
   - **Elitismo:** Preservación forzada de los mejores $e$ individuos sin alteración.
   - Teorema de los Esquemas de Holland (Building Block Hypothesis): Esquemas de bajo orden, corta longitud de definición y aptitud superior crecen exponencialmente en la población.

2. **Optimización por Enjambre de Partículas (PSO - Kennedy & Eberhart, 1995):**
   Simula el comportamiento social de bandadas de aves. Cada partícula $i$ tiene posición $\mathbf{x}_i(t) \in \mathbb{R}^d$ y velocidad $\mathbf{v}_i(t) \in \mathbb{R}^d$:
   $$\mathbf{v}_i(t+1) = w \mathbf{v}_i(t) + c_1 r_1 (\mathbf{p}_i - \mathbf{x}_i(t)) + c_2 r_2 (\mathbf{g} - \mathbf{x}_i(t))$$
   $$\mathbf{x}_i(t+1) = \mathbf{x}_i(t) + \mathbf{v}_i(t+1)$$
   - $w$: Peso de inercia (balance entre exploración y explotación).
   - $c_1, c_2$: Coeficientes de aceleración cognitivo (hacia mejor personal $\mathbf{p}_i$) y social (hacia mejor global del enjambre $\mathbf{g}$).
   - $r_1, r_2 \sim U(0, 1)$: Factores estocásticos.

**Literatura Canónica & Contraste Web:**
- **John H. Holland (1975)** — *Adaptation in Natural and Artificial Systems*.
- **David E. Goldberg (1989)** — *Genetic Algorithms in Search, Optimization, and Machine Learning*.
- **James Kennedy & Russell Eberhart (1995)** — *Particle Swarm Optimization* (IEEE ICNN).

**Aplicación Industrial UTP:**
Ruteo de vehículos con flota heterogénea y ventanas de tiempo (VRPTW) para la distribución de alimentos perecederos en 60 municipios del Eje Cafetero y Norte del Valle, resuelto mediante GA-PMX con reducción de combustible del 24%.

> **Interacción Computacional:** Herramienta: Módulo interactivo de Algoritmos Genéticos y PSO en `/tools`.

---

<a id="io233-m1"></a>
## [IO233] Optimización Financiera y Gestión de Riesgo — Módulo 1: Teoría Clásica de Portafolio y Modelo de Markowitz

- **Coordinación Académica:** Dr. Carlos Osorio Ramírez
- **Competencia Formativa:** Formulación cuadrática de la selección de portafolios media-varianza de Markowitz, deducción de la frontera eficiente, derivación del portafolio tangente y modelo CAPM.

### Fundamentación Teórica y Formulación Matemática

1. **Modelo Media-Varianza de Harry Markowitz (1952):**
   Dado un universo de $n$ activos con vector de retornos esperados $\boldsymbol{\mu} \in \mathbb{R}^n$ y matriz de covarianzas simétrica definida positiva $\boldsymbol{\Sigma} \in \mathbb{R}^{n \times n}$:
   - Vector de pesos de inversión $\mathbf{w} = (w_1, \dots, w_n)^T$.
   - Retorno esperado del portafolio: $\mu_P = \mathbf{w}^T \boldsymbol{\mu}$.
   - Varianza del portafolio: $\sigma_P^2 = \mathbf{w}^T \boldsymbol{\Sigma} \mathbf{w}$.
   - **Problema de Programación Cuadrática:**
     $$\begin{aligned}
     \min_{\mathbf{w}} \quad & \frac{1}{2} \mathbf{w}^T \boldsymbol{\Sigma} \mathbf{w} \\
     \text{s.a.} \quad & \mathbf{w}^T \boldsymbol{\mu} \ge R_{\text{target}} \\
     & \mathbf{w}^T \mathbf{1} = 1 \\
     & \mathbf{w} \ge \mathbf{0} \quad (\text{Sin ventas en corto})
     \end{aligned}$$

2. **Frontera Eficiente y Teorema de Separación de Fondos (Tobin, 1958):**
   Con un activo libre de riesgo de tasa $R_f$:
   - La frontera se convierte en la Línea del Mercado de Capitales (CML - Capital Market Line):
     $$\mathbb{E}[R_P] = R_f + \left( \frac{\mu_T - R_f}{\sigma_T} \right) \sigma_P$$
   - **Portafolio Tangente ($T$):** Maximiza el Ratio de Sharpe:
     $$\max_{\mathbf{w}} \text{SR} = \frac{\mathbf{w}^T \boldsymbol{\mu} - R_f}{\sqrt{\mathbf{w}^T \boldsymbol{\Sigma} \mathbf{w}}} \quad \text{s.a. } \mathbf{w}^T \mathbf{1} = 1, \; \mathbf{w} \ge \mathbf{0}$$

3. **Modelo de Valoración de Activos de Capital (CAPM - Sharpe, 1964):**
   $$\mathbb{E}[R_i] = R_f + \beta_i (\mathbb{E}[R_M] - R_f), \qquad \beta_i = \frac{\text{Cov}(R_i, R_M)}{\text{Var}(R_M)}$$
   $\beta_i$ mide el riesgo sistemático no diversificable del activo $i$.

**Literatura Canónica & Contraste Web:**
- **Harry Markowitz (1952)** — *Portfolio Selection* (The Journal of Finance): Premio Nobel de Economía.
- **William F. Sharpe (1964)** — *Capital Asset Prices: A Theory of Market Equilibrium under Conditions of Risk*.
- **Cornuejols, Peña & Tütüncü (2018)** — *Optimization Methods in Finance* (Cambridge University Press).

**Aplicación Industrial UTP:**
Construcción de carteras de inversión corporativas en el mercado accionario de la Bolsa de Valores de Colombia (BVC), optimizando la asignación de excedentes de tesorería empresarial.

> **Interacción Computacional:** Herramienta: Módulo de Frontera Eficiente y Markowitz en `/tools`.

---

<a id="io233-m2"></a>
## [IO233] Optimización Financiera y Gestión de Riesgo — Módulo 2: Medidas de Riesgo Coherente (CVaR) y Optimización Estocástica

- **Coordinación Académica:** Dr. Carlos Osorio Ramírez
- **Competencia Formativa:** Axiomática de medidas de riesgo coherentes de Artzner, formulación lineal del Conditional Value at Risk (CVaR) de Rockafellar & Uryasev, y modelos de optimización estocástica con recursos.

### Fundamentación Teórica y Formulación Matemática

1. **Axiomas de Medidas Coherentes de Riesgo (Artzner, Delbaen, Eber & Heath, 1999):**
   Una medida de riesgo $\rho: \mathcal{L} \to \mathbb{R}$ es **coherente** si satisface 4 axiomas fundamentales:
   - **Monotonicidad:** Si $X \le Y$ c.s. $\implies \rho(X) \ge \rho(Y)$.
   - **Subaditividad:** $\rho(X + Y) \le \rho(X) + \rho(Y)$ (El riesgo conjunto nunca supera la suma de riesgos individuales $\implies$ premia la diversificación).
   - **Homogeneidad Positiva:** $\rho(c X) = c \rho(X), \forall c > 0$.
   - **Invarianza por Traslación:** $\rho(X + m) = \rho(X) - m, \forall m \in \mathbb{R}$.

2. **Inconsistencia del Value at Risk (VaR):**
   $$VaR_\alpha(X) = -\inf\{ x : F_X(x) > 1 - \alpha \}$$
   El VaR **no es una medida coherente de riesgo** porque viola el axioma de subaditividad para distribuciones no elípticas, desincentivando la diversificación y siendo ciego a la severidad de las pérdidas en la cola.

3. **Conditional Value at Risk (CVaR / Expected Shortfall):**
   Es la pérdida esperada condicional a que se supere el $VaR_\alpha$:
   $$CVaR_\alpha(X) = \mathbb{E}[-X \mid -X \ge VaR_\alpha(X)]$$
   $CVaR_\alpha$ es una medida **estrictamente coherente**.
   - **Teorema de Equivalencia de Rockafellar & Uryasev (2000):**
     Minimizar el CVaR de una cartera con función de pérdida $f(\mathbf{w}, \mathbf{r}) = -\mathbf{w}^T \mathbf{r}$ se formula de forma convexa exacta mediante la función auxiliar:
     $$F_\alpha(\mathbf{w}, \gamma) = \gamma + \frac{1}{1 - \alpha} \int [f(\mathbf{w}, \mathbf{r}) - \gamma]^+ p(\mathbf{r}) d\mathbf{r}$$
     Bajo $S$ escenarios discretos $\mathbf{r}_s$ equiprobables, se reduce a un **Programa Lineal puro** mediante variables auxiliares de holgura $u_s \ge 0$:
     $$\begin{aligned}
     \min_{\mathbf{w}, \gamma, \mathbf{u}} \quad & \gamma + \frac{1}{S (1 - \alpha)} \sum_{s=1}^S u_s \\
     \text{s.a.} \quad & u_s \ge -\mathbf{w}^T \mathbf{r}_s - \gamma, \quad \forall s = 1, \dots, S \\
     & u_s \ge 0, \quad \forall s = 1, \dots, S \\
     & \mathbf{w}^T \boldsymbol{\mu} \ge R_{\text{target}}, \quad \mathbf{w}^T \mathbf{1} = 1, \; \mathbf{w} \ge \mathbf{0}
     \end{aligned}$$

**Literatura Canónica & Contraste Web:**
- **Philippe Artzner, Freddy Delbaen, Jean-Marc Eber & David Heath (1999)** — *Coherent Measures of Risk* (Mathematical Finance).
- **R. Tyrrell Rockafellar & Stanislav Uryasev (2000)** — *Optimization of Conditional Value-at-Risk* (Journal of Risk).
- **Alexander Shapiro, Darinka Dentcheva & Andrzej Ruszczyński (2009)** — *Lectures on Stochastic Programming: Modeling and Theory* (SIAM).

**Aplicación Industrial UTP:**
Gestión de riesgo en contratación de energía eléctrica para grandes consumidores industriales del Eje Cafetero: optimización de la compra en contratos bilaterales vs bolsa de energía minimizando el CVaR al 99% bajo escenarios de sequía y fenómeno de El Niño.

> **Interacción Computacional:** Herramienta: Módulo de CVaR y Optimización de Riesgo en `/tools`.

---


## 4. Matriz Global de Trazabilidad Curricular y Herramientas Computacionales

| Módulo | Asignatura | Código | Herramienta Asociada | Motor de Cálculo / Librería |
| :--- | :--- | :---: | :--- | :--- |
| M1: Análisis Exploratorio de Datos (... | Estadística I | II4D3 | `Visualizador Interactivo de Distribu` | KaTeX / NumPy / Wasm |
| M2: Probabilidad y Variables Aleator... | Estadística I | II4D3 | `Calculadora de Probabilidad Discreta` | KaTeX / NumPy / Wasm |
| M3: Distribuciones de Probabilidad C... | Estadística I | II4D3 | `Simulador Monte Carlo (`/tools#monte` | KaTeX / NumPy / Wasm |
| M4: Inferencia Estadística y Estimac... | Estadística I | II4D3 | `Demostrador interactivo de Intervalo` | KaTeX / NumPy / Wasm |
| M5: Pruebas de Hipótesis Paramétrica... | Estadística I | II4D3 | `Laboratorio interactivo Pyodide con ` | KaTeX / NumPy / Wasm |
| M6: Regresión Lineal Simple y Correl... | Estadística I | II4D3 | `Ajustador de Regresión OLS y Gráfico` | KaTeX / NumPy / Wasm |
| M1: Métodos de Muestreo y Distribuci... | Estadística II | II5A3 | `Laboratorio interactivo Pyodide de d` | KaTeX / NumPy / Wasm |
| M2: Análisis de Varianza (ANOVA)... | Estadística II | II5A3 | `Módulo ANOVA en `/tools` y visualiza` | KaTeX / NumPy / Wasm |
| M3: Principios de Diseño de Experime... | Estadística II | II5A3 | `Generador de Matrices Experimentales` | KaTeX / NumPy / Wasm |
| M4: Pruebas No Paramétricas y Bondad... | Estadística II | II5A3 | `Módulo de Bondad de Ajuste K-S y $\c` | KaTeX / NumPy / Wasm |
| M5: Regresión Lineal Múltiple y Diag... | Estadística II | II5A3 | `Laboratorio Pyodide Wasm con NumPy p` | KaTeX / NumPy / Wasm |
| M6: Control Estadístico de la Calida... | Estadística II | II5A3 | `SPC Quality Control Workbench (`/too` | KaTeX / NumPy / Wasm |
| M1: Regresión Múltiple Matricial y S... | Estadística III | II6A2 | `Laboratorio Pyodide Wasm con scikit-` | KaTeX / NumPy / Wasm |
| M2: Diseño de Experimentos y ANOVA M... | Estadística III | II6A2 | `Matriz interactiva de ANOVA factoria` | KaTeX / NumPy / Wasm |
| M3: Control Estadístico de Calidad A... | Estadística III | II6A2 | `Módulo avanzado SPC Workbench (`/too` | KaTeX / NumPy / Wasm |
| M1: Modelación Matemática y Método G... | Investigación de Operaci | II7D3 | `Demostrador interactivo del Método G` | KaTeX / NumPy / Wasm |
| M2: El Algoritmo Simplex Tabular y D... | Investigación de Operaci | II7D3 | `Resolutor del Método Simplex Primal ` | KaTeX / NumPy / Wasm |
| M3: Teoría de la Dualidad y Análisis... | Investigación de Operaci | II7D3 | `Módulo Simplex con extracción dual y` | KaTeX / NumPy / Wasm |
| M4: Modelos de Transporte y Asignaci... | Investigación de Operaci | II7D3 | `Optimizador de Redes y Transporte en` | KaTeX / NumPy / Wasm |
| M5: Optimización de Redes y Gestión ... | Investigación de Operaci | II7D3 | `CPM / PERT Network Optimizer (`/tool` | KaTeX / NumPy / Wasm |
| M1: Modelado Matemático y Dualidad R... | Fundamentos de Investiga | IOA10 | `Módulo avanzado de descomposición y ` | KaTeX / NumPy / Wasm |
| M2: Algoritmos y Solvers Computacion... | Fundamentos de Investiga | IOA10 | `Laboratorio Pyodide Wasm con solvers` | KaTeX / NumPy / Wasm |
| M1: Teoría Poliédrica y Simplex Revi... | Programación Lineal Avan | IO113 | `Motor matricial de optimización line` | KaTeX / NumPy / Wasm |
| M2: Descomposición de Dantzig-Wolfe ... | Programación Lineal Avan | IO113 | `Módulo avanzado de Generación de Col` | KaTeX / NumPy / Wasm |
| M1: Optimización Sin Restricciones y... | Programación No Lineal | IO213 | `Laboratorio Pyodide con `scipy.optim` | KaTeX / NumPy / Wasm |
| M2: Optimización con Restricciones y... | Programación No Lineal | IO213 | `Módulo de Puntos Interiores y KKT en` | KaTeX / NumPy / Wasm |
| M1: Procesos Estocásticos y Cadenas ... | Investigación de Operaci | II8B3 | `Analizador de Cadenas de Markov (DTM` | KaTeX / NumPy / Wasm |
| M2: Teoría de Líneas de Espera (Cola... | Investigación de Operaci | II8B3 | `Calculadora de Teoría de Colas (M/M/` | KaTeX / NumPy / Wasm |
| M3: Teoría y Modelos de Inventarios... | Investigación de Operaci | II8B3 | `Optimizador de Inventarios & Lote Ec` | KaTeX / NumPy / Wasm |
| M4: Teoría de Juegos y Decisiones Es... | Investigación de Operaci | II8B3 | `Módulo de Teoría de Juegos y Resoluc` | KaTeX / NumPy / Wasm |
| M5: Simulación de Eventos Discretos ... | Investigación de Operaci | II8B3 | `Simulador de Métodos Monte Carlo en ` | KaTeX / NumPy / Wasm |
| M1: Cadenas de Markov Discretas (DTM... | Procesos Estocásticos | II713 | `Analizador DTMC en `/tools#markov` y` | KaTeX / NumPy / Wasm |
| M2: Procesos de Poisson y Cadenas de... | Procesos Estocásticos | II713 | `Demostrador interactivo de procesos ` | KaTeX / NumPy / Wasm |
| M3: Teoría de Colas y Líneas de Espe... | Procesos Estocásticos | II713 | `Calculadora de Teoría de Colas en `/` | KaTeX / NumPy / Wasm |
| M4: Confiabilidad de Sistemas Indust... | Procesos Estocásticos | II713 | `Módulo de Confiabilidad y Confiabili` | KaTeX / NumPy / Wasm |
| M1: Simulación de Eventos Discretos ... | Simulación de Sistemas | II863 | `Motor de Simulación Discreta en `/to` | KaTeX / NumPy / Wasm |
| M2: Generación y Pruebas de Números ... | Simulación de Sistemas | II863 | `Generador y Batería de Pruebas Pseud` | KaTeX / NumPy / Wasm |
| M3: Generación de Variables Aleatori... | Simulación de Sistemas | II863 | `Simulador Monte Carlo en `/tools#mon` | KaTeX / NumPy / Wasm |
| M4: Análisis de Salida, Transitorio ... | Simulación de Sistemas | II863 | `Módulo de Validación de Simulación y` | KaTeX / NumPy / Wasm |
| M1: Pensamiento Sistémico y Diagrama... | Simulación de Dinámica d | IO143 | `Visualizador conceptual de Bucles Ca` | KaTeX / NumPy / Wasm |
| M2: Modelado de Niveles, Flujos y Re... | Simulación de Dinámica d | IO143 | `Simulador dinámico de stocks y flujo` | KaTeX / NumPy / Wasm |
| M1: Teoría Organizacional y Modelado... | Administración Industria | II152 | `Módulo de Gestión de Procesos y Métr` | KaTeX / NumPy / Wasm |
| M2: Gestión Estratégica, Productivid... | Administración Industria | II152 | `Calculador de OEE y Análisis de Pérd` | KaTeX / NumPy / Wasm |
| M1: Pronósticos Cuantitativos de Dem... | Gestión de la Producción | II723 | `Forecasting Workbench (`/tools#forec` | KaTeX / NumPy / Wasm |
| M2: Gestión de Inventarios y Cadena ... | Gestión de la Producción | II723 | `Inventory Optimization Tool (`/tools` | KaTeX / NumPy / Wasm |
| M1: Matemáticas Financieras y Valor ... | Ingeniería Económica y F | II543 | `Workbench de Ingeniería Económica y ` | KaTeX / NumPy / Wasm |
| M2: Evaluación de Proyectos de Inver... | Ingeniería Económica y F | II543 | `Herramienta de Finanzas VPN / TIR (`` | KaTeX / NumPy / Wasm |
| M1: Álgebra Lineal Matricial y Siste... | Métodos Cuantitativos y  | CB213 | `Módulo matricial y operaciones de ál` | KaTeX / NumPy / Wasm |
| M2: Autovalores, Formas Cuadráticas ... | Métodos Cuantitativos y  | CB213 | `Laboratorio Pyodide Wasm con NumPy (` | KaTeX / NumPy / Wasm |
| M1: Álgebra Matricial y Computación ... | Computación Científica y | IOD10 | `Entorno Python WebAssembly `<Pyodide` | KaTeX / NumPy / Wasm |
| M2: Estructuras de Datos, Visualizac... | Computación Científica y | IOD10 | `Gráficos dinámicos SVG interactivos ` | KaTeX / NumPy / Wasm |
| M1: Distribución Normal Multivariada... | Análisis Multivariado | IO123 | `Módulo Multivariado en `/tools` y la` | KaTeX / NumPy / Wasm |
| M2: Reducción de Dimensionalidad (PC... | Análisis Multivariado | IO123 | `Módulo PCA y Clustering en `/tools`.` | KaTeX / NumPy / Wasm |
| M1: Diseños Factoriales Completos y ... | Diseño de Experimentos y | IO133 | `Generador de Matrices Factoriales en` | KaTeX / NumPy / Wasm |
| M2: Metodología de Superficie de Res... | Diseño de Experimentos y | IO133 | `Módulo RSM y Optimizador de Deseabil` | KaTeX / NumPy / Wasm |
| M1: Fundamentos de Eficiencia y Mode... | Análisis Envolvente de D | IO243 | `Eficiencia Técnica DEA (CCR Insumo-O` | KaTeX / NumPy / Wasm |
| M2: Slacks, Benchmarking y Modelos e... | Análisis Envolvente de D | IO243 | `Módulo DEA y Proyección de Slacks en` | KaTeX / NumPy / Wasm |
| M1: Metaheurísticas de Trayectoria (... | Metaheurísticas y Optimi | IO223 | `Módulo de Metaheurísticas de Trayect` | KaTeX / NumPy / Wasm |
| M2: Metaheurísticas Poblacionales (G... | Metaheurísticas y Optimi | IO223 | `Módulo interactivo de Algoritmos Gen` | KaTeX / NumPy / Wasm |
| M1: Teoría Clásica de Portafolio y M... | Optimización Financiera  | IO233 | `Módulo de Frontera Eficiente y Marko` | KaTeX / NumPy / Wasm |
| M2: Medidas de Riesgo Coherente (CVa... | Optimización Financiera  | IO233 | `Módulo de CVaR y Optimización de Rie` | KaTeX / NumPy / Wasm |

---
*Documento compilado y validado para la plataforma Stats Edu (Facultad de Ingeniería Industrial - UTP).*
