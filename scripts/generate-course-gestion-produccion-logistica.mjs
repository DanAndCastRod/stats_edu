import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'content', 'courses', 'gestion-produccion-logistica');

const courseMetadata = {
  title: "Gestión de la Producción y Logística",
  slug: "gestion-produccion-logistica",
  code: "II723",
  description: "Modelado cuantitativo de pronósticos de demanda estocástica, planificación agregada, control óptimo de inventarios deterministicos y probabilísticos, y diseño de redes de cadena de suministro.",
  credits: 3,
  ects: 6,
  semester: 7,
  isMock: false
};

const modules = [
  {
    slug: "01-pronosticos-demanda",
    metadata: {
      title: "Pronósticos Cuantitativos de Demanda",
      order: 1
    },
    lessons: [
      {
        slug: "01-series-tiempo-suavizamiento",
        filename: "01-series-tiempo-suavizamiento.mdx",
        content: `---
title: "Series de Tiempo y Suavizamiento Exponencial Simple"
order: 1
description: "Componentes de demanda (tendencia, estacionalidad, aleatoriedad), promedio móvil y Suavizamiento Exponencial Simple (SES) con constante alfa."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Qué efecto produce seleccionar una constante de suavizamiento alfa cercana a 1.0 en el modelo de Suavizamiento Exponencial Simple (SES)?"
    options:
      - "El pronóstico reacciona de forma inmediata y agresiva a las fluctuaciones recientes de la demanda real, otorgando poco peso al historial antiguo"
      - "El pronóstico se convierte en una línea horizontal perfectamente plana"
      - "Elimina por completo la necesidad de medir errores de pronóstico"
      - "Invalida la ecuación de actualización"
    answer: 0
    explanation: "En la ecuación F_{t+1} = alfa * Y_t + (1 - alfa) * F_t, si alfa tiende a 1, F_{t+1} aprox Y_t (modelo ingenuo o reactivo). Un alfa pequeño (ej. 0.1) produce un pronóstico muy estable que filtra el ruido aleatorio."
  - question: "¿Cuáles son los cuatro componentes clásicos en los que se descompone una serie temporal de demanda industrial?"
    options:
      - "Tendencia secular (T), Estacionalidad (S), Ciclicidad (C) y Variación Aleatoria o Ruido (I)"
      - "Compras, Producción, Almacén y Ventas"
      - "Media, Mediana, Moda y Varianza"
      - "Costos Fijos, Costos Variables, Impuestos y Utilidad"
    answer: 0
    explanation: "El modelo clásico de descomposición desagrega la serie en Tendencia de largo plazo, patrones Estacionales periódicos fijos, Ciclos económicos macro y perturbaciones Irregulares/aleatorias."
---

# Introducción

> Toda la cadena de suministro se mueve impulsada por una estimación del futuro. Desde la compra de bobinas de acero con 3 meses de anticipación hasta la contratación de personal temporal para la temporada navideña, los errores en los pronósticos generan dos catástrofes simétricas: quiebres de inventario que pierden clientes o exceso de stock que pudre el capital de trabajo de la fábrica.

El **Pronóstico de Demanda** no busca adivinar con una bola de cristal, sino aplicar modelos matemáticos rigurosos para filtrar el ruido aleatorio y proyectar la señal genuina de las series de tiempo.

<Callout type="info">
**Primera Ley del Pronóstico:** Los pronósticos siempre están equivocados; el objetivo de la ingeniería industrial no es la perfección absoluta imposible, sino **minimizar la varianza del error y garantizar la ausencia de sesgo sistemático (Tracking Signal cercano a cero)**.
</Callout>

## Objetivos de Aprendizaje
- Descomponer una serie de demanda en sus cuatro componentes estructurales.
- Implementar el modelo de Promedios Móviles Simples (SMA) y Ponderados (WMA).
- Deducir y aplicar el Suavizamiento Exponencial Simple (SES): $F_{t+1} = \\alpha Y_t + (1 - \\alpha) F_t$.
- Optimizar el hiperparámetro de atenuación $\\alpha$ mediante minimización del MSE en Python.

---

# Fundamentos Teóricos

### Promedio Móvil Simple ($SMA_k$)

Para una ventana de tamaño $k$:

$$F_{t+1} = \\frac{1}{k} \\sum_{i=0}^{k-1} Y_{t - i}$$

### Suavizamiento Exponencial Simple (SES)

Cuando la serie no presenta tendencia pronunciada ni estacionalidad marcada:

$$F_{t+1} = \\alpha Y_t + (1 - \\alpha) F_t = F_t + \\alpha (Y_t - F_t)$$

Donde:
- $Y_t$: Demanda real observada en el periodo $t$.
- $F_t$: Pronóstico que se había realizado para el periodo $t$.
- $(Y_t - F_t) = e_t$: Error de pronóstico del periodo actual.
- $\\alpha \\in (0, 1)$: Constante de suavizamiento exponencial.

Expandiendo recursivamente la ecuación:

$$F_{t+1} = \\alpha \\sum_{j=0}^{t-1} (1 - \\alpha)^j Y_{t-j} + (1 - \\alpha)^t F_1$$

Los pesos asignados a las demandas pasadas decrecen geométricamente a una tasa $(1 - \\alpha)^j$.

---

# Laboratorio en Python: Ajuste y Optimización de SES

\`\`\`python
import numpy as np
import pandas as pd
from scipy.optimize import minimize_scalar

# Demanda mensual real de motores eléctricos durante 12 meses
meses = range(1, 13)
demanda_real = np.array([210, 225, 218, 235, 240, 230, 245, 252, 248, 260, 255, 268])

def simular_ses(alfa, datos):
    n = len(datos)
    F = np.zeros(n)
    F[0] = datos[0]  # Inicialización con el primer dato real
    for t in range(1, n):
        F[t] = alfa * datos[t - 1] + (1.0 - alfa) * F[t - 1]
    errores = datos[1:] - F[1:]
    mse = np.mean(errores**2)
    mad = np.mean(np.abs(errores))
    return F, mse, mad

# Optimización matemática de alfa para minimizar el Error Cuadrático Medio (MSE)
def objetivo_mse(alfa):
    _, mse, _ = simular_ses(alfa, demanda_real)
    return mse

res_opt = minimize_scalar(objetivo_mse, bounds=(0.01, 0.99), method='bounded')
alfa_optimo = res_opt.x

F_opt, mse_opt, mad_opt = simular_ses(alfa_optimo, demanda_real)
F_reactivo, mse_reac, _ = simular_ses(0.80, demanda_real)
F_suave, mse_suav, _ = simular_ses(0.20, demanda_real)

df_pronostico = pd.DataFrame({
    'Mes': meses,
    'Demanda_Real': demanda_real,
    'Pronostico_Alfa_Opt': F_opt,
    'Pronostico_Alfa_0.20': F_suave,
    'Pronostico_Alfa_0.80': F_reactivo
})

# Pronóstico para el próximo periodo t = 13
pronostico_mes_13 = alfa_optimo * demanda_real[-1] + (1.0 - alfa_optimo) * F_opt[-1]

print("COMPARATIVA DE PRONÓSTICOS DE DEMANDA:")
print(df_pronostico.round(1).to_string(index=False))
print(f"\\n--> ALFA ÓPTIMO ENCONTRADO: alfa = {alfa_optimo:.4f}")
print(f"--> MSE Mínimo: {mse_opt:.2f} | Desviación Absoluta Media (MAD): {mad_opt:.2f} unidades")
print(f"--> PRONÓSTICO PARA EL MES 13: {pronostico_mes_13:.1f} motores")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Series de Tiempo y Suavizamiento Simple"
  questions={[
    {
      id: "q_ses_1",
      text: "Si el pronóstico para el mes de mayo fue F_mayo = 120 unidades, la demanda real resultó ser Y_mayo = 150 unidades y la constante es alfa = 0.30, ¿cuál es el pronóstico para junio F_junio?",
      options: [
        { id: "a", text: "129 unidades (F_junio = 0.30 * 150 + 0.70 * 120 = 45 + 84 = 129)", isCorrect: true, explanation: "F_{t+1} = alfa * Y_t + (1 - alfa) * F_t = 0.30(150) + 0.70(120) = 45 + 84 = 129 unidades." },
        { id: "b", text: "150 unidades", isCorrect: false, explanation: "150 sería si alfa fuera 1.0." },
        { id: "c", text: "135 unidades", isCorrect: false, explanation: "135 sería el promedio simple aritmético (alfa = 0.50)." }
      ]
    },
    {
      id: "q_ses_2",
      text: "¿Por qué el Suavizamiento Exponencial Simple (SES) NO debe utilizarse cuando la demanda presenta una tendencia alcista constante y clara?",
      options: [
        { id: "a", text: "Porque el SES siempre sufrirá un rezago sistemático (lag), pronosticando sistemáticamente por debajo de la demanda real", isCorrect: true, explanation: "El SES asume una media plana local. Ante una tendencia creciente, F_t siempre irá por detrás de Y_t, acumulando un sesgo de error positivo continuo (requiere el modelo de Holt)." },
        { id: "b", text: "Porque el algoritmo de optimización diverge a infinito", isCorrect: false, explanation: "El algoritmo numérico no diverge; el defecto es estructural del modelo matemático." },
        { id: "c", text: "Porque alfa no puede ser mayor a 0", isCorrect: false, explanation: "alfa está en el intervalo (0, 1)." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-modelo-holt-winters-metricas-error",
        filename: "02-modelo-holt-winters-metricas-error.mdx",
        content: `---
title: "Modelo Holt-Winters y Métricas de Error (MAD, MSE, MAPE)"
order: 2
description: "Suavizamiento de Holt para tendencia lineal, modelo Holt-Winters para estacionalidad multiplicativa, métricas de error y Tracking Signal."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué ecuaciones componen el modelo de Suavizamiento Exponencial Doble de Holt para series con tendencia?"
    options:
      - "Una ecuación para el nivel base L_t (con parámetro alfa) y una ecuación para la pendiente de tendencia T_t (con parámetro beta)"
      - "Dos ecuaciones idénticas para duplicar el valor de la demanda"
      - "Una ecuación cuadrática y una función trigonométrica seno"
      - "Una regresión lineal simple ordinaria"
    answer: 0
    explanation: "El método de Holt desacopla la estimación del nivel base L_t = alfa * Y_t + (1 - alfa)(L_{t-1} + T_{t-1}) y de la tasa de cambio o tendencia T_t = beta(L_t - L_{t-1}) + (1 - beta) T_{t-1}."
  - question: "¿Qué alerta emite una Señal de Rastreo (Tracking Signal / TS) que supera el umbral de +4.0 o -4.0?"
    options:
      - "Alerta que el modelo de pronóstico tiene un sesgo sistemático (subestima o sobreestima continuamente la demanda real) y debe ser recalibrado"
      - "Que el pronóstico tiene un 100% de precisión perfecta"
      - "Que la demanda se ha vuelto constante"
      - "Que el inventario de seguridad es cero"
    answer: 0
    explanation: "El Tracking Signal TS = RSFE / MAD mide la suma acumulada de errores de pronóstico dividida por la MAD. Valores |TS| > 4 evidencian que el error no es aleatorio de media cero, sino un sesgo persistente."
---

# Introducción

> La demanda de cervezas o helados no solo tiene una tendencia de crecimiento anual por expansión demográfica, sino picos estacionales masivos en verano y valles en invierno. Un modelo de promedio simple o SES colapsaría estrepitosamente en este entorno.

Charles Holt y Peter Winters desarrollaron la familia de **Suavizamiento Exponencial Triple (Holt-Winters)**, capaz de rastrear simultáneamente el nivel del proceso, la pendiente de la tendencia y los factores estacionales periódicos.

<Callout type="info">
**Modelos Aditivos vs Multiplicativos:**
- *Aditivo:* La amplitud de las oscilaciones estacionales es constante en el tiempo ($Y_t = L_t + S_{t-s}$).
- *Multiplicativo:* La amplitud estacional crece proporcionalmente con el nivel de la serie ($Y_t = (L_t + T_t \\cdot m) \\cdot S_{t-s+m}$), siendo el más frecuente en la industria.
</Callout>

## Objetivos de Aprendizaje
- Formular el modelo de Holt para series temporales con tendencia lineal.
- Aplicar el modelo Holt-Winters multiplicativo con parámetros $\\alpha, \\beta, \\gamma$.
- Calcular e interpretar las métricas clásicas de error: MAD, MSE, RMSE, MAPE.
- Monitorear la estabilidad del pronóstico mediante la Señal de Rastreo (*Tracking Signal*).

---

# Fundamentos Teóricos

### Métricas de Precisión de Pronóstico

Sea $e_t = Y_t - F_t$ el error en el periodo $t$ para $n$ periodos evaluados:
1. **Desviación Absoluta Media (MAD):**
   $$\\text{MAD} = \\frac{1}{n} \\sum_{t=1}^n |e_t|$$
2. **Error Cuadrático Medio (MSE) y RMSE:**
   $$\\text{MSE} = \\frac{1}{n} \\sum_{t=1}^n e_t^2, \\quad \\text{RMSE} = \\sqrt{\\text{MSE}}$$
3. **Error Porcentual Absoluto Medio (MAPE):**
   $$\\text{MAPE} = \\frac{1}{n} \\sum_{t=1}^n \\left| \\frac{Y_t - F_t}{Y_t} \\right| \\times 100\\%$$
4. **Señal de Rastreo (Tracking Signal):**
   $$\\text{TS}_t = \\frac{\\sum_{i=1}^t e_i}{\\text{MAD}_t} = \\frac{\\text{RSFE}_t}{\\text{MAD}_t}$$
   Límites de control recomendados: $-4 \\le \\text{TS}_t \\le +4$.

### Modelo de Holt (Tendencia Lineal)

- **Actualización del Nivel ($L_t$):**
  $$L_t = \\alpha Y_t + (1 - \\alpha)(L_{t-1} + T_{t-1})$$
- **Actualización de la Tendencia ($T_t$):**
  $$T_t = \\beta (L_t - L_{t-1}) + (1 - \\beta) T_{t-1}$$
- **Pronóstico a $p$ periodos futuros:**
  $$\\hat{Y}_{t+p} = L_t + p \\cdot T_t$$

---

# Laboratorio en Python: Modelo de Holt y Auditoría de Errores

\`\`\`python
import numpy as np
import pandas as pd

# Serie de demanda con tendencia lineal (10 meses)
demanda = np.array([100, 115, 128, 140, 155, 168, 185, 198, 215, 230])
n = len(demanda)

# Parámetros del modelo de Holt
alfa = 0.40
beta = 0.30

# Inicialización
L = np.zeros(n)
T = np.zeros(n)
F = np.zeros(n)

L[0] = demanda[0]
T[0] = demanda[1] - demanda[0]
F[0] = np.nan

for t in range(1, n):
    F[t] = L[t - 1] + T[t - 1]
    L[t] = alfa * demanda[t] + (1.0 - alfa) * (L[t - 1] + T[t - 1])
    T[t] = beta * (L[t] - L[t - 1]) + (1.0 - beta) * T[t - 1]

# Cálculo de Métricas de Error
errores = demanda[1:] - F[1:]
mad = np.mean(np.abs(errores))
mse = np.mean(errores**2)
rmse = np.sqrt(mse)
mape = np.mean(np.abs(errores / demanda[1:])) * 100.0

# Tracking Signal acumulado
rsfe = np.cumsum(errores)
mads_acum = [np.mean(np.abs(errores[:i+1])) for i in range(len(errores))]
tracking_signal = rsfe / mads_acum

df_holt = pd.DataFrame({
    'Mes': range(1, n + 1),
    'Demanda': demanda,
    'Nivel_L': L,
    'Tendencia_T': T,
    'Pronostico_F': F
})

# Proyección para meses 11 y 12
F_11 = L[-1] + 1 * T[-1]
F_12 = L[-1] + 2 * T[-1]

print("MODELO DE HOLT CON TENDENCIA LINEAL:")
print(df_holt.round(1).to_string(index=False))
print(f"\\nEVALUACIÓN DE EXACTITUD:")
print(f"MAD: {mad:.2f} unidades | RMSE: {rmse:.2f} | MAPE: {mape:.2f}%")
print(f"Tracking Signal final: {tracking_signal[-1]:.2f} (Dentro de límites [-4, 4])")
print(f"\\nProyecciones Futuras: Mes 11 = {F_11:.1f} | Mes 12 = {F_12:.1f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Holt-Winters y Métricas de Error"
  questions={[
    {
      id: "q_hw_1",
      text: "¿Por qué el MAPE (Error Porcentual Absoluto Medio) es el indicador preferido por la alta gerencia para comparar líneas de producto dispares?",
      options: [
        { id: "a", text: "Porque es una métrica relativa adimensional expresada en porcentaje, permitiendo comparar productos caros y masivos en igualdad de condiciones", isCorrect: true, explanation: "Un error de 10 unidades en turbinas millonarias es un éxito total, mientras que en botellas plásticas es un desastre. El MAPE normaliza el error respecto a la escala real de cada producto." },
        { id: "b", text: "Porque siempre es igual a cero", isCorrect: false, explanation: "El MAPE refleja la magnitud real del error porcentual." },
        { id: "c", text: "Porque no requiere datos de demanda pasada", isCorrect: false, explanation: "Requiere comparar la demanda observada con la pronosticada." }
      ]
    },
    {
      id: "q_hw_2",
      text: "Si el Tracking Signal TS de un producto asciende a +5.2 durante 3 meses continuos, ¿qué diagnóstico debe formular el planificador de producción?",
      options: [
        { id: "a", text: "Existe un sesgo positivo severo: la demanda real supera sistemáticamente al pronóstico, lo que provocará quiebres de inventario si no se ajusta el nivel base al alza", isCorrect: true, explanation: "Un TS positivo elevado significa que los errores positivos (demanda > pronóstico) se están acumulando sin ser compensados, señal inequívoca de subestimación crónica." },
        { id: "b", text: "El almacén tiene exceso masivo de inventario", isCorrect: false, explanation: "La subestimación genera desabastecimiento, no exceso de inventario." },
        { id: "c", text: "El modelo está en perfecto equilibrio", isCorrect: false, explanation: "Valores fuera del rango [-4, 4] alertan descalibración crítica." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "02-control-inventarios-cadena-suministro",
    metadata: {
      title: "Gestión de Inventarios y Cadena de Suministro",
      order: 2
    },
    lessons: [
      {
        slug: "01-modelo-lote-economico-eoq",
        filename: "01-modelo-lote-economico-eoq.mdx",
        content: `---
title: "Modelo de Lote Económico de Pedido (EOQ) y Extensiones"
order: 1
description: "Deducción matemática del EOQ clásico de Ford Whitman Harris, costo total anual, sensibilidad de la curva y extensiones con descuentos por volumen."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es la expresión cerrada para el tamaño de lote óptimo en el modelo clásico EOQ (Economic Order Quantity)?"
    options:
      - "Q* = sqrt( (2 * D * S) / H )"
      - "Q* = (D * S) / (2 * H)"
      - "Q* = sqrt( (D * H) / (2 * S) )"
      - "Q* = 2 * D * S * H"
    answer: 0
    explanation: "Derivando la función de costo total anual TC(Q) = (D/Q)*S + (Q/2)*H con respecto a Q e igualando a cero: -D*S / Q^2 + H/2 = 0, se despeja Q* = sqrt(2*D*S / H)."
  - question: "En el punto óptimo EOQ, ¿qué relación geométrica fundamental se cumple entre los costos anuales de ordenar y los costos anuales de mantener inventario?"
    options:
      - "El costo anual de ordenar es exactamente igual al costo anual de mantener inventario (las dos curvas se intersecan en el mínimo)"
      - "El costo de mantener inventario es el doble del costo de ordenar"
      - "El costo de ordenar es cero"
      - "Ambos costos alcanzan su valor máximo"
    answer: 0
    explanation: "En Q*, (D/Q*)*S = (Q*/2)*H. El trade-off entre costos de pedido y de almacenamiento se equilibra perfectamente en el punto de costo total mínimo."
---

# Introducción

> El inventario es un arma de doble filo: insuficiente inventario paraliza la planta por falta de materias primas o deja a los clientes sin producto terminado; excesivo inventario devora el flujo de caja, ocupa bodegas costosas y genera riesgo de obsolescencia.

Formulado por Ford Whitman Harris en 1913, el **Modelo de Cantidad Económica de Pedido (EOQ)** es el modelo cuantitativo fundamental de la gestión de operaciones para responder a la pregunta: *¿Cuánto pedir cada vez?*

<Callout type="info">
**Robustez del EOQ:** La curva de costo total del EOQ es notablemente plana alrededor del punto óptimo. Desviarse un 10% del tamaño de lote óptimo $Q^*$ solo incrementa el costo total anual en menos del 1%.
</Callout>

## Objetivos de Aprendizaje
- Deducir rigurosamente la ecuación del EOQ a partir de la función de costos anuales.
- Calcular el número óptimo de pedidos al año ($N^*$) y el tiempo entre pedidos ($T^*$).
- Analizar la sensibilidad del costo total ante variaciones en la estimación de costos.
- Resolver problemas de EOQ con descuentos por volumen y lote de producción (EPQ) en Python.

---

# Fundamentos Teóricos

### Supuestos Clásicos del EOQ

1. Tasa de demanda $D$ constante, continua y conocida (unidades/año).
2. Tiempo de reposición (*Lead Time* $L$) determinístico y constante.
3. El lote completo $Q$ se entrega instantáneamente en un solo envío.
4. No se permiten quiebres de inventario (*no stockouts*).
5. Estructura de costos fija:
   - $S$: Costo fijo de emisión y preparación por pedido (USD/orden).
   - $H = i \\cdot C$: Costo de mantener una unidad en inventario por año (USD/unidad/año).

### Función de Costo Total Anual

$$\\text{Costo Anual de Ordenar} = \\left( \\frac{D}{Q} \\right) S$$

$$\\text{Costo Anual de Almacenamiento} = \\left( \\frac{Q}{2} \\right) H$$

$$TC(Q) = \\frac{D}{Q} S + \\frac{Q}{2} H$$

Derivando respecto a $Q$:

$$\\frac{d TC(Q)}{dQ} = -\\frac{D S}{Q^2} + \\frac{H}{2} = 0 \\implies Q^* = \\sqrt{\\frac{2 D S}{H}}$$

El Costo Total Anual Óptimo es:

$$TC(Q^*) = \\sqrt{2 D S H}$$

---

# Laboratorio en Python: EOQ y Evaluación de Descuentos por Cantidad

\`\`\`python
import numpy as np
import pandas as pd

# Parámetros del caso industrial:
# Demanda anual de rodamientos: D = 12,000 unidades/año
# Costo de emitir una orden de compra: S = $100 USD/orden
# Tasa de costo de posesión de inventario: i = 20% anual sobre el valor del artículo
# Precio base unitario sin descuento: C = $50 USD -> H = 0.20 * 50 = $10 USD/unidad/año

D = 12_000.0
S = 100.0
tasa_i = 0.20
C_base = 50.0
H_base = tasa_i * C_base

# 1. EOQ Clásico
Q_opt = np.sqrt((2.0 * D * S) / H_base)
N_pedidos = D / Q_opt
dias_entre_pedidos = (Q_opt / D) * 365.0
costo_ordenar = (D / Q_opt) * S
costo_mantener = (Q_opt / 2.0) * H_base
costo_gestion_total = costo_ordenar + costo_mantener

# 2. Descuentos por Volumen del Proveedor:
# Tramo 1: 1 a 499 unidades -> Precio $50.00
# Tramo 2: 500 a 999 unidades -> Precio $48.50
# Tramo 3: 1000+ unidades -> Precio $47.00
tramos = [
    {'Rango': '1 - 499', 'Precio': 50.00, 'Q_min': 1},
    {'Rango': '500 - 999', 'Precio': 48.50, 'Q_min': 500},
    {'Rango': '1000+', 'Precio': 47.00, 'Q_min': 1000}
]

evaluacion_descuentos = []
for t in tramos:
    p = t['Precio']
    h = tasa_i * p
    q_calc = np.sqrt((2.0 * D * S) / h)
    # Ajustar al rango si es menor al mínimo para obtener el descuento
    q_viable = max(q_calc, t['Q_min'])
    
    costo_compras = D * p
    costo_ord = (D / q_viable) * S
    costo_alm = (q_viable / 2.0) * h
    costo_global = costo_compras + costo_ord + costo_alm
    
    evaluacion_descuentos.append({
        'Tramo': t['Rango'],
        'Precio_Unitario': p,
        'Q_Recomendado': int(np.round(q_viable)),
        'Costo_Compras': costo_compras,
        'Costo_Gestion': costo_ord + costo_alm,
        'Costo_Global_Total': costo_global
    })

df_desc = pd.DataFrame(evaluacion_descuentos)

print(f"EOQ ÓPTIMO CLÁSICO: Q* = {Q_opt:.1f} unidades")
print(f"Frecuencia: {N_pedidos:.1f} órdenes/año (cada {dias_entre_pedidos:.1f} días)")
print(f"Costo de Gestión Óptimo: USD {costo_gestion_total:,.2f} anuales\\n")
print("EVALUACIÓN DE DESCUENTOS POR VOLUMEN:")
print(df_desc.to_string(index=False))
mejor_tramo = df_desc.loc[df_desc['Costo_Global_Total'].idxmin()]
print(f"\\n--> ESTRATEGIA ÓPTIMA GLOBAL: Comprar en lotes de {mejor_tramo['Q_Recomendado']} unidades")
print(f"--> Ahorro Neto Anual: USD {df_desc.loc[0, 'Costo_Global_Total'] - mejor_tramo['Costo_Global_Total']:,.2f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Lote Económico de Pedido (EOQ)"
  questions={[
    {
      id: "q_eoq_1",
      text: "Si la demanda anual D de una materia prima se cuadruplica (se multiplica por 4) mientras los costos S y H se mantienen constantes, ¿qué sucede con el tamaño óptimo de lote EOQ?",
      options: [
        { id: "a", text: "El tamaño del lote Q* se duplica exactamente (aumenta en un factor sqrt(4) = 2)", isCorrect: true, explanation: "Q* es proporcional a la raíz cuadrada de la demanda: sqrt(4 D) = 2 * sqrt(D). La economía de escala en inventarios crece con la raíz cuadrada." },
        { id: "b", text: "El lote se cuadruplica (se multiplica por 4)", isCorrect: false, explanation: "La relación no es lineal, es sublineal según la raíz cuadrada." },
        { id: "c", text: "Permanece exactamente igual", isCorrect: false, explanation: "El tamaño del lote responde directamente a la demanda." }
      ]
    },
    {
      id: "q_eoq_2",
      text: "Si una empresa decide por política pedir un lote que es el doble del EOQ (Q = 2 Q*), ¿cuál es el impacto en el costo anual de gestión?",
      options: [
        { id: "a", text: "El costo se incrementa en un 25% (TC = 1.25 TC*)", isCorrect: true, explanation: "El factor relativo es 0.5 * (Q/Q* + Q*/Q) = 0.5 * (2 + 1/2) = 1.25. Esto demuestra la notable robustez del EOQ ante desvíos operativos moderados." },
        { id: "b", text: "El costo se duplica (se incrementa 100%)", isCorrect: false, explanation: "El ahorro en costo de ordenar compensa parcialmente el aumento del costo de almacenamiento." },
        { id: "c", text: "El costo disminuye a la mitad", isCorrect: false, explanation: "Desviarse del óptimo siempre incrementa el costo total." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-punto-reorden-stock-seguridad",
        filename: "02-punto-reorden-stock-seguridad.mdx",
        content: `---
title: "Punto de Reorden (ROP), Demanda Estocástica y Stock de Seguridad"
order: 2
description: "Control de inventarios probabilístico bajo demanda y lead time variables, cálculo del Stock de Seguridad y Nivel de Servicio del Ciclo (CSL)."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cómo se define analíticamente el Punto de Reorden (ROP) bajo demanda estocástica y tiempo de entrega determinístico L?"
    options:
      - "ROP = d_barra * L + SS, donde d_barra es la demanda media diaria y SS es el Stock de Seguridad"
      - "ROP = Q* / 2"
      - "ROP = L / d_barra"
      - "ROP = Demanda Anual / 365"
    answer: 0
    explanation: "El ROP debe cubrir la demanda esperada durante el tiempo de reposición del proveedor (d_barra * L) más un colchón de protección (Stock de Seguridad SS) para absorber fluctuaciones imprevistas."
  - question: "¿Qué representa el Nivel de Servicio del Ciclo (CSL - Cycle Service Level) en una política de inventario (s, Q)?"
    options:
      - "La probabilidad de no sufrir quiebre de stock durante el tiempo de entrega (P(Demanda en L <= ROP) = 1 - alfa)"
      - "El porcentaje de descuento otorgado al cliente"
      - "El número de pedidos atendidos en el año"
      - "La velocidad promedio del camión de reparto"
    answer: 0
    explanation: "El CSL cuantifica la probabilidad estadística de que la demanda acumulada durante el Lead Time sea completamente satisfecha con el inventario disponible."
---

# Introducción

> En el mundo real, los proveedores no entregan con puntualidad cronométrica ni los clientes compran exactamente la misma cantidad cada día. Un retraso de 3 días en la aduana marítima o un pico repentino de pedidos pueden agotar el inventario antes de que arribe el pedido de reposición, generando quiebres costosos y pérdida de lealtad de marca.

El **Punto de Reorden (ROP - Reorder Point)** y el **Stock de Seguridad (SS - Safety Stock)** son las defensas matemáticas para operar con éxito en entornos estocásticos bajo incertidumbre.

<Callout type="info">
**El Costo de la Perfección:** Aumentar el nivel de servicio del 90% al 95% requiere un incremento moderado de inventario de seguridad. Sin embargo, pasar del 95% al 99.9% exige multiplicar exponencialmente el stock de seguridad debido a las colas asintóticas de la distribución normal ($Z_{0.95} = 1.645$ vs $Z_{0.999} = 3.090$).
</Callout>

## Objetivos de Aprendizaje
- Formalizar el modelo de revisión continua $(s, Q)$ y el cálculo del ROP.
- Deducir la desviación estándar de la demanda durante el tiempo de entrega ($\\sigma_L$).
- Calcular el factor $Z$ de la distribución normal asociado al Nivel de Servicio deseado ($CSL$).
- Analizar el caso general con demanda variable y tiempo de entrega variable en Python.

---

# Fundamentos Teóricos

### Demanda Durante el Tiempo de Entrega ($D_L$)

Sea $d$ la demanda diaria con media $\\bar{d}$ y desviación estándar $\\sigma_d$. Sea $L$ el tiempo de entrega en días.

#### Caso 1: Demanda Variable y Tiempo de Entrega Constante ($L$)

$$\\mu_L = \\mathbb{E}[D_L] = \\bar{d} \\cdot L$$

$$\\sigma_L = \\sqrt{\\text{Var}(D_L)} = \\sigma_d \\sqrt{L}$$

$$SS = Z_{\\alpha} \\cdot \\sigma_L = Z_{\\alpha} \\cdot \\sigma_d \\sqrt{L}$$

$$ROP = \\bar{d} \\cdot L + Z_{\\alpha} \\cdot \\sigma_d \\sqrt{L}$$

Donde $Z_{\\alpha} = \\Phi^{-1}(CSL)$ es el valor crítico de la distribución normal estándar.

#### Caso 2: Demanda Variable y Tiempo de Entrega Variable (General)

Si tanto la demanda diaria ($d \\sim (\\bar{d}, \\sigma_d)$) como el Lead Time ($L \\sim (\\bar{L}, \\sigma_L)$) son variables aleatorias independientes:

$$\\mu_{\\text{total}} = \\bar{d} \\cdot \\bar{L}$$

$$\\sigma_{\\text{total}} = \\sqrt{\\bar{L} \\sigma_d^2 + \\bar{d}^2 \\sigma_L^2}$$

$$ROP = \\bar{d} \\cdot \\bar{L} + Z_{\\alpha} \\sqrt{\\bar{L} \\sigma_d^2 + \\bar{d}^2 \\sigma_L^2}$$

---

# Laboratorio en Python: Diseño de Políticas de Inventario Probabilístico

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

# Parámetros del Centro de Distribución:
# Demanda diaria: media = 150 unidades/día, desviación = 25 unidades/día
# Tiempo de entrega del proveedor (Lead Time): media = 6 días, desviación = 1.5 días
d_media = 150.0
d_sigma = 25.0
L_media = 6.0
L_sigma = 1.5

# Evaluación para diferentes Niveles de Servicio de Ciclo (CSL): 90%, 95%, 98%, 99%, 99.5%
niveles_servicio = [0.90, 0.95, 0.98, 0.99, 0.995]
tabla_rop = []

# Varianza combinada de demanda durante el lead time
# Var(D_L) = L_media * sigma_d^2 + d_media^2 * sigma_L^2
varianza_DL = L_media * (d_sigma**2) + (d_media**2) * (L_sigma**2)
sigma_DL = np.sqrt(varianza_DL)
demanda_esperada_L = d_media * L_media

for csl in niveles_servicio:
    z_score = stats.norm.ppf(csl)
    ss = z_score * sigma_DL
    rop = demanda_esperada_L + ss
    
    tabla_rop.append({
        'Nivel_Servicio_%': csl * 100,
        'Factor_Z': z_score,
        'Demanda_Media_LeadTime': demanda_esperada_L,
        'Stock_Seguridad (SS)': int(np.ceil(ss)),
        'Punto_Reorden (ROP)': int(np.ceil(rop)),
        'Incremento_SS_%': ((ss / (stats.norm.ppf(0.90) * sigma_DL)) - 1.0) * 100
    })

df_rop = pd.DataFrame(tabla_rop)

print(f"PARÁMETROS COMBINADOS: Demanda Esperada en Lead Time = {demanda_esperada_L:.0f} unidades")
print(f"Desviación Estándar Total durante Lead Time (sigma_DL): {sigma_DL:.2f} unidades\\n")
print("POLÍTICAS DE PUNTO DE REORDEN (ROP) SEGÚN NIVEL DE SERVICIO:")
print(df_rop.round(2).to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Punto de Reorden y Stock de Seguridad"
  questions={[
    {
      id: "q_rop_1",
      text: "Si la demanda media diaria es de 50 piezas, el Lead Time es constante de 4 días y la desviación durante el Lead Time es sigma_L = 10 piezas, ¿cuál es el ROP para un CSL del 97.7% (Z = 2.0)?",
      options: [
        { id: "a", text: "220 piezas (ROP = 50 * 4 + 2.0 * 10 = 200 + 20 = 220 piezas)", isCorrect: true, explanation: "La demanda esperada es 50 * 4 = 200. El stock de seguridad es 2.0 * 10 = 20. ROP = 200 + 20 = 220 piezas." },
        { id: "b", text: "200 piezas", isCorrect: false, explanation: "200 piezas no incluye ningún stock de seguridad (CSL del 50%)." },
        { id: "c", text: "50 piezas", isCorrect: false, explanation: "50 piezas solo cubriría un día de demanda." }
      ]
    },
    {
      id: "q_rop_2",
      text: "En la fórmula de varianza combinada sigma_total^2 = L_barra * sigma_d^2 + d_barra^2 * sigma_L^2, ¿qué término tiene habitualmente mayor impacto en el incremento del Stock de Seguridad?",
      options: [
        { id: "a", text: "El segundo término (d_barra^2 * sigma_L^2), debido a que la demanda media está elevada al cuadrado", isCorrect: true, explanation: "La variabilidad en el tiempo de entrega del proveedor (sigma_L) se amplifica por el cuadrado de la demanda media diaria, haciendo que la impuntualidad del proveedor sea mucho más destructiva para el inventario que la variabilidad de ventas del cliente." },
        { id: "b", text: "Ambos términos siempre son idénticos", isCorrect: false, explanation: "Dependen de magnitudes operativas muy distintas." },
        { id: "c", text: "El primer término siempre domina", isCorrect: false, explanation: "L_barra solo entra de forma lineal, mientras que d_barra entra cuadrática." }
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
  console.log("✅ Curso gestion-produccion-logistica generado con éxito!");
}

build();
