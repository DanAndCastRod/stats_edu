import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'content', 'courses', 'procesos-estocasticos');

const courseMetadata = {
  title: "Procesos Estocásticos",
  slug: "procesos-estocasticos",
  code: "II713",
  description: "Cadenas de Markov en tiempo discreto y continuo, procesos de Poisson, teoría de colas y líneas de espera, y confiabilidad de sistemas industriales.",
  credits: 3,
  ects: 6,
  semester: 7,
  isMock: false
};

const modules = [
  {
    slug: "01-cadenas-markov-discretas",
    metadata: {
      title: "Cadenas de Markov Discretas",
      order: 1
    },
    lessons: [
      {
        slug: "01-matrices-transicion-estados",
        filename: "01-matrices-transicion-estados.mdx",
        content: `---
title: "Matrices de Transición y Clasificación de Estados"
order: 1
description: "Propiedad de Markov, matrices estocásticas, ecuaciones de Chapman-Kolmogorov y clasificación formal de estados transitorios y recurrentes."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Qué postula rigurosamente la Propiedad de Markov (falta de memoria en tiempo discreto)?"
    options:
      - "La distribución condicional del estado futuro depende exclusivamente del estado presente, siendo condicionalmente independiente de la historia pasada"
      - "Que la probabilidad de permanecer en el mismo estado es siempre mayor al 50%"
      - "Que la suma de cada columna de la matriz de transición debe ser igual a 1"
      - "Que todos los estados de la cadena deben ser periódicos con periodo d = 2"
    answer: 0
    explanation: "La propiedad de Markov establece que P(X_{n+1} = j | X_n = i, X_{n-1} = i_{n-1}, ..., X_0 = i_0) = P(X_{n+1} = j | X_n = i), es decir, el futuro depende del pasado únicamente a través del presente."
  - question: "¿Qué característica define a una matriz estocástica (o matriz de probabilidad de transición) P?"
    options:
      - "Todos sus elementos p_{ij} son no negativos y la suma de cada fila es exactamente 1"
      - "Su determinante es siempre estrictamente mayor a 1"
      - "Es una matriz antisimétrica con ceros en la diagonal"
      - "Todos sus autovalores son imaginarios puros"
    answer: 0
    explanation: "Una matriz P es estocástica si p_{ij} >= 0 para todo i, j, y sum_{j} p_{ij} = 1 para cada fila i, puesto que representa una distribución de probabilidad condicional completa."
---

# Introducción

> ¿Cómo evoluciona el estado operativo de una máquina entre 'Óptimo', 'Degradado' y 'Falla' a lo largo de las semanas? ¿Cómo cambia la cuota de mercado de tres operadores logísticos competidores? Los procesos estocásticos modelan la evolución temporal de sistemas bajo incertidumbre.

Una **Cadena de Markov en Tiempo Discreto (DTMC)** describe un sistema estocástico que salta entre un conjunto discreto de estados $S = \\{1, 2, \\dots, M\\}$ en instantes de tiempo discretos $n = 0, 1, 2, \\dots$.

<Callout type="info">
**Ecuaciones de Chapman-Kolmogorov:** Permiten calcular la probabilidad de transición en $n + m$ pasos mediante el producto algebraico de matrices: $P^{(n+m)} = P^{(n)} P^{(m)}$. Por lo tanto, $P^{(n)} = P^n$.
</Callout>

## Objetivos de Aprendizaje
- Formalizar la propiedad de Markov y construir la matriz de transición de un paso $P$.
- Aplicar las ecuaciones de Chapman-Kolmogorov para proyectar probabilidades en $n$ pasos.
- Clasificar estados en accesibles, comunicantes, transitorios, recurrentes absorbentes y periódicos.
- Implementar la evolución temporal de una cadena de Markov con NumPy.

---

# Fundamentos Teóricos

### Definición Formal de la Cadena

Sea $\\{X_n, n \\in \\mathbb{N}_0\\}$ una secuencia de variables aleatorias que toman valores en un espacio de estados finito o numerable $S$. La cadena cumple la **Propiedad de Markov** si:

$$\\mathbb{P}(X_{n+1} = j \\mid X_n = i, X_{n-1} = i_{n-1}, \\dots, X_0 = i_0) = \\mathbb{P}(X_{n+1} = j \\mid X_n = i) = p_{ij}$$

La **Matriz de Transición de un Paso** $P = [p_{ij}]$ satisface:

$$p_{ij} \\ge 0, \\quad \\forall i, j \\in S$$

$$\\sum_{j \\in S} p_{ij} = 1, \\quad \\forall i \\in S$$

### Ecuaciones de Chapman-Kolmogorov

La probabilidad de pasar del estado $i$ al estado $j$ en $n$ pasos es:

$$p_{ij}^{(n)} = \\mathbb{P}(X_{m+n} = j \\mid X_m = i)$$

$$p_{ij}^{(n+m)} = \\sum_{k \\in S} p_{ik}^{(n)} p_{kj}^{(m)} \\iff P^{(n+m)} = P^{(n)} \\cdot P^{(m)}$$

Por inducción matemática inmediata:

$$P^{(n)} = P^n$$

Si $\\pi^{(0)} = [\\mathbb{P}(X_0 = 1), \\dots, \\mathbb{P}(X_0 = M)]$ es la distribución de probabilidad inicial, la distribución en el paso $n$ es:

$$\\pi^{(n)} = \\pi^{(0)} P^n$$

### Clasificación Estructural de Estados

1. **Accesibilidad ($i \\to j$):** El estado $j$ es accesible desde $i$ si existe $n \\ge 0$ tal que $p_{ij}^{(n)} > 0$.
2. **Comunicación ($i \\leftrightarrow j$):** Dos estados comunican si $i \\to j$ y $j \\to i$. La comunicación es una relación de equivalencia que particiona $S$ en clases disjuntas.
3. **Irreducibilidad:** Una cadena es irreducible si todos sus estados pertenecen a una única clase comunicante.
4. **Recurrencia y Transitoriedad:**
   Sea $f_{ii} = \\mathbb{P}(\\text{el proceso retorna alguna vez al estado } i \\mid X_0 = i)$.
   - Si $f_{ii} = 1$, el estado $i$ es **recurrente**.
   - Si $f_{ii} < 1$, el estado $i$ es **transitorio**.
5. **Estado Absorbente:** Un estado $i$ es absorbente si $p_{ii} = 1$.

---

# Laboratorio en Python: Estado de Desgaste de Maquinaria

\`\`\`python
import numpy as np
import pandas as pd

# Espacio de estados de una máquina CNC:
# 0: Estado Óptimo (Nuevo)
# 1: Degradación Leve
# 2: Degradación Severa
# 3: Falla Crítica (Absorbente hasta mantenimiento)
estados = ['Óptimo', 'Deg_Leve', 'Deg_Severa', 'Falla']

# Matriz de transición semanal P
P = np.array([
    [0.70, 0.20, 0.08, 0.02],
    [0.00, 0.65, 0.25, 0.10],
    [0.00, 0.00, 0.60, 0.40],
    [0.00, 0.00, 0.00, 1.00]
])

# Vector de distribución inicial (máquina 100% nueva en semana 0)
pi_0 = np.array([1.0, 0.0, 0.0, 0.0])

# Proyección a semanas 1, 2, 4, 8 y 12
semanas = [1, 2, 4, 8, 12]
historial = []

for n in semanas:
    Pn = np.linalg.matrix_power(P, n)
    pi_n = pi_0 @ Pn
    historial.append([n] + list(pi_n))

df_proy = pd.DataFrame(historial, columns=['Semana'] + estados)
print("PROYECCIÓN TEMPORAL DE PROBABILIDADES DE ESTADO (pi_n = pi_0 * P^n):")
print(df_proy.round(4).to_string(index=False))

# Probabilidad de absorción (falla) acumulada
print(f"\\nProbabilidad de falla acumulada a 12 semanas: {df_proy.loc[4, 'Falla']*100:.2f}%")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Cadenas de Markov y Matrices de Transición"
  questions={[
    {
      id: "q_dtmc_1",
      text: "Si un estado k tiene p_kk = 1, ¿qué clasificación recibe formalmente?",
      options: [
        { id: "a", text: "Estado Absorbente (una vez que el sistema entra en él, nunca puede abandonarlo)", isCorrect: true, explanation: "p_kk = 1 implica que la probabilidad de transición hacia cualquier otro estado j != k es estrictamente 0." },
        { id: "b", text: "Estado Transitorio", isCorrect: false, explanation: "Un estado absorbente es recurrente puesto que retorna a sí mismo con probabilidad 1 en cada paso." },
        { id: "c", text: "Estado Inaccesible", isCorrect: false, explanation: "Otros estados pueden tener transiciones positivas hacia k." }
      ]
    },
    {
      id: "q_dtmc_2",
      text: "Para calcular la probabilidad de pasar del estado 1 al estado 3 en exactamente 4 pasos, ¿qué operación matemática se debe realizar?",
      options: [
        { id: "a", text: "Elevar la matriz P a la cuarta potencia P^4 y extraer el elemento en la fila 1 y columna 3", isCorrect: true, explanation: "Por las ecuaciones de Chapman-Kolmogorov, P^(4) = P^4, por lo que p_{13}^(4) = [P^4]_{1,3}." },
        { id: "b", text: "Multiplicar el elemento p_{13} por 4", isCorrect: false, explanation: "Las probabilidades condicionales intermedias deben sumarse sobre todas las trayectorias posibles." },
        { id: "c", text: "Calcular la transpuesta P^T", isCorrect: false, explanation: "La transpuesta invierte las direcciones de origen y destino, no proyecta en el tiempo." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-distribucion-estado-estable",
        filename: "02-distribucion-estado-estable.mdx",
        content: `---
title: "Distribución Estacionaria y Probabilidades de Estado Estable"
order: 2
description: "Cadenas ergódicas, ecuaciones de balance global pi = pi * P, tiempos medios de retorno y aplicaciones industriales en mantenimiento y marketing."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué condiciones son necesarias y suficientes para que una Cadena de Markov discreta posea una distribución estacionaria única e independiente del estado inicial?"
    options:
      - "Que la cadena sea irreducible, aperiódica y recurrente positiva (ergódica)"
      - "Que la matriz de transición sea simétrica y ortogonal"
      - "Que todos los elementos de la diagonal principal sean idénticos a cero"
      - "Que el número de estados sea estrictamente impar"
    answer: 0
    explanation: "Una cadena ergódica (irreducible, aperiódica y recurrente positiva con estados finitos) garantiza la existencia de un vector de estado estable único pi tal que lim_{n -> inf} P^n tiene filas idénticas iguales a pi."
  - question: "¿Cuál es el sistema algebraico que define al vector de distribución estacionaria pi?"
    options:
      - "pi = pi * P, sujeto a sum_i pi_i = 1 y pi_i >= 0"
      - "P * pi = 0"
      - "pi = P^(-1)"
      - "det(P - pi * I) = 0"
    answer: 0
    explanation: "El estado estacionario refleja que la distribución no se altera tras una transición adicional: pi P = pi. La condición de normalización sum pi_i = 1 garantiza que sea una medida de probabilidad válida."
---

# Introducción

> A largo plazo, ¿qué porcentaje del tiempo estará una línea de producción en estado de paro por calibración? ¿Cuál será la cuota de mercado estabilizada de nuestra marca frente a la competencia? El **análisis de estado estable** responde a estas preguntas eliminando el efecto de las condiciones iniciales.

Cuando una cadena de Markov no tiene estados absorbentes y permite transitar entre cualquier par de estados sin ciclos rígidos (ergódica), el sistema converge hacia un régimen estacionario invariable en el tiempo.

<Callout type="info">
**Interpretación Ergódica:** $\\pi_i$ representa tanto la probabilidad a largo plazo de encontrar el sistema en el estado $i$, como la fracción promedio del tiempo total que el sistema reside en dicho estado.
</Callout>

## Objetivos de Aprendizaje
- Formular el sistema lineal de ecuaciones de balance $\\pi = \\pi P$ con la condición de normalización $\\sum \\pi_i = 1$.
- Resolver el vector estacionario mediante álgebra matricial y eliminación gaussiana en Python.
- Calcular los tiempos medios de primer retorno $\\mu_{ii} = 1 / \\pi_i$.
- Aplicar el modelo estacionario a la optimización de planes de mantenimiento preventivo.

---

# Fundamentos Teóricos

### Teorema del Límite Ergódico

Si una cadena de Markov con espacio de estados finito $S = \\{1, \\dots, M\\}$ es **irreducible** y **aperiódica**, existe una distribución de probabilidad única $\\pi = [\\pi_1, \\pi_2, \\dots, \\pi_M]$ tal que:

$$\\lim_{n \\to \\infty} p_{ij}^{(n)} = \\pi_j, \\quad \\forall i, j \\in S$$

Independientemente de la distribución inicial $\\pi^{(0)}$:

$$\\lim_{n \\to \\infty} \\pi^{(n)} = \\lim_{n \\to \\infty} \\pi^{(0)} P^n = \\pi$$

### Ecuaciones de Balance

El vector fila $\\pi$ satisface:

$$\\pi P = \\pi \\iff \\pi (P - I) = 0$$

Transponiendo a vectores columna convencionales:

$$(P^T - I) \\pi^T = 0$$

Dado que $(P^T - I)$ es una matriz singular de rango $M - 1$, se reemplaza una de las ecuaciones redundantes por la ecuación de normalización:

$$\\sum_{i=1}^M \\pi_i = 1, \\quad \\pi_i > 0$$

### Tiempo Medio de Recurrencia

Para un estado recurrente positivo $i$, el tiempo esperado en pasos hasta el primer retorno a dicho estado es:

$$\\mu_{ii} = \\frac{1}{\\pi_i}$$

---

# Laboratorio en Python: Estado Estable de Confiabilidad y Mantenimiento

\`\`\`python
import numpy as np
import pandas as pd

# Proceso de 3 estados de un compresor industrial con mantenimiento:
# 1: Funcionamiento Normal
# 2: Mantenimiento Preventivo (parada programada)
# 3: Mantenimiento Correctivo (falla imprevista)
estados = ['Normal', 'Preventivo', 'Correctivo']

# Matriz de transición diaria P (ergódica)
P = np.array([
    [0.85, 0.10, 0.05],
    [0.70, 0.25, 0.05],
    [0.40, 0.10, 0.50]
])

M = len(estados)

# Construcción del sistema lineal: (P^T - I) pi = 0
A = P.T - np.eye(M)
# Reemplazar la última fila por la restricción sum(pi) = 1
A[-1, :] = np.ones(M)
b = np.zeros(M)
b[-1] = 1.0

# Solución del sistema lineal A * pi = b
pi = np.linalg.solve(A, b)

# Cálculo de tiempos medios de retorno en días (mu_ii = 1 / pi_i)
mu_retorno = 1.0 / pi

# Verificación numérica por potenciación de matrices (P^100)
P_inf = np.linalg.matrix_power(P, 100)

df_resultado = pd.DataFrame({
    'Estado': estados,
    'Probabilidad_Estable (pi)': pi,
    'Porcentaje_Tiempo (%)': pi * 100,
    'Tiempo_Medio_Retorno (dias)': mu_retorno,
    'Fila_P_100': P_inf[0, :]
})

print("DISTRIBUCIÓN DE ESTADO ESTABLE Y TIEMPOS DE RETORNO:")
print(df_resultado.round(4).to_string(index=False))

# Costo diario esperado si: Normal = $0, Prev = $200/día, Corr = $800/día
costos = np.array([0, 200, 800])
costo_esperado_diario = np.sum(pi * costos)
print(f"\\nCosto esperado de mantenimiento por día: USD {costo_esperado_diario:.2f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Estado Estable en Cadenas de Markov"
  questions={[
    {
      id: "q_ss_1",
      text: "Si la probabilidad estacionaria de que un servidor esté en reparación es pi_reparacion = 0.04, ¿cuál es el tiempo medio esperado entre reparaciones sucesivas?",
      options: [
        { id: "a", text: "25 periodos (mu_ii = 1 / 0.04 = 25)", isCorrect: true, explanation: "El tiempo medio de primer retorno a un estado recurrente es el inverso recíproco de su probabilidad estacionaria: mu_ii = 1 / pi_i." },
        { id: "b", text: "4 periodos", isCorrect: false, explanation: "0.04 no equivale a 4 periodos; 1 / 0.04 = 25." },
        { id: "c", text: "100 periodos", isCorrect: false, explanation: "100 periodos correspondería a una probabilidad de 0.01." }
      ]
    },
    {
      id: "q_ss_2",
      text: "¿Por qué una cadena periódica (por ejemplo, con periodo d = 2 donde el sistema alterna estrictamente entre dos estados) no converge a un límite fila único en P^n?",
      options: [
        { id: "a", text: "Porque P^n oscila indefinidamente entre dos matrices distintas según n sea par o impar", isCorrect: true, explanation: "La periodicidad genera oscilación armónica continua; aunque existe una medida estacionaria algebraica pi tal que pi P = pi, las probabilidades de transición de paso n no convergen a un valor escalar fijo." },
        { id: "b", text: "Porque la suma de probabilidades deja de ser igual a 1", isCorrect: false, explanation: "La propiedad estocástica se preserva rigurosamente en toda potencia P^n." },
        { id: "c", text: "Porque los autovalores de P son siempre mayores a 5", isCorrect: false, explanation: "Por el teorema de Perron-Frobenius, el radio espectral de toda matriz estocástica es exactamente 1." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "02-procesos-poisson-continuos",
    metadata: {
      title: "Procesos de Poisson y Tiempo Continuo",
      order: 2
    },
    lessons: [
      {
        slug: "01-proceso-poisson-homogeneo",
        filename: "01-proceso-poisson-homogeneo.mdx",
        content: `---
title: "Proceso de Poisson Homogéneo e Inter-arribos Exponenciales"
order: 1
description: "Postulados formales del proceso de Poisson con tasa lambda, distribución de tiempos entre arribos, pérdida de memoria y propiedades de agregación."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Qué propiedad matemática única caracteriza a la distribución exponencial de los tiempos entre arribos en un proceso de Poisson?"
    options:
      - "Pérdida de memoria (falta de envejecimiento): P(T > s + t | T > s) = P(T > t)"
      - "Simetría perfecta alrededor de la media muestral"
      - "Varianza idéntica a cero"
      - "Soporte acotado en el intervalo [0, 1]"
    answer: 0
    explanation: "La distribución exponencial es la única distribución continua con la propiedad de pérdida de memoria, lo que significa que el tiempo restante hasta el próximo evento es independiente del tiempo ya transcurrido."
  - question: "Si dos procesos de Poisson independientes N_1(t) y N_2(t) tienen tasas lambda_1 = 3 clientes/hora y lambda_2 = 5 clientes/hora, ¿cuál es el proceso resultante al fusionar ambos flujos de llegada?"
    options:
      - "Un proceso de Poisson de tasa agregada lambda = lambda_1 + lambda_2 = 8 clientes/hora"
      - "Un proceso con distribución normal de media 15"
      - "Un proceso determinístico con llegadas cada 15 minutos"
      - "Un proceso binomial con n = 8"
    answer: 0
    explanation: "Por el teorema de superposición de Poisson, la suma de procesos de Poisson independientes es un proceso de Poisson con tasa igual a la suma de las tasas individuales."
---

# Introducción

> En un centro logístico, las órdenes de despacho arriban de forma impredecible a lo largo de la jornada laboral. En una red de telecomunicaciones, los paquetes de datos fluyen continuamente. El **Proceso de Poisson** es el modelo probabilístico estándar para contar eventos raros e independientes que ocurren en un continuo temporal.

Un proceso de conteo $\\{N(t), t \\ge 0\\}$ registra el número acumulado de eventos ocurridos en el intervalo $[0, t]$.

<Callout type="info">
**Dualidad Fundamental:** El número de eventos en un intervalo de longitud fija sigue una **distribución de Poisson** (discreta), mientras que el tiempo transcurrido entre dos eventos consecutivos sigue una **distribución exponencial** (continua).
</Callout>

## Objetivos de Aprendizaje
- Comprender los tres axiomas infinitesimales que definen el proceso de Poisson homogéneo.
- Deducir la distribución exponencial de los tiempos entre arribos $T_k$.
- Explotar la propiedad de pérdida de memoria en modelos de fiabilidad y atención.
- Aplicar las propiedades de superposición (fusión) y descomposición (splitting) de Poisson en Python.

---

# Fundamentos Teóricos

### Axiomas Infinitesimales del Proceso

Un proceso de conteo $\\{N(t), t \\ge 0\\}$ con tasa constante $\\lambda > 0$ es un **Proceso de Poisson Homogéneo** si:
1. $N(0) = 0$.
2. Posee **incrementos independientes:** Para cualquier conjunto disjunto de instantes $t_1 < t_2 < t_3 < t_4$, el número de eventos $N(t_2) - N(t_1)$ es independiente de $N(t_4) - N(t_3)$.
3. Posee **incrementos estacionarios:** La distribución de $N(t + h) - N(t)$ depende solo de la duración $h$, no del tiempo $t$.
4. Condiciones de orden infinitesimal cuando $h \\to 0$:
   $$\\mathbb{P}(N(t + h) - N(t) = 1) = \\lambda h + o(h)$$
   $$\\mathbb{P}(N(t + h) - N(t) \\ge 2) = o(h)$$

### Distribución de Poisson

A partir de estos axiomas, el número de eventos en un intervalo de duración $t$ sigue una distribución de Poisson con parámetro $\\lambda t$:

$$\\mathbb{P}(N(t) = k) = \\frac{(\\lambda t)^k e^{-\\lambda t}}{k!}, \\quad k = 0, 1, 2, \\dots$$

$$\\mathbb{E}[N(t)] = \\lambda t, \\quad \\text{Var}(N(t)) = \\lambda t$$

### Tiempos Entre Arribos

Sean $T_1, T_2, \\dots$ las variables aleatorias que representan el tiempo transcurrido entre eventos sucesivos.

$$\\mathbb{P}(T_1 > t) = \\mathbb{P}(N(t) = 0) = e^{-\\lambda t}$$

$$F_T(t) = \\mathbb{P}(T_1 \\le t) = 1 - e^{-\\lambda t}, \\quad t \\ge 0$$

$$f_T(t) = \\lambda e^{-\\lambda t}, \\quad t \\ge 0$$

Por tanto, los tiempos entre arribos son variables aleatorias independientes e idénticamente distribuidas (i.i.d.) con distribución $\\text{Exponencial}(\\lambda)$, con:

$$\\mathbb{E}[T] = \\frac{1}{\\lambda}, \\quad \\text{Var}(T) = \\frac{1}{\\lambda^2}$$

---

# Laboratorio en Python: Simulación y Verificación de Flujo de Pedidos

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

# Parámetro: tasa de arribo lambda = 4 pedidos por hora
tasa_lambda = 4.0  # eventos/hora
tiempo_simulacion = 10.0  # horas de operación

np.random.seed(42)

# 1. Generación de tiempos entre arribos exponenciales
tiempos_inter = []
tiempo_acum = 0.0
while tiempo_acum < tiempo_simulacion:
    dt = np.random.exponential(scale=1.0/tasa_lambda)
    tiempo_acum += dt
    if tiempo_acum <= tiempo_simulacion:
        tiempos_inter.append(dt)

n_eventos = len(tiempos_inter)
tiempos_arribo = np.cumsum(tiempos_inter)

print(f"Total de pedidos simulados en {tiempo_simulacion} horas: {n_eventos}")
print(f"Media teórica de arribos: {tasa_lambda * tiempo_simulacion:.1f}")
print(f"Tiempo medio entre arribos observado: {np.mean(tiempos_inter):.4f} horas ({np.mean(tiempos_inter)*60:.1f} min)")
print(f"Tiempo medio teórico: {1.0/tasa_lambda:.4f} horas ({60.0/tasa_lambda:.1f} min)")

# 2. Partición por horas para verificar distribución de Poisson
horas = np.floor(tiempos_arribo).astype(int)
conteo_por_hora = pd.Series(horas).value_counts().reindex(range(int(tiempo_simulacion)), fill_value=0)

media_obs = conteo_por_hora.mean()
var_obs = conteo_por_hora.var()

print(f"\\nConteo horario medio observado: {media_obs:.2f}")
print(f"Varianza observada (Poisson teórica Media=Var={tasa_lambda}): {var_obs:.2f}")

# 3. Superposición de dos fuentes de pedidos: Nacionales (lambda=3) y Exportación (lambda=1)
# Probabilidad de que el próximo arribo sea de Exportación: lambda_exp / (lambda_nac + lambda_exp)
prob_exp = 1.0 / (3.0 + 1.0)
print(f"\\nProbabilidad de que el próximo pedido sea de exportación: {prob_exp*100:.1f}%")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Proceso de Poisson Homogéneo"
  questions={[
    {
      id: "q_poi_1",
      text: "Si los camiones llegan a una tolva según un proceso de Poisson con tasa lambda = 6 camiones/hora, ¿cuál es la probabilidad de que no llegue ningún camión en los próximos 20 minutos (1/3 de hora)?",
      options: [
        { id: "a", text: "e^(-2) = 0.1353 (ya que lambda * t = 6 * (1/3) = 2)", isCorrect: true, explanation: "P(N(1/3) = 0) = (2^0 * e^(-2)) / 0! = e^(-2) approx 0.1353." },
        { id: "b", text: "e^(-6) = 0.0025", isCorrect: false, explanation: "6 corresponde a una hora completa, no a 20 minutos." },
        { id: "c", text: "1 - 1/3 = 0.6667", isCorrect: false, explanation: "La probabilidad exponencial de cero eventos es e^(-lambda*t), no lineal." }
      ]
    },
    {
      id: "q_poi_2",
      text: "Un operario lleva esperando 15 minutos la llegada de una orden en un proceso de Poisson. La probabilidad de que deba esperar al menos 10 minutos adicionales es:",
      options: [
        { id: "a", text: "Exactamente igual a la probabilidad de esperar al menos 10 minutos desde cero (por pérdida de memoria)", isCorrect: true, explanation: "La propiedad de pérdida de memoria establece P(T > 15 + 10 | T > 15) = P(T > 10). El proceso no tiene memoria del tiempo transcurrido." },
        { id: "b", text: "Cero, porque ya superó el tiempo promedio", isCorrect: false, explanation: "La distribución exponencial tiene soporte infinito y no presenta cota superior estricta." },
        { id: "c", text: "El doble de la probabilidad original", isCorrect: false, explanation: "La probabilidad condicional no se amplifica." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-cadenas-markov-tiempo-continuo",
        filename: "02-cadenas-markov-tiempo-continuo.mdx",
        content: `---
title: "Cadenas de Markov en Tiempo Continuo y Ecuaciones de Kolmogorov"
order: 2
description: "Matriz generadora infinitesimal Q, tasas de transición q_ij, ecuaciones diferenciales de Kolmogorov y procesos de nacimiento y muerte."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué propiedad fundamental define a la matriz generadora infinitesimal Q de una cadena de Markov en tiempo continuo?"
    options:
      - "Los elementos fuera de la diagonal q_{ij} son no negativos y la suma de cada fila es exactamente cero (q_{ii} = -sum_{j != i} q_{ij})"
      - "Todos los elementos son positivos y suman 1 en cada columna"
      - "La diagonal principal contiene únicamente números imaginarios"
      - "Q es una matriz identidad multiplicada por una constante"
    answer: 0
    explanation: "Por definición de tasas de transición infinitesimales, q_{ij} >= 0 para i != j y sum_{j} q_{ij} = 0, lo que obliga a que q_{ii} = -sum_{j != i} q_{ij} <= 0."
  - question: "¿Cómo se formula la distribución de probabilidad estacionaria pi en una CTMC?"
    options:
      - "pi * Q = 0, sujeto a sum_i pi_i = 1"
      - "pi * Q = pi"
      - "Q * pi = 1"
      - "det(Q) = pi"
    answer: 0
    explanation: "En tiempo continuo la derivada temporal de las probabilidades de estado en equilibrio es cero: d pi(t) / dt = pi Q = 0, con la restricción de normalización sum pi_i = 1."
---

# Introducción

> En los sistemas productivos reales, las transiciones no ocurren en intervalos de reloj fijos; una bomba centrífuga puede averiarse en cualquier instante continuo $t$. Las **Cadenas de Markov en Tiempo Continuo (CTMC)** capturan esta dinámica mediante tasas instantáneas de transición.

En una CTMC, el tiempo que el sistema pasa en un estado $i$ antes de hacer una transición es una variable aleatoria exponencial con tasa $\\nu_i$, y la probabilidad de saltar al estado $j$ está gobernada por una matriz de saltos discretos.

<Callout type="info">
**La Matriz Generadora $Q$:** Es el análogo diferencial de la matriz de transición discreta. Describe la tasa a la que la probabilidad fluye entre los estados del sistema.
</Callout>

## Objetivos de Aprendizaje
- Definir la matriz de tasas infinitesimales $Q$ y sus propiedades de conservación de flujo.
- Interpretar las Ecuaciones Diferenciales de Kolmogorov Progresivas ($P'(t) = P(t)Q$) y Regresivas ($P'(t) = QP(t)$).
- Formular procesos de nacimiento y muerte para sistemas de servicio y manufactura.
- Resolver el vector de estado estacionario continuo $\\pi Q = 0$ con Python.

---

# Fundamentos Teóricos

### Tasas de Transición y Matriz $Q$

Para $i \\ne j$:

$$q_{ij} = \\lim_{h \\to 0} \\frac{p_{ij}(h)}{h}$$

La tasa total a la que el proceso abandona el estado $i$ es:

$$\\nu_i = \\sum_{j \\ne i} q_{ij} = -q_{ii}$$

Por tanto, la matriz generadora $Q = [q_{ij}]$ cumple:

$$\\sum_{j \\in S} q_{ij} = 0, \\quad \\forall i \\in S$$

### Ecuaciones Diferenciales de Kolmogorov

Las probabilidades de transición en el tiempo $t$, $P(t) = [p_{ij}(t)]$, satisfacen:
- **Ecuación Regresiva de Kolmogorov:**
  $$\\frac{d P(t)}{dt} = Q P(t)$$
- **Ecuación Progresiva de Kolmogorov:**
  $$\\frac{d P(t)}{dt} = P(t) Q$$

La solución analítica formal mediante la exponencial matricial es:

$$P(t) = e^{Qt} = \\sum_{k=0}^\\infty \\frac{(Qt)^k}{k!}$$

### Distribución Estacionaria

A medida que $t \\to \\infty$, $\\frac{d \\pi(t)}{dt} \\to 0$, por lo que el vector de estado estable satisface el sistema de **Balance Global:**

$$\\pi Q = 0, \\quad \\sum_{i \\in S} \\pi_i = 1$$

El flujo de probabilidad que sale de cualquier estado o conjunto de estados debe ser idéntico al flujo de probabilidad que entra a dicho estado en equilibrio.

---

# Laboratorio en Python: Dinámica de Falla y Reparación en Planta

\`\`\`python
import numpy as np
import pandas as pd
from scipy.linalg import expm

# Sistema industrial de 3 estados:
# 0: Máquina Operativa al 100%
# 1: Máquina con Rendimiento Degradado
# 2: Máquina en Parada por Falla (Reparación)
estados = ['Operativa', 'Degradada', 'Falla']

# Tasas por hora (eventos/hora):
# De Operativa -> Degradada: lambda_1 = 0.05
# De Operativa -> Falla directa: lambda_0 = 0.01
# De Degradada -> Falla: lambda_2 = 0.20
# De Degradada -> Operativa (ajuste rapido): mu_1 = 0.10
# De Falla -> Operativa (reparación completa): mu_2 = 0.50

Q = np.array([
    [-0.06,  0.05,  0.01],
    [ 0.10, -0.30,  0.20],
    [ 0.50,  0.00, -0.50]
])

print("Matriz Generadora Infinitesimal Q (suma de filas = 0):")
print(Q)
print("Verificación de suma de filas:", np.sum(Q, axis=1))

# 1. Cálculo de probabilidades de estado a las 10 horas: P(10) = expm(Q * 10)
t = 10.0
P_t = expm(Q * t)
df_Pt = pd.DataFrame(P_t, index=estados, columns=estados)
print(f"\\nMatriz de Probabilidades de Transición a t = {t} horas:")
print(df_Pt.round(4))

# 2. Distribución estacionaria: pi * Q = 0
M = len(estados)
A = Q.T.copy()
A[-1, :] = np.ones(M)
b = np.zeros(M)
b[-1] = 1.0

pi = np.linalg.solve(A, b)

df_est = pd.DataFrame({
    'Estado': estados,
    'Probabilidad_Estacionaria (pi)': pi,
    'Disponibilidad (%)': pi * 100
})

print("\\nDISTRIBUCIÓN ESTACIONARIA CONTINUA (pi * Q = 0):")
print(df_est.round(4).to_string(index=False))
print(f"\\nDisponibilidad global de la planta: {pi[0]*100:.2f}%")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Cadenas de Markov en Tiempo Continuo"
  questions={[
    {
      id: "q_ctmc_1",
      text: "En una CTMC, el tiempo que el proceso permanece en el estado i antes de saltar a cualquier otro estado sigue una distribución:",
      options: [
        { id: "a", text: "Exponencial con parámetro nu_i = -q_{ii}", isCorrect: true, explanation: "El tiempo de permanencia es el mínimo de variables exponenciales independientes con tasas q_ij, el cual es exponencial con tasa igual a la suma nu_i = sum_{j != i} q_ij = -q_ii." },
        { id: "b", text: "Uniforme continua entre 0 y 1", isCorrect: false, explanation: "La propiedad de Markov continua exige falta de memoria, que solo cumple la distribución exponencial." },
        { id: "c", text: "Normal con media nu_i", isCorrect: false, explanation: "La distribución normal admite valores negativos y no tiene propiedad de pérdida de memoria." }
      ]
    },
    {
      id: "q_ctmc_2",
      text: "¿Cuál es la interpretación física de la ecuación de balance global pi * Q = 0?",
      options: [
        { id: "a", text: "La tasa total de flujo de probabilidad que sale de cada estado es exactamente igual a la tasa de flujo que entra a dicho estado", isCorrect: true, explanation: "pi_i * sum_{j != i} q_ij = sum_{j != i} pi_j * q_ji, es decir, Flujo Saliente = Flujo Entrante en régimen permanente." },
        { id: "b", text: "Que todos los eventos se cancelan y el sistema deja de operar", isCorrect: false, explanation: "El sistema continúa saltando estocásticamente; lo que no cambia son las probabilidades agregadas." },
        { id: "c", text: "Que la matriz Q es invertible", isCorrect: false, explanation: "Q es siempre singular puesto que sus filas suman cero." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "03-teoria-colas-lineas-espera",
    metadata: {
      title: "Teoría de Colas y Líneas de Espera",
      order: 3
    },
    lessons: [
      {
        slug: "01-sistemas-colas-mm1-mms",
        filename: "01-sistemas-colas-mm1-mms.mdx",
        content: `---
title: "Modelos de Colas M/M/1 y M/M/s con Ley de Little"
order: 1
description: "Notación de Kendall, análisis del sistema M/M/1, factor de utilización rho, extensión a M/M/s con fórmula de Erlang-C y fórmulas de Little."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es la formulación matemática de la Ley de Little para un sistema de colas en estado estacionario?"
    options:
      - "L = lambda * W (y de forma análoga L_q = lambda * W_q)"
      - "L = W / lambda"
      - "L = lambda + W"
      - "L = rho * W_q"
    answer: 0
    explanation: "La Ley de Little (1961) establece que el número promedio de clientes en un sistema en equilibrio (L) es igual a la tasa media de llegada (lambda) multiplicada por el tiempo promedio de permanencia en el sistema (W), con independencia de las distribuciones de llegada o servicio."
  - question: "¿Cuál es la condición estricta de estabilidad para que un sistema M/M/1 no colapse con una cola de longitud infinita?"
    options:
      - "rho = lambda / mu < 1 (la tasa de llegada debe ser estrictamente menor que la tasa de servicio)"
      - "rho = lambda / mu = 1"
      - "lambda > mu"
      - "mu = 0"
    answer: 0
    explanation: "Si lambda >= mu, los clientes llegan a un ritmo igual o superior a la capacidad del servidor para atenderlos, provocando que la longitud esperada de la cola tienda a infinito en el tiempo."
---

# Introducción

> Las colas son inevitables pero costosas. Clientes esperando en ventanilla bancaria, piezas en espera antes de un torno CNC, camiones haciendo fila para descargar granos en un puerto fluvial o paquetes en un router. La **Teoría de Colas** optimiza el balance entre el costo de proveer servicio y el costo de la espera.

Utilizando la **Notación de Kendall** $A/B/s/K/N/D$, donde $A$ es la distribución de arribos, $B$ es la de servicio, $s$ el número de servidores paralelos y $K$ la capacidad del sistema.

<Callout type="info">
**Notación de Kendall Clásica:** $M/M/1$ denota arribos Markovianos (Poisson), servicio Markoviano (Exponencial), $1$ servidor único, capacidad infinita y disciplina FIFO (*First-In, First-Out*).
</Callout>

## Objetivos de Aprendizaje
- Describir la estructura fundamental de un sistema de colas y los supuestos de nacimiento y muerte.
- Deducir las métricas de rendimiento del modelo $M/M/1$: $L, L_q, W, W_q$ y $P_0$.
- Aplicar la Ley de Little como puente analítico universal.
- Modelar sistemas con múltiples servidores en paralelo $M/M/s$ con la fórmula de Erlang-C en Python.

---

# Fundamentos Teóricos

### El Modelo $M/M/1$

Sean:
- $\\lambda$: Tasa media de llegadas (arribos/hora).
- $\\mu$: Tasa media de servicio por servidor (atenciones/hora).
- $\\rho = \\frac{\\lambda}{\\mu}$: Factor de utilización del servidor. Condición de estabilidad: $\\rho < 1$.

Probabilidad de encontrar $n$ clientes en el sistema:

$$P_n = (1 - \\rho) \\rho^n, \\quad n = 0, 1, 2, \\dots$$

Probabilidad de servidor ocioso: $P_0 = 1 - \\rho$.

### Métricas de Rendimiento del $M/M/1$

- Número promedio de clientes en el sistema:
  $$L = \\sum_{n=0}^\\infty n P_n = \\frac{\\rho}{1 - \\rho} = \\frac{\\lambda}{\\mu - \\lambda}$$

- Número promedio de clientes en la cola (esperando servicio):
  $$L_q = \\frac{\\lambda^2}{\\mu(\\mu - \\lambda)} = L - \\rho$$

- Tiempo promedio de permanencia en el sistema (espera + servicio):
  $$W = \\frac{L}{\\lambda} = \\frac{1}{\\mu - \\lambda}$$

- Tiempo promedio de espera en la cola:
  $$W_q = \\frac{L_q}{\\lambda} = \\frac{\\lambda}{\\mu(\\mu - \\lambda)} = W - \\frac{1}{\\mu}$$

### El Modelo $M/M/s$ (Servidores Múltiples)

Con $s$ servidores idénticos en paralelo, la utilización global es:

$$\\rho = \\frac{\\lambda}{s \\mu} < 1$$

Probabilidad de que el sistema esté completamente vacío ($P_0$):

$$P_0 = \\left[ \\sum_{n=0}^{s-1} \\frac{(\\lambda/\\mu)^n}{n!} + \\frac{(\\lambda/\\mu)^s}{s! (1 - \\rho)} \\right]^{-1}$$

Fórmula de Erlang-C (probabilidad de que un cliente que llega deba esperar en cola):

$$P(\\text{Espera}) = C(s, \\lambda/\\mu) = \\frac{\\frac{(\\lambda/\\mu)^s}{s! (1 - \\rho)} P_0}{1}$$

$$L_q = \\frac{P(\\text{Espera}) \\cdot \\rho}{1 - \\rho}, \\quad W_q = \\frac{L_q}{\\lambda}, \\quad W = W_q + \\frac{1}{\\mu}, \\quad L = \\lambda W$$

---

# Laboratorio en Python: Centro de Inspección de Calidad (M/M/1 vs M/M/2)

\`\`\`python
import math
import pandas as pd

def resolver_mm1(tasa_l, tasa_m):
    rho = tasa_l / tasa_m
    if rho >= 1.0:
        return None
    L = rho / (1.0 - rho)
    Lq = (tasa_l**2) / (tasa_m * (tasa_m - tasa_l))
    W = 1.0 / (tasa_m - tasa_l)
    Wq = W - (1.0 / tasa_m)
    P0 = 1.0 - rho
    return {'rho': rho, 'P0': P0, 'L': L, 'Lq': Lq, 'W_min': W*60, 'Wq_min': Wq*60}

def resolver_mms(tasa_l, tasa_m, s):
    a = tasa_l / tasa_m  # Intensidad de tráfico
    rho = a / s
    if rho >= 1.0:
        return None
    
    # Cálculo de P0
    suma_k = sum((a**n) / math.factorial(n) for n in range(s))
    termino_s = (a**s) / (math.factorial(s) * (1.0 - rho))
    P0 = 1.0 / (suma_k + termino_s)
    
    # Erlang C
    erlang_c = termino_s * P0
    Lq = (erlang_c * rho) / (1.0 - rho)
    Wq = Lq / tasa_l
    W = Wq + (1.0 / tasa_m)
    L = tasa_l * W
    return {'rho': rho, 'P0': P0, 'L': L, 'Lq': Lq, 'W_min': W*60, 'Wq_min': Wq*60}

# Escenario: Llegadas de lotes lambda = 8 lotes/hora. Capacidad por inspector mu = 10 lotes/hora
tasa_llegada = 8.0
tasa_servicio = 10.0

res_mm1 = resolver_mm1(tasa_llegada, tasa_servicio)
res_mm2 = resolver_mms(tasa_llegada, tasa_servicio, s=2)

df_comparativa = pd.DataFrame([
    {'Configuracion': '1 Servidor (M/M/1)', **res_mm1},
    {'Configuracion': '2 Servidores (M/M/2)', **res_mm2}
])

print("COMPARACIÓN DE DESEMPEÑO DE COLAS M/M/1 VS M/M/2:")
print(df_comparativa.round(3).to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Modelos de Colas M/M/1 y M/M/s"
  questions={[
    {
      id: "q_queue_1",
      text: "Si en un sistema M/M/1 la tasa de llegada es lambda = 4 clientes/h y la de servicio es mu = 5 clientes/h, ¿cuál es el número promedio de clientes en el sistema L?",
      options: [
        { id: "a", text: "4 clientes (L = lambda / (mu - lambda) = 4 / (5 - 4) = 4)", isCorrect: true, explanation: "L = 4 / (5 - 4) = 4 clientes promedio entre los que están en cola y el que está siendo atendido." },
        { id: "b", text: "0.8 clientes", isCorrect: false, explanation: "0.8 es la utilización rho = 4/5, no el número promedio de clientes." },
        { id: "c", text: "16 clientes", isCorrect: false, explanation: "16 clientes sería con una utilización muy superior al 94%." }
      ]
    },
    {
      id: "q_queue_2",
      text: "¿Qué impacto inmediato tiene duplicar los servidores de s = 1 a s = 2 en un sistema con utilización moderada?",
      options: [
        { id: "a", text: "Reduce drásticamente el tiempo de espera en cola Wq a menos de una cuarta parte del valor original", isCorrect: true, explanation: "La relación entre utilización y espera en colas es altamente no lineal. Al añadir un segundo canal, la probabilidad de encontrar ambos ocupados cae drásticamente." },
        { id: "b", text: "El tiempo de espera se reduce exactamente a la mitad lineal", isCorrect: false, explanation: "El comportamiento de las colas es fuertemente no lineal, reduciéndose en mucho más del 50%." },
        { id: "c", text: "No tiene ningún efecto si la tasa de llegadas es constante", isCorrect: false, explanation: "Aumentar la capacidad instalada siempre reduce la congestión estocástica." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-analisis-economico-colas",
        filename: "02-analisis-economico-colas.mdx",
        content: `---
title: "Optimización y Análisis Económico del Servicio y Espera"
order: 2
description: "Modelos de costo total esperado E[TC], trade-off entre costo de servicio y costo de espera, determinación del número óptimo de servidores s*."
bloomLevel: "EVALUATE"
estimatedMinutes: 50
quiz:
  - question: "¿Cómo se define la función clásica de Costo Total Esperado por unidad de tiempo en el diseño económico de un sistema de colas?"
    options:
      - "E[TC(s)] = C_s * s + C_w * L (o bien C_s * s + C_w * L_q)"
      - "E[TC(s)] = C_s / s + C_w * W"
      - "E[TC(s)] = (C_s + C_w) * lambda"
      - "E[TC(s)] = C_s * mu * s"
    answer: 0
    explanation: "El costo total equilibra el costo de proveer s servidores (C_s * s, lineal creciente con s) y el costo de oportunidad o penalización por la espera de los clientes/entidades (C_w * L, convexo decreciente con s)."
  - question: "A medida que se incrementa el número de servidores s en un sistema de colas, ¿qué sucede con las dos curvas de costo?"
    options:
      - "El costo de servicio se incrementa linealmente, mientras que el costo de espera disminuye de forma exponencial/hiperbólica"
      - "Ambos costos se incrementan al mismo tiempo"
      - "El costo de espera aumenta debido a la confusión de los clientes"
      - "El costo total se vuelve independiente del número de servidores"
    answer: 0
    explanation: "Existe un trade-off clásico convexo: más servidores implican mayor costo fijo/operativo pero minimizan drásticamente los tiempos de cola de los usuarios."
---

# Introducción

> En ingeniería industrial, las decisiones nunca son puramente técnicas; son fundamentalmente económicas. Contratar 10 inspectores eliminará la fila de lotes por revisar, pero arruinará la rentabilidad de la fábrica por mano de obra ociosa. Tener 1 solo inspector maximiza su ocupación, pero paraliza el flujo productivo de las demás líneas.

El **Análisis Económico de Colas** determina el número óptimo de estaciones o servidores $s^*$ que minimiza la suma de costos de servicio y costos de espera.

<Callout type="info">
**El Dilema del Ingeniero:** Diseñar la capacidad no para la demanda promedio, sino considerando la variabilidad estocástica y el costo relativo del cliente esperando vs el servidor desocupado.
</Callout>

## Objetivos de Aprendizaje
- Formular la función de costo total esperado por hora o por turno $E[TC(s)]$.
- Identificar los componentes de costo de servicio ($C_s$) y costo de espera ($C_w$).
- Aplicar búsqueda discreta sobre $s \\in \\{s_{\\min}, s_{\\min}+1, \\dots\\}$ para hallar el óptimo global $s^*$.
- Realizar análisis de sensibilidad económica ante cambios en el costo de espera en Python.

---

# Fundamentos Teóricos

### Formulación del Modelo de Costo Total

Sea:
- $C_s$: Costo marginal de operar un servidor por unidad de tiempo (salario, depreciación, energía).
- $C_w$: Costo de espera por cliente por unidad de tiempo en el sistema (insatisfacción, pérdida de goodwill, inventario en proceso WIP inmovilizado).
- $s$: Número entero de servidores en paralelo ($s \\ge \\lceil \\lambda / \\mu \\rceil$).

La función de Costo Total Esperado por hora es:

$$E[TC(s)] = C_s \\cdot s + C_w \\cdot L(s)$$

Si la empresa penaliza únicamente el tiempo de espera en la fila antes de ser atendido:

$$E[TC_q(s)] = C_s \\cdot s + C_w \\cdot L_q(s)$$

### Condición de Optimalidad Discreta

Dado que $s$ es una variable discreta, $s^*$ es el número óptimo de servidores si y solo si:

$$E[TC(s^*)] \\le E[TC(s^* - 1)] \\quad \\text{y} \\quad E[TC(s^*)] \\le E[TC(s^* + 1)]$$

Gráficamente, la curva $E[TC(s)]$ tiene forma de "U" convexa.

---

# Laboratorio en Python: Optimización de Bahías de Descarga en Muelle

\`\`\`python
import math
import numpy as np
import pandas as pd

def metricas_mms(tasa_l, tasa_m, s):
    a = tasa_l / tasa_m
    rho = a / s
    if rho >= 1.0:
        return {'L': np.inf, 'Lq': np.inf, 'W': np.inf, 'Wq': np.inf, 'rho': rho}
    
    suma_k = sum((a**n) / math.factorial(n) for n in range(s))
    termino_s = (a**s) / (math.factorial(s) * (1.0 - rho))
    P0 = 1.0 / (suma_k + termino_s)
    
    erlang_c = termino_s * P0
    Lq = (erlang_c * rho) / (1.0 - rho)
    Wq = Lq / tasa_l
    W = Wq + (1.0 / tasa_m)
    L = tasa_l * W
    return {'L': L, 'Lq': Lq, 'W': W, 'Wq': Wq, 'rho': rho}

# Parámetros del Puerto:
# Arribo de buques de carga: lambda = 3 buques/día
# Capacidad de descarga por grúa pórtico: mu = 2 buques/día
# Costo operativo de cada grúa: Cs = $2,500 USD/día
# Costo de sobrestadía (demurrage) por buque esperando en puerto: Cw = $8,000 USD/día

tasa_l = 3.0
tasa_m = 2.0
Cs = 2500.0
Cw = 8000.0

s_min = math.floor(tasa_l / tasa_m) + 1  # s >= 2 para estabilidad (rho < 1)
resultados = []

for s in range(s_min, s_min + 6):
    m = metricas_mms(tasa_l, tasa_m, s)
    costo_servicio = Cs * s
    costo_espera = Cw * m['L']
    costo_total = costo_servicio + costo_espera
    
    resultados.append({
        'Servidores (s)': s,
        'Utilizacion (rho)': m['rho'],
        'Buques_en_Puerto (L)': m['L'],
        'Espera_Media_Dias (W)': m['W'],
        'Costo_Servicio ($)': costo_servicio,
        'Costo_Espera ($)': costo_espera,
        'Costo_Total_Diario ($)': costo_total
    })

df_econ = pd.DataFrame(resultados)
s_optimo = df_econ.loc[df_econ['Costo_Total_Diario ($)'].idxmin(), 'Servidores (s)']

print("EVALUACIÓN ECONÓMICA DE BAHÍAS DE DESCARGA:")
print(df_econ.round(2).to_string(index=False))
print(f"\\n--> NÚMERO ÓPTIMO DE GRÚAS: s* = {int(s_optimo)} con un Costo Mínimo de USD {df_econ['Costo_Total_Diario ($)'].min():.2f}/día")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Optimización Económica de Colas"
  questions={[
    {
      id: "q_econ_q_1",
      text: "Si el costo por hora de espera de un cliente C_w se incrementa drásticamente debido a penalizaciones contractuales por retrasos, ¿hacia dónde se desplaza el número óptimo de servidores s*?",
      options: [
        { id: "a", text: "Hacia un mayor número de servidores (s* aumenta) para reducir L y evitar las severas penalizaciones", isCorrect: true, explanation: "Al encarecerse la espera, el óptimo se desplaza hacia mayor capacidad instalada que minimice el tiempo en fila." },
        { id: "b", text: "Hacia un menor número de servidores para ahorrar en salarios", isCorrect: false, explanation: "Reducir servidores incrementaría exponencialmente los costos de espera, aumentando el costo total." },
        { id: "c", text: "Permanece exactamente igual puesto que lambda no cambió", isCorrect: false, explanation: "El balance económico depende de la razón C_w / C_s." }
      ]
    },
    {
      id: "q_econ_q_2",
      text: "¿Por qué no es viable operar un sistema con s = lambda / mu exactamente?",
      options: [
        { id: "a", text: "Porque la utilización rho sería exactamente 1.0, lo que genera una cola estocástica que crece sin límite hacia infinito", isCorrect: true, explanation: "Bajo variabilidad estocástica, rho = 1 no es estable; las fluctuaciones de llegadas no pueden compensarse sin capacidad de reserva ociosa." },
        { id: "b", text: "Porque el costo de servicio sería cero", isCorrect: false, explanation: "El costo de servicio es proporcional a s." },
        { id: "c", text: "Porque los servidores trabajarían a velocidad infinita", isCorrect: false, explanation: "La tasa mu es finita." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "04-confiabilidad-sistemas",
    metadata: {
      title: "Confiabilidad de Sistemas Industriales",
      order: 4
    },
    lessons: [
      {
        slug: "01-sistemas-serie-paralelo-k-de-n",
        filename: "01-sistemas-serie-paralelo-k-de-n.mdx",
        content: `---
title: "Confiabilidad en Configuraciones Serie, Paralelo y k-de-n"
order: 1
description: "Modelado de confiabilidad R(t), configuraciones en serie, redundancia en paralelo activa y pasiva, y sistemas k-de-n."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "En un sistema industrial compuesto por n componentes independientes conectados en SERIE, ¿cuál es la confiabilidad global del sistema R_s(t)?"
    options:
      - "El producto de las confiabilidades individuales: R_s(t) = prod_{i=1}^n R_i(t)"
      - "La suma de las confiabilidades: R_s(t) = sum_{i=1}^n R_i(t)"
      - "La máxima confiabilidad: R_s(t) = max_i R_i(t)"
      - "1 - prod_{i=1}^n (1 - R_i(t))"
    answer: 0
    explanation: "En un sistema serie, para que el sistema funcione es estrictamente necesario que todos sus componentes funcionen simultáneamente. Por independencia probabilística, la probabilidad de la intersección es el producto."
  - question: "¿Qué caracteriza a un sistema de redundancia 'k-de-n'?"
    options:
      - "El sistema opera exitosamente si al menos k de los n componentes disponibles están funcionando"
      - "El sistema falla tan pronto como falle el componente k-ésimo"
      - "El sistema solo funciona cuando exactamente k componentes fallan"
    answer: 0
    explanation: "Una configuración k-de-n es una arquitectura de redundancia modular donde el sistema sigue operativo mientras al menos k de sus n componentes sobrevivan (e.g. un avión cuatrimotor que requiere al menos 2 motores para volar es un sistema 2-de-4)."
---

# Introducción

> "Una cadena es tan fuerte como su eslabón más débil". Este adagio popular es el principio fundacional de la ingeniería de confiabilidad en configuraciones serie. Sin embargo, en la industria aeroespacial, nuclear y médica, la vida de las personas no puede depender de un único eslabón: se requiere **redundancia en paralelo**.

La **Confiabilidad** $R(t)$ es la probabilidad de que un equipo o sistema cumpla satisfactoriamente su función prevista durante un tiempo especificado $t$ bajo condiciones ambientales y operativas estandarizadas.

<Callout type="info">
**Efecto de la Configuración Serie:** Si un sistema serie consta de 10 componentes idénticos, cada uno con una confiabilidad del 99% ($R_i = 0.99$), la confiabilidad global del sistema cae a $R_s = (0.99)^{10} = 0.904$ (más del 9.5% de riesgo de fallo).
</Callout>

## Objetivos de Aprendizaje
- Definir la función de confiabilidad $R(t) = 1 - F(t)$ y la probabilidad acumulada de falla.
- Deducir y calcular la confiabilidad de sistemas en **serie** y en **paralelo**.
- Evaluar arquitecturas con redundancia modular de votación mayoritaria **$k$-de-$n$**.
- Resolver esquemas complejos mixtos serie-paralelo con Python.

---

# Fundamentos Teóricos

### Conceptos Fundamentales

Sea $T \\ge 0$ una variable aleatoria continua que representa el tiempo transcurrido hasta la falla del componente:
- Función de distribución acumulada de falla: $F(t) = \\mathbb{P}(T \\le t)$.
- Función de confiabilidad (supervivencia):
  $$R(t) = \\mathbb{P}(T > t) = 1 - F(t) = \\int_t^\\infty f(u) du$$

### Sistema en Serie

El sistema falla si falla cualquiera de sus $n$ componentes:

$$R_s(t) = \\mathbb{P}(T_1 > t \\cap T_2 > t \\cap \\dots \\cap T_n > t)$$

Por independencia estocástica:

$$R_s(t) = \\prod_{i=1}^n R_i(t)$$

Nótese que $R_s(t) \\le \\min(R_1(t), \\dots, R_n(t))$.

### Sistema en Paralelo Activo

El sistema funciona si al menos uno de los $n$ componentes opera:

$$F_p(t) = \\mathbb{P}(\\text{Todos fallan antes de } t) = \\prod_{i=1}^n F_i(t) = \\prod_{i=1}^n (1 - R_i(t))$$

$$R_p(t) = 1 - \\prod_{i=1}^n (1 - R_i(t))$$

Nótese que $R_p(t) \\ge \\max(R_1(t), \\dots, R_n(t))$.

### Sistema $k$-de-$n$ con Componentes Idénticos

Si los $n$ componentes son independientes e idénticos, cada uno con confiabilidad $R(t)$, el número de componentes sobrevivientes $X$ sigue una distribución $\\text{Binomial}(n, R(t))$:

$$R_{k/n}(t) = \\sum_{j=k}^n \\binom{n}{j} [R(t)]^j [1 - R(t)]^{n-j}$$

---

# Laboratorio en Python: Evaluación de un Sistema de Bombeo de Emergencia

\`\`\`python
import math
import numpy as np
import pandas as pd

# Módulo de refrigeración de reactor:
# 3 bombas de agua en paralelo activo (se requiere que al menos 1 funcione)
# Conectadas en serie con 2 válvulas de alivio en serie (ambas deben abrir)
# Confiabilidad individual al cabo de 5000 horas:
# Bomba: R_b = 0.92 cada una
# Válvula: R_v = 0.98 cada una

R_bomba = 0.92
R_valvula = 0.98

# 1. Subsistema de bombas en paralelo (3 bombas)
R_bombas_paralelo = 1.0 - (1.0 - R_bomba)**3

# 2. Subsistema de válvulas en serie (2 válvulas)
R_valvulas_serie = R_valvula * R_valvula

# 3. Sistema global (Bombas en serie con Válvulas)
R_sistema_global = R_bombas_paralelo * R_valvulas_serie

# 4. Evaluación de sistema redundante k-de-n:
# 4 motores eléctricos donde se requiere que funcionen al menos 2 (2-de-4)
n = 4
k = 2
R_motor = 0.90
R_2_de_4 = sum(math.comb(n, j) * (R_motor**j) * ((1.0 - R_motor)**(n - j)) for j in range(k, n + 1))

df_res = pd.DataFrame([
    {'Subsistema': 'Bomba Individual', 'Confiabilidad': R_bomba},
    {'Subsistema': '3 Bombas en Paralelo Activo', 'Confiabilidad': R_bombas_paralelo},
    {'Subsistema': '2 Válvulas en Serie', 'Confiabilidad': R_valvulas_serie},
    {'Subsistema': 'Sistema Completo Bombas + Válvulas', 'Confiabilidad': R_sistema_global},
    {'Subsistema': 'Redundancia 2-de-4 Motores (R=0.90)', 'Confiabilidad': R_2_de_4}
])

print("ANÁLISIS DE CONFIABILIDAD DE TOPOLOGÍAS INDUSTRIALES:")
print(df_res.to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Topologías de Confiabilidad"
  questions={[
    {
      id: "q_rel_1",
      text: "Si se instalan 3 generadores idénticos en paralelo, cada uno con confiabilidad R = 0.80, ¿cuál es la confiabilidad del banco de energía?",
      options: [
        { id: "a", text: "1 - (1 - 0.80)^3 = 1 - (0.20)^3 = 1 - 0.008 = 0.992", isCorrect: true, explanation: "El sistema paralelo solo falla si los tres generadores fallan a la vez: F_p = 0.20^3 = 0.008, por lo que R_p = 0.992." },
        { id: "b", text: "0.80^3 = 0.512", isCorrect: false, explanation: "0.512 es la confiabilidad si estuvieran conectados en SERIE, no en paralelo." },
        { id: "c", text: "0.80", isCorrect: false, explanation: "La redundancia en paralelo incrementa estrictamente la confiabilidad por encima del componente individual." }
      ]
    },
    {
      id: "q_rel_2",
      text: "¿Por qué en sistemas serie la falla de componentes con confiabilidades altas (ej. 99%) sigue degradando sensiblemente la confiabilidad conforme aumenta n?",
      options: [
        { id: "a", text: "Porque la multiplicación acumulativa de factores menores a 1 decrece exponencialmente con el número de componentes", isCorrect: true, explanation: "Con n = 50 componentes de R = 0.99, R_s = 0.99^50 = 0.605, reduciendo la confiabilidad al 60.5%." },
        { id: "b", text: "Porque los componentes se sobrecalientan mutuamente por fricción", isCorrect: false, explanation: "Es una consecuencia matemática de la regla del producto probabilístico para eventos independientes." },
        { id: "c", text: "Porque el tiempo medio entre fallas se vuelve negativo", isCorrect: false, explanation: "El MTBF es una magnitud estrictamente positiva." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-tasas-fallas-mtbf",
        filename: "02-tasas-fallas-mtbf.mdx",
        content: `---
title: "Tasa de Fallas, Distribución de Weibull y MTBF"
order: 2
description: "Curva de la bañera, función de tasa de fallas h(t), distribución de Weibull (forma beta y escala eta) y cálculo de MTBF y MTTR."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué interpretación física tiene el parámetro de forma beta de la distribución de Weibull en la tasa de fallas h(t)?"
    options:
      - "beta < 1 indica fallas tempranas (mortalidad infantil); beta = 1 indica tasa constante (fallas aleatorias); beta > 1 indica desgaste por envejecimiento"
      - "beta siempre debe ser exactamente igual a 3.14"
      - "beta representa el costo unitario de repuesto en inventario"
      - "beta > 1 indica que el equipo mejora con el uso de forma perpetua"
    answer: 0
    explanation: "El parámetro de forma beta modela las tres fases de la curva de la bañera: tasa decreciente (beta < 1), tasa constante exponencial (beta = 1) y tasa creciente por desgaste y fatiga de materiales (beta > 1)."
  - question: "¿Cómo se define analíticamente el Tiempo Medio Entre Fallas (MTBF) a partir de la función de confiabilidad R(t)?"
    options:
      - "MTBF = int_0^infty R(t) dt"
      - "MTBF = R(0) - R(infty)"
      - "MTBF = 1 / R(t)"
      - "MTBF = int_0^infty t * R(t) dt"
    answer: 0
    explanation: "Integrando por partes la esperanza matemática de una variable aleatoria no negativa E[T] = int_0^infty t f(t) dt, se demuestra formalmente que MTBF = int_0^infty R(t) dt."
---

# Introducción

> Todos los equipos industriales mueren. La pregunta para el ingeniero de confiabilidad no es si fallarán, sino **cuándo** y **a qué ritmo**. Reemplazar un rodamiento demasiado pronto desperdicia vida útil residual; reemplazarlo demasiado tarde causa una catástrofe en la línea de producción.

La **Tasa de Fallas** $h(t)$ cuantifica el riesgo instantáneo de que un equipo que ha sobrevivido hasta el tiempo $t$ falle en el siguiente instante infinitesimal.

<Callout type="info">
**La Curva de la Bañera:** Describe el ciclo de vida clásico de activos:
1. *Mortalidad infantil* (defectos de fabricación, $h'(t) < 0$).
2. *Vida útil* (fallas estocásticas accidentales, $h(t) = \\lambda$ constante).
3. *Desgaste y obsolescencia* (fatiga, corrosión, $h'(t) > 0$).
</Callout>

## Objetivos de Aprendizaje
- Formalizar la función de tasa de fallas instantánea $h(t) = f(t) / R(t)$.
- Conectar la tasa de fallas constante con la distribución exponencial y el $MTBF = 1/\\lambda$.
- Analizar la distribución de Weibull y la interpretación física de sus parámetros $\\beta$ (forma) y $\\eta$ (escala).
- Calcular la disponibilidad inherente de un activo: $A = \\frac{MTBF}{MTBF + MTTR}$.

---

# Fundamentos Teóricos

### Tasa de Fallas Instantánea (Hazard Rate)

$$h(t) = \\lim_{\\Delta t \\to 0} \\frac{\\mathbb{P}(t < T \\le t + \\Delta t \\mid T > t)}{\\Delta t} = \\frac{f(t)}{R(t)} = -\\frac{d}{dt} \\ln R(t)$$

Integrando ambos lados:

$$R(t) = \\exp\\left( -\\int_0^t h(u) du \\right)$$

Si la tasa de fallas es constante $h(t) = \\lambda$:

$$R(t) = e^{-\\lambda t}$$

$$MTBF = \\mathbb{E}[T] = \\int_0^\\infty e^{-\\lambda t} dt = \\frac{1}{\\lambda}$$

### La Distribución de Weibull

Es el modelo más versátil de confiabilidad en ingeniería:

$$R(t) = \\exp\\left( -\\left( \\frac{t}{\\eta} \\right)^\\beta \\right), \\quad t \\ge 0$$

$$h(t) = \\frac{\\beta}{\\eta} \\left( \\frac{t}{\\eta} \\right)^{\\beta - 1}$$

- $\\beta > 0$: Parámetro de forma (adimensional).
- $\\eta > 0$: Parámetro de escala o vida característica (tiempo al cual ha fallado el 63.2% de la población, ya que $R(\\eta) = e^{-1} = 0.368$).

El $MTBF$ para la distribución de Weibull es:

$$MTBF = \\eta \\cdot \\Gamma\\left( 1 + \\frac{1}{\\beta} \\right)$$

Donde $\\Gamma(x)$ es la función Gamma de Euler.

### Disponibilidad Inherente ($A$)

Combina confiabilidad ($MTBF$) y mantenibilidad ($MTTR$ - Tiempo Medio Para Reparar):

$$A = \\frac{MTBF}{MTBF + MTTR}$$

---

# Laboratorio en Python: Análisis Weibull de Turbina de Vapor

\`\`\`python
import math
import numpy as np
import pandas as pd
from scipy import stats
from scipy.special import gamma

# Parámetros de Weibull para álabes de turbina sometidos a fatiga térmica
beta = 2.5       # beta > 1: proceso de desgaste y fatiga acelerada
eta = 12000.0    # Vida característica: 12,000 horas de operación
MTTR = 48.0      # Tiempo medio de reemplazo y reparación: 48 horas

# 1. Cálculo del MTBF
MTBF = eta * gamma(1.0 + 1.0 / beta)

# 2. Confiabilidad R(t) y tasa de fallas h(t) a diferentes horizontes temporales
tiempos_h = [2000, 4000, 6000, 8000, 10000, 12000, 14000]
reporte = []

for t in tiempos_h:
    R_t = np.exp(-(t / eta)**beta)
    # Tasa instantánea de fallas por millón de horas (failures per million hours - FPMH)
    h_t = (beta / eta) * (t / eta)**(beta - 1.0) * 1_000_000
    reporte.append({
        'Tiempo_Horas': t,
        'Confiabilidad_R(t)': R_t,
        'Prob_Falla_F(t)': 1.0 - R_t,
        'Tasa_Fallas_h(t) [FPMH]': h_t
    })

df_weibull = pd.DataFrame(reporte)

# 3. Disponibilidad Operacional Inherente
A = MTBF / (MTBF + MTTR)

print("ANÁLISIS DE CONFIABILIDAD WEIBULL (beta=2.5, eta=12,000 h):")
print(df_weibull.round(4).to_string(index=False))
print(f"\\nMTBF (Tiempo Medio Entre Fallas): {MTBF:.1f} horas ({MTBF/24:.1f} días de operación continua)")
print(f"MTTR (Tiempo Medio de Reparación): {MTTR:.1f} horas")
print(f"Disponibilidad Inherente del Activo (A): {A*100:.3f}%")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Tasa de Fallas y Weibull"
  questions={[
    {
      id: "q_wb_1",
      text: "Si un equipo industrial opera en su fase de vida útil con tasa de fallas constante lambda = 0.0005 fallas/hora, ¿cuál es su MTBF?",
      options: [
        { id: "a", text: "2000 horas (MTBF = 1 / lambda = 1 / 0.0005 = 2000 h)", isCorrect: true, explanation: "Bajo el modelo exponencial (tasa constante), el MTBF es el inverso recíproco de lambda." },
        { id: "b", text: "500 horas", isCorrect: false, explanation: "1 / 0.0005 = 2000, no 500." },
        { id: "c", text: "10000 horas", isCorrect: false, explanation: "10000 horas correspondería a una tasa de 0.0001." }
      ]
    },
    {
      id: "q_wb_2",
      text: "Si un motor tiene MTBF = 950 horas y MTTR = 50 horas, ¿cuál es su disponibilidad inherente A?",
      options: [
        { id: "a", text: "95% (A = 950 / (950 + 50) = 950 / 1000 = 0.95)", isCorrect: true, explanation: "La disponibilidad es el porcentaje del tiempo total que el equipo se encuentra apto para operar: MTBF / (MTBF + MTTR)." },
        { id: "b", text: "50%", isCorrect: false, explanation: "50% sería si el MTBF y el MTTR fueran idénticos." },
        { id: "c", text: "99.9%", isCorrect: false, explanation: "Requeriría un MTTR mucho menor en comparación con el MTBF." }
      ]
    }
  ]}
/>
`
      }
    ]
  }
];

function build() {
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(BASE_DIR, 'metadata.json'), JSON.stringify(courseMetadata, null, 2));

  for (const mod of modules) {
    const modDir = path.join(BASE_DIR, mod.slug);
    if (!fs.existsSync(modDir)) {
      fs.mkdirSync(modDir, { recursive: true });
    }
    fs.writeFileSync(path.join(modDir, 'metadata.json'), JSON.stringify(mod.metadata, null, 2));

    for (const lesson of mod.lessons) {
      fs.writeFileSync(path.join(modDir, lesson.filename), lesson.content);
    }
  }
  console.log("✅ Curso procesos-estocasticos generado con éxito!");
}

build();
