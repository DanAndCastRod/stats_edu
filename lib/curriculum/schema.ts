import { z } from "zod";

// Taxonomía de Bloom (Simplificada para Ingeniería)
export const BloomLevelSchema = z.enum([
    "REMEMBER", // Recordar / Definir
    "UNDERSTAND", // Entender / Explicar
    "APPLY",      // Aplicar / Calcular
    "ANALYZE",    // Analizar / Inferir
    "EVALUATE",   // Evaluar / Justificar
    "CREATE"      // Crear / Diseñar
]);

// Tipos de Contenido Interactivo
export const ContentTypeSchema = z.enum([
    "THEORY_MDX", // Texto + Fórmulas
    "PYTHON_LAB", // Script ejecutable
    "QUIZ_FORM",  // Preguntas selección múltiple
    "VISUALIZATION" // Gráfico interactivo (sin código visible)
]);

// Schema para un TEMA (La unidad atómica de aprendizaje)
export const TopicSchema = z.object({
    id: z.string().uuid().optional(), // Opcional al crear, obligatorio en DB
    slug: z.string().min(3), // URL friendly: 'teorema-bayes'
    title: z.string().min(5),
    estimatedMinutes: z.number().min(5).max(120),

    // Ingeniería Pedagógica
    learningObjectives: z.array(z.string()), // ¿Qué va a aprender?
    bloomLevel: BloomLevelSchema,

    // Componentes del "Premium content"
    hook: z.string().describe("La frase o dato curioso que atrapa la atención"),
    importance: z.string().describe("¿Por qué un Ingeniero Industrial debe saber esto?"),
    keywords: z.array(z.string()).optional().describe("Etiquetas para búsqueda"),
    relevantPythonFunctions: z.array(z.string()).optional().describe("Funciones de pandas/scipy que se enseñan"),

    // Referencias a archivos
    contentFilePath: z.string().optional(), // 'courses/stat1/module1/bayes.mdx'
    pythonScriptPath: z.string().optional(), // 'lab-bayes.py'
});

// Schema para una SEMANA / UNIDAD
export const WeekSchema = z.object({
    number: z.number().int().min(1).max(16),
    title: z.string(),
    description: z.string(),
    competencies: z.array(z.string()), // Competencias específicas
    topics: z.array(TopicSchema)
});

// Schema para un MÓDULO (Agrupador mayor)
export const ModuleSchema = z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number(),
    weeks: z.array(WeekSchema)
});

// MAPA CURRICULAR COMPLETO
export const CurriculumMapSchema = z.object({
    courseCode: z.string(), // 'EST-I'
    title: z.string(),
    description: z.string(),
    totalWeeks: z.number().default(16),
    prerequisites: z.array(z.string()),

    // Estructura Jerárquica
    modules: z.array(ModuleSchema)
});

export type CurriculumMap = z.infer<typeof CurriculumMapSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Topic = z.infer<typeof TopicSchema>;
