# Presentación de Nexora · 13/11/2026

## Objetivo
Despertar interés entre estudiantes invitados al piloto cerrado y mostrar el primer recorrido, con una landing breve y un video integrado de unos 45 segundos.

## Alcance
Solo esta carpeta: sitio estático independiente, recursos públicos, video final, composición HyperFrames, documentación y verificaciones ignoradas. No modificar app, datos, configuración de publicación ni los cambios previos del usuario. Por instrucción de Jorge, la documentación de esta tarea también queda aquí, en lugar de docs/.

## Solución
HTML/CSS y controles nativos de video. Rutas relativas compatibles con un subdirectorio de GitHub Pages. Sin dependencias de ejecución ni peticiones a la API. Identidad de la app y capturas reales con datos sintéticos; música sin voz. Un artefacto de publicación se obtiene copiando site/ al nuevo repositorio.

## Direction contract
THESIS: un primer recorrido visible, con la interfaz real como prueba del estudio adaptativo.
OWN-WORLD: identidad científica heredada, mineral claro, grafito, violeta; Archivo para títulos, controles físicos sobrios.
STORY: entender que se puede elegir punto de partida, recibir una sesión, practicar y consultar el mapa; abrir la app y compartir lo que funciona o falla.
FIRST VIEWPORT: título corto a la izquierda, recorte real de Hoy a la derecha; acción Abrir Nexora y acceso al video visibles. En móvil, título y captura en lectura vertical.
FORM: demostración breve de producto, estructura definida por el encargo y marca existente; sin nueva identidad ni ejercicio de alternativas.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Pasos
1. Verificar capturas y preparar recursos con procedencia.
2. Escribir landing y composición, música y guion.
3. Revisar móvil/escritorio, teclado, video, rutas relativas y ausencia de secretos.
4. Renderizar video, verificar duración/audio y documentar publicación.

## Riesgos y límites
La app local incorpora cambios aún no publicados. Las capturas se identifican como versión de prueba. La configuración de Pages y el enlace público final quedan para el repositorio que creará Jorge. No cargar contenido privado ni credenciales en la página.

## Publicación y corrección del despliegue
Jorge creó Edwardg-137/Piloto-Nexora y autorizó conectar la carpeta y corregir el despliegue. Pages usa GitHub Actions; se conserva el workflow propio que publica site/. Al investigar el primer fallo, el flujo automático de Jekyll había desplegado la raíz sin index.html. Se ejecutó el workflow correcto y se verificaron la URL pública, sus recursos y la reproducción del video. Resultado: https://edwardg-137.github.io/Piloto-Nexora/. Detalles en VERIFICACION.md.
