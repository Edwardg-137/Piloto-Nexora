# Presentación de Nexora

Landing para estudiantes invitados al piloto cerrado, con demostración de **48 segundos**, música instrumental original y textos en español. Todo es independiente de la aplicación.

- `site/`: página y recursos que se publican. Incluye el MP4 terminado.
- `video/`: composición editable de HyperFrames, guion y música.
- `tools/`: vista local, generación de música y verificaciones.
- `PLAN.md`, `PRODUCT.md`, `DESIGN.md`, `ASSETS.md`: decisiones y procedencia.
- `verification/`, `.hyperframes/` y dependencias: archivos locales ignorados.

## Ver la landing

Con Node 22 o posterior, desde esta carpeta:

```powershell
node tools/serve.mjs
```

Abrir **http://127.0.0.1:4173**. El video usa controles nativos y se descarga solo al reproducirlo. No hay analítica, formularios ni llamadas a la API en esta landing.

## Repositorio y publicación

Esta carpeta tiene su propio Git, rama `main` y remoto [Piloto-Nexora](https://github.com/Edwardg-137/Piloto-Nexora). Está excluida del repositorio principal de Nexora.

**Landing publicada:** https://edwardg-137.github.io/Piloto-Nexora/

Pages está habilitado con **GitHub Actions**. El workflow de esta carpeta publica `site/`; no usar el flujo automático de Jekyll desde la raíz del repositorio, que no contiene la landing.

1. Si se vuelve a configurar Pages, en **Settings → Pages → Build and deployment → Source**, elegir **GitHub Actions**.
2. Para publicar manualmente, en **Actions**, ejecutar **Publicar presentación de Nexora**. Los cambios de `site/` en `main` se publican automáticamente.

El workflow publica **solo `site/`**. La composición, herramientas y documentos se conservan en el repositorio y quedan fuera del sitio. Las rutas relativas funcionan también en `https://usuario.github.io/repositorio/`; no se necesita dominio propio ni build.

Workflow basado en la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), consultada el 13/11/2026. Conectar Git no configura por sí solo la fuente de publicación de Pages.

Si se quiere un repositorio que contenga **únicamente los archivos públicos**, copiar el contenido de `site/` a su raíz y publicar desde esa raíz con Pages. En ese caso no copiar el workflow de esta carpeta, que espera `site/`.

## Editar y renderizar el video

Desde esta carpeta:

```powershell
npm install --prefix tools
$env:PATH = (Resolve-Path tools/node_modules/ffmpeg-static).Path + ';' + (Resolve-Path tools/node_modules/ffprobe-static/bin/win32/x64).Path + ';' + $env:PATH
cd video
npm run dev
```

La vista editable también permite cambiar textos, tiempos y encuadres. Los archivos `compositions/*.html` son las escenas. `assets/` contiene medios y fuentes locales; `assets/gsap.min.js` evita descargar la librería al renderizar.

Antes de exportar, desde `video/`:

```powershell
npm run check
npx --yes hyperframes@0.9.43 snapshot --review
npm run render -- --quality delivery --fps 30 -o ../site/assets/nexora-demo.mp4
```

Desde la carpeta principal se regenera la música así; el WAV intermedio queda ignorado:

```powershell
node tools/create-music.mjs
& tools/node_modules/ffmpeg-static/ffmpeg.exe -y -i video/renders/music.wav -af loudnorm=I=-20:TP=-2:LRA=9 -c:a aac -b:a 160k video/assets/music.m4a
```

No se requiere cuenta de HeyGen. También se puede seguir editando en la [aplicación de escritorio de HyperFrames](https://hyperframes.studio/studio/download?os=windows&src=cli).

Con la vista local abierta y las herramientas instaladas, `node tools/verify.mjs` comprueba los recursos, los cuatro tamaños, la reproducción y los metadatos. Necesita Chrome instalado. `tools/prepare-assets.mjs` es una utilidad interna para renovar las capturas desde el monorepo; los recursos entregados ya están completos y no necesitan esa utilidad.

## Actualizar contenidos

- Texto y destino de los botones: `site/index.html`.
- Diseño: `site/styles.css`.
- Video: `site/assets/nexora-demo.mp4`.
- Cartel: `site/assets/poster.webp`.
- Textos accesibles del video: `site/assets/demo.vtt` y el recorrido desplegable en HTML.

Los botones llevan al registro del piloto actual. Si cambia su dirección, actualizar sus tres enlaces. Las capturas usan datos sintéticos y muestran pantallas de prueba, no resultados de estudiantes. La pregunta conserva una captura real anterior al último ajuste de materiales; no representa una interacción nueva grabada en vivo.

El arte de cartas es el provisional existente de la app. La música fue compuesta mediante síntesis local para esta presentación, sin samples ni piezas de terceros. Fuente Archivo bajo SIL OFL 1.1; licencia junto al archivo de fuente. GSAP conserva el encabezado y enlace a su licencia en su fuente distribuida.
