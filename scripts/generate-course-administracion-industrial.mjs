import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'content', 'courses', 'administracion-industrial');

const courseMetadata = {
  title: "Administración Industrial",
  slug: "administracion-industrial",
  code: "II143",
  description: "Evolución del pensamiento administrativo en la manufactura y servicios, diseño y modelamiento de procesos con BPMN, gestión estratégica de la productividad y cuadros de mando integral.",
  credits: 3,
  ects: 6,
  semester: 3,
  isMock: false
};

const modules = [
  {
    slug: "01-teoria-organizacional-procesos",
    metadata: {
      title: "Teoría Organizacional y Modelado de Procesos",
      order: 1
    },
    lessons: [
      {
        slug: "01-evolucion-taylor-a-lean",
        filename: "01-evolucion-taylor-a-lean.mdx",
        content: `---
title: "Evolución de la Administración Industrial: De Taylor a Lean Manufacturing"
order: 1
description: "Estudio de tiempos y movimientos de Taylor, principios de Fayol, Sistema de Producción Toyota (TPS) y eliminación de los 7 desperdicios (Muda)."
bloomLevel: "UNDERSTAND"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es el postulado central que distingue al Sistema de Producción Toyota (Lean Manufacturing) de la producción en masa tradicional fordista?"
    options:
      - "La producción mediante flujo continuo 'Pull' activado por la demanda real del cliente (Just-in-Time), eliminando la acumulación masiva de inventarios y los 7 desperdicios (Muda)"
      - "Producir a la máxima capacidad posible sin importar la demanda para reducir el costo unitario por economías de escala"
      - "Sustituir a todos los operarios humanos por robots automáticos"
      - "Eliminar por completo las inspecciones de calidad de los proveedores"
    answer: 0
    explanation: "Mientras el fordismo opera en lógica 'Push' generando enormes inventarios en proceso (WIP) para diluir costos fijos, el TPS opera en lógica 'Pull' mediante Kanban y flujo pieza a pieza, reconociendo el inventario como uno de los principales desperdicios."
  - question: "¿Cuál de los siguientes NO forma parte de los 7 desperdicios clásicos (Muda) identificados por Taiichi Ohno en Toyota?"
    options:
      - "Inversión en investigación y desarrollo de software"
      - "Sobreproducción (fabricar más o antes de lo necesario)"
      - "Transporte innecesario de materiales"
      - "Esperas de operarios o maquinaria"
    answer: 0
    explanation: "Los 7 desperdicios de Ohno son: Sobreproducción, Espera, Transporte, Sobreprocesamiento, Inventario, Movimiento innecesario y Defectos. La inversión en I+D es una actividad estratégica generadora de valor a largo plazo."
---

# Introducción

> La administración moderna no nació en despachos de abogados ni en escuelas de negocios teóricas; nació en los talleres mecánicos, en las fundiciones de acero y en las líneas de ensamble automotriz. Los ingenieros industriales crearon la ciencia de la gestión para transformar el esfuerzo humano desordenado en operaciones coordinadas, eficientes y seguras.

Desde los cronómetros de Frederick Winslow Taylor hasta los tableros visuales *Andon* de Toyota, la disciplina ha evolucionado desde el control coercitivo hacia el empoderamiento técnico y la mejora continua (*Kaizen*).

<Callout type="info">
**La Regla de Oro de Lean:** En cualquier proceso industrial, sólo entre el 5% y el 10% de las actividades agregan valor real desde la perspectiva del cliente final (por las que el cliente está dispuesto a pagar). El 90% restante es desperdicio (*Muda*) que debe ser eliminado o minimizado sistemáticamente.
</Callout>

## Objetivos de Aprendizaje
- Comparar los paradigmas de la Administración Científica (Taylor, Gilbreth), la Teoría Clásica (Fayol) y la Teoría de Sistemas.
- Identificar los fundamentos del Sistema de Producción Toyota (TPS) y sus dos pilares: *Just-In-Time* (JIT) y *Jidoka* (autonomización).
- Cuantificar el Tiempo Takt, Tiempo de Ciclo y Eficiencia del Ciclo del Proceso (PCE).
- Implementar un analizador de valor agregado y flujo de valor en Python.

---

# Fundamentos Teóricos

### Los Dos Pilares del Sistema Toyota (TPS)

1. **Just-In-Time (JIT):** Fabricar únicamente lo que se necesita, en el momento exacto en que se necesita y en la cantidad precisa requerida por la estación siguiente. Se rige por:
   - **Tiempo Takt ($T_T$):** El ritmo de compra del cliente:
     $$T_T = \\frac{\\text{Tiempo Neto Disponible de Producción por Turno}}{\\text{Demanda Requerida por el Cliente en el Turno}}$$
   - **Flujo Continuo:** Lote unitario (*One-Piece Flow*).
   - **Sistema Pull:** Regulación del flujo mediante tarjetas o señales Kanban.

2. **Jidoka (Calidad en la Fuente / Autonomización):**
   Dotar a las máquinas y a los operarios de la capacidad de detectar anomalías y detener la línea de inmediato (*Andon*) para no transferir defectos a la siguiente estación. Incorpora mecanismos a prueba de errores (*Poka-Yoke*).

### Métrica de Eficiencia del Ciclo de Proceso (PCE)

La **Eficiencia del Ciclo del Proceso** (*Process Cycle Efficiency*) mide el porcentaje del tiempo total que una pieza pasa recibiendo transformación que agrega valor:

$$\\text{PCE} = \\frac{\\text{Tiempo Total de Valor Agregado (VA)}}{\\text{Tiempo Total de Entrega (Lead Time o PLT)}} \\times 100\\%$$

En operaciones manufactureras tradicionales no optimizadas, el PCE suele ser inferior al $5\\%$. Un proceso Lean de clase mundial aspira a un PCE superior al $25\\%$.

---

# Laboratorio en Python: Balanceo Takt Time y Análisis de Valor Agregado

\`\`\`python
import numpy as np
import pandas as pd

# Datos de una línea de ensamble de electrodomésticos:
# Turno de 8 horas = 480 minutos.
# Almuerzo y descansos programados = 50 minutos.
# Tiempo neto disponible = 430 minutos = 25,800 segundos.
# Demanda diaria del cliente = 600 unidades.

tiempo_neto_segundos = (480 - 50) * 60
demanda_diaria = 600

# 1. Cálculo del Takt Time
takt_time = tiempo_neto_segundos / demanda_diaria

# 2. Análisis de Actividades de una pieza (Mapeo de Flujo de Valor - VSM)
actividades = pd.DataFrame([
    {'Etapa': 'Corte Lámina CNC', 'Tiempo_s': 35.0, 'Tipo': 'VA'},
    {'Etapa': 'Espera en canastilla de transporte', 'Tiempo_s': 420.0, 'Tipo': 'NVA (Muda Espera)'},
    {'Etapa': 'Doblado y Estampado', 'Tiempo_s': 28.0, 'Tipo': 'VA'},
    {'Etapa': 'Transporte en montacargas a pintura', 'Tiempo_s': 180.0, 'Tipo': 'NVA (Muda Transporte)'},
    {'Etapa': 'Espera en cola de horno de pintura', 'Tiempo_s': 600.0, 'Tipo': 'NVA (Muda Inventario)'},
    {'Etapa': 'Pintura Electrostática', 'Tiempo_s': 40.0, 'Tipo': 'VA'},
    {'Etapa': 'Ensamble de componentes', 'Tiempo_s': 38.0, 'Tipo': 'VA'},
    {'Etapa': 'Inspección final de empaque', 'Tiempo_s': 15.0, 'Tipo': 'VA'}
])

# 3. Métricas de Flujo
tiempo_va = actividades[actividades['Tipo'] == 'VA']['Tiempo_s'].sum()
tiempo_lead_time = actividades['Tiempo_s'].sum()
pce = (tiempo_va / tiempo_lead_time) * 100.0

# 4. Cálculo de Operarios Teóricos Mínimos requeridos para cumplir el Takt Time
operarios_minimos = tiempo_va / takt_time

print(f"TIEMPO TAKT DE LA PLANTA: {takt_time:.2f} segundos por unidad")
print(f"Tiempo Total de Valor Agregado (VA): {tiempo_va:.1f} s")
print(f"Tiempo Total de Entrega (Process Lead Time): {tiempo_lead_time:.1f} s ({tiempo_lead_time/60:.2f} min)")
print(f"Eficiencia del Ciclo del Proceso (PCE): {pce:.2f}%")
print(f"Número teórico de estaciones/operarios necesarios: {operarios_minimos:.2f} -> Requiere {int(np.ceil(operarios_minimos))} operarios")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: De Taylor a Lean Manufacturing"
  questions={[
    {
      id: "q_lean_1",
      text: "Si el tiempo neto disponible de una fábrica es 24,000 segundos por día y la demanda del cliente es 400 unidades/día, ¿cuál es el Takt Time?",
      options: [
        { id: "a", text: "60 segundos/unidad (Takt Time = 24000 / 400 = 60 s)", isCorrect: true, explanation: "El Takt Time establece que debe salir una unidad terminada de la línea cada 60 segundos para satisfacer exactamente la demanda sin incurrir en sobreproducción." },
        { id: "b", text: "16.6 segundos/unidad", isCorrect: false, explanation: "Resultado de dividir 400 entre 24000 en lugar de tiempo entre demanda." },
        { id: "c", text: "120 segundos/unidad", isCorrect: false, explanation: "Doble del valor real." }
      ]
    },
    {
      id: "q_lean_2",
      text: "¿Por qué Taiichi Ohno consideraba la Sobreproducción como el peor de todos los desperdicios (el 'Padre de los Desperdicios')?",
      options: [
        { id: "a", text: "Porque oculta los demás problemas operativos (averías, mala calidad, desbalance) y genera automáticamente todos los demás desperdicios (inventario, transporte, manipulación, espacio)", isCorrect: true, explanation: "La sobreproducción inunda la fábrica de inventario, creando una falsa sensación de seguridad que disfraza los cuellos de botella y defectos crónicos." },
        { id: "b", text: "Porque obliga a contratar más personal administrativo", isCorrect: false, explanation: "El impacto primario es sobre el capital de trabajo y la visibilidad de los problemas en el gemba." },
        { id: "c", text: "Porque la ley prohíbe producir más de lo vendido", isCorrect: false, explanation: "Es un principio de eficiencia productiva, no un delito legal." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-modelamiento-procesos-bpmn",
        filename: "02-modelamiento-procesos-bpmn.mdx",
        content: `---
title: "Mapeo y Modelamiento de Procesos con Notación BPMN"
order: 2
description: "Gestión por procesos (BPM), estándar ISO/IEC 19510 BPMN 2.0, piscinas y carriles, compuertas de decisión y diagramas SIPOC."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Qué función cumple una compuerta inclusiva (OR / Inclusive Gateway, símbolo 'O') en un diagrama de procesos BPMN 2.0?"
    options:
      - "Permite que una o varias rutas de salida concurrentes se activen simultáneamente dependiendo de las condiciones evaluadas"
      - "Obliga a que solo una única ruta excluyente sea seleccionada (XOR)"
      - "Obliga a que todas las rutas se activen en paralelo sin evaluar ninguna condición (AND)"
      - "Cancela el proceso de forma inmediata"
    answer: 0
    explanation: "A diferencia de la compuerta exclusiva (XOR, símbolo X) que elige estrictamente una alternativa, la compuerta inclusiva (OR) puede activar múltiples caminos paralelos si sus respectivas condiciones son verdaderas."
  - question: "¿Qué elementos componen las siglas de la herramienta de caracterización de alto nivel SIPOC?"
    options:
      - "Supplier (Proveedor), Input (Entrada), Process (Proceso), Output (Salida), Customer (Cliente)"
      - "System, Integration, Protocol, Operation, Control"
      - "Standard, Inspection, Production, Optimization, Cost"
      - "Strategy, Innovation, Planning, Organization, Culture"
    answer: 0
    explanation: "SIPOC es el mapa macro estándar de Six Sigma y BPM que define los límites del proceso: Proveedores -> Entradas -> Proceso -> Salidas -> Clientes."
---

# Introducción

> "Si no puedes describir lo que estás haciendo como un proceso, no sabes lo que estás haciendo". Esta célebre sentencia de W. Edwards Deming fundamenta la **Gestión por Procesos de Negocio (BPM - Business Process Management)**. Las organizaciones tradicionales fragmentadas en silos funcionales (compras, producción, finanzas, ventas) generan retrasos crónicos en las fronteras departamentales.

El modelado formal mediante el estándar internacional **BPMN 2.0 (Business Process Model and Notation)** permite a los ingenieros industriales documentar, analizar, simular y automatizar flujos operativos con rigor visual inequívoco.

<Callout type="info">
**Piscinas (Pools) y Carriles (Lanes):** Una piscina representa a una organización o entidad participante independiente (e.g. Proveedor vs Empresa). Los carriles dentro de una piscina subdividen las responsabilidades por áreas internas o roles (e.g. Almacén, Control de Calidad, Producción).
</Callout>

## Objetivos de Aprendizaje
- Aplicar la metodología SIPOC para delimitar el alcance de un proceso industrial.
- Diferenciar los elementos fundamentales de BPMN 2.0: Eventos (inicio, intermedio, fin), Actividades, Compuertas y Flujos.
- Modelar compuertas lógicas: Exclusiva (XOR), Paralela (AND) e Inclusiva (OR).
- Analizar cuellos de botella y tiempos de ciclo de un proceso modelado en Python.

---

# Fundamentos Teóricos

### Elementos Básicos de BPMN 2.0

\`\`\`mermaid
flowchart LR
    Start((Inicio)) --> Task1[Inspeccionar Lote]
    Gate{¿Conforme?}
    Task1 --> Gate
    Gate -- Sí --> Task2[Liberar a Producción]
    Gate -- No --> Task3[Rechazar y Retener]
    Task2 --> EndSuccess(((Fin Éxito)))
    Task3 --> EndScrap(((Fin Rechazo)))
\`\`\`

1. **Eventos (Círculos):**
   - *Inicio:* Línea simple fina. Desencadena el proceso.
   - *Intermedio:* Doble línea concéntrica. Ocurre durante la ejecución (e.g. captura de mensaje, temporizador).
   - *Fin:* Línea gruesa continua. Concluye una trayectoria del proceso.

2. **Actividades (Rectángulos con bordes redondeados):**
   Unidades de trabajo ejecutadas por personas o sistemas (Tarea humana, Tarea de servicio automática).

3. **Compuertas (Rombos / Gateways):**
   - **Exclusiva basada en datos (XOR - 'X'):** Bifurcación mutuamente excluyente. Se elige exactamente un camino.
   - **Paralela (AND - '+'):** Divide el flujo en múltiples ramas concurrentes sin evaluar condiciones, o sincroniza múltiples ramas antes de continuar.
   - **Inclusiva (OR - 'O'):** Activa una o más ramas dependiendo de múltiples condiciones no excluyentes.

---

# Laboratorio en Python: Análisis de Capacidad y Tiempos de Flujo en Red BPMN

\`\`\`python
import pandas as pd
import numpy as np

# Modelo de proceso de Despacho de Pedidos Industriales:
# Flujo con bifurcaciones paralelas y exclusivas
procesos = pd.DataFrame([
    {'Actividad': '1. Recepción y Validación de Orden', 'Tiempo_Medio_min': 12.0, 'Capacidad_unid_h': 15.0},
    {'Actividad': '2A. Picking en Bodega (Paralelo)', 'Tiempo_Medio_min': 25.0, 'Capacidad_unid_h': 10.0},
    {'Actividad': '2B. Facturación y Crédito (Paralelo)', 'Tiempo_Medio_min': 18.0, 'Capacidad_unid_h': 12.0},
    {'Actividad': '3. Control de Calidad y Embalaje', 'Tiempo_Medio_min': 20.0, 'Capacidad_unid_h': 8.0}, # Cuello de botella
    {'Actividad': '4. Despacho a Transporte', 'Tiempo_Medio_min': 10.0, 'Capacidad_unid_h': 20.0}
])

# Identificación del Cuello de Botella del Proceso (Teoría de Restricciones - TOC)
indice_cuello = procesos['Capacidad_unid_h'].idxmin()
cuello_botella = procesos.loc[indice_cuello]
capacidad_maxima_sistema = cuello_botella['Capacidad_unid_h']

# Tiempo de Ciclo de Ruta Crítica:
# 1 -> max(2A, 2B) [por compuerta paralela AND] -> 3 -> 4
t_ruta_critica = (
    procesos.loc[0, 'Tiempo_Medio_min'] +
    max(procesos.loc[1, 'Tiempo_Medio_min'], procesos.loc[2, 'Tiempo_Medio_min']) +
    procesos.loc[3, 'Tiempo_Medio_min'] +
    procesos.loc[4, 'Tiempo_Medio_min']
)

print("ANÁLISIS DE CAPACIDAD Y TIEMPOS DEL MODELO BPMN:")
print(procesos.to_string(index=False))
print(f"\\n--> CUELLO DE BOTELLA IDENTIFICADO: {cuello_botella['Actividad']}")
print(f"--> Capacidad Máxima del Proceso Completo: {capacidad_maxima_sistema:.1f} órdenes/hora")
print(f"--> Tiempo de Flujo en Ruta Crítica (Lead Time Mínimo): {t_ruta_critica:.1f} minutos")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Modelamiento de Procesos BPMN 2.0"
  questions={[
    {
      id: "q_bpmn_1",
      text: "Si dos tareas se originan a partir de una compuerta paralela (AND / Parallel Gateway), ¿cuándo podrá continuar la compuerta de sincronización posterior?",
      options: [
        { id: "a", text: "Únicamente cuando ambas actividades paralelas hayan finalizado de forma completa", isCorrect: true, explanation: "La compuerta AND de unión (join) espera a que todos los hilos de ejecución concurrentes lleguen a ella antes de liberar el flujo siguiente." },
        { id: "b", text: "Tan pronto como la primera de ellas termine", isCorrect: false, explanation: "Eso correspondería a una compuerta compleja o carrera condicional." },
        { id: "c", text: "Nunca, se genera un bloqueo de interbloqueo (deadlock)", isCorrect: false, explanation: "Si el modelo está bien balanceado, la sincronización AND es la práctica estándar." }
      ]
    },
    {
      id: "q_bpmn_2",
      text: "En un diagrama BPMN, ¿qué elemento gráfico representa que un mensaje viaja entre dos piscinas (organizaciones) distintas?",
      options: [
        { id: "a", text: "Línea punteada con flecha abierta (Flujo de Mensaje / Message Flow)", isCorrect: true, explanation: "Las líneas sólidas (Sequence Flow) solo pueden conectar elementos dentro de una misma piscina; la interacción entre participantes externos se modela estrictamente con Flujos de Mensaje punteados." },
        { id: "b", text: "Línea continua gruesa", isCorrect: false, explanation: "La línea continua es el flujo de secuencia interno." },
        { id: "c", text: "Un círculo rojo sólido", isCorrect: false, explanation: "Es un evento de terminación de proceso." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "02-gestion-estrategica-productividad",
    metadata: {
      title: "Gestión Estratégica y Productividad",
      order: 2
    },
    lessons: [
      {
        slug: "01-kpi-cuadro-mando-integral",
        filename: "01-kpi-cuadro-mando-integral.mdx",
        content: `---
title: "Indicadores Clave de Rendimiento (KPI) y Cuadro de Mando"
order: 1
description: "Metodología del Balanced Scorecard (BSC) de Kaplan y Norton, mapas estratégicos de 4 perspectivas y formulación matemática de KPIs."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuáles son las cuatro perspectivas interconectadas que componen el Cuadro de Mando Integral (Balanced Scorecard) de Kaplan y Norton?"
    options:
      - "Financiera, Clientes, Procesos Internos, y Aprendizaje y Crecimiento"
      - "Compras, Ventas, Almacén, y Transporte"
      - "Hardware, Software, Redes, y Seguridad"
      - "Legal, Fiscal, Laboral, y Ambiental"
    answer: 0
    explanation: "El modelo balancea los resultados financieros con los inductores de desempeño futuro: Clientes (propuesta de valor), Procesos Internos (excelencia operativa) y Aprendizaje/Crecimiento (capital humano, tecnológico y organizacional)."
  - question: "¿Qué característica distingue a un indicador de tipo 'Inductor' (Leading Indicator) frente a uno de 'Resultado' (Lagging Indicator)?"
    options:
      - "Los Leading Indicators miden actividades predictivas tempranas que influyen en el resultado futuro; los Lagging miden resultados históricos retrospectivos"
      - "Los Leading son cualitativos y los Lagging son siempre numéricos"
      - "Los Leading solo los calcula la gerencia general"
      - "No existe diferencia matemática entre ellos"
    answer: 0
    explanation: "Un indicador Lagging (ej. Utilidad Neta del trimestre) informa lo que ya ocurrió; un indicador Leading (ej. Horas de capacitación técnica en calidad o % de mantenimiento preventivo cumplido) predice la reducción futura de defectos."
---

# Introducción

> "Lo que no se mide, no se puede controlar; lo que no se controla, no se puede gestionar; y lo que no se gestiona, no se puede mejorar". El aforismo de Lord Kelvin adquiere dimensión operativa en el diseño de **Indicadores Clave de Desempeño (KPIs - Key Performance Indicators)**.

A finales del siglo XX, Robert Kaplan y David Norton evidenciaron que la gestión empresarial guiada exclusivamente por métricas contables tradicionales (como el ROI o la utilidad neta) era equivalente a conducir un automóvil mirando únicamente por el espejo retrovisor. El **Cuadro de Mando Integral (CMI / Balanced Scorecard)** proporciona una visión holística y multidimensional.

<Callout type="info">
**Causalidad Estratégica:** El CMI no es una lista dispersa de indicadores; es un mapa de hipótesis de causa-efecto: *Si invertimos en capacitar a los ingenieros (Aprendizaje), optimizaremos los tiempos de ciclo y calidad (Procesos), lo que elevará la satisfacción y retención (Clientes), traduciéndose en mayor rentabilidad económica (Financiera).*
</Callout>

## Objetivos de Aprendizaje
- Estructurar el Mapa Estratégico de una organización en sus 4 perspectivas cardinales.
- Formular matemáticamente KPIs con metas, rangos de semaforización y responsables.
- Diferenciar indicadores de resultado (*Lagging*) de inductores tempranos (*Leading*).
- Implementar un cuadro de mando integral analítico automatizado en Python.

---

# Fundamentos Teóricos

### Las Cuatro Perspectivas del BSC

\`\`\`mermaid
flowchart TD
    Fin["1. Perspectiva Financiera: '¿Cómo nos ven los accionistas?'"]
    Cli["2. Perspectiva del Cliente: '¿Cómo debemos aparecer ante los clientes?'"]
    Proc["3. Perspectiva de Procesos Internos: '¿En qué procesos debemos ser excelentes?'"]
    Apr["4. Perspectiva de Aprendizaje y Crecimiento: '¿Cómo sustentamos la capacidad de cambiar?'"]
    
    Apr --> Proc
    Proc --> Cli
    Cli --> Fin
\`\`\`

### Formulación Rigurosa de un KPI

Todo KPI debe definirse mediante una función escalar medible $K(t)$ sujeta a semaforización normalizada de cumplimiento:

$$\\text{Cumplimiento (\\%)} = \\begin{cases} 
\\frac{\\text{Valor Real}}{\\text{Valor Meta}} \\times 100, & \\text{si el objetivo es maximizar} \\\\[8pt]
\\frac{\\text{Valor Meta}}{\\text{Valor Real}} \\times 100, & \\text{si el objetivo es minimizar}
\\end{cases}$$

- **Verde:** Cumplimiento $\\ge 95\\%$.
- **Amarillo:** Cumplimiento entre $85\\%$ y $94.9\\%$.
- **Rojo:** Cumplimiento $< 85\\%$ (requiere plan de acción inmediato).

---

# Laboratorio en Python: Motor Analítico de Cuadro de Mando Integral

\`\`\`python
import pandas as pd
import numpy as np

# Matriz de Indicadores del Balanced Scorecard para una Planta Industrial
kpis = [
    {
        'Perspectiva': 'Financiera',
        'KPI': 'EBITDA (Millones USD)',
        'Tipo': 'Lagging',
        'Meta': 12.5,
        'Real': 11.8,
        'Direccion': 'Maximizar'
    },
    {
        'Perspectiva': 'Clientes',
        'KPI': 'On-Time In-Full (OTIF %)',
        'Tipo': 'Lagging',
        'Meta': 96.0,
        'Real': 94.2,
        'Direccion': 'Maximizar'
    },
    {
        'Perspectiva': 'Procesos Internos',
        'KPI': 'Eficiencia Global de Equipos (OEE %)',
        'Tipo': 'Leading',
        'Meta': 85.0,
        'Real': 86.4,
        'Direccion': 'Maximizar'
    },
    {
        'Perspectiva': 'Procesos Internos',
        'KPI': 'Tasa de Scrap / Desperdicio (%)',
        'Tipo': 'Leading',
        'Meta': 1.5,
        'Real': 2.1,
        'Direccion': 'Minimizar'
    },
    {
        'Perspectiva': 'Aprendizaje y Crecimiento',
        'KPI': 'Horas Capacitacion Lean / Operario',
        'Tipo': 'Leading',
        'Meta': 40.0,
        'Real': 42.0,
        'Direccion': 'Maximizar'
    }
]

df_kpis = pd.DataFrame(kpis)

# Cálculo de % Cumplimiento
def calcular_cumplimiento(row):
    if row['Direccion'] == 'Maximizar':
        return (row['Real'] / row['Meta']) * 100.0
    else:
        return (row['Meta'] / row['Real']) * 100.0

df_kpis['Cumplimiento_%'] = df_kpis.apply(calcular_cumplimiento, axis=1)

# Semaforización
def semaforo(val):
    if val >= 95.0:
        return 'Verde (Meta Lograda)'
    elif val >= 85.0:
        return 'Amarillo (Alerta)'
    else:
        return 'Rojo (Crítico)'

df_kpis['Semaforo'] = df_kpis['Cumplimiento_%'].apply(semaforo)

print("TABLERO DE CONTROL - BALANCED SCORECARD INDUSTRIAL:")
print(df_kpis[['Perspectiva', 'KPI', 'Meta', 'Real', 'Cumplimiento_%', 'Semaforo']].round(2).to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: KPIs y Cuadro de Mando Integral"
  questions={[
    {
      id: "q_kpi_1",
      text: "Si la meta de Scrap en una fundición es del 1.5% y el resultado real fue del 2.5%, ¿cuál es el porcentaje de cumplimiento del KPI bajo lógica de minimización?",
      options: [
        { id: "a", text: "60% (Cumplimiento = Meta / Real = 1.5 / 2.5 = 60.0% -> Rojo)", isCorrect: true, explanation: "En métricas de minimización (costos, desperdicios, accidentes), superar la meta penaliza el indicador: Meta / Real = 1.5 / 2.5 = 0.60." },
        { id: "b", text: "166.7%", isCorrect: false, explanation: "Calcular Real / Meta aplicaría si el objetivo fuera generar la mayor cantidad de chatarra posible." },
        { id: "c", text: "100%", isCorrect: false, explanation: "No se alcanzó la meta establecida." }
      ]
    },
    {
      id: "q_kpi_2",
      text: "¿Por qué el indicador OEE (Overall Equipment Effectiveness) en la perspectiva de procesos es considerado un 'Leading Indicator' respecto a la perspectiva financiera?",
      options: [
        { id: "a", text: "Porque una mejora en la disponibilidad, rendimiento y calidad de las máquinas anticipa aumentos futuros en ventas y reducción de costos unitarios", isCorrect: true, explanation: "El OEE mide la excelencia en el corazón de la manufactura; su desempeño precede e induce los estados financieros del balance final." },
        { id: "b", text: "Porque se mide en dólares", isCorrect: false, explanation: "El OEE es un porcentaje adimensional." },
        { id: "c", text: "Porque reemplaza a la contabilidad general", isCorrect: false, explanation: "El OEE complementa pero no reemplaza a los estados financieros." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-medicion-mejoramiento-productividad",
        filename: "02-medicion-mejoramiento-productividad.mdx",
        content: `---
title: "Modelos de Medición y Optimización de la Productividad Total"
order: 2
description: "Modelos de productividad parcial, multifactorial y total (Craig-Harris y Sumanth), índices de productividad y análisis de variaciones."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Cómo se define formalmente el concepto macroeconómico y de ingeniería de la 'Productividad'?"
    options:
      - "La razón matemática entre los productos (Outputs) generados y los recursos (Inputs) consumidos: Productividad = Salidas / Entradas"
      - "La cantidad absoluta de piezas fabricadas en un turno sin importar el costo de los insumos"
      - "El número total de horas trabajadas por el personal"
      - "La diferencia entre ingresos por ventas y costo de ventas"
    answer: 0
    explanation: "La productividad es una medida de eficiencia técnica y económica que evalúa qué tan productivamente se transforman los insumos (mano de obra, capital, energía, materiales) en bienes o servicios terminados."
  - question: "¿Cuál es el riesgo gerencial de evaluar a una planta únicamente mediante indicadores de 'Productividad Parcial' (como unidades por hora-hombre)?"
    options:
      - "Que se puede inflar artificialmente la productividad laboral comprando maquinaria hipercostosa o automatizada que destruye la productividad total y la rentabilidad global"
      - "Que las horas de trabajo no se pueden medir en números decimales"
      - "Que el gobierno prohíbe calcular la productividad laboral"
      - "Que la productividad laboral siempre es constante"
    answer: 0
    explanation: "Una métrica parcial ignora las sustituciones entre factores. Si se reemplazan 10 obreros por un robot millonario, las piezas/hombre suben, pero la productividad del capital y los costos totales de depreciación pueden deteriorarse."
---

# Introducción

> La productividad no lo es todo en la economía, pero a largo plazo lo es casi todo. La capacidad de una empresa para elevar los salarios reales de sus trabajadores, reducir los precios al consumidor y expandir sus márgenes de utilidad depende exclusivamente de su tasa de crecimiento de la **Productividad Total de los Factores (PTF)**.

Medir con exactitud científica la productividad separa a las empresas competitivas de aquellas que simplemente 'trabajan duro pero consumen recursos en exceso'.

<Callout type="info">
**Producción vs Productividad:**
- *Producción:* Volumen físico total elaborado (e.g. 50,000 pares de calzado).
- *Productividad:* Eficiencia de conversión (e.g. 2.5 pares por hora-hombre o 1.20 USD de calzado por cada USD gastado en insumos totales).
</Callout>

## Objetivos de Aprendizaje
- Distinguir entre Productividad Parcial, Productividad Multifactorial y Productividad Total.
- Aplicar el Modelo de Productividad Total de David Sumanth y el Modelo de Craig-Harris.
- Calcular Índices de Productividad temporal ($IP = P_t / P_0$) desinflando precios mediante deflactores económicos.
- Desarrollar un sistema de contabilidad de productividad con Pandas en Python.

---

# Fundamentos Teóricos

### Clasificación de Modelos de Productividad

1. **Productividad Parcial ($P_{\\text{parcial}}$):**
   Relaciona la producción total con una única clase de insumo:
   $$P_{\\text{Mano de Obra}} = \\frac{\\text{Producción Total}}{\\text{Horas-Hombre}}, \\quad P_{\\text{Materiales}} = \\frac{\\text{Producción Total}}{\\text{Kg de Materia Prima}}$$

2. **Productividad Multifactorial ($P_{\\text{multi}}$):**
   Relaciona la producción con un subconjunto relevante de insumos (ej. Trabajo + Capital):
   $$P_{\\text{multi}} = \\frac{\\text{Output Total}}{\\text{Mano de Obra} + \\text{Capital}}$$

3. **Productividad Total (Modelo de David Sumanth):**
   Relaciona el valor de la producción total terminada ($O_{\\text{total}}$) con la suma monetaria de todos los recursos tangibles consumidos ($I_{\\text{total}}$) en un periodo base o deflactado:
   $$P_{\\text{total}} = \\frac{O_{\\text{total}}}{I_{\\text{Mano Obra}} + I_{\\text{Materiales}} + I_{\\text{Capital}} + I_{\\text{Energía}} + I_{\\text{Otros Servicios}}}$$

### Índice de Productividad ($IP$)

Compara la productividad del periodo analizado $t$ con un periodo de referencia o base $0$:

$$IP_t = \\frac{P_t}{P_0} \\times 100$$

- $IP_t > 100$: Mejora neta en la eficiencia productiva de los factores.
- $IP_t < 100$: Deterioro o despilfarro de insumos en comparación con el periodo base.

---

# Laboratorio en Python: Modelo de Productividad Total de Sumanth

\`\`\`python
import pandas as pd
import numpy as np

# Evaluación de Productividad Anual de una Planta Química (Años 2024 vs 2025)
# Todos los valores monetarios expresados a precios constantes del año base (deflactados)
datos_prod = pd.DataFrame({
    'Rubro': [
        'Producción Terminada Total (Output)',
        'Insumo: Mano de Obra (L)',
        'Insumo: Materias Primas Químicas (M)',
        'Insumo: Capital (Depreciación + Interés) (K)',
        'Insumo: Energía Eléctrica y Vapor (E)',
        'Insumo: Otros Gastos Operativos (X)'
    ],
    'Año_2024_USD': [1_200_000, 250_000, 480_000, 180_000, 75_000, 45_000],
    'Año_2025_USD': [1_450_000, 270_000, 520_000, 210_000, 80_000, 50_000]
})

out_2024 = datos_prod.loc[0, 'Año_2024_USD']
out_2025 = datos_prod.loc[0, 'Año_2025_USD']

in_tot_2024 = datos_prod.loc[1:, 'Año_2024_USD'].sum()
in_tot_2025 = datos_prod.loc[1:, 'Año_2025_USD'].sum()

# Productividad Total de Sumanth
pt_2024 = out_2024 / in_tot_2024
pt_2025 = out_2025 / in_tot_2025

# Índice de Productividad Total
ip_total = (pt_2025 / pt_2024) * 100.0

# Productividades Parciales
prod_parciales = []
for i in range(1, len(datos_prod)):
    insumo = datos_prod.loc[i, 'Rubro'].split(':')[1].split('(')[0].strip()
    p_24 = out_2024 / datos_prod.loc[i, 'Año_2024_USD']
    p_25 = out_2025 / datos_prod.loc[i, 'Año_2025_USD']
    ip = (p_25 / p_24) * 100.0
    prod_parciales.append({
        'Insumo': insumo,
        'Prod_2024': p_24,
        'Prod_2025': p_25,
        'Indice_IP_%': ip,
        'Crecimiento_%': ip - 100.0
    })

df_parciales = pd.DataFrame(prod_parciales)

print("=== REPORTE DE MEDICIÓN DE PRODUCTIVIDAD TOTAL Y PARCIAL ===")
print(f"Productividad Total 2024: USD {pt_2024:.4f} producto / USD insumo")
print(f"Productividad Total 2025: USD {pt_2025:.4f} producto / USD insumo")
print(f"Índice de Productividad Total: {ip_total:.2f}% (Crecimiento global de +{ip_total - 100:.2f}%)\\n")
print("DESGLOSE DE PRODUCTIVIDADES PARCIALES:")
print(df_parciales.round(2).to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Medición y Modelos de Productividad"
  questions={[
    {
      id: "q_prod_1",
      text: "Si el valor de la producción terminada es de $500,000 USD y los insumos totales suman $400,000 USD, ¿cuál es la Productividad Total de la empresa?",
      options: [
        { id: "a", text: "1.25 USD de producto por cada 1.00 USD de insumos consumidos (500000 / 400000 = 1.25)", isCorrect: true, explanation: "La Productividad Total de Sumanth es el cociente Output / Input = 500,000 / 400,000 = 1.25." },
        { id: "b", text: "0.80", isCorrect: false, explanation: "0.80 es la inversa (costo de insumos por dólar de producto)." },
        { id: "c", text: "$100,000 USD", isCorrect: false, explanation: "$100,000 es la utilidad neta en valor absoluto, no el ratio de productividad." }
      ]
    },
    {
      id: "q_prod_2",
      text: "¿Por qué es obligatorio utilizar precios constantes (deflactados) al comparar la productividad de dos años consecutivos?",
      options: [
        { id: "a", text: "Para aislar los efectos de la inflación de precios y medir el cambio genuino en la eficiencia física y técnica de transformación", isCorrect: true, explanation: "Si los precios de venta suben un 20% por inflación pero la fábrica produce las mismas unidades físicas con los mismos insumos, la productividad técnica no ha crecido." },
        { id: "b", text: "Porque la ley tributaria exige no usar decimales", isCorrect: false, explanation: "Es un principio de economía analítica e ingeniería, no una restricción fiscal." },
        { id: "c", text: "Para evitar tener que calcular la productividad de la energía", isCorrect: false, explanation: "Todos los insumos deben registrarse a precios constantes del periodo base." }
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
  console.log("✅ Curso administracion-industrial generado con éxito!");
}

build();
