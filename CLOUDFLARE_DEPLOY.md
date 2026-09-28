# Guía de Despliegue en Cloudflare Pages

Este proyecto (`stats_edu`) está configurado y optimizado para **Cloudflare Pages** mediante **Exportación Estática (SSG)** con Next.js 15.

---

## 🚀 Pasos para Desplegar desde el Dashboard de Cloudflare

1. Entra a tu cuenta en [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. En el menú lateral izquierdo, haz clic en **Workers y Pages** > **Crear aplicación** > Pestaña **Pages**.
3. Selecciona **Conectar a Git** y elige el repositorio:
   - **Repositorio:** `DanAndCastRod/stats_edu`
   - **Rama de producción:** `master`
4. En la pantalla de **Configuración de compilación (Build configuration)**:
   - **Framework preset:** `Next.js (Static HTML Export)` (o `Ninguno`)
   - **Comando de compilación (Build command):** `npm run build`
   - **Directorio de salida de compilación (Build output directory):** `out`
   - **Directorio raíz (Root directory):** `/` (o dejar vacío)
5. En **Variables de entorno (Environment variables)** agrega:
   - `NODE_VERSION` = `20`
6. Haz clic en **Guardar y desplegar (Save and Deploy)**.

---

## ⚡ Características de la Arquitectura en Cloudflare Pages

- **Velocidad Extrema en Edge:** Todo el catálogo (4 cursos oficiales y más de 50 temas) se compila a HTML estático servido desde los más de 300 centros de datos globales de Cloudflare.
- **Laboratorios de Python (Pyodide):** Ejecutan código Python directamente en WebAssembly dentro del navegador del estudiante, sin requerir servidores de backend.
- **Visualizadores Interactivos:** Gráficos dinámicos con Recharts, D3 y fórmulas matemáticas KaTeX renderizadas a velocidad nativa.
- **Persistencia de Progreso Local:** Quizzes y lecciones completadas se almacenan automáticamente en el navegador (`localStorage`), permitiendo acceso fluido e instantáneo.
- **PWA (Progressive Web App):** Service Worker generado por Serwist para capacidades offline y carga instantánea.
