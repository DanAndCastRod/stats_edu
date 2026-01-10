// public/pyodide.worker.js
importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

async function loadPyodideAndPackages() {
    self.pyodide = await loadPyodide();

    // Notify main thread that we are loading heavy packages
    self.postMessage({ type: 'status', text: 'Descargando librerías (NumPy, Pandas, SciPy, Seaborn)... Esto puede tardar unos segundos.' });

    // Load common data science packages by default
    // Note: Seaborn might need to be installed via micropip in some Pyodide versions if not in the main repo
    await self.pyodide.loadPackage(["numpy", "pandas", "matplotlib", "scipy", "micropip", "statsmodels"]);

    // Install seaborn using micropip
    const micropip = self.pyodide.pyimport("micropip");
    await micropip.install("seaborn");

    self.postMessage({ type: 'status', text: 'Entorno Python listo.' });

    // Initialize environment (Headless Matplotlib & Plot Interception)
    await self.pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('Agg') # Force non-interactive backend (no window/DOM)
import matplotlib.pyplot as plt
import io, base64

def _custom_show():
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')
    print(f"__IMAGE_DATA__:{img_str}")
    plt.clf()

plt.show = _custom_show
    `);
}

let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
    // Make sure loading is done
    await pyodideReadyPromise;

    const { id, python, ...context } = event.data;

    try {
        // Redirect stdout to a buffer we can return
        self.pyodide.setStdout({ batched: (msg) => self.postMessage({ id, type: 'stdout', content: msg }) });

        // Execute the code
        let results = await self.pyodide.runPythonAsync(python);

        // Handle PyProxy objects (prevent cloning errors and memory leaks)
        // Check for .toJs and .destroy methods which indicate a PyProxy
        if (results && typeof results.toJs === 'function' && typeof results.destroy === 'function') {
            const text = results.toString();
            results.destroy(); // Free memory
            results = text;
        }

        self.postMessage({ id, type: 'result', results });

    } catch (error) {
        self.postMessage({ id, type: 'error', error: error.message });
    }
};
