# Verificación de la presentación · 13/11/2026

## Resultado funcional
Landing estática y video terminados. Chrome comprobado a 360, 390, 768 y 1440 px: sin desbordamiento, imágenes locales completas, enlaces internos correctos, transcripción desplegable, reproducción y seek del MP4. El sitio también carga con un prefijo de repositorio para GitHub Pages. Sin JavaScript propio ni analítica.

El servidor local prueba el confinamiento de rutas; la verificación comprueba respuestas parciales del video y el archivo vacío de Pages. Los archivos de evidencia quedan en verification/, ignorados por Git. El título móvil se comprobó otra vez tras corregir el espacio: la revisión acotada lo declaró resuelto y mantuvo ship.

## Video
48 s, 1920 × 1080, 30 fps, H.264/AAC estéreo, 6.182.223 bytes. HyperFrames termina con cero errores y cero advertencias; audio medido con señal y sin clipping. Ver video/REVIEW.md para decisiones y límites. Se revisaron fotogramas de la composición y del archivo exportado.

## Diseño
Detector ejecutado una vez: texto informativo de 10 px corregido a 11 px; el aviso de padding en la sección de video es un falso positivo porque la sección contiene .wrap con márgenes horizontales y padding vertical explícitos. La revisión independiente inspeccionó las cuatro capturas y las hojas del video; no encontró P0/P1. Identificó la unión de «hay» y «cartas» al ocultar un salto en móvil, corregida mediante un espacio literal.

## Publicación
La carpeta .github/workflows/ contiene un workflow que publica únicamente site/; no necesita instalar dependencias. Jorge creó Edwardg-137/Piloto-Nexora y autorizó conectar esta carpeta mediante un Git independiente, con origin y rama main. La carpeta está ignorada por el monorepo. Los archivos de esta tarea permanecen dentro de presentacion-nexora/.

El intento inicial falló porque Pages no estaba habilitado. Al revisar el error ya estaba configurado como workflow, pero la ejecución automática de Jekyll había publicado la raíz del repositorio y la URL devolvía 404. Se ejecutó el workflow propio, sin cambiar su YAML ni añadir tokens: [ejecución 43551397353, correcta](https://github.com/Edwardg-137/Piloto-Nexora/actions/runs/43551397353).

**URL:** https://edwardg-137.github.io/Piloto-Nexora/. Página, CSS, imágenes, fuente, subtítulos y MP4 comprobados con HTTP 200. El MP4 publicado conserva 6.182.223 bytes. No se modificó la aplicación ni se volvió a renderizar el video.

Ensayo adicional sobre la URL pública en Chrome a 390 px: sin desbordamiento ni errores de página; reproducción del MP4 y salto a 20 s correctos, duración de 48 s y resolución 1920 × 1080.

## Límites pendientes
No se probó teléfono físico ni Safari. No se escuchó la música: se midió su nivel y se confirmó la pista en el MP4. Las capturas muestran una versión local de prueba que puede adelantarse a la app publicada. La revisión automática no valida eficacia educativa ni el flujo remoto completo del piloto.
