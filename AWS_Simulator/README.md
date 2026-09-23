# AWS CLF-C02 Practice Simulator

Prototipo v0.1 del simulador de estudio CLF-C02.

## Estructura

- `index.html` — interfaz
- `app.js` — lógica del simulador
- `styles.css` — estilos
- `data/questions.json` — banco de 100 preguntas para la copia de trabajo
- `data/questions-source.json` — copia de la fuente original

## Ejecutar en VS Code

Se recomienda abrir la carpeta con VS Code y usar una extensión como Live Server para servir `index.html`.

No abrir `index.html` con `file://`, porque el navegador puede bloquear la carga de `data/questions.json` por CORS.
