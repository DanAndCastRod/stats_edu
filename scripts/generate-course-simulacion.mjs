import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'content', 'courses', 'simulacion');

const courseMetadata = {
  title: "Simulación de Sistemas",
  slug: "simulacion",
  code: "II863",
  description: "Modelado y simulación computacional de eventos discretos, generadores pseudoaleatorios, variables estocásticas, métodos de Monte Carlo y análisis de salida con validación estadística.",
  credits: 3,
  ects: 6,
  semester: 8,
  isMock: false
};

const modules = [
  {
    slug: "01-eventos-discretos",
    metadata: {
      title: "Simulación de Eventos Discretos",
      order: 1
    },
    lessons: [
      {
        slug: "01-mecanismo-reloj-fel",
        filename: "01-mecanismo-reloj-fel.mdx",
        content: `---
title: "Mecanismo del Reloj de Simulación y Lista de Eventos Futuros (FEL)"
order: 1
description: "Paradigma de simulación por eventos discretos (DES), avance de reloj por próximo evento vs pasos fijos y gestión de la FEL."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es la principal ventaja computacional del mecanismo de avance de tiempo por 'próximo evento' (Next-Event Time Advance) frente al avance por 'incremento fijo de tiempo' (Delta-t)?"
    options:
      - "Salta instantáneamente los periodos de inactividad directamente al instante del siguiente evento programado, evitando ciclos de CPU ociosos"
      - "Elimina por completo la necesidad de generar números aleatorios"
      - "Garantiza que la simulación termine siempre en menos de 1 segundo"
      - "Permite simular sistemas sin definir variables de estado"
    answer: 0
    explanation: "El mecanismo de próximo evento actualiza el reloj de simulación exactamente al tiempo del evento inminente extraído de la FEL, ignorando los lapsos continuos donde el estado del sistema no cambia."
  - question: "¿Qué estructura de datos es la más eficiente para implementar la Lista de Eventos Futuros (FEL) en un motor de simulación DES?"
    options:
      - "Una cola de prioridad (Priority Queue / Min-Heap) ordenada por el tiempo de ocurrencia del evento"
      - "Una pila LIFO (Last-In, First-Out)"
      - "Una matriz booleana estática"
      - "Un árbol binario no balanceado"
    answer: 0
    explanation: "La FEL requiere extraer continuamente el evento con el menor tiempo programado (operación O(log N) con un Min-Heap) e insertar nuevos eventos generados dinámicamente."
---

# Introducción

> En un sistema complejo como un centro logístico aeroportuario o una planta de ensamble automatizada, las ecuaciones analíticas cerradas (como las fórmulas de colas $M/M/s$) se vuelven intratables debido a bloqueos, fallas dependientes y prioridades dinámicas. La **Simulación de Eventos Discretos (DES)** es la técnica reina de la investigación de operaciones moderna para evaluar escenarios '¿qué pasaría si?' sin arriesgar capital real.

Un evento es una ocurrencia instantánea que cambia el vector de estado del sistema (e.g. arribo de una pieza, fin de mecanizado, avería de una banda transportadora).

<Callout type="info">
**La Lista de Eventos Futuros (FEL):** Es el corazón algorítmico del simulador. Contiene la lista cronológica ordenada de todos los eventos previstos para ocurrir en el futuro: $\\text{FEL} = \\{(e_1, t_1), (e_2, t_2), \\dots\\}$ con $t_1 \\le t_2 \\le \\dots$.
</Callout>

## Objetivos de Aprendizaje
- Comparar el enfoque de avance de reloj por pasos fijos (Time-Slicing) vs próximo evento (Next-Event).
- Diseñar la arquitectura fundamental del ciclo de simulación: inicialización, extracción del evento inminente, actualización del reloj y recolección de estadísticas.
- Implementar una Lista de Eventos Futuros (FEL) con colas de prioridad en Python.
- Simular un sistema de manufactura de una estación con arribos y servicios estocásticos.

---

# Fundamentos Teóricos

### Componentes de un Modelo DES

1. **Variables de Estado:** Colección de variables que describen el estado del sistema en el instante $t$ (e.g. $L(t)$ número de clientes en el sistema, $B(t) \\in \\{0, 1\\}$ estado del servidor).
2. **Reloj de Simulación ($T_{\\text{now}}$):** Variable global que registra el tiempo transcurrido en el sistema simulado.
3. **Lista de Eventos Futuros (FEL):**
   $$\\text{FEL} = \\{ (\\text{Tipo}_k, t_k) \\mid t_k \\ge T_{\\text{now}} \\}$$
   Donde el evento inminente es $(e^*, t^*) = \\arg\\min_{(e, t) \\in \\text{FEL}} t$.
4. **Rutinas de Evento:** Código que ejecuta la lógica de transición de estado cuando ocurre un evento particular.

### Algoritmo General del Reloj de Simulación

\`\`\`
1. Inicializar: T_now = 0, Estado inicial, Insertar primer arribo en FEL.
2. Mientras T_now < T_fin y FEL no esté vacía:
   a. Extraer (e*, t*) con menor t de la FEL.
   b. Actualizar acumuladores estadísticos para el lapso [T_now, t*].
   c. T_now = t*.
   d. Ejecutar rutina asociada al evento e* (puede programar nuevos eventos en FEL).
3. Calcular métricas globales de desempeño y generar reporte.
\`\`\`

---

# Laboratorio en Python: Motor DES de Estación de Inspección

\`\`\`python
import heapq
import numpy as np
import pandas as pd

# Definición de tipos de eventos
EVENTO_LLEGADA = 1
EVENTO_FIN_SERVICIO = 2

class SimuladorEstacionSimple:
    def __init__(self, tasa_llegada, tasa_servicio, tiempo_max):
        self.tasa_lambda = tasa_llegada
        self.tasa_mu = tasa_servicio
        self.tiempo_max = tiempo_max
        
        # Reloj y estado
        self.T_now = 0.0
        self.servidor_ocupado = False
        self.cola = 0
        
        # FEL (Priority Queue / Min-Heap de tuplas: (tiempo, tipo_evento))
        self.fel = []
        
        # Estadísticas acumuladas
        self.tiempo_ultimo_evento = 0.0
        self.area_bajo_Q = 0.0      # Integral de Q(t) dt para calcular Lq
        self.area_bajo_B = 0.0      # Integral de B(t) dt para calcular utilización
        self.total_atendidos = 0
        self.tiempos_espera = []
        self.tiempos_llegada_cola = []

    def programar_evento(self, tiempo, tipo):
        heapq.heappush(self.fel, (tiempo, tipo))

    def ejecutar(self):
        # Programar primer arribo en t > 0
        primer_arribo = np.random.exponential(1.0 / self.tasa_lambda)
        self.programar_evento(primer_arribo, EVENTO_LLEGADA)
        
        while self.fel and self.T_now < self.tiempo_max:
            t_evento, tipo_evento = heapq.heappop(self.fel)
            
            # 1. Actualizar acumuladores de área temporal
            dt = t_evento - self.T_now
            self.area_bajo_Q += self.cola * dt
            self.area_bajo_B += (1.0 if self.servidor_ocupado else 0.0) * dt
            self.T_now = t_evento
            
            # 2. Despachar rutina de evento
            if tipo_evento == EVENTO_LLEGADA:
                self.rutina_llegada()
            elif tipo_evento == EVENTO_FIN_SERVICIO:
                self.rutina_fin_servicio()
                
        return self.generar_reporte()

    def rutina_llegada(self):
        # Programar el siguiente arribo futuro
        proximo_dt = np.random.exponential(1.0 / self.tasa_lambda)
        if self.T_now + proximo_dt <= self.tiempo_max:
            self.programar_evento(self.T_now + proximo_dt, EVENTO_LLEGADA)
            
        if self.servidor_ocupado:
            self.cola += 1
            self.tiempos_llegada_cola.append(self.T_now)
        else:
            self.servidor_ocupado = True
            self.tiempos_espera.append(0.0)  # Pasa directo sin esperar
            tiempo_servicio = np.random.exponential(1.0 / self.tasa_mu)
            self.programar_evento(self.T_now + tiempo_servicio, EVENTO_FIN_SERVICIO)

    def rutina_fin_servicio(self):
        self.total_atendidos += 1
        if self.cola > 0:
            self.cola -= 1
            t_llegada = self.tiempos_llegada_cola.pop(0)
            self.tiempos_espera.append(self.T_now - t_llegada)
            
            tiempo_servicio = np.random.exponential(1.0 / self.tasa_mu)
            self.programar_evento(self.T_now + tiempo_servicio, EVENTO_FIN_SERVICIO)
        else:
            self.servidor_ocupado = False

    def generar_reporte(self):
        Lq = self.area_bajo_Q / self.T_now
        utilizacion = self.area_bajo_B / self.T_now
        Wq = np.mean(self.tiempos_espera) if self.tiempos_espera else 0.0
        return {
            'Tiempo_Simulado_h': self.T_now,
            'Total_Atendidos': self.total_atendidos,
            'Utilizacion_Servidor': utilizacion,
            'Longitud_Media_Cola (Lq)': Lq,
            'Espera_Media_Cola_min (Wq)': Wq * 60
        }

np.random.seed(42)
sim = SimuladorEstacionSimple(tasa_llegada=5.0, tasa_servicio=6.0, tiempo_max=1000.0)
resultados = sim.ejecutar()

print("RESULTADOS DE SIMULACIÓN DE EVENTOS DISCRETOS (DES):")
for k, v in resultados.items():
    print(f"  {k}: {v:.4f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Reloj de Simulación y FEL"
  questions={[
    {
      id: "q_sim_rel_1",
      text: "¿Qué ocurre con el reloj de simulación T_now cuando la estación se queda sin clientes y el próximo arribo está programado en 45 minutos?",
      options: [
        { id: "a", text: "T_now salta de inmediato 45 minutos hacia adelante hasta el instante exacto del arribo sin iterar minuto a minuto", isCorrect: true, explanation: "Esa es la esencia del mecanismo Next-Event: no hay cómputo intermedio en los periodos sin eventos programados." },
        { id: "b", text: "El reloj se congela y arroja un error de desbordamiento", isCorrect: false, explanation: "El avance de eventos discretos maneja perfectamente lapsos vacíos." },
        { id: "c", text: "Se decrementa hacia cero", isCorrect: false, explanation: "El tiempo simulado es una variable monótonamente no decreciente." }
      ]
    },
    {
      id: "q_sim_rel_2",
      text: "Para calcular el número promedio de piezas en cola Lq a lo largo del tiempo, ¿qué cálculo integral se realiza?",
      options: [
        { id: "a", text: "Lq = (1 / T_simulado) * int_0^{T_simulado} Q(t) dt", isCorrect: true, explanation: "Es el promedio temporal ponderado: el área bajo la curva escalonada de piezas en cola dividida por el horizonte total de simulación." },
        { id: "b", text: "Lq = max(Q(t))", isCorrect: false, explanation: "El valor máximo es la capacidad requerida de almacenamiento, no el promedio." },
        { id: "c", text: "Lq = Q(T_final)", isCorrect: false, explanation: "El valor final es solo una realización puntual al término del ensayo." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-arquitectura-simulacion",
        filename: "02-arquitectura-simulacion.mdx",
        content: `---
title: "Arquitectura y Estructura de Entidades en Simulación"
order: 2
description: "Modelado orientado a objetos para DES: Entidades dinámicas, recursos estáticos, atributos, variables globales y acumuladores estadísticos."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "En la arquitectura conceptual de simulación, ¿cuál es la diferencia entre una 'Entidad' y un 'Recurso'?"
    options:
      - "Las entidades son elementos dinámicos transitorios que fluyen por el modelo (ej. piezas, clientes); los recursos son elementos estáticos que proveen servicio (ej. máquinas, operadores)"
      - "Las entidades siempre son virtuales y los recursos son físicos"
      - "Los recursos se destruyen al finalizar su ciclo y las entidades permanecen infinitamente"
      - "No existe ninguna diferencia conceptual"
    answer: 0
    explanation: "Las entidades se crean, adquieren recursos, experimentan demoras estocásticas y finalmente son destruidas/despachadas del sistema. Los recursos tienen capacidad fija y son capturados y liberados por las entidades."
  - question: "¿Por qué es crucial asociar 'atributos' individuales a cada entidad en lugar de usar variables globales del sistema?"
    options:
      - "Porque cada entidad posee características únicas (tiempo de arribo, tipo de pieza, ruta de maquinado, prioridad) que determinan su tratamiento personalizado"
      - "Porque las variables globales consumen demasiada memoria RAM"
      - "Porque los atributos impiden que ocurran eventos de parada"
      - "Para evitar tener que compilar el código de simulación"
    answer: 0
    explanation: "Los atributos viajan con la entidad individual a través de toda la red de colas y recursos, permitiendo calcular métricas individuales como el tiempo de ciclo (Lead Time) exacto de cada lote."
---

# Introducción

> Construir una simulación para una línea de producción de 20 estaciones no consiste en escribir un script gigante y enredado. Requiere una **arquitectura de software limpia y desacoplada** basada en programación orientada a objetos (POO), donde cada componente del sistema físico tiene su gemelo digital exacto.

Un simulador industrial robusto se compone de tres capas: capa de entidades y recursos, capa de control de eventos y reloj, y capa de análisis estadístico.

<Callout type="info">
**Ciclo de Vida de una Entidad:**
1. *Create:* Nace en el sistema con atributos iniciales (timestamp de creación).
2. *Queue:* Espera en una o varias colas lógicas.
3. *Seize:* Captura una o más unidades de un recurso.
4. *Delay:* Permanece un tiempo estocástico de procesamiento.
5. *Release:* Libera el recurso para la siguiente entidad en cola.
6. *Dispose:* Sale del sistema registrando estadísticas históricas.
</Callout>

## Objetivos de Aprendizaje
- Modelar un sistema mediante la taxonomía: Entidades, Atributos, Recursos, Estados y Variables Globales.
- Implementar el patrón arquitectónico *Seize-Delay-Release* estándar en simulación industrial.
- Gestionar colas con disciplinas de prioridad (FIFO, LIFO, SPT - *Shortest Processing Time*).
- Programar un gemelo digital escalable con Python.

---

# Fundamentos Teóricos

### Taxonomía de Modelado DES

| Componente | Definición | Ejemplo en Manufactura |
| :--- | :--- | :--- |
| **Entidad** | Objeto dinámico que se desplaza por el modelo | Chasis de automóvil, orden de compra |
| **Atributo** | Propiedad intrínseca local que viaja con la entidad | \`tiempo_creacion\`, \`prioridad\`, \`tipo_modelo\` |
| **Recurso** | Objeto estático con capacidad $C$ que atiende entidades | Robot soldador ($C=1$), cuadrilla de ensamble ($C=4$) |
| **Estado del Sistema** | Vector instantáneo de variables | $S(t) = [Q_1(t), B_1(t), Q_2(t), B_2(t)]$ |
| **Variable Global** | Variable visible para todas las rutinas del modelo | \`costo_acumulado\`, \`meta_produccion_diaria\` |
| **Acumulador Estadístico** | Registro para calcular medias y varianzas de salida | \`suma_tiempos_flujo\`, \`conteo_piezas_buenas\` |

---

# Laboratorio en Python: Gemelo Digital de Taller Metalmecánico con Prioridades

\`\`\`python
import heapq
import numpy as np
import pandas as pd

class EntidadLote:
    def __init__(self, id_lote, t_llegada, tipo_prioridad, tiempo_proceso):
        self.id = id_lote
        self.t_llegada = t_llegada
        self.prioridad = tipo_prioridad  # 1: Alta (Express), 2: Normal
        self.tiempo_proceso = tiempo_proceso
        self.t_inicio_servicio = None
        self.t_salida = None

    # Ordenamiento en cola: menor número de prioridad se atiende primero (Min-Priority)
    def __lt__(self, other):
        if self.prioridad == other.prioridad:
            return self.t_llegada < other.t_llegada  # FIFO para misma prioridad
        return self.prioridad < other.prioridad

class SimuladorTaller:
    def __init__(self, n_lotes=50):
        self.T_now = 0.0
        self.fel = []
        self.cola_espera = []  # Priority queue de EntidadLote
        self.servidor_libre = True
        self.historial_completados = []
        
        # Generar arribos de lotes
        t = 0.0
        for i in range(1, n_lotes + 1):
            t += np.random.exponential(15.0)  # Arribo cada 15 min en promedio
            prio = 1 if np.random.rand() < 0.25 else 2  # 25% son urgentes
            tiempo_proc = np.random.uniform(8.0, 18.0)
            lote = EntidadLote(i, t, prio, tiempo_proc)
            heapq.heappush(self.fel, (t, "LLEGADA", lote))

    def simular(self):
        while self.fel:
            t_evento, tipo, lote = heapq.heappop(self.fel)
            self.T_now = t_evento
            
            if tipo == "LLEGADA":
                if self.servidor_libre:
                    self.iniciar_servicio(lote)
                else:
                    heapq.heappush(self.cola_espera, lote)
                    
            elif tipo == "FIN_SERVICIO":
                lote.t_salida = self.T_now
                self.historial_completados.append(lote)
                
                if self.cola_espera:
                    siguiente_lote = heapq.heappop(self.cola_espera)
                    self.iniciar_servicio(siguiente_lote)
                else:
                    self.servidor_libre = True

    def iniciar_servicio(self, lote):
        self.servidor_libre = False
        lote.t_inicio_servicio = self.T_now
        t_fin = self.T_now + lote.tiempo_proceso
        heapq.heappush(self.fel, (t_fin, "FIN_SERVICIO", lote))

np.random.seed(101)
taller = SimuladorTaller(n_lotes=40)
taller.simular()

df_lotes = pd.DataFrame([{
    'ID': e.id,
    'Prioridad': 'Express' if e.prioridad == 1 else 'Normal',
    'Llegada_min': e.t_llegada,
    'Espera_Cola_min': e.t_inicio_servicio - e.t_llegada,
    'Tiempo_Proceso_min': e.tiempo_proceso,
    'Tiempo_Ciclo_min': e.t_salida - e.t_llegada
} for e in taller.historial_completados])

print("RESUMEN DE TIEMPOS DE CICLO POR TIPO DE PRIORIDAD:")
resumen = df_lotes.groupby('Prioridad')[['Espera_Cola_min', 'Tiempo_Ciclo_min']].mean()
print(resumen.round(2))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Arquitectura y Modelado por Entidades"
  questions={[
    {
      id: "q_arq_1",
      text: "¿Cuál es la consecuencia de implementar la regla SPT (Shortest Processing Time) en lugar de FIFO en la cola de un recurso?",
      options: [
        { id: "a", text: "Minimiza el tiempo promedio de flujo (tiempo de permanencia) global de las piezas en el taller", isCorrect: true, explanation: "El teorema de Smith demuestra que ordenar por tiempo de procesamiento más corto minimiza el tiempo medio de permanencia, aunque puede penalizar a los trabajos largos." },
        { id: "b", text: "Duplica la capacidad del servidor de forma física", isCorrect: false, explanation: "La regla de secuenciación no modifica la velocidad nominal de corte o proceso de la máquina." },
        { id: "c", text: "Elimina la necesidad de registrar eventos de fin de servicio", isCorrect: false, explanation: "Los eventos de fin de servicio continúan ocurriendo con normalidad." }
      ]
    },
    {
      id: "q_arq_2",
      text: "¿Qué información fundamental debe registrar el timestamp de creación de una entidad?",
      options: [
        { id: "a", text: "El instante exacto T_now en que la entidad ingresó al sistema para permitir calcular su Lead Time total al salir (T_salida - T_creacion)", isCorrect: true, explanation: "El atributo tiempo_arribo es indispensable para evaluar el tiempo de ciclo, retrasos y niveles de servicio al cliente." },
        { id: "b", text: "La hora del reloj del sistema operativo de la computadora", isCorrect: false, explanation: "La simulación corre en su propio tiempo virtual T_now, independiente del tiempo real de CPU." },
        { id: "c", text: "El número de líneas de código del programa", isCorrect: false, explanation: "Métrica irrelevante para el gemelo digital." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "02-generacion-pseudoaleatorios",
    metadata: {
      title: "Generación de Pseudoaleatorios",
      order: 2
    },
    lessons: [
      {
        slug: "01-generadores-congruenciales-lineales",
        filename: "01-generadores-congruenciales-lineales.mdx",
        content: `---
title: "Generadores Congruenciales Lineales (GCL)"
order: 1
description: "Algoritmos congruenciales mixtos y multiplicativos, Teorema de Hull-Dobell para periodo completo y propiedades estadísticas de secuencias U(0,1)."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Qué condiciones exige el Teorema de Hull-Dobell para que un Generador Congruencial Lineal mixto X_{i+1} = (a * X_i + c) mod m tenga periodo completo igual a m?"
    options:
      - "1. c y m son coprimos; 2. (a - 1) es divisible por todos los factores primos de m; 3. Si m es divisible por 4, (a - 1) es divisible por 4"
      - "1. a = 1; 2. c = 0; 3. m es un número primo"
      - "1. a > m; 2. c < 0; 3. Semilla X_0 = 0"
      - "1. m debe ser una potencia de 10"
    answer: 0
    explanation: "El Teorema de Hull-Dobell (1962) proporciona las condiciones necesarias y suficientes para que el GCL mixto recorra los m residuos módulo m antes de repetirse, maximizando el ciclo de generación."
  - question: "¿Por qué los números producidos por una computadora se denominan 'pseudoaleatorios'?"
    options:
      - "Porque provienen de algoritmos matemáticos determinísticos completamente reproducibles, aunque superan con éxito pruebas estadísticas de aleatoriedad"
      - "Porque contienen errores aritméticos de coma flotante"
      - "Porque siempre son números enteros pares"
      - "Porque solo pueden usarse en simulaciones pedagógicas"
    answer: 0
    explanation: "Dada la semilla inicial X_0, la secuencia está 100% determinada y se puede replicar con exactitud; no obstante, su distribución y correlación imitan el comportamiento de variables U(0,1) independientes."
---

# Introducción

> En el corazón de toda simulación estocástica reside una paradoja: las computadoras son máquinas determinísticas diseñadas para jamás equivocarse, pero la simulación exige incertidumbre. Para resolver esto, recurrimos a **números pseudoaleatorios**.

Un generador confiable debe producir números en el intervalo $[0, 1)$ que sean indistinguibles de una secuencia de variables aleatorias independientes e idénticamente distribuidas con distribución $\\mathcal{U}(0, 1)$.

<Callout type="info">
**Periodo de un Generador:** Dado que la memoria de un computador es finita, toda secuencia recursiva de números pseudoaleatorios tarde o temprano se repite en un ciclo cerrado. La longitud de este ciclo antes de repetirse es el **periodo**.
</Callout>

## Objetivos de Aprendizaje
- Comprender la formulación de los Generadores Congruenciales Lineales (GCL).
- Aplicar el Teorema de Hull-Dobell para garantizar periodo completo en generadores mixtos.
- Diferenciar entre generadores multiplicativos ($c = 0$) y mixtos ($c > 0$).
- Implementar un generador GCL y evaluar el efecto de la semilla en Python.

---

# Fundamentos Teóricos

### Ecuación de Recurrencia del GCL

Propuesto por Derrick Lehmer en 1951, el GCL genera una secuencia de enteros no negativos $\\{X_i\\}$ mediante:

$$X_{i+1} = (a X_i + c) \\pmod m$$

Donde:
- $m$: Módulo ($m > 0$). Define el límite superior estricto del periodo.
- $a$: Multiplicador ($0 < a < m$).
- $c$: Constante aditiva o incremento ($0 \\le c < m$). Si $c = 0$, es multiplicativo; si $c > 0$, es mixto.
- $X_0$: Semilla inicial ($0 \\le X_0 < m$).

El número pseudoaleatorio normalizado en el intervalo $[0, 1)$ se obtiene como:

$$R_i = \\frac{X_i}{m}$$

### Teorema de Hull-Dobell (Periodo Completo)

Un GCL mixto tiene periodo completo igual a $m$ para cualquier semilla $X_0$ si y solo si:
1. $\\gcd(c, m) = 1$ (el incremento $c$ y el módulo $m$ son primos relativos).
2. Para todo número primo $p$ que divida a $m$, $(a - 1)$ es múltiplo de $p$ ($(a - 1) \\equiv 0 \\pmod p$).
3. Si $m$ es divisible por 4, entonces $(a - 1)$ debe ser divisible por 4 ($(a - 1) \\equiv 0 \\pmod 4$).

---

# Laboratorio en Python: Implementación y Análisis de un GCL

\`\`\`python
import numpy as np
import pandas as pd

def gcl_generador(semilla, a, c, m, n):
    """Generador Congruencial Lineal X_{i+1} = (a * X_i + c) mod m"""
    X = semilla
    valores_X = []
    valores_R = []
    
    for _ in range(n):
        X = (a * X + c) % m
        valores_X.append(X)
        valores_R.append(X / m)
        
    return valores_X, valores_R

# Caso 1: Generador Pobre (periodo corto por malos parámetros)
# m = 16, a = 5, c = 3 (Hull-Dobell: m=16=2^4, p=2, a-1=4 divisible por 4? Sí. c=3 coprimo con 16? Sí) -> Periodo = 16
X_1, R_1 = gcl_generador(semilla=7, a=5, c=3, m=16, n=20)

# Caso 2: Parámetros del estándar MINSTD de Park & Miller (multiplicativo c=0)
# m = 2^31 - 1 = 2147483647 (primo de Mersenne), a = 7^5 = 16807
m_minstd = 2**31 - 1
a_minstd = 16807
X_2, R_2 = gcl_generador(semilla=123456, a=a_minstd, c=0, m=m_minstd, n=5)

print("CASO 1: GCL PEQUEÑO (m=16, a=5, c=3, Semilla=7):")
df_peq = pd.DataFrame({'Paso': range(1, 21), 'X_i': X_1, 'R_i': R_1})
print(df_peq.head(18).to_string(index=False))
print(f"\\nSe observa que en el paso 17 se repite el valor inicial X_1={X_1[0]} (Periodo = 16).")

print("\\nCASO 2: GCL ESTÁNDAR PARK-MILLER (5 primeras muestras normalizadas U(0,1)):")
for i, r in enumerate(R_2, 1):
    print(f"  R_{i}: {r:.8f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Generadores Congruenciales Lineales"
  questions={[
    {
      id: "q_gcl_1",
      text: "Si se diseña un GCL con módulo m = 64 y constante c = 0 (multiplicativo), ¿cuál es el periodo máximo alcanzable?",
      options: [
        { id: "a", text: "m / 4 = 16 (los generadores multiplicativos con m = 2^k tienen un periodo máximo de m/4)", isCorrect: true, explanation: "En generadores puramente multiplicativos con potencias de 2, el periodo máximo teórico no puede superar m/4 = 16." },
        { id: "b", text: "64", isCorrect: false, explanation: "Un generador multiplicativo nunca puede alcanzar periodo completo m porque X_i = 0 es un punto fijo absorbente." },
        { id: "c", text: "63", isCorrect: false, explanation: "El periodo m - 1 solo se alcanza si m es un número primo." }
      ]
    },
    {
      id: "q_gcl_2",
      text: "¿Por qué el generador Mersenne Twister (MT19937) es el estándar actual en NumPy y Python moderno frente a los GCL tradicionales?",
      options: [
        { id: "a", text: "Posee un periodo gigantesco de 2^{19937} - 1 y garantiza equidistribución hasta en 623 dimensiones", isCorrect: true, explanation: "Los GCL sufren del teorema de Marsaglia (los puntos caen en hiperplanos). Mersenne Twister supera estas limitaciones estructurales para simulación científica." },
        { id: "b", text: "Porque utiliza números negativos para simular mejor el azar", isCorrect: false, explanation: "Las variables U(0,1) son estrictamente no negativas." },
        { id: "c", text: "Porque no requiere una semilla inicial", isCorrect: false, explanation: "Todo generador pseudoaleatorio algorítmico requiere un estado o semilla inicial." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-pruebas-uniformidad-independencia",
        filename: "02-pruebas-uniformidad-independencia.mdx",
        content: `---
title: "Pruebas Estadísticas de Uniformidad e Independencia"
order: 2
description: "Validación de generadores pseudoaleatorios: Pruebas de Chi-cuadrado y Kolmogorov-Smirnov para uniformidad, pruebas de Poker y Rachas para independencia."
bloomLevel: "ANALYZE"
estimatedMinutes: 50
quiz:
  - question: "¿Qué hipótesis estadística nula se contrasta formalmente en la prueba de bondad de ajuste de Chi-cuadrado para uniformidad de números pseudoaleatorios?"
    options:
      - "H0: Los números generados provienen de una distribución uniforme continua U(0, 1)"
      - "H0: Los números generados son estrictamente independientes"
      - "H0: La media muestral es exactamente 0.5 y la varianza es 1.0"
      - "H0: El generador tiene periodo infinito"
    answer: 0
    explanation: "La prueba de Chi-cuadrado particiona el intervalo [0, 1) en k subintervalos y compara las frecuencias observadas con las esperadas bajo el supuesto de distribución uniforme U(0,1)."
  - question: "¿Cuál es el objetivo principal de la prueba de rachas (Runs Test) arriba y abajo de la media?"
    options:
      - "Evaluar la hipótesis de independencia serial (ausencia de patrones o tendencias en la secuencia temporal)"
      - "Determinar el valor de la semilla óptima"
      - "Verificar que no haya números repetidos en la muestra"
      - "Calcular el tiempo de ejecución en microsegundos"
    answer: 0
    explanation: "La prueba de rachas detecta autocorrelación temporal; secuencias con excesivas o muy escasas rachas de valores crecientes/decrecientes o respecto a la media evidencian dependencia serial."
---

# Introducción

> Antes de confiar millones de dólares en la simulación de una nueva cadena de frío farmacéutica, el ingeniero debe certificar rigurosamente su generador pseudoaleatorio. Un generador defectuoso puede sesgar las probabilidades de quiebre de stock sin emitir ningún mensaje de error en la consola.

Para validar que una secuencia $\\{R_i\\}$ es apta para simulación, debe superar dos pruebas no negociables:
1. **Uniformidad:** Los números deben distribuirse de manera homogénea en $[0, 1)$.
2. **Independencia:** El valor de $R_{i+1}$ no puede ser predicho a partir de $R_i$.

<Callout type="info">
**Riesgo de Aceptación:** Si el $p$-valor de la prueba estadística es menor a $\\alpha = 0.05$, se rechaza la hipótesis de que los números son uniformes o independientes, descartando el generador.
</Callout>

## Objetivos de Aprendizaje
- Aplicar la prueba de Chi-cuadrado de bondad de ajuste para uniformidad con frecuencias observadas vs esperadas.
- Aplicar la prueba de Kolmogorov-Smirnov (K-S) para muestras continuas reducidas.
- Evaluar la independencia serial mediante la Prueba de Rachas respecto a la mediana.
- Implementar la suite completa de contrastes en Python con SciPy.

---

# Fundamentos Teóricos

### Prueba de Chi-Cuadrado de Uniformidad

Se divide el intervalo $[0, 1)$ en $k$ clases de igual longitud $1/k$. Para $n$ números observados, la frecuencia esperada bajo uniformidad es:

$$E_j = \\frac{n}{k}, \\quad j = 1, \\dots, k$$

El estadístico de prueba es:

$$\\chi_0^2 = \\sum_{j=1}^k \\frac{(O_j - E_j)^2}{E_j} \\sim \\chi_{k - 1}^2$$

Si $\\chi_0^2 < \\chi_{\\alpha, k-1}^2$ (o $p$-valor $> \\alpha$), no se rechaza la hipótesis de uniformidad.

### Prueba de Kolmogorov-Smirnov (K-S)

Compara la función de distribución empírica $F_n(x)$ con la teórica $F(x) = x$ para $x \\in [0, 1]$:

$$D = \\max_{1 \\le i \\le n} \\left( \\max\\left( \\left| \\frac{i}{n} - R_{(i)} \\right|, \\left| R_{(i)} - \\frac{i - 1}{n} \\right| \\right) \\right)$$

Donde $R_{(1)} \\le R_{(2)} \\le \\dots \\le R_{(n)}$ son los valores ordenados.

### Prueba de Rachas Arriba y Abajo de la Mediana

Se asigna un signo '+' si $R_i > 0.5$ y '-' si $R_i \\le 0.5$. Se cuenta el número de rachas observadas $B$.
Para $n_1$ signos '+' y $n_2$ signos '-':

$$\\mu_B = \\frac{2 n_1 n_2}{n_1 + n_2} + 1$$

$$\\sigma_B^2 = \\frac{2 n_1 n_2 (2 n_1 n_2 - n_1 - n_2)}{(n_1 + n_2)^2 (n_1 + n_2 - 1)}$$

$$Z_0 = \\frac{B - \\mu_B}{\\sigma_B} \\sim \\mathcal{N}(0, 1)$$

---

# Laboratorio en Python: Auditoría Estadística de Números Pseudoaleatorios

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

np.random.seed(42)
n = 500  # Muestra de números a auditar
datos_u = np.random.uniform(0.0, 1.0, size=n)

# 1. Prueba de Uniformidad: Chi-Cuadrado
k = 10  # 10 clases: [0.0, 0.1), [0.1, 0.2), ..., [0.9, 1.0)
frec_obs, bordes = np.histogram(datos_u, bins=k, range=(0.0, 1.0))
frec_esp = np.full(k, n / k)

chi2_stat = np.sum((frec_obs - frec_esp)**2 / frec_esp)
chi2_p = 1.0 - stats.chi2.cdf(chi2_stat, df=k - 1)

# 2. Prueba de Uniformidad: Kolmogorov-Smirnov (K-S)
ks_stat, ks_p = stats.kstest(datos_u, 'uniform')

# 3. Prueba de Independencia: Rachas sobre la mediana (0.5)
signos = (datos_u > 0.5).astype(int)
n1 = np.sum(signos == 1)
n2 = np.sum(signos == 0)

# Contar número de rachas
cambios = np.diff(signos) != 0
rachas = 1 + np.sum(cambios)

mu_rachas = (2.0 * n1 * n2) / (n1 + n2) + 1.0
var_rachas = (2.0 * n1 * n2 * (2.0 * n1 * n2 - n1 - n2)) / (((n1 + n2)**2) * (n1 + n2 - 1.0))
z_rachas = (rachas - mu_rachas) / np.sqrt(var_rachas)
p_rachas = 2.0 * (1.0 - stats.norm.cdf(np.abs(z_rachas)))

df_auditoria = pd.DataFrame([
    {'Prueba': 'Chi-Cuadrado (Uniformidad)', 'Estadistico': chi2_stat, 'p-valor': chi2_p, 'Conclusion (alfa=0.05)': 'Aprobado (Uniforme)' if chi2_p > 0.05 else 'Rechazado'},
    {'Prueba': 'Kolmogorov-Smirnov (Uniformidad)', 'Estadistico': ks_stat, 'p-valor': ks_p, 'Conclusion (alfa=0.05)': 'Aprobado (Uniforme)' if ks_p > 0.05 else 'Rechazado'},
    {'Prueba': 'Rachas vs Mediana (Independencia)', 'Estadistico': z_rachas, 'p-valor': p_rachas, 'Conclusion (alfa=0.05)': 'Aprobado (Independiente)' if p_rachas > 0.05 else 'Rechazado'}
])

print("REPORTE DE AUDITORÍA ESTADÍSTICA DE NÚMEROS PSEUDOALEATORIOS:")
print(df_auditoria.round(4).to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Pruebas de Uniformidad e Independencia"
  questions={[
    {
      id: "q_test_1",
      text: "Si al aplicar la prueba de Kolmogorov-Smirnov a un conjunto de números pseudoaleatorios se obtiene un p-valor = 0.002, ¿cuál es la decisión correcta?",
      options: [
        { id: "a", text: "Rechazar la hipótesis de uniformidad con un nivel de significancia del 5% (el generador no es uniforme)", isCorrect: true, explanation: "Dado que p-valor = 0.002 < 0.05, existe evidencia estadística concluyente para rechazar que la muestra provenga de una distribución U(0,1)." },
        { id: "b", text: "Aceptar que el generador es perfectamente uniforme", isCorrect: false, explanation: "Un p-valor pequeño es la señal formal de discrepancia con la hipótesis nula." },
        { id: "c", text: "Concluir que los números son independientes", isCorrect: false, explanation: "K-S no evalúa independencia serial temporal." }
      ]
    },
    {
      id: "q_test_2",
      text: "¿Qué anomalía temporal revela un número de rachas significativamente inferior al esperado (Z muy negativo en la prueba de rachas)?",
      options: [
        { id: "a", text: "Inercia o autocorrelación positiva (los valores altos tienden a ser seguidos por valores altos y viceversa)", isCorrect: true, explanation: "Muy pocas rachas implican que el generador se queda 'estancado' por periodos prolongados por encima o por debajo de la media." },
        { id: "b", text: "Oscilación excesiva y rápida entre extremos", isCorrect: false, explanation: "Oscilaciones rápidas generan un exceso de rachas (Z muy positivo)." },
        { id: "c", text: "Que todos los números generados son iguales a cero", isCorrect: false, explanation: "No necesariamente cero, refleja persistencia de signo." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "03-variables-aleatorias-montecarlo",
    metadata: {
      title: "Variables Aleatorias y Monte Carlo",
      order: 3
    },
    lessons: [
      {
        slug: "01-transformada-inversa-rechazo",
        filename: "01-transformada-inversa-rechazo.mdx",
        content: `---
title: "Método de la Transformada Inversa y Aceptación-Rechazo"
order: 1
description: "Algoritmos para transformar U(0,1) en variables con distribuciones específicas: Transformada inversa F^(-1)(U) y método de Aceptación-Rechazo de von Neumann."
bloomLevel: "APPLY"
estimatedMinutes: 50
quiz:
  - question: "¿Cuál es el principio matemático fundamental del Método de la Transformada Inversa?"
    options:
      - "Si U ~ U(0, 1) y F(x) es una función de distribución acumulada continua invertible, entonces X = F^(-1)(U) tiene exactamente la distribución F"
      - "Elevar U al cuadrado para duplicar la varianza"
      - "Restar la media y dividir por la desviación estándar de U"
      - "Aceptar solo números pares generados por el GCL"
    answer: 0
    explanation: "Dado que F(X) sigue una distribución uniforme continua en [0, 1] (Teorema de la transformación integral de probabilidad), calcular X = F^(-1)(U) genera variables aleatorias continuas idénticas a F."
  - question: "¿Qué condición de acotamiento es indispensable para aplicar el método de Aceptación y Rechazo de von Neumann?"
    options:
      - "La razón f(x) / g(x) debe estar acotada por una constante finita c >= 1 para todo x en el soporte, donde g(x) es la densidad propuesta"
      - "La función f(x) debe ser estrictamente decreciente"
      - "El soporte debe ser un número entero"
      - "c debe ser menor a 0"
    answer: 0
    explanation: "Se requiere encontrar una constante c tal que f(x) <= c * g(x) para todo x, garantizando que la probabilidad de aceptación p(x) = f(x)/(c * g(x)) esté entre 0 y 1."
---

# Introducción

> Los generadores de números pseudoaleatorios entregan variables $U \\sim \\mathcal{U}(0, 1)$. Sin embargo, en el mundo real, los tiempos de procesamiento en una troqueladora no son uniformes: siguen una distribución log-normal, los tiempos de reparación siguen una distribución de Weibull y la demanda de repuestos sigue una distribución de Poisson.

¿Cómo convertimos una variable uniforme $U$ en una variable aleatoria $X$ con cualquier distribución teórica requerida por el modelo de ingeniería?

<Callout type="info">
**Eficiencia de Aceptación:** En el método de aceptación y rechazo, la probabilidad de aceptar un candidato generado es exactamente $1/c$. Un buen diseño requiere elegir $g(x)$ tal que $c$ sea lo más cercano posible a 1 para no desperdiciar ciclos de CPU.
</Callout>

## Objetivos de Aprendizaje
- Deducir y aplicar el Método de la Transformada Inversa para distribuciones Exponencial, Triangular y Weibull.
- Comprender la lógica geométrica del método de Aceptación-Rechazo de John von Neumann.
- Generar variables empíricas continuas a partir de tablas discretas.
- Implementar los generadores en Python y validar contra funciones nativas de SciPy.

---

# Fundamentos Teóricos

### Método de la Transformada Inversa

Sea $X$ una variable aleatoria continua con función de distribución acumulada $F(x) = \\mathbb{P}(X \\le x)$, estrictamente creciente en su soporte:

$$U = F(X) \\implies X = F^{-1}(U), \\quad U \\sim \\mathcal{U}(0, 1)$$

#### Caso 1: Distribución Exponencial ($X \\sim \\text{Exp}(\\lambda)$)

$$F(x) = 1 - e^{-\\lambda x} = U \\implies e^{-\\lambda x} = 1 - U$$

$$X = -\\frac{1}{\\lambda} \\ln(1 - U) \\stackrel{d}{=} -\\frac{1}{\\lambda} \\ln(U)$$

#### Caso 2: Distribución de Weibull ($X \\sim \\text{Weibull}(\\beta, \\eta)$)

$$F(x) = 1 - \\exp\\left( -\\left(\\frac{x}{\\eta}\\right)^\\beta \\right) = U$$

$$X = \\eta \\cdot \\left[ -\\ln(1 - U) \\right]^{1/\\beta}$$

### Método de Aceptación y Rechazo

Cuando $F(x)$ no posee inversa analítica cerrada (ej. distribuciones Beta, Gamma, Normal):
1. Se selecciona una densidad instrumental o propuesta $g(x)$ fácil de simular.
2. Se determina una constante $c$ tal que:
   $$c = \\sup_x \\frac{f(x)}{g(x)} \\ge 1$$
3. Algoritmo:
   - Generar $Y \\sim g(x)$ y $U \\sim \\mathcal{U}(0, 1)$ independientes.
   - Si $U \\le \\frac{f(Y)}{c \\cdot g(Y)}$, **aceptar** $X = Y$.
   - En caso contrario, **rechazar** y repetir.

---

# Laboratorio en Python: Generación de Distribución Exponencial y Beta

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

np.random.seed(42)
n_muestras = 5000

# 1. Transformada Inversa: Exponencial (lambda = 0.5 -> Media = 2.0)
tasa_l = 0.5
U_exp = np.random.uniform(0.0, 1.0, size=n_muestras)
X_exp_ti = - (1.0 / tasa_l) * np.log(1.0 - U_exp)

# 2. Aceptación-Rechazo: Distribución Beta(alpha=2, beta=3) en [0, 1]
# f(x) = 12 * x * (1 - x)^2
# Densidad instrumental: g(x) = 1 (Uniforme(0, 1))
# Máximo de f(x)/g(x) en x = 1/3: c = 12 * (1/3) * (2/3)^2 = 16/9 = 1.7778
c_optimo = 16.0 / 9.0

def generar_beta_rechazo(n):
    aceptados = []
    intentos = 0
    while len(aceptados) < n:
        intentos += 1
        Y = np.random.uniform(0.0, 1.0)
        U = np.random.uniform(0.0, 1.0)
        f_y = 12.0 * Y * ((1.0 - Y)**2)
        if U <= f_y / (c_optimo * 1.0):
            aceptados.append(Y)
    return np.array(aceptados), intentos

X_beta, total_intentos = generar_beta_rechazo(n_muestras)
eficiencia_obs = n_muestras / total_intentos
eficiencia_teo = 1.0 / c_optimo

print("VALIDACIÓN DE GENERADORES ESTOCÁSTICOS:")
print(f"Exponencial TI: Media Muestral = {np.mean(X_exp_ti):.4f} (Teórica = {1.0/tasa_l:.4f})")
print(f"Beta Aceptación-Rechazo: Media Muestral = {np.mean(X_beta):.4f} (Teórica = {2.0/(2.0+3.0):.4f})")
print(f"Eficiencia observada de aceptación: {eficiencia_obs*100:.2f}% (Teórica 1/c = {eficiencia_teo*100:.2f}%)")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Transformada Inversa y Aceptación-Rechazo"
  questions={[
    {
      id: "q_ti_1",
      text: "Si se desea simular una variable aleatoria continua con función F(x) = x^2 para x en [0, 1], ¿cuál es la fórmula de la transformada inversa?",
      options: [
        { id: "a", text: "X = sqrt(U)", isCorrect: true, explanation: "Igualando U = x^2, despejamos algebraicamente x = sqrt(U)." },
        { id: "b", text: "X = U^2", isCorrect: false, explanation: "U^2 es la función directa, no su inversa." },
        { id: "c", text: "X = -ln(U)", isCorrect: false, explanation: "-ln(U) corresponde a la distribución exponencial." }
      ]
    },
    {
      id: "q_ti_2",
      text: "En el método de Aceptación-Rechazo, si la constante c = 5.0, ¿cuál es el porcentaje promedio de candidatos generados que serán descartados?",
      options: [
        { id: "a", text: "80% de rechazo (probabilidad de aceptación es 1/c = 1/5 = 0.20)", isCorrect: true, explanation: "La probabilidad de aceptación es 1/c = 20%, lo que implica que el 80% de los intentos son rechazados." },
        { id: "b", text: "5%", isCorrect: false, explanation: "c = 5 no equivale a un 5% de rechazo." },
        { id: "c", text: "0%", isCorrect: false, explanation: "Solo cuando c = 1 no hay rechazos." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-simulacion-monte-carlo-riesgo",
        filename: "02-simulacion-monte-carlo-riesgo.mdx",
        content: `---
title: "Simulación Monte Carlo Aplicada al Análisis de Riesgos"
order: 2
description: "Modelado estocástico de incertidumbre, propagación de varianza en modelos financieros y de manufactura, e intervalos de confianza para el VaR."
bloomLevel: "EVALUATE"
estimatedMinutes: 50
quiz:
  - question: "¿En qué consiste esencialmente el método de Simulación Monte Carlo para el análisis de riesgo en proyectos de ingeniería?"
    options:
      - "Sustituir parámetros determinísticos fijos por distribuciones de probabilidad y evaluar repetidamente el modelo miles de veces para obtener la distribución empírica de la variable de salida"
      - "Calcular únicamente el peor escenario posible (Worst-Case Analysis)"
      - "Forzar a que todos los costos sigan una distribución normal estándar"
      - "Optimizar el código para que no requiera variables estocásticas"
    answer: 0
    explanation: "Monte Carlo muestrea repetidamente variables de entrada probabilísticas para construir la curva de densidad acumulada de la variable de salida (e.g. utilidad neta, VPN, tiempo de entrega)."
  - question: "¿Qué métrica probabilística representa el Valor en Riesgo (VaR) al nivel del 95%?"
    options:
      - "El percentil 5 de la distribución de utilidades (la pérdida máxima tolerable con un 95% de confianza)"
      - "El promedio simple de las utilidades"
      - "La desviación estándar multiplicada por 100"
      - "El valor máximo simulado"
    answer: 0
    explanation: "El VaR_95% cuantifica el umbral tal que la probabilidad de que la pérdida exceda dicho valor sea a lo sumo del 5%."
---

# Introducción

> ¿Cuál es la probabilidad de que una nueva planta de producción de polímeros genere pérdidas durante sus primeros 3 años? La evaluación tradicional mediante promedios estáticos falla catastróficamente debido a la llamada 'Falacia de los Promedios' ($E[f(X)] \\ne f(E[X])$ para funciones no lineales).

El método de **Simulación Monte Carlo**, concebido por Stanislaw Ulam y John von Neumann durante el Proyecto Manhattan, resuelve problemas matemáticos y de toma de decisiones mediante muestreo estadístico repetido a gran escala.

<Callout type="info">
**Falacia de los Promedios:** Evaluar un proyecto usando la demanda promedio y los costos promedio produce una estimación sistemáticamente distorsionada de la rentabilidad real bajo incertidumbre.
</Callout>

## Objetivos de Aprendizaje
- Modelar variables de entrada estocásticas con distribuciones pertinentes (Triangular, Normal, Log-normal).
- Propagar la incertidumbre a través de ecuaciones financieras y operativas no lineales.
- Construir distribuciones acumuladas de salida y calcular probabilidades de pérdida.
- Estimar el Valor en Riesgo (VaR) y Conditional VaR (CVaR) en Python.

---

# Fundamentos Teóricos

### Estructura de un Modelo Monte Carlo

Sea $Y = g(X_1, X_2, \\dots, X_p)$ la variable de interés del sistema, donde cada $X_j$ es una variable aleatoria con densidad conocida $f_j(x_j)$.
Para $N$ iteraciones independientes:
1. Muestrear valores pseudoaleatorios $x_1^{(k)}, x_2^{(k)}, \\dots, x_p^{(k)}$ para $k = 1, \\dots, N$.
2. Evaluar la función de respuesta:
   $$y^{(k)} = g(x_1^{(k)}, \\dots, x_p^{(k)})$$
3. Construir la distribución empírica de $\\{y^{(k)}\\}_{k=1}^N$.

### Teorema del Límite Central y Precisión de Monte Carlo

El estimador de la media poblacional $\\mu_Y$ es el promedio muestral:

$$\\hat{\\mu}_Y = \\frac{1}{N} \\sum_{k=1}^N y^{(k)}$$

El error estándar de la estimación es:

$$SE(\\hat{\\mu}_Y) = \\frac{\\sigma_Y}{\\sqrt{N}}$$

La tasa de convergencia es de orden $\\mathcal{O}(1 / \\sqrt{N})$. Para reducir el error a la mitad, se requiere cuadruplicar el número de corridas $N$.

---

# Laboratorio en Python: Análisis de Riesgo Financiero de Lanzamiento de Producto

\`\`\`python
import numpy as np
import pandas as pd

# Simulación Monte Carlo del Margen Operativo Anual de una Línea de Ensamble
# Margen = (Precio - Costo_Variable) * Demanda - Costo_Fijo
N = 100_000
np.random.seed(42)

# 1. Variables de Entrada con Incertidumbre
# Demanda anual: Normal con media 50,000 unidades y desv 8,000
demanda = np.random.normal(loc=50_000, scale=8_000, size=N)
demanda = np.maximum(demanda, 0)  # No puede ser negativa

# Precio de venta unitario: Triangular (Mín=90, Moda=100, Máx=115 USD)
precio = np.random.triangular(left=90, mode=100, right=115, size=N)

# Costo variable unitario: Log-normal (Media log=3.9, sigma log=0.15)
costo_var = np.random.lognormal(mean=3.9, sigma=0.15, size=N)

# Costo fijo anual: Uniforme entre 1,800,000 y 2,400,000 USD
costo_fijo = np.random.uniform(low=1_800_000, high=2_400_000, size=N)

# 2. Función de Salida
margen_operativo = (precio - costo_var) * demanda - costo_fijo

# 3. Métricas de Riesgo
prob_perdida = np.mean(margen_operativo < 0)
var_5 = np.percentile(margen_operativo, 5)  # Percentil 5
cvar_5 = np.mean(margen_operativo[margen_operativo <= var_5])  # Pérdida esperada en el peor 5%

print("=== REPORTE DE ANÁLISIS DE RIESGO MONTE CARLO (N = 100,000) ===")
print(f"Margen Esperado Medio: USD {np.mean(margen_operativo):,.2f}")
print(f"Desviación Estándar del Margen: USD {np.std(margen_operativo):,.2f}")
print(f"Probabilidad de Pérdida Financiera (P(Margen < 0)): {prob_perdida * 100:.2f}%")
print(f"Valor en Riesgo al 95% (VaR 95%): USD {var_5:,.2f}")
print(f"Conditional VaR (CVaR 95% - Expected Shortfall): USD {cvar_5:,.2f}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Simulación Monte Carlo y Riesgo"
  questions={[
    {
      id: "q_mc_1",
      text: "¿Por qué para reducir el error estándar de una estimación Monte Carlo a una décima parte (1/10) se deben incrementar las réplicas en 100 veces?",
      options: [
        { id: "a", text: "Porque el error disminuye a una tasa proporcional a 1 / sqrt(N)", isCorrect: true, explanation: "SE = sigma / sqrt(N). Para que SE / 10 = sigma / sqrt(100 N), se necesita N * 100." },
        { id: "b", text: "Porque los números pseudoaleatorios pierden precisión con muestras grandes", isCorrect: false, explanation: "La precisión matemática de cada número generado se mantiene constante." },
        { id: "c", text: "Porque la distribución normal exige 100 observaciones por parámetro", isCorrect: false, explanation: "La convergencia de Monte Carlo es universal independientemente de la distribución subyacente." }
      ]
    },
    {
      id: "q_mc_2",
      text: "¿Qué información clave aporta el Conditional VaR (CVaR) que no proporciona el VaR convencional?",
      options: [
        { id: "a", text: "La magnitud promedio esperada de la pérdida cuando el resultado cae en la cola extrema (más allá del umbral del VaR)", isCorrect: true, explanation: "El VaR solo informa el punto de corte; el CVaR (Expected Shortfall) cuantifica la severidad promedio del desastre en los peores escenarios." },
        { id: "b", text: "El tiempo exacto en que ocurrirá la falla", isCorrect: false, explanation: "Monte Carlo no predice fechas determinísticas." },
        { id: "c", text: "La rentabilidad máxima posible del proyecto", isCorrect: false, explanation: "El CVaR mide el riesgo de cola negativo." }
      ]
    }
  ]}
/>
`
      }
    ]
  },
  {
    slug: "04-analisis-salida-validacion",
    metadata: {
      title: "Análisis de Salida y Validación",
      order: 4
    },
    lessons: [
      {
        slug: "01-pruebas-bondad-ajuste-ks-chi2",
        filename: "01-pruebas-bondad-ajuste-ks-chi2.mdx",
        content: `---
title: "Pruebas de Bondad de Ajuste: Kolmogorov-Smirnov y Chi-Cuadrado"
order: 1
description: "Modelado de datos de entrada a partir de registros empíricos de planta, estimación de parámetros por MLE y contraste con K-S y Chi-cuadrado."
bloomLevel: "EVALUATE"
estimatedMinutes: 50
quiz:
  - question: "¿Por qué en una prueba de bondad de ajuste de Chi-cuadrado se deben restar grados de libertad adicionales cuando los parámetros se estiman a partir de los datos muestrales?"
    options:
      - "Cada parámetro poblacional desconocido estimado a partir de la muestra reduce en 1 los grados de libertad del error: df = k - 1 - m"
      - "Porque la suma de frecuencias ya no es igual a n"
      - "Para evitar que el estadístico sea menor a cero"
      - "Porque los datos dejan de ser independientes"
    answer: 0
    explanation: "Estimar m parámetros teóricos mediante máxima verosimilitud o momentos utiliza información de la muestra, reduciendo los grados de libertad efectivos a df = k - 1 - m."
  - question: "¿Qué ventaja tiene la prueba de Kolmogorov-Smirnov (K-S) frente a la prueba de Chi-cuadrado para datos continuos?"
    options:
      - "Es una prueba de distribución exacta libre de intervalos que no requiere agrupar datos en clases arbitrarias"
      - "Solo se puede aplicar a variables discretas"
      - "No requiere conocer la función de distribución acumulada teórica"
      - "Siempre arroja un p-valor mayor a 0.5"
    answer: 0
    explanation: "Chi-cuadrado depende críticamente del número y ancho de clases elegido; K-S opera directamente sobre la distancia vertical máxima entre la FDA empírica continua y la teórica."
---

# Introducción

> "Basura entra, basura sale" (*Garbage In, Garbage Out*). Esta regla de oro de la computación es letal en simulación. Si el analista asume perezosamente que los tiempos entre fallas de una caldera siguen una distribución Normal (simétrica con soporte negativo) cuando en realidad siguen una distribución de Weibull asimétrica, todas las conclusiones y políticas de mantenimiento serán ficticias.

El **Modelado de Datos de Entrada (Input Modeling)** es el proceso científico de recolectar datos reales de campo, identificar la familia probabilística adecuada, estimar sus parámetros óptimos y validar el ajuste.

<Callout type="info">
**Criterios de Selección:** Entre varias distribuciones candidatas que no sean rechazadas por las pruebas de bondad de ajuste, se seleccionan aquellas con menor Criterio de Información de Akaike (AIC) o Bayesiano (BIC).
</Callout>

## Objetivos de Aprendizaje
- Estimar parámetros de distribución mediante el método de Máxima Verosimilitud (MLE).
- Aplicar la prueba de bondad de ajuste $\\chi^2$ con corrección de grados de libertad por parámetros estimados.
- Ejecutar la prueba de Kolmogorov-Smirnov y evaluar gráficos cuantil-cuantil (Q-Q Plots).
- Automatizar el ajuste de múltiples distribuciones candidatas en Python con SciPy.

---

# Fundamentos Teóricos

### Estimación por Máxima Verosimilitud (MLE)

Dada una muestra i.i.d. $x_1, \\dots, x_n$, la función de verosimilitud de los parámetros $\\theta$ es:

$$L(\\theta) = \\prod_{i=1}^n f(x_i; \\theta) \\implies \\ln L(\\theta) = \\sum_{i=1}^n \\ln f(x_i; \\theta)$$

El estimador MLE $\\hat{\\theta}$ maximiza el soporte de verosimilitud observada:

$$\\frac{\\partial \\ln L(\\theta)}{\\partial \\theta} = 0$$

### Prueba de Bondad de Ajuste $\\chi^2$

Se particiona el soporte en $k$ clases con frecuencias observadas $O_j$ y esperadas $E_j = n \\cdot p_j$.
Si se estimaron $m$ parámetros a partir de la muestra:

$$\\chi_0^2 = \\sum_{j=1}^k \\frac{(O_j - E_j)^2}{E_j} \\sim \\chi_{k - 1 - m}^2$$

### Gráficos Cuantil-Cuantil (Q-Q Plot)

Grafican los cuantiles empíricos muestrales frente a los cuantiles teóricos de la distribución propuesta. Si los puntos se alinean estrechamente sobre la recta identidad de 45 grados ($y = x$), la distribución es coherente con los datos.

---

# Laboratorio en Python: Ajuste de Distribuciones a Tiempos de Reparación

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

# 120 registros empíricos de tiempos de reparación en planta (horas)
np.random.seed(101)
datos_campo = np.random.weibull(a=1.8, size=120) * 15.0  # Generados con Weibull (c=1.8, scale=15)

# Distribuciones candidatas para competir
candidatas = ['expon', 'gamma', 'weibull_min', 'lognorm', 'norm']
resultados = []

for nombre in candidatas:
    dist = getattr(stats, nombre)
    # Ajuste por Máxima Verosimilitud (MLE)
    params = dist.fit(datos_campo)
    
    # Prueba de Kolmogorov-Smirnov
    ks_stat, ks_p = stats.kstest(datos_campo, nombre, args=params)
    
    # Log-Verosimilitud y AIC (Akaike Information Criterion: 2k - 2ln(L))
    log_l = np.sum(dist.logpdf(datos_campo, *params))
    k_params = len(params)
    aic = 2 * k_params - 2 * log_l
    
    resultados.append({
        'Distribución': nombre,
        'Num_Parámetros': k_params,
        'Estadístico_KS': ks_stat,
        'p-valor_KS': ks_p,
        'AIC': aic,
        'Ajuste_Válido (alfa=0.05)': 'Aprobado' if ks_p > 0.05 else 'Rechazado'
    })

df_ajuste = pd.DataFrame(resultados).sort_values(by='AIC')

print("AUDITORÍA DE BONDAD DE AJUSTE A DATOS DE CAMPO:")
print(df_ajuste.round(4).to_string(index=False))
mejor = df_ajuste.iloc[0]['Distribución']
print(f"\\n--> MEJOR DISTRIBUCIÓN (Menor AIC y Mayor p-valor): {mejor}")
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Pruebas de Bondad de Ajuste"
  questions={[
    {
      id: "q_gof_1",
      text: "Si se ajusta una distribución Normal a datos de tiempos de ciclo y se estiman mu y sigma a partir de la muestra en una prueba de Chi-cuadrado con k = 8 clases, ¿cuántos grados de libertad tiene la prueba?",
      options: [
        { id: "a", text: "5 grados de libertad: df = k - 1 - m = 8 - 1 - 2 = 5", isCorrect: true, explanation: "Se estimaron dos parámetros (mu y sigma), por lo que m = 2. df = 8 - 1 - 2 = 5." },
        { id: "b", text: "7 grados de libertad", isCorrect: false, explanation: "7 sería si los parámetros de la distribución normal fueran conocidos a priori sin estimar." },
        { id: "c", text: "8 grados de libertad", isCorrect: false, explanation: "Siempre se resta al menos 1 por la restricción de suma total de frecuencias." }
      ]
    },
    {
      id: "q_gof_2",
      text: "¿Por qué el Criterio de Información de Akaike (AIC) es preferido para desempatar modelos cuando múltiples distribuciones aprueban la prueba K-S?",
      options: [
        { id: "a", text: "Porque premia la calidad del ajuste de máxima verosimilitud y penaliza el sobreajuste introducido por distribuciones con exceso de parámetros", isCorrect: true, explanation: "AIC = 2k - 2 ln(L) aplica el principio de parsimonia (Navaja de Ockham), prefiriendo modelos simples y robustos." },
        { id: "b", text: "Porque garantiza que el tiempo de simulación sea cero", isCorrect: false, explanation: "AIC es una métrica de selección de modelos, no un optimizador de código." },
        { id: "c", text: "Porque solo funciona con datos determinísticos", isCorrect: false, explanation: "AIC está fundamentado en la teoría de la información estocástica." }
      ]
    }
  ]}
/>
`
      },
      {
        slug: "02-transitorio-permanente-replicas",
        filename: "02-transitorio-permanente-replicas.mdx",
        content: `---
title: "Periodo Transitorio, Régimen Permanente y Método de Réplicas"
order: 2
description: "Sistemas terminales vs no terminales, eliminación del sesgo de calentamiento con la regla de Welch, y estimación por réplicas independientes."
bloomLevel: "EVALUATE"
estimatedMinutes: 50
quiz:
  - question: "¿Por qué se debe descartar el 'periodo de calentamiento' (Warm-up period / fase transitoria) al analizar un sistema en régimen permanente?"
    options:
      - "Porque el sistema inicia típicamente vacío y desocupado, sesgando artificialmente hacia abajo las métricas de congestión a largo plazo"
      - "Porque los generadores pseudoaleatorios no funcionan durante los primeros minutos"
      - "Para reducir el costo de electricidad del computador"
      - "Porque las computadoras requieren calentarse antes de ejecutar Python"
    answer: 0
    explanation: "Iniciar una simulación con colas vacías no refleja la realidad operativa de un sistema continuo (e.g. un hospital o refinería que opera 24/7). Incluir ese transitorio subestima el tiempo medio en cola real."
  - question: "¿Qué garantiza el Método de Réplicas Independientes para la construcción de intervalos de confianza válidos en simulación?"
    options:
      - "Garantiza que los estimadores promedio de cada réplica sean estadísticamente independientes e idénticamente distribuidos mediante el uso de semillas pseudoaleatorias distintas"
      - "Garantiza que la varianza dentro de una réplica sea cero"
      - "Elimina la necesidad de definir el periodo de calentamiento"
      - "Evita tener que simular más de 1 minuto"
    answer: 0
    explanation: "Dado que las observaciones dentro de una misma corrida están altamente autocorrelacionadas serialmente, ejecutar R réplicas independientes con semillas distintas permite aplicar el Teorema del Límite Central sobre los R promedios independientes."
---

# Introducción

> Ejecutar una simulación estocástica una sola vez y tomar su resultado como verdad absoluta es equivalente a lanzar una moneda una vez, obtener 'Cara' y afirmar que la probabilidad de cara es 100%. Una corrida de simulación es únicamente **una única realización muestral de un proceso estocástico**.

Para obtener conclusiones científicas e intervalos de confianza estadísticamente rigurosos, se requiere gestionar el **periodo de calentamiento** y ejecutar **réplicas independientes**.

<Callout type="info">
**Sistemas Terminales vs No Terminales:**
- *Terminales:* Tienen un evento natural de cierre (e.g. un banco que abre a las 8:00 AM y cierra a las 4:00 PM con colas vacías).
- *No Terminales:* Operan de forma continua sin cierre natural (e.g. un servidor web, una planta petroquímica). Requieren eliminar el transitorio inicial.
</Callout>

## Objetivos de Aprendizaje
- Diferenciar entre simulación de sistemas con horizonte terminal y de régimen permanente (Steady-State).
- Aplicar el procedimiento gráfico de Welch para determinar el tiempo de corte del transitorio ($T_d$).
- Implementar el Método de Réplicas Independientes con semillas ortogonales.
- Construir intervalos de confianza del $(1 - \\alpha)\\%$ para la media del sistema en Python.

---

# Fundamentos Teóricos

### El Procedimiento de Welch para el Warm-up

Para eliminar el sesgo de las condiciones iniciales:
1. Realizar $R$ réplicas independientes de longitud $m$.
2. Sea $Y_{ji}$ la observación $i$ de la réplica $j$. Calcular la media promediada sobre las réplicas en cada paso $i$:
   $$\\bar{Y}_i = \\frac{1}{R} \\sum_{j=1}^R Y_{ji}, \\quad i = 1, \\dots, m$$
3. Calcular la media móvil con ventana de suavizado $w$:
   $$\\bar{Y}_i(w) = \\frac{1}{2w + 1} \\sum_{s=-w}^w \\bar{Y}_{i+s}$$
4. Identificar visualmente el punto de corte $d$ donde la curva se estabiliza horizontalmente y descartar los datos para $i \\le d$.

### Intervalo de Confianza por Réplicas Independientes

Sean $\\bar{X}_1, \\bar{X}_2, \\dots, \\bar{X}_R$ los promedios calculados en cada una de las $R$ réplicas independientes tras eliminar el warm-up:

$$\\bar{\\bar{X}} = \\frac{1}{R} \\sum_{j=1}^R \\bar{X}_j$$

$$S^2 = \\frac{1}{R - 1} \\sum_{j=1}^R (\\bar{X}_j - \\bar{\\bar{X}})^2$$

El intervalo de confianza del $(1 - \\alpha)\\%$ para el rendimiento en régimen permanente $\\mu$ es:

$$\\bar{\\bar{X}} \\pm t_{\\alpha/2, R-1} \\frac{S}{\\sqrt{R}}$$

---

# Laboratorio en Python: Estimación por Réplicas de una Celda de Manufactura

\`\`\`python
import numpy as np
import pandas as pd
from scipy import stats

def simular_celda(semilla, horizonte=5000, warm_up=1000):
    """Simula una estación de maquinado y retorna el tiempo medio de ciclo post warm-up"""
    np.random.seed(semilla)
    t = 0.0
    tiempos_espera = []
    
    # Llegadas poisson (lambda = 0.8 / min) y servicio exponencial (mu = 1.0 / min)
    tasa_l = 0.8
    tasa_m = 1.0
    
    t_servidor_libre = 0.0
    
    while t < horizonte:
        inter = np.random.exponential(1.0 / tasa_l)
        t += inter
        servicio = np.random.exponential(1.0 / tasa_m)
        
        # Inicio y fin de servicio
        inicio = max(t, t_servidor_libre)
        espera = inicio - t
        t_servidor_libre = inicio + servicio
        
        # Guardar únicamente observaciones después del periodo de warm-up
        if t >= warm_up:
            tiempos_espera.append(espera)
            
    return np.mean(tiempos_espera)

# Ejecución de R = 15 réplicas independientes con semillas distintas
R = 15
semillas = [100 + i*37 for i in range(R)]
promedios_replicas = [simular_celda(s) for s in semillas]

promedio_global = np.mean(promedios_replicas)
desv_replicas = np.std(promedios_replicas, ddof=1)
error_estandar = desv_replicas / np.sqrt(R)

# Intervalo de confianza al 95% con t-Student
alpha = 0.05
t_critico = stats.t.ppf(1.0 - alpha/2.0, df=R - 1)
margen_error = t_critico * error_estandar
ic_inf = promedio_global - margen_error
ic_sup = promedio_global + margen_error

# Valor analítico M/M/1: Wq = lambda / (mu * (mu - lambda)) = 0.8 / (1.0 * (1.0 - 0.8)) = 4.0 minutos
wq_teorico = 0.8 / (1.0 * (1.0 - 0.8))

df_reporte = pd.DataFrame({
    'Métrica': [
        'Número de Réplicas (R)',
        'Tiempo de Warm-up Descartado',
        'Media Estimada Wq (minutos)',
        'Desviación Estándar entre Réplicas (S)',
        'Error Estándar (SE)',
        'Intervalo de Confianza 95% Inferior',
        'Intervalo de Confianza 95% Superior',
        'Valor Teórico M/M/1'
    ],
    'Valor': [
        f"{R}",
        "1000 min",
        f"{promedio_global:.4f}",
        f"{desv_replicas:.4f}",
        f"{error_estandar:.4f}",
        f"{ic_inf:.4f}",
        f"{ic_sup:.4f}",
        f"{wq_teorico:.4f}"
    ]
})

print("ESTIMACIÓN POR EL MÉTODO DE RÉPLICAS INDEPENDIENTES:")
print(df_reporte.to_string(index=False))
\`\`\`

---

# Autoevaluación

<Quiz
  title="Quiz: Periodo Transitorio y Réplicas"
  questions={[
    {
      id: "q_rep_1",
      text: "Si las observaciones de tiempo de espera tomadas consecutivamente dentro de una misma corrida de simulación están fuertemente correlacionadas (autocorrelación serial positiva), ¿qué ocurriría si calculáramos el intervalo de confianza ignorando esa correlación?",
      options: [
        { id: "a", text: "Subestimaríamos gravemente la varianza real del estimador, obteniendo un intervalo de confianza artificialmente estrecho y engañoso", isCorrect: true, explanation: "La presencia de autocorrelación positiva infla los grados de libertad aparentes y reduce la varianza muestral calculada ingenuamente con S^2 / n." },
        { id: "b", text: "El intervalo sería infinitamente amplio", isCorrect: false, explanation: "Al contrario, el sesgo es hacia un intervalo peligrosamente estrecho." },
        { id: "c", text: "El promedio cambiaría de signo", isCorrect: false, explanation: "El promedio muestral permanece insesgado; lo que se distorsiona es la estimación de su error estándar." }
      ]
    },
    {
      id: "q_rep_2",
      text: "En un sistema terminal (como una sala de emergencias entre las 6:00 y las 22:00 horas), ¿se debe descartar un periodo de calentamiento?",
      options: [
        { id: "a", text: "No, porque las condiciones iniciales del sistema (e.g. empezar vacío a las 6:00) forman parte integral del comportamiento real del sistema", isCorrect: true, explanation: "En sistemas terminales el estado inicial es una condición de contorno real, por lo que toda la trayectoria temporal desde t=0 debe registrarse." },
        { id: "b", text: "Sí, siempre se deben descartar al menos 1000 minutos", isCorrect: false, explanation: "Descartar datos en un sistema terminal alteraría la ventana de operación real." },
        { id: "c", text: "Solo si el p-valor es menor a 0.05", isCorrect: false, explanation: "La distinción entre terminal y no terminal es estructural del problema físico, no un test de hipótesis." }
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
  console.log("✅ Curso simulacion generado con éxito!");
}

build();
