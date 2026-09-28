import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'content', 'courses', 'ingenieria-economica-finanzas');

const courseMetadata = {
  title: "Ingeniería Económica y Finanzas",
  slug: "ingenieria-economica-finanzas",
  code: "II543",
  description: "Principios del valor del dinero en el tiempo, equivalencia financiera, evaluación económica de proyectos de inversión mediante VPN, TIR, B/C y CAUE, y análisis de reposición de activos de capital.",
  credits: 3,
  ects: 6,
  semester: 5,
  isMock: false
};

const modules = [
  {
    slug: "01-matematicas-financieras",
    metadata: {
      title: "Matemáticas Financieras y Valor del Dinero",
      order: 1
    },
    lessons: [
      {
        slug: "01-valor-dinero-tasas-interes",
        filename: "01-valor-dinero-tasas-interes.mdx",
        content: `---
title: "Valor del Dinero en el Tiempo: Interés Compuesto y Tasas Efectivas"
order: 1
description: "Principio de equivalencia financiera temporal, capitalización periódica y continua, conversión entre tasas nominales y efectivas anuales (TEA) e inflación."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Por qué un peso o dólar recibido hoy vale más que el mismo peso recibido dentro de un año?"
    options:
      - "Por el costo de oportunidad del capital (capacidad de generar rendimiento por inversión) y la pérdida de poder adquisitivo por inflación y riesgo"
      - "Porque el papel moneda se deteriora físicamente con el tiempo"
      - "Porque los bancos cobran comisiones fijas mensuales"
      - "Solo es válido si la tasa de interés es negativa"
    answer: 0
    explanation: "El principio del valor del dinero en el tiempo postula que una suma monetaria presente tiene mayor valor económico que la misma suma futura debido a su capacidad de generar intereses mediante reinversión y al riesgo de inflación."
  - question: "¿Cuál es la tasa efectiva anual (TEA) equivalente a una tasa nominal del 24% anual capitalizable mensualmente (2% periódico mensual)?"
    options:
      - "TEA = (1 + 0.02)^12 - 1 = 26.82% anual"
      - "TEA = 24.00% anual exacta"
      - "TEA = 2% anual"
      - "TEA = 28.50% anual"
    answer: 0
    explanation: "Por la fórmula de capitalización compuesta TEA = (1 + r/m)^m - 1 = (1 + 0.24/12)^12 - 1 = (1.02)^12 - 1 = 0.26824 (26.82%). El interés compuesto genera intereses sobre los intereses acumulados de cada mes."
---

# Introducción

> En ingeniería, ningún proyecto existe en un vacío temporal. Una inversión de $500,000 USD hoy para automatizar una línea de empaque que ahorrará $120,000 USD anuales durante 5 años parece atractiva a simple vista ($120,000 \\times 5 = 600,000 > 500,000$). Sin embargo, si la tasa de costo de capital de la empresa es del 15% anual, el proyecto destruye riqueza y genera pérdidas financieras netas.

El **Valor del Dinero en el Tiempo (TVM - Time Value of Money)** y el principio de **Equivalencia Financiera** constituyen la base analítica de toda decisión de asignación de capital.

<Callout type="info">
**Tasa Nominal vs Efectiva:** La tasa nominal $r$ es una tasa de referencia anualizada simple que ignora la reinversión de intereses intra-anuales. La **Tasa Efectiva Anual (TEA)** refleja el verdadero costo o rendimiento financiero incorporando el efecto de la capitalización compuesta.
</Callout>

## Objetivos de Aprendizaje
- Dominar el concepto de equivalencia financiera temporal y diagramas de flujo de caja.
- Deducir las fórmulas fundamentales de pago único: Valor Futuro dado un Presente $(F/P, i, n)$ y Valor Presente dado un Futuro $(P/F, i, n)$.
- Convertir con precisión matemática entre tasas nominales, periódicas y efectivas anuales.
- Incorporar el efecto de la inflación mediante la Ecuación de Fisher para tasas reales.

---

# Fundamentos Teóricos

### Deducción del Interés Compuesto

Si se invierte un capital inicial $P$ a una tasa periódica $i$ durante $n$ periodos:
- Periodo 1: $F_1 = P + Pi = P(1 + i)$
- Periodo 2: $F_2 = F_1(1 + i) = P(1 + i)^2$
- Periodo $n$:
  $$F = P(1 + i)^n \\iff (F/P, i, n)$$

El factor de descuento o valor presente de una suma futura es:

$$P = F(1 + i)^{-n} = \\frac{F}{(1 + i)^n} \\iff (P/F, i, n)$$

### Conversión de Tasas de Interés

Sea $r$ la tasa nominal anual liquidable $m$ veces al año (frecuencia de capitalización):
- Tasa periódica por periodo de capitalización:
  $$i_p = \\frac{r}{m}$$
- Tasa Efectiva Anual (TEA):
  $$\\text{TEA} = (1 + i_p)^m - 1 = \\left(1 + \\frac{r}{m}\\right)^m - 1$$
- Capitalización continua ($m \\to \\infty$):
  $$\\text{TEA}_{\\text{continua}} = e^r - 1$$

### Inflación y Ecuación de Fisher

Sea $i$ la tasa de interés de mercado (nominal/corriente), $f$ la tasa de inflación y $i'$ la tasa de interés real en poder adquisitivo constante:

$$(1 + i) = (1 + i')(1 + f) \\implies i' = \\frac{i - f}{1 + f}$$

---

# Laboratorio en Python: Conversor de Tasas y Equivalencia Temporal

\`\`\`python
import numpy as np
import pandas as pd

# Módulo de Matemáticas Financieras: Conversor de Tasas
def convertir_tasas(tasa_nominal_anual, m_capitalizaciones):
    i_periodica = tasa_nominal_anual / m_capitalizaciones
    tea = (1.0 + i_periodica)**m_capitalizaciones - 1.0
    tea_continua = np.exp(tasa_nominal_anual) - 1.0
    return {
        'Nominal_Anual_%': tasa_nominal_anual * 100,
        'Periodos_Ano (m)': m_capitalizaciones,
        'Tasa_Periodica_%': i_periodica * 100,
        'TEA_%': tea * 100,
        'TEA_Continua_%': tea_continua * 100
    }

# Comparar una tasa nominal del 18% anual bajo diferentes frecuencias de capitalización:
# m=1 (Anual), m=2 (Semestral), m=4 (Trimestral), m=12 (Mensual), m=365 (Diaria)
frecuencias = [
    ('Anual', 1),
    ('Semestral', 2),
    ('Trimestral', 4),
    ('Mensual', 12),
    ('Diaria', 365)
]

tabla_tasas = [
    {'Frecuencia': nom, **convertir_tasas(0.18, m)} for nom, m in frecuencias
]

df_tasas = pd.DataFrame(tabla_tasas)

# Cálculo de Valor Presente y Futuro:
# P = $50,000 USD a una TEA del 12% durante n = 5 años
P = 50_000.0
tea_ejemplo = 0.12
n_anos = 5
F = P * (1.0 + tea_ejemplo)**n_anos

print("IMPACTO DE LA FRECUENCIA DE CAPITALIZACIÓN EN LA TEA (r = 18% nominal):")
print(df_tasas.round(3).to_string(index=False))
print(f"\\nValor Presente: USD {P:,.2f}")
print(f"Valor Futuro acumulado en {n_anos} años al 12% TEA: USD {F:,.2f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Valor del Dinero y Tasas"
  questions={[
    {
      id: "q_fin_1",
      text: "Si la tasa de interés corriente de un pagaré es del 15.5% anual y la inflación esperada del país es del 5.0% anual, ¿cuál es la tasa de interés real i' obtenida por el inversionista según la ecuación de Fisher?",
      options: [
        { id: "a", text: "10.00% anual (i' = (0.155 - 0.05) / (1 + 0.05) = 0.105 / 1.05 = 0.10)", isCorrect: true, explanation: "La ecuación exacta de Fisher es i' = (i - f) / (1 + f). Restar simplemente 15.5% - 5.0% = 10.5% es una aproximación que ignora la pérdida inflacionaria sobre los intereses mismos." },
        { id: "b", text: "10.50% anual", isCorrect: false, explanation: "10.5% es la aproximación burda que no descuenta el denominador inflacionario." },
        { id: "c", text: "20.50% anual", isCorrect: false, explanation: "La inflación deteriora el rendimiento, nunca lo amplifica." }
      ]
    },
    {
      id: "q_fin_2",
      text: "¿Qué ocurre con el Valor Presente P de un flujo futuro F cuando la tasa de interés de descuento i se incrementa?",
      options: [
        { id: "a", text: "El Valor Presente P disminuye monótonamente", isCorrect: true, explanation: "P = F / (1 + i)^n. Al aumentar el denominador (tasa de descuento), el valor actual de los flujos futuros cae." },
        { id: "b", text: "El Valor Presente P se incrementa", isCorrect: false, explanation: "A mayor tasa de descuento, menor valor presente de una promesa futura." },
        { id: "c", text: "Permanece estrictamente constante", isCorrect: false, explanation: "El valor presente es inversamente dependiente de la tasa i." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-anualidades-gradientes",
        filename: "02-anualidades-gradientes.mdx",
        content: `---
title: "Series Uniformes, Anualidades y Gradientes"
order: 2
description: "Modelado de flujos periódicos constantes (anualidades vencidas y anticipadas), gradientes aritméticos lineales y gradientes geométricos porcentuales."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es la expresión cerrada del factor de Valor Presente de una Anualidad Vencida (P/A, i, n)?"
    options:
      - "P = A * [ ( (1 + i)^n - 1 ) / ( i * (1 + i)^n ) ]"
      - "P = A * (1 + i)^n"
      - "P = A / (n * i)"
      - "P = A * [ (1 + i)^n - 1 ]"
    answer: 0
    explanation: "Sumando los n términos de la serie geométrica decreciente de flujos descontados P = sum_{t=1}^n A / (1 + i)^t se obtiene la fórmula cerrada P = A * [ (1 - (1+i)^(-n)) / i ]."
  - question: "¿Qué diferencia a un Gradiente Aritmético de un Gradiente Geométrico en finanzas de ingeniería?"
    options:
      - "El gradiente aritmético incrementa en una cantidad monetaria fija constante G en cada periodo; el geométrico varía a una tasa porcentual fija g por periodo"
      - "El aritmético es solo para préstamos hipotecarios y el geométrico para leasing de maquinaria"
      - "El aritmético no depende de la tasa de interés"
      - "No existe diferencia matemática entre ellos"
    answer: 0
    explanation: "Aritmético: A_t = A_1 + (t - 1)G (crecimiento lineal en dólares). Geométrico: A_t = A_1 * (1 + g)^(t-1) (crecimiento exponencial porcentual, como el escalamiento de contratos por inflación)."
---

# Introducción

> En la práctica ingenieril, los flujos de efectivo rara vez consisten en un único desembolso y un único cobro. La cuota de arrendamiento de una grúa telescópica es una serie uniforme periódica (**Anualidad**); los costos de mantenimiento de un compresor crecen típicamente cada año debido al desgaste mecánico (**Gradiente Aritmético**); y los ingresos por venta de energía de una planta solar escalan según la inflación proyectada (**Gradiente Geométrico**).

Las fórmulas de series uniformes y gradientes permiten transformar diagramas de flujo de caja complejos de múltiples periodos en un único valor presente ($P$) o futuro ($F$) equivalente.

<Callout type="info">
**Anualidad Vencida vs Anticipada:**
- *Vencida (Ordinaria):* Los pagos ocurren al final de cada periodo (estándar en créditos bancarios y proyectos de inversión).
- *Anticipada:* Los pagos ocurren al inicio de cada periodo (estándar en contratos de alquiler y seguros).
</Callout>

## Objetivos de Aprendizaje
- Deducir y aplicar los factores de anualidad $(P/A, i, n)$, $(A/P, i, n)$, $(F/A, i, n)$ y $(A/F, i, n)$.
- Modelar flujos con crecimiento constante lineal mediante el factor de gradiente aritmético $(P/G, i, n)$.
- Resolver flujos con crecimiento porcentual continuo mediante gradientes geométricos.
- Programar tablas de amortización de créditos bancarios industriales en Python.

---

# Fundamentos Teóricos

### Factores de Anualidad Vencida

Dada una serie de $n$ pagos uniformes iguales a $A$ ocurridos en $t = 1, 2, \\dots, n$:

$$P = A \\left[ \\frac{(1 + i)^n - 1}{i(1 + i)^n} \\right] = A \\left[ \\frac{1 - (1 + i)^{-n}}{i} \\right] \\iff (P/A, i, n)$$

La cuota periódica uniforme equivalente a un valor presente $P$ (factor de recuperación de capital):

$$A = P \\left[ \\frac{i(1 + i)^n}{(1 + i)^n - 1} \\right] \\iff (A/P, i, n)$$

El valor futuro acumulado al final del periodo $n$:

$$F = A \\left[ \\frac{(1 + i)^n - 1}{i} \\right] \\iff (F/A, i, n)$$

### Gradiente Aritmético Lineal

Flujos donde el desembolso en el año $t$ es $C_t = A_1 + (t - 1)G$:

$$P = A_1(P/A, i, n) + G(P/G, i, n)$$

Donde el factor de gradiente aritmético es:

$$(P/G, i, n) = \\frac{1}{i} \\left[ \\frac{(1 + i)^n - 1}{i(1 + i)^n} - \\frac{n}{(1 + i)^n} \\right]$$

### Gradiente Geométrico Porcentual

Flujos donde $C_t = A_1(1 + g)^{t-1}$, con tasa de crecimiento porcentual $g$:
- Si $i \\ne g$:
  $$P = \\frac{A_1}{i - g} \\left[ 1 - \\left( \\frac{1 + g}{1 + i} \\right)^n \\right]$$
- Si $i = g$:
  $$P = \\frac{n A_1}{1 + i}$$

---

# Laboratorio en Python: Tabla de Amortización y Gradientes de Mantenimiento

\`\`\`python
import numpy as np
import pandas as pd

# Caso 1: Amortización de Maquinaria Industrial
# Préstamo P = $200,000 USD, Plazo n = 5 años, Tasa i = 10% anual (cuotas vencidas)
P = 200_000.0
i = 0.10
n = 5

cuota_A = P * (i * (1 + i)**n) / ((1 + i)**n - 1)

tabla_amortizacion = []
saldo = P

for periodo in range(1, n + 1):
    interes = saldo * i
    abono_capital = cuota_A - interes
    saldo_final = saldo - abono_capital
    tabla_amortizacion.append({
        'Año': periodo,
        'Saldo_Inicial': saldo,
        'Cuota_Anual': cuota_A,
        'Interes': interes,
        'Abono_Capital': abono_capital,
        'Saldo_Final': max(0.0, saldo_final)
    })
    saldo = saldo_final

df_amort = pd.DataFrame(tabla_amortizacion)

# Caso 2: Costo de Mantenimiento con Gradiente Aritmético
# Año 1 = $5,000 USD, incrementa $1,200 USD/año durante 6 años. Tasa i = 8% anual
A1 = 5_000.0
G = 1_200.0
n_mant = 6
i_mant = 0.08

P_A = A1 * (1 - (1 + i_mant)**(-n_mant)) / i_mant
P_G = (G / i_mant) * ((1 - (1 + i_mant)**(-n_mant)) / i_mant - n_mant / (1 + i_mant)**n_mant)
VP_mantenimiento_total = P_A + P_G

print(f"TABLA DE AMORTIZACIÓN BANCARIA (Cuota Anual = USD {cuota_A:,.2f}):")
print(df_amort.round(2).to_string(index=False))
print(f"\\nValor Presente de Costos de Mantenimiento (A1=$5000, G=$1200): USD {VP_mantenimiento_total:,.2f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Anualidades y Gradientes"
  questions={[
    {
      id: "q_anual_1",
      text: "¿Por qué en una tabla de amortización con cuota fija francesa el abono a capital es menor al principio y crece con cada periodo?",
      options: [
        { id: "a", text: "Porque al inicio el saldo deudor es máximo, lo que genera mayores intereses; a medida que el saldo cae, menor porción de la cuota va a intereses y mayor porción a capital", isCorrect: true, explanation: "Interés = Saldo * i. Conforme el saldo se reduce periodo a periodo, el cargo por intereses disminuye, liberando una mayor fracción de la cuota fija para amortizar el capital principal." },
        { id: "b", text: "Porque el banco incrementa la tasa de interés arbitrariamente", isCorrect: false, explanation: "La tasa de interés pactada permanece fija en el sistema francés." },
        { id: "c", text: "Porque la cuota total aumenta cada año", isCorrect: false, explanation: "La cuota es constante (anualidad uniforme)." }
      ]
    },
    {
      id: "q_anual_2",
      text: "Si los costos anuales de energía de una caldera se proyectan en A_1 = $20,000 USD el primer año y crecerán a una tasa de inflación energética constante g = 6% anual durante 8 años con tasa i = 6% anual, ¿qué fórmula aplica para el Valor Presente?",
      options: [
        { id: "a", text: "P = (n * A_1) / (1 + i) (caso especial i = g en gradiente geométrico)", isCorrect: true, explanation: "Cuando la tasa de crecimiento g es idéntica a la tasa de descuento i, el factor (1+g)/(1+i) = 1 para todos los periodos, simplificando la suma a P = n * A_1 / (1 + i)." },
        { id: "b", text: "P = A_1 * n", isCorrect: false, explanation: "Ignora el descuento financiero del denominador (1 + i)." },
        { id: "c", text: "P = 0", isCorrect: false, explanation: "Los costos presentes son positivos y sustanciales." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "02-evaluacion-proyectos-inversion",
    metadata: {
      title: "Evaluación de Proyectos de Inversión",
      order: 2
    },
    lessons: [
      {
        slug: "01-vpn-tir-decision-financiera",
        filename: "01-vpn-tir-decision-financiera.mdx",
        content: `---
title: "Valor Presente Neto (VPN) y Tasa Interna de Retorno (TIR)"
order: 1
description: "Criterios fundamentales de rentabilidad: Formulación del VPN, cálculo de la TIR, paradoja de tasas múltiples y Tasa Interna de Retorno Modificada (TIRM)."
bloomLevel: "EVALUATE"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es el criterio formal de decisión para aceptar un proyecto de inversión independiente utilizando el Valor Presente Neto (VPN) a la tasa de descuento TMAR?"
    options:
      - "Aceptar si VPN > 0 (el proyecto rinde más que la TMAR y genera valor económico agregado neto para la empresa)"
      - "Aceptar si VPN = 0 únicamente"
      - "Rechazar si el VPN es positivo pero menor a la inversión inicial"
      - "Aceptar solo si la TIR es menor al 5%"
    answer: 0
    explanation: "Un VPN > 0 garantiza que los flujos futuros descontados superan la inversión inicial a la tasa mínima aceptable de rendimiento (TMAR / WACC), incrementando la riqueza neta de los inversionistas."
  - question: "¿Bajo qué condición matemática puede un proyecto de inversión presentar múltiples Tasas Internas de Retorno (TIR múltiples)?"
    options:
      - "Cuando el flujo de caja neto presenta más de un cambio de signo en el tiempo (flujo de fondos no convencional, según la regla de signos de Descartes)"
      - "Cuando la inversión inicial es mayor a 1 millón de dólares"
      - "Cuando todos los flujos anuales son exactamente idénticos"
      - "Cuando la tasa de descuento es cero"
    answer: 0
    explanation: "La TIR es la raíz de un polinomio de grado n. Si los flujos cambian de signo varias veces (ej. desembolso inicial negativo, beneficios positivos y posterior costo de desmantelamiento negativo), la regla de signos de Descartes permite la existencia de múltiples raíces reales positivas."
---

# Introducción

> En una corporación industrial, la gerencia de proyectos recibe cada año decenas de propuestas de inversión: modernizar la línea de envasado, adquirir una flota propia de tractocamiones, o construir un parque fotovoltaico en el techo de la planta. Dado que el capital financiero es escaso, ¿cómo clasificamos y seleccionamos objetivamente los proyectos que maximizan el valor de la empresa?

Los dos criterios cuantitativos más utilizados en las finanzas corporativas mundiales son el **Valor Presente Neto (VPN / Net Present Value)** y la **Tasa Interna de Retorno (TIR / Internal Rate of Return)**.

<Callout type="warning">
**La Trampa de la TIR:** Para proyectos mutuamente excluyentes con diferente escala de inversión o distinta vida útil, la TIR puede contradecir al VPN y llevar a decisiones erróneas. En caso de discrepancia, **el criterio del VPN siempre prevalece**.
</Callout>

## Objetivos de Aprendizaje
- Formular matemáticamente la función de Valor Presente Neto $VPN(i)$.
- Deducir y calcular la Tasa Interna de Retorno (TIR) mediante métodos numéricos iterativos (Newton-Raphson).
- Identificar las inconsistencias de la TIR: supuesto de reinversión irreal y tasas múltiples en flujos no convencionales.
- Aplicar la Tasa Interna de Retorno Modificada (TIRM) y construir perfiles de VPN en Python.

---

# Fundamentos Teóricos

### Valor Presente Neto (VPN)

Sea $I_0$ la inversión inicial requerida en $t = 0$, $F_t$ el flujo de caja neto del periodo $t$, y $k$ la Tasa Mínima Aceptable de Rendimiento (TMAR / costo de capital WACC):

$$VPN(k) = -I_0 + \\sum_{t=1}^n \\frac{F_t}{(1 + k)^t}$$

**Regla de Decisión:**
- $VPN > 0$: El proyecto es rentable y crea valor. **Aceptar.**
- $VPN = 0$: El proyecto rinde exactamente la TMAR. Indiferente.
- $VPN < 0$: El proyecto rinde menos que la TMAR y destruye capital. **Rechazar.**

### Tasa Interna de Retorno (TIR)

Es la tasa de descuento intrínseca $i^*$ que anula exactamente el VPN:

$$VPN(TIR) = -I_0 + \\sum_{t=1}^n \\frac{F_t}{(1 + TIR)^t} = 0$$

**Regla de Decisión (para proyectos de inversión estándar):**
- Si $TIR > k$ (TMAR): Aceptar.
- Si $TIR < k$ (TMAR): Rechazar.

### Tasa Interna de Retorno Modificada (TIRM)

Resuelve la debilidad teórica de la TIR (que asume reinversión de flujos a la misma TIR). La TIRM descuenta los egresos a la tasa de financiamiento $f$ y capitaliza los ingresos a la tasa de reinversión $k$:

$$TIRM = \\left( \\frac{VF(\\text{Flujos Positivos al costo } k)}{VP(\\text{Flujos Negativos al costo } f)} \\right)^{1/n} - 1$$

---

# Laboratorio en Python: Evaluación Financiera y Perfil de VPN

\`\`\`python
import numpy as np
import pandas as pd
from scipy.optimize import root_scalar

# Comparación de dos proyectos de inversión mutuamente excluyentes:
# Proyecto A (Línea de Ensamble Automatizada): Alta inversión inicial, flujos estables
# Proyecto B (Externalización con Maquinaria Semi-manual): Menor inversión inicial
inversion_A = 100_000.0
flujos_A = [35_000.0, 35_000.0, 35_000.0, 35_000.0]

inversion_B = 40_000.0
flujos_B = [16_000.0, 16_000.0, 16_000.0, 16_000.0]

tmar = 0.12  # 12% Tasa Mínima Aceptable de Rendimiento

def calcular_vpn(inversion, flujos, tasa):
    descuentos = [f / (1.0 + tasa)**t for t, f in enumerate(flujos, 1)]
    return -inversion + sum(descuentos)

def calcular_tir(inversion, flujos):
    def ecuacion(tasa):
        return calcular_vpn(inversion, flujos, tasa)
    sol = root_scalar(ecuacion, bracket=[-0.5, 2.0], method='brentq')
    return sol.root

vpn_A = calcular_vpn(inversion_A, flujos_A, tmar)
tir_A = calcular_tir(inversion_A, flujos_A)

vpn_B = calcular_vpn(inversion_B, flujos_B, tmar)
tir_B = calcular_tir(inversion_B, flujos_B)

df_comp = pd.DataFrame([
    {'Proyecto': 'A (Automatización)', 'Inversión': inversion_A, 'VPN (TMAR=12%)': vpn_A, 'TIR_%': tir_A * 100},
    {'Proyecto': 'B (Semi-manual)', 'Inversión': inversion_B, 'VPN (TMAR=12%)': vpn_B, 'TIR_%': tir_B * 100}
])

print("EVALUACIÓN FINANCIERA DE PROYECTOS:")
print(df_comp.round(2).to_string(index=False))

print(f"\\nObservación Crítica:")
print(f"La TIR favorece al Proyecto B ({tir_B*100:.1f}% vs {tir_A*100:.1f}%), pero el VPN demuestra")
print(f"que el Proyecto A crea más valor absoluto en dólares (USD {vpn_A:,.2f} vs USD {vpn_B:,.2f}).")
print(f"-> DECISIÓN FINANCIERA RACIONAL: Aceptar Proyecto A.")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: VPN y TIR"
  questions={[
    {
      id: "q_eval_1",
      text: "Si dos proyectos mutuamente excluyentes presentan conflicto de clasificación (el Proyecto A tiene mayor VPN pero el Proyecto B tiene mayor TIR), ¿cuál es el proyecto que debe seleccionarse?",
      options: [
        { id: "a", text: "El Proyecto A con mayor VPN, porque maximiza la riqueza neta monetaria absoluta de la empresa", isCorrect: true, explanation: "El objetivo de la corporación es maximizar el valor absoluto agregado para los accionistas (riqueza en dólares), el cual mide fielmente el VPN. La TIR solo mide eficiencia porcentual sin considerar la escala de la inversión." },
        { id: "b", text: "El Proyecto B con mayor TIR", isCorrect: false, explanation: "Preferir una TIR más alta sobre un proyecto de menor escala puede destruir valor absoluto de capital." },
        { id: "c", text: "Cualquiera de los dos indistintamente", isCorrect: false, explanation: "Uno de ellos aporta mayor beneficio neto descontado." }
      ]
    },
    {
      id: "q_eval_2",
      text: "¿Cuál es el supuesto implícito de reinversión de flujos intermedios que hace que la TIR ordinaria sea cuestionada frente al VPN?",
      options: [
        { id: "a", text: "La TIR asume falsamente que todos los flujos de fondos intermedios se reinvierten a la misma tasa de la TIR (que puede ser irrealmente alta)", isCorrect: true, explanation: "Si un proyecto tiene TIR = 85%, asume que la empresa puede reinvertir los cobros al 85%, lo cual es irreal. El VPN asume reinversión al costo de capital de la empresa (TMAR), un supuesto mucho más realista." },
        { id: "b", text: "Que no se pagan impuestos sobre los flujos", isCorrect: false, explanation: "El tema impositivo se incorpora en el flujo de caja libre, no en la mecánica de la fórmula de la TIR." },
        { id: "c", text: "Que los flujos son todos negativos", isCorrect: false, explanation: "Para calcular la TIR se requieren flujos tanto positivos como negativos." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-relacion-bc-caue-analisis-reemplazo",
        filename: "02-relacion-bc-caue-analisis-reemplazo.mdx",
        content: `---
title: "Relación Beneficio/Costo (B/C) y Costo Anual Uniforme Equivalente (CAUE)"
order: 2
description: "Evaluación de alternativas de servicio sin ingresos con CAUE, relación Beneficio/Costo para obras públicas y análisis de reposición de activos de capital."
bloomLevel: "EVALUATE"
estimatedMinutes: 50
quiz:
  - question: "¿Por qué el criterio del Costo Anual Uniforme Equivalente (CAUE / EUAC) es la herramienta predilecta para comparar alternativas tecnológicas de ingeniería que solo generan costos?"
    options:
      - "Permite comparar de forma directa alternativas de servicio idéntico que poseen vidas útiles diferentes sin necesidad de forzar un horizonte temporal común gigantesco"
      - "Elimina la tasa de interés de los cálculos"
      - "Solo es válido si los costos son constantes"
      - "Garantiza que el valor de salvamento sea cero"
    answer: 0
    explanation: "El CAUE anualiza los costos de capital y operativos a lo largo de la vida útil de cada equipo, permitiendo comparar válidamente máquinas de 4 años de vida vs máquinas de 7 años bajo el supuesto de repetibilidad idéntica."
  - question: "¿Cuál es la regla de decisión en la evaluación de proyectos públicos de infraestructura mediante la Relación Beneficio/Costo (B/C)?"
    options:
      - "Aceptar si la relación B/C es mayor a 1.0 (el valor presente de beneficios sociales supera al valor presente de los costos de inversión y mantenimiento)"
      - "Aceptar si B/C = 0"
      - "Rechazar si los beneficios superan a los costos"
      - "Aceptar solo si el costo es cero"
    answer: 0
    explanation: "Una relación B/C > 1.0 indica que por cada peso o dólar invertido por la comunidad en la obra pública, se generan más de un dólar en beneficios sociales netos descontados."
---

# Introducción

> En el sector productivo y en la gestión de infraestructura pública, muchas decisiones no involucran ingresos directos de ventas: comprar una caldera de gas natural vs una eléctrica, sustituir un camión de recolección de residuos o reemplazar un torno desgastado por uno nuevo.

Para estos casos, la ingeniería económica desarrolló el **Costo Anual Uniforme Equivalente (CAUE / EUAC)**, la **Relación Beneficio/Costo ($B/C$)** y los modelos de **Vida Económica de Reemplazo**.

<Callout type="info">
**Vida Económica de un Activo:** Es el número de años $n^*$ en que el CAUE total del activo es estrictamente mínimo. Mantener un activo más allá de su vida económica incrementa el costo anual de la empresa debido al crecimiento exponencial de los gastos de mantenimiento y paradas imprevistas.
</Callout>

## Objetivos de Aprendizaje
- Comparar alternativas de servicio con vidas útiles desiguales utilizando el método del CAUE.
- Incorporar el Valor de Salvamento ($VS$) mediante el método del fondo de amortización de salvamento.
- Aplicar el análisis incremental $\\Delta B / \\Delta C$ para selección de proyectos públicos.
- Calcular la vida económica óptima de un activo y diseñar políticas de reemplazo con Python.

---

# Fundamentos Teóricos

### Métodos de Cálculo del CAUE

Sea $P$ la inversión inicial del equipo, $VS$ su valor de rescate o salvamento al final del año $n$, y $COA$ los costos de operación anuales.

#### Método del Fondo de Amortización de Salvamento

$$\\text{CAUE} = P(A/P, i, n) - VS(A/F, i, n) + COA$$

Reordenando mediante la identidad $(A/F, i, n) = (A/P, i, n) - i$:

$$\\text{CAUE} = (P - VS)(A/P, i, n) + VS \\cdot i + COA$$

El término $(P - VS)(A/P, i, n)$ es la amortización anualizada del capital depreciable, y $VS \\cdot i$ es el costo de oportunidad del capital retenido en el activo.

### Relación Beneficio/Costo ($B/C$)

Para proyectos del sector público:

$$\\frac{B}{C} = \\frac{VP(\\text{Beneficios para la sociedad})}{VP(\\text{Costos de inversión y operación del Estado})}$$

$$\\frac{B}{C} > 1.0 \\implies \\text{Proyecto Socialmente Deseable}$$

---

# Laboratorio en Python: CAUE de Alternativas y Vida Económica de Reemplazo

\`\`\`python
import numpy as np
import pandas as pd

# Comparación CAUE de dos montacargas industriales (Tasa TMAR = 10% anual)
# Alternativa 1 (Eléctrico): Inversión alta, larga vida útil, bajo costo operativo
# Alternativa 2 (Combustión Diésel): Inversión moderada, vida útil más corta, mayor costo combustible
i = 0.10

def calcular_caue(P, VS, n, COA_anual):
    factor_AP = (i * (1 + i)**n) / ((1 + i)**n - 1)
    factor_AF = i / ((1 + i)**n - 1)
    caue_capital = P * factor_AP - VS * factor_AF
    return caue_capital + COA_anual

caue_electrico = calcular_caue(P=65_000, VS=12_000, n=8, COA_anual=6_000)
caue_diesel = calcular_caue(P=40_000, VS=8_000, n=5, COA_anual=11_500)

df_caue = pd.DataFrame([
    {'Tecnología': 'Montacargas Eléctrico', 'Inversión': 65_000, 'Vida_Años': 8, 'COA': 6_000, 'CAUE_Anual': caue_electrico},
    {'Tecnología': 'Montacargas Diésel', 'Inversión': 40_000, 'Vida_Años': 5, 'COA': 11_500, 'CAUE_Anual': caue_diesel}
])

# Análisis de Vida Económica de Reemplazo para un Activo Existente:
# Inversión P = $30,000, Valor de Salvamento cae, Mantenimiento sube año a año
valores_salvamento = [18000, 12000, 8000, 5000, 3000, 1500]
costos_mant_ano = [2500, 3800, 5500, 7800, 11000, 15000]
P_inicial = 30_000.0

vida_economica = []
for k in range(1, 7):
    # Valor Presente de Mantenimiento hasta el año k
    vp_mant = sum(costos_mant_ano[t-1] / (1 + i)**t for t in range(1, k + 1))
    factor_AP_k = (i * (1 + i)**k) / ((1 + i)**k - 1)
    factor_AF_k = i / ((1 + i)**k - 1)
    
    caue_k = P_inicial * factor_AP_k - valores_salvamento[k-1] * factor_AF_k + vp_mant * factor_AP_k
    vida_economica.append({'Año_Retiro (k)': k, 'CAUE_Total': caue_k})

df_vida = pd.DataFrame(vida_economica)
k_optimo = df_vida.loc[df_vida['CAUE_Total'].idxmin(), 'Año_Retiro (k)']

print("COMPARACIÓN DE ALTERNATIVAS POR CAUE:")
print(df_caue.round(2).to_string(index=False))
print(f"\\n--> ELECCIÓN ÓPTIMA: {df_caue.loc[df_caue['CAUE_Anual'].idxmin(), 'Tecnología']} (Menor costo anual uniforme)")

print("\\nANÁLISIS DE VIDA ECONÓMICA DE REEMPLAZO:")
print(df_vida.round(2).to_string(index=False))
print(f"\\n--> VIDA ECONÓMICA ÓPTIMA DE REEMPLAZO: Año {int(k_optimo)} (CAUE Mínimo = USD {df_vida['CAUE_Total'].min():,.2f})")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: CAUE y Análisis de Reemplazo"
  questions={[
    {
      id: "q_caue_1",
      text: "Si la Máquina A tiene una vida útil de 3 años y la Máquina B tiene una vida de 5 años, ¿por qué es válido compararlas mediante el CAUE?",
      options: [
        { id: "a", text: "Porque el CAUE asume que cada máquina se reemplazará por una réplica idéntica de costos y rendimientos equivalentes al término de su ciclo de vida", isCorrect: true, explanation: "El supuesto de repetibilidad permite comparar costos anualizados sin necesidad de forzar un horizonte común artificial del mínimo común múltiplo (15 años)." },
        { id: "b", text: "Porque el CAUE transforma los años en meses", isCorrect: false, explanation: "El CAUE opera en unidades de tiempo homogéneas (típicamente años)." },
        { id: "c", text: "Solo es válido si la tasa de interés es negativa", isCorrect: false, explanation: "La tasa de interés es una tasa positiva estándar de costo de capital." }
      ]
    },
    {
      id: "q_caue_2",
      text: "¿Qué define a la 'Vida Económica' de un activo frente a su 'Vida Física' o 'Vida Contable'?",
      options: [
        { id: "a", text: "La vida económica es el periodo de posesión en el cual el costo anual uniforme equivalente (CAUE) global se minimiza", isCorrect: true, explanation: "Un equipo puede seguir funcionando físicamente durante 20 años, pero su vida económica puede ser de 5 años si a partir de entonces los costos crecientes de reparación superan la depreciación de una máquina nueva." },
        { id: "b", text: "El número de años fijado por el código tributario para depreciación", isCorrect: false, explanation: "Esa es la vida fiscal o contable, que suele ser una convención legal sin base en costos reales." },
        { id: "c", text: "El tiempo hasta que el chasis de la máquina se rompe", isCorrect: false, explanation: "Esa es la vida física o vida útil destructiva del activo." }
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
  console.log("✅ Curso ingenieria-economica-finanzas generado con éxito!");
}

build();
