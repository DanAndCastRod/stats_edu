export const blockDManagement = [
  {
    id: "ii152-m1",
    courseCode: "II152",
    courseTitle: "Administración Industrial",
    moduleNumber: 1,
    moduleTitle: "Teoría Organizacional y Modelado de Procesos",
    coordination: "Dra. María Elena Bernal Loaiza",
    competencies: "Capacidad para analizar y diagramar la arquitectura de procesos organizacionales bajo notación BPMN 2.0, identificar la cadena de valor de Porter y diagnosticar pérdidas operativas.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Evolución Paradigmática de la Teoría Organizacional:**
   - **Administración Científica (Taylor, 1911):** Racionalización del trabajo, estudio de tiempos y movimientos, división de tareas.
   - **Teoría Clásica (Fayol, 1916):** Funciones administrativas cardinales (Planear, Organizar, Dirigir, Coordinar, Controlar) y principios de unidad de mando y jerarquía.
   - **Enfoque Sociotécnico y de Sistemas:** La empresa como sistema abierto termodinámico que intercambia flujos de materia, energía e información con su entorno.

2. **Modelado y Arquitectura de Procesos (BPMN 2.0):**
   Un proceso de negocio se formaliza como una Red de Petri o Grafo de Flujo $G = (E, T, F)$, donde $E$ son eventos (inicio, intermedio, fin), $T$ son tareas o actividades y $F \\subseteq (E \\times T) \\cup (T \\times E)$ los flujos de secuencia.
   - **Compuertas Lógicas (Gateways):**
     * Exclusiva (XOR): Bifurcación mutuamente excluyente $\\sum p_i = 1$.
     * Paralela (AND): Sincronización obligatoria de flujos concurrentes.
     * Inclusiva (OR): Activación de una o más ramas factibles.

3. **Mapeo de la Cadena de Valor (Value Stream Mapping - VSM):**
   - Tiempo de Ciclo Individual ($C/T$) y Tiempo de Valor Agregado ($VA$).
   - Tiempo de Entrega Total (Lead Time - $LT$):
     $$LT = \\sum_{i=1}^k \\frac{\\text{Inventario en Proceso } (WIP_i)}{\\text{Tasa de Consumo}} + \\sum_{i=1}^k C/T_i$$
   - Eficiencia del Ciclo del Proceso (PCE):
     $$PCE = \\frac{\\text{Tiempo de Valor Agregado Total (VA)}}{LT} \\times 100\\%$$
     *(En manufactura tradicional, $PCE$ suele ser inferior al 5%, revelando que el 95% del tiempo del producto transcurre en esperas e inventarios ociosos).*`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Michael E. Porter (1985)** — *Competitive Advantage: Creating and Sustaining Superior Performance*: Concepto de Cadena de Valor (actividades primarias y de soporte).
- **Rother & Shook (2003)** — *Learning to See: Value Stream Mapping to Add Value and Eliminate MUDA* (Lean Enterprise Institute).
- **OMG (Object Management Group)**: Especificación formal internacional de BPMN 2.0.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Reingeniería y mapeo VSM de la línea de ensamble en una fábrica de transformadores eléctricos de Pereira: reducción del Lead Time de 18 a 6 días mediante eliminación de traslados innecesarios y balanceo de carga.`,
    toolMapping: "Herramienta: Módulo de Gestión de Procesos y Métricas de Flujo en `/tools`."
  },
  {
    id: "ii152-m2",
    courseCode: "II152",
    courseTitle: "Administración Industrial",
    moduleNumber: 2,
    moduleTitle: "Gestión Estratégica, Productividad y OEE",
    coordination: "Dra. María Elena Bernal Loaiza",
    competencies: "Diseño y cálculo riguroso del indicador de Eficiencia Global de Equipos (OEE), análisis de productividad total y multifactorial, y formulación de mapas estratégicos de Balanced Scorecard.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Medición Analítica de Productividad:**
   - Productividad Total de los Factores (PTF):
     $$\\text{Productividad} = \\frac{\\text{Valor de la Producción (Outputs)}}{\\text{Costo Total de Recursos Insumidos (Inputs)}} = \\frac{\\sum P_j Y_j}{\\sum W_i X_i}$$
   - Productividad Parcial de la Mano de Obra: $\\frac{\\text{Unidades Producidas}}{\\text{Horas-Hombre trabajadas}}$.

2. **Indicador OEE (Overall Equipment Effectiveness - Nakajima, 1988):**
   El estándar TPM mundial para cuantificar las 6 Grandes Pérdidas en maquinaria:
   $$OEE = A \\times P \\times Q$$
   donde:
   - **Disponibilidad ($A$):**
     $$A = \\frac{\\text{Tiempo de Operación Real}}{\\text{Tiempo Planificado de Carga}} = \\frac{T_{\\text{plan}} - T_{\\text{paradas}}}{T_{\\text{plan}}}$$
     *(Pérdidas: Averías y tiempos de preparación/ajuste - Setup).*
   - **Rendimiento o Desempeño ($P$):**
     $$P = \\frac{\\text{Tiempo de Ciclo Teórico} \\times \\text{Total Unidades Producidas}}{\\text{Tiempo de Operación Real}} = \\frac{C_{\\text{ideal}} \\times N_{\\text{total}}}{T_{\\text{operación}}}$$
     *(Pérdidas: Microparadas y reducción de velocidad de diseño).*
   - **Calidad ($Q$):**
     $$Q = \\frac{\\text{Unidades Conformes (Buenas)}}{\\text{Total Unidades Producidas}} = \\frac{N_{\\text{buenas}}}{N_{\\text{total}}}$$
     *(Pérdidas: Defectos de proceso y rechazos en arranque).*
   - Estándar Mundial de Clase Mundial (World-Class OEE): $OEE \\ge 85\\%$ ($A \\ge 90\\%, P \\ge 95\\%, Q \\ge 99.9\\%$).

3. **Cuadro de Mando Integral (Balanced Scorecard - Kaplan & Norton, 1992):**
   Articulación de metas en 4 perspectivas interrelacionadas mediante relaciones causa-efecto: Financiera $\\to$ Clientes $\\to$ Procesos Internos $\\to$ Aprendizaje y Crecimiento.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Seiichi Nakajima (1988)** — *Introduction to TPM: Total Productive Maintenance* (Productivity Press).
- **Robert S. Kaplan & David P. Norton (1996)** — *The Balanced Scorecard: Translating Strategy into Action*.
- **Goldratt & Cox (1984)** — *The Goal: A Process of Ongoing Improvement* (Teoría de Restricciones - TOC).`,
    industrialApplication: `**Aplicación Industrial UTP:**
Implementación del OEE en la línea automatizada de empaque y sellado de café en Risaralda: elevación del OEE de 61% a 82% mediante metodología SMED (Single-Minute Exchange of Die) para reducir tiempos de cambio de formato.`,
    toolMapping: "Herramienta: Calculador de OEE y Análisis de Pérdidas TPM en `/tools`."
  },
  {
    id: "ii723-m1",
    courseCode: "II723",
    courseTitle: "Gestión de la Producción y Logística",
    moduleNumber: 1,
    moduleTitle: "Pronósticos Cuantitativos de Demanda",
    coordination: "Dr. José Soto Mejía",
    competencies: "Modelado matemático de series de tiempo para predicción de demanda, ajuste de parámetros en Suavizamiento Exponencial (SES, Holt, Winters) y monitoreo de error con Tracking Signal.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Taxonomía de Métodos Cuantitativos:**
   - **Promedio Móvil Simple ($SMA_k$):**
     $$\\hat{Y}_{t+1} = \\frac{1}{k} \\sum_{i=0}^{k-1} Y_{t-i}$$
   - **Suavizamiento Exponencial Simple (SES - Brown, 1959):**
     $$\\hat{Y}_{t+1} = \\alpha Y_t + (1 - \\alpha) \\hat{Y}_t = \\hat{Y}_t + \\alpha (Y_t - \\hat{Y}_t), \\quad \\alpha \\in (0, 1)$$
   - **Modelo Lineal de Holt para Series con Tendencia:**
     * Nivel suavizado: $L_t = \\alpha Y_t + (1 - \\alpha)(L_{t-1} + T_{t-1})$
     * Tendencia suavizada: $T_t = \\beta (L_t - L_{t-1}) + (1 - \\beta) T_{t-1}, \\quad \\beta \\in (0, 1)$
     * Pronóstico a $p$ períodos: $\\hat{Y}_{t+p} = L_t + p T_t$
   - **Modelo de Holt-Winters (Tendencia y Estacionalidad Multiplicativa con ciclo $s$):**
     * Nivel: $L_t = \\alpha \\left( \\frac{Y_t}{S_{t-s}} \\right) + (1 - \\alpha)(L_{t-1} + T_{t-1})$
     * Tendencia: $T_t = \\beta (L_t - L_{t-1}) + (1 - \\beta) T_{t-1}$
     * Factor Estacional: $S_t = \\gamma \\left( \\frac{Y_t}{L_t} \\right) + (1 - \\gamma) S_{t-s}$
     * Pronóstico: $\\hat{Y}_{t+p} = (L_t + p T_t) \\cdot S_{t - s + p}$

2. **Métricas de Evaluación de Exactitud del Pronóstico:**
   - Error en el período $t$: $e_t = Y_t - \\hat{Y}_t$.
   - Desviación Absoluta Media (MAD): $MAD = \\frac{1}{n} \\sum_{t=1}^n |e_t|$.
   - Error Cuadrático Medio (MSE): $MSE = \\frac{1}{n} \\sum_{t=1}^n e_t^2$; $RMSE = \\sqrt{MSE}$.
   - Error Porcentual Absoluto Medio (MAPE): $MAPE = \\frac{1}{n} \\sum_{t=1}^n \\left| \\frac{e_t}{Y_t} \\right| \\times 100\\%$.
   - **Señal de Rastreo (Tracking Signal - $TS_t$):**
     $$TS_t = \\frac{\\sum_{i=1}^t e_i}{MAD_t} = \\frac{RSFE_t}{MAD_t}$$
     Si $|TS_t| > 4$, el modelo de pronóstico está sesgado sistemáticamente y debe recalibrarse de inmediato.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Robert G. Brown (1959)** — *Statistical Forecasting for Inventory Control*.
- **Charles C. Holt (1957)** / **Peter R. Winters (1960)**: Formulación de los modelos de tendencia y estacionalidad.
- **Makridakis, Wheelwright & Hyndman (1998)** — *Forecasting: Methods and Applications*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Pronóstico estacional de la demanda mensual de sacos de fertilizantes en el Comité de Cafeteros de Risaralda: reducción del MAPE del 22% al 7.4% mediante modelo de Holt-Winters con seguimiento de Tracking Signal.`,
    toolMapping: "Herramienta: Forecasting Workbench (`/tools#forecasting`) con modelos SMA, SES, Holt, métricas en vivo y gráfico de proyección SVG."
  },
  {
    id: "ii723-m2",
    courseCode: "II723",
    courseTitle: "Gestión de la Producción y Logística",
    moduleNumber: 2,
    moduleTitle: "Gestión de Inventarios y Cadena de Suministro",
    coordination: "Dr. José Soto Mejía",
    competencies: "Diseño de redes de suministro de alto rendimiento, optimización de políticas continuas (s, Q) y periódicas (R, S), y mitigación del efecto látigo mediante visibilidad de datos.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Políticas de Control de Inventarios Estocásticos:**
   - **Política de Revisión Continua $(s, Q)$:** Cada vez que la posición de inventario cae al punto de reorden $s$, se solicita un lote fijo de tamaño $Q$.
     $$s = \\mathbb{E}[D_L] + Z_\\alpha \\sigma_L$$
   - **Política de Revisión Periódica $(R, S)$:** Cada intervalo fijo de tiempo $R$, se ordena la cantidad necesaria para llevar la posición al nivel meta $S$:
     $$S = \\mathbb{E}[D_{R + L}] + Z_\\alpha \\sigma_{R + L} = \\mu_d (R + L) + Z_\\alpha \\sigma_d \\sqrt{R + L}$$

2. **Efecto Látigo (Bullwhip Effect - Lee, Padmanabhan & Whang, 1997):**
   Fenómeno donde la varianza de los pedidos se amplifica progresivamente a medida que se asciende en la cadena de suministro (Minorista $\\to$ Mayorista $\\to$ Fabricante $\\to$ Proveedor):
   $$\\frac{\\text{Var}(O)}{\\text{Var}(D)} = 1 + \\frac{2L}{p} + \\frac{2L^2}{p^2} > 1$$
   donde $L$ es el tiempo de entrega de reabastecimiento y $p$ el número de períodos observados para actualizar pronósticos.
   - **Cuatro Causas Clave:** Actualización desordenada de pronósticos de demanda, pedidos por lotes (Order Batching), fluctuaciones de precios (descuentos promocionales), y juegos de escasez y racionamiento.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Hau L. Lee, V. Padmanabhan & Seungjin Whang (1997)** — *The Bullwhip Effect in Supply Chains* (Sloan Management Review).
- **Simchi-Levi, Kaminsky & Simchi-Levi (2008)** — *Designing and Managing the Supply Chain*.
- **Chopra & Meindl (2016)** — *Supply Chain Management: Strategy, Planning, and Operation*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Implementación de Inventario Administrado por el Proveedor (VMI - Vendor Managed Inventory) entre una planta productora de envases plásticos y embotelladoras de Pereira, reduciendo el efecto látigo y eliminando un 30% del stock inmovilizado.`,
    toolMapping: "Herramienta: Inventory Optimization Tool (`/tools#inventory`) y simulador de la cadena de suministro."
  },
  {
    id: "ii543-m1",
    courseCode: "II543",
    courseTitle: "Ingeniería Económica y Finanzas",
    moduleNumber: 1,
    moduleTitle: "Matemáticas Financieras y Valor del Dinero en el Tiempo",
    coordination: "Dr. Carlos Osorio Ramírez",
    competencies: "Modelación analítica de la equivalencia financiera del dinero en el tiempo, conversión de tasas efectivas, nominales y anticipadas, y diseño de tablas de amortización.",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Axioma del Valor del Dinero en el Tiempo:**
   Un peso hoy tiene un valor económico superior a un peso futuro debido a su costo de oportunidad, riesgo e inflación.

2. **Interés Simple vs. Compuesto:**
   - Interés Simple: $F = P(1 + i \\cdot n)$.
   - **Interés Compuesto (Capitalización periódica):**
     $$F = P (1 + i)^n \\iff P = F (1 + i)^{-n}$$

3. **Conversión Rigurosa de Tasas de Interés:**
   - Tasa Nominal Anual ($j$) capitalizable $m$ veces al año: Tasa periódica $i_p = j/m$.
   - **Tasa Efectiva Anual ($i_e$):**
     $$i_e = (1 + i_p)^m - 1 = \\left( 1 + \\frac{j}{m} \\right)^m - 1$$
   - Tasa Anticipada ($i_a$) a Tasa Vencida ($i_v$):
     $$i_v = \\frac{i_a}{1 - i_a}, \\qquad i_a = \\frac{i_v}{1 + i_v}$$
   - **Ecuación de Fisher (Tasa Real vs. Tasa Inflacionaria $\\pi$):**
     $$1 + i_{\\text{corriente}} = (1 + i_{\\text{real}})(1 + \\pi) \\implies i_{\\text{real}} = \\frac{i_{\\text{corriente}} - \\pi}{1 + \\pi}$$

4. **Series Uniformes (Anualidades) y Gradientes:**
   - Valor Presente de una Anualidad Vencida ($A$):
     $$P = A \\left[ \\frac{1 - (1 + i)^{-n}}{i} \\right] = A (P/A, i, n)$$
   - Valor Futuro de una Anualidad: $F = A \\left[ \\frac{(1 + i)^n - 1}{i} \\right] = A (F/A, i, n)$.
   - Cuota de Amortización Francesa (Cuota Fija): $A = P \\left[ \\frac{i(1 + i)^n}{(1 + i)^n - 1} \\right]$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Leland Blank & Anthony Tarquin (2018)** — *Basics of Engineering Economy* (McGraw-Hill): Texto rector internacional de ingeniería económica.
- **Sullivan, Wicks & Koelling (2014)** — *Engineering Economy* (Pearson).
- **García Santander & Soto Mejía (UTP)**: Guías académicas de matemáticas financieras para ingenieros.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Estructuración del financiamiento de una línea de extrusión plástica en Dosquebradas mediante leasing financiero: cálculo de la cuota uniforme equivalente frente a amortización con abono constante a capital.`,
    toolMapping: "Herramienta: Workbench de Ingeniería Económica y Finanzas en `/tools#economics`."
  },
  {
    id: "ii543-m2",
    courseCode: "II543",
    courseTitle: "Ingeniería Económica y Finanzas",
    moduleNumber: 2,
    moduleTitle: "Evaluación de Proyectos de Inversión (VPN / TIR)",
    coordination: "Dr. Carlos Osorio Ramírez",
    competencies: "Evaluación financiera rigurosa de flujos de caja de proyectos mediante VPN, TIR, TIR Modificada, relación Beneficio/Costo y análisis de sensibilidad de la Tasa de Descuento (WACC).",
    theoryMath: `### Fundamentación Teórica y Formulación Matemática

1. **Valor Presente Neto (VPN / NPV):**
   Suma descontada de todos los flujos netos de caja $F_t$ a la tasa de descuento $k$ (Costo Promedio Ponderado de Capital - WACC), deduciendo la inversión inicial $I_0$:
   $$VPN(k) = \\sum_{t=1}^n \\frac{F_t}{(1 + k)^t} - I_0$$
   - **Regla de Decisión:**
     * $VPN > 0$: El proyecto genera riqueza neta por encima del costo de capital $\\implies$ **Aceptar**.
     * $VPN = 0$: El proyecto renta exactamente la tasa de oportunidad $k$.
     * $VPN < 0$: El proyecto destruye valor $\\implies$ **Rechazar**.

2. **Tasa Interna de Retorno (TIR / IRR):**
   Tasa intrínseca $i^*$ que iguala el VPN exactamente a cero:
   $$\\sum_{t=1}^n \\frac{F_t}{(1 + TIR)^t} - I_0 = 0$$
   - Solución numérica mediante algoritmo de Newton-Raphson:
     $$k_{m+1} = k_m - \\frac{VPN(k_m)}{VPN'(k_m)}$$
   - **Regla de Descartes y Múltiples TIR:** Si el flujo de caja tiene $c$ cambios de signo, pueden existir hasta $c$ tasas internas de retorno reales positivas (proyectos no convencionales).

3. **TIR Modificada (TIRM / MIRR):**
   Resuelve la inconsistencia de la TIR tradicional asumiendo reinversión a la tasa de costo de capital $k$ y financiamiento a la tasa de financiamiento $f$:
   $$TIRM = \\left( \\frac{\\sum_{t=0}^n \\max(0, F_t)(1 + k)^{n-t}}{\\sum_{t=0}^n \\frac{\\max(0, -F_t)}{(1 + f)^t}} \\right)^{1/n} - 1$$

4. **Criterios Complementarios:**
   - **Costo Anual Uniforme Equivalente (CAUE / EAC):** Para comparar proyectos mutuamente excluyentes con vidas útiles desiguales: $CAUE = VPN(k) \\cdot (A/P, k, n)$.
   - **Relación Beneficio / Costo ($B/C$):** $B/C = \\frac{\\text{VP de Ingresos}}{\\text{VP de Egresos}}$. Aceptable si $B/C > 1$.`,
    literatureContrast: `**Literatura Canónica & Contraste Web:**
- **Irving Fisher (1930)** — *The Theory of Interest*: Fundamento de la equivalencia financiera y selección de inversiones.
- **Blank & Tarquin (2018)**: Capítulos 5 y 6 sobre VPN, TIR y comparación de alternativas.
- **Bierman & Smidt (2012)** — *The Capital Budgeting Decision*.`,
    industrialApplication: `**Aplicación Industrial UTP:**
Evaluación de la factibilidad económica de reemplazar calderas convencionales de carbón por gas natural y biomasa en Risaralda: cálculo del VPN al WACC del 12.5%, TIR del 24.8% y CAUE para vidas útiles de 15 vs 25 años.`,
    toolMapping: "Herramienta: Herramienta de Finanzas VPN / TIR (`/tools#economics`) con cálculo automático de TIR por Newton-Raphson y curva de perfil de VPN frente a la tasa de descuento."
  }
];
